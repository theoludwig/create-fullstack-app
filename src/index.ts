#!/usr/bin/env node
import chalk from 'chalk'
import logSymbols from 'log-symbols'
import childProcess from 'child-process-promise'
import path from 'path'
import inquirer from 'inquirer'
import Commander from 'commander'
import makeDir from 'make-dir'
import directoryExists from 'directory-exists'
import updateNotifier from 'update-notifier'

import validateNpmName from './utils/validateNpmName'
import copyDirectory from './utils/copyDirectory'
import loading from './utils/loading'
import tryGitInit from './utils/tryGitInit'
import { getQuestions } from './constants/questions'
import { TEMPLATE_COMMON_PATH } from './constants/templateChoices'
import { replaceNameDescriptionInReadme } from './utils/replaceInFiles'

/* eslint-disable-next-line */
const packageJson = require('../package.json')
const CURRENT_DIRECTORY = process.cwd()

let projectDirectoryName: string | undefined
const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<directory-name>')
  .usage(`${chalk.green('<directory-name>')}`)
  .action(name => {
    projectDirectoryName = name
  })
  .option('--only-api', 'generate only an API project')
  .option('--only-website', 'generate only a Website project')
  .allowUnknownOption()
  .parse(process.argv)

let { onlyApi, onlyWebsite } = program.opts() as {
  onlyApi: boolean
  onlyWebsite: boolean
}
if (onlyApi && onlyWebsite) {
  onlyApi = false
  onlyWebsite = false
}

updateNotifier({ pkg: packageJson }).notify()

if (projectDirectoryName == null || typeof projectDirectoryName !== 'string') {
  console.log()
  console.log('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('[project-directory]')}`
  )
  console.log()
  console.log('For example:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('my-fullstack-app')}`
  )
  console.log()
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
  )
  process.exit(1)
}

projectDirectoryName = projectDirectoryName.trim()
const validationDirectory = validateNpmName(projectDirectoryName)
if (!validationDirectory.valid) {
  const problems = validationDirectory.problems != null ? validationDirectory.problems[0] : ''
  console.error(
    chalk.red('Invalid directory name: ') + problems
  )
  process.exit(1)
}

const projectDirectory = path.join(CURRENT_DIRECTORY, projectDirectoryName)

if (directoryExists.sync(projectDirectory)) {
  console.error(
    `Could not create a project called "${chalk.red(
      projectDirectoryName
    )}" because the folder name already exists...`
  )
  process.exit(1)
}

inquirer
  .prompt(getQuestions(onlyApi, onlyWebsite))
  .then(async answers => {
    console.log()
    const {
      templateWebsite,
      templateAPI,
      projectName,
      projectDescription,
      domainName
    } = answers as QuestionsAnswers

    /* Copy files */
    const createdProject = {
      website: '',
      api: '',
      rootPath: '',
      isFullstack: false
    }
    await loading('Copy files.', async () => {
      createdProject.rootPath = await makeDir(projectDirectory)
      await copyDirectory(TEMPLATE_COMMON_PATH, createdProject.rootPath)

      if (onlyApi) {
        createdProject.api = createdProject.rootPath
        await copyDirectory(templateAPI.path, createdProject.rootPath)
        return
      }

      if (onlyWebsite) {
        createdProject.website = createdProject.rootPath
        await copyDirectory(templateWebsite.path, createdProject.rootPath)
        return
      }

      createdProject.website = await makeDir(
        path.join(createdProject.rootPath, 'website')
      )
      createdProject.api = await makeDir(
        path.join(createdProject.rootPath, 'api')
      )
      await copyDirectory(templateWebsite.path, createdProject.website)
      await copyDirectory(templateAPI.path, createdProject.api)
      createdProject.isFullstack = true
    })

    /* Installing NPM packages... */
    await loading(
      'Installing npm packages. This might take a couple of minutes.',
      async () => {
        if (createdProject.api !== '') {
          await childProcess.exec('npm install', {
            cwd: createdProject.api
          })
        }

        if (createdProject.website !== '') {
          await childProcess.exec('npm install', {
            cwd: createdProject.website
          })
        }
      }
    )

    /* Replace in files */
    await loading('Replace template variables in files.', async () => {
      const replaceFilesObject: ReplaceNameDescription = { projectName, projectDescription }
      await replaceNameDescriptionInReadme(createdProject.rootPath, replaceFilesObject)

      if (createdProject.website !== '') {
        await templateWebsite.replaceInFiles(createdProject.website, {
          projectName,
          projectDescription,
          domainName
        })
      }
    })

    /* Try git init */
    process.chdir(createdProject.rootPath)
    if (tryGitInit(createdProject.rootPath)) {
      console.log(logSymbols.success, 'Initialized a git repository.')
    }

    console.log(
      `\n ${chalk.green('Success!')} Created "${projectName}" at ${
        createdProject.rootPath
      }`
    )
  })
  .catch(error => {
    console.error(error)
    console.log(chalk.red('Error:') + ' please try again...')
  })
