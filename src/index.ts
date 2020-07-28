#!/usr/bin/env node
import chalk from 'chalk'
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

const { onlyApi, onlyWebsite } = program.opts()

updateNotifier({ pkg: packageJson }).notify()

if (!projectDirectoryName || typeof projectDirectoryName !== 'string') {
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
  console.error(
    chalk.red('Invalid directory name: ') + validationDirectory.problems![0]
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

inquirer.prompt(getQuestions(onlyApi, onlyWebsite)).then(async answers => {
  console.log()
  const {
    templateWebsite,
    templateAPI,
    projectName,
    projectDescription,
    domainName
  } = answers

  /* Copy files */
  const createdFullstackDirectory = { website: '', api: '', isFullstack: false }
  let createdDirectory = ''
  await loading('Copy files...', async () => {
    createdDirectory = await makeDir(projectDirectory)
    await copyDirectory(TEMPLATE_COMMON_PATH, createdDirectory)

    if (onlyApi) {
      await copyDirectory(templateAPI.path, createdDirectory)
      return
    }

    if (onlyWebsite) {
      await copyDirectory(templateWebsite.path, createdDirectory)
      return
    }

    createdFullstackDirectory.website = await makeDir(
      path.join(createdDirectory, 'website')
    )
    createdFullstackDirectory.api = await makeDir(
      path.join(createdDirectory, 'api')
    )
    await copyDirectory(templateWebsite.path, createdFullstackDirectory.website)
    await copyDirectory(templateAPI.path, createdFullstackDirectory.api)
    createdFullstackDirectory.isFullstack = true
  })

  /* Installing NPM packages... */
  if (!createdFullstackDirectory.isFullstack) {
    await loading(
      'Installing npm packages. This might take a couple of minutes.',
      async () => {
        await childProcess.exec('npm install', {
          cwd: createdDirectory
        })
      }
    )
  } else {
    console.log('Installing npm packages. This might take a couple of minutes.')
    await loading('Installing "api" packages...', async () => {
      await childProcess.exec('npm install', {
        cwd: createdFullstackDirectory.api
      })
    })
    await loading('Installing "website" packages...', async () => {
      await childProcess.exec('npm install', {
        cwd: createdFullstackDirectory.website
      })
    })
  }

  /* Replace in files */
  await loading('Replace template variables in files...', async () => {
    if (!createdFullstackDirectory.isFullstack) {
      if (onlyApi) {
        await templateAPI.replaceInFiles(createdDirectory, {
          projectName,
          projectDescription
        })
        return
      }

      await templateWebsite.replaceInFiles(createdDirectory, {
        projectName,
        projectDescription,
        domainName
      })
    } else {
      await templateAPI.replaceInFiles(createdFullstackDirectory.api, {
        projectName,
        projectDescription
      })
      await templateWebsite.replaceInFiles(createdFullstackDirectory.website, {
        projectName,
        projectDescription,
        domainName
      })
    }
  })

  /* Try git init */
  process.chdir(createdDirectory)
  if (tryGitInit(createdDirectory)) {
    console.log('Initialized a git repository.')
    console.log()
  }

  console.log(
    `\n ${chalk.green(
      'Success!'
    )} Created "${projectName}" at ${createdDirectory}`
  )
})
