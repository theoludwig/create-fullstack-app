#!/usr/bin/env node
import chalk from 'chalk'
import path from 'path'
import logSymbols from 'log-symbols'
import childProcess from 'child-process-promise'
import { Builtins, Cli, Command, Option } from 'clipanion'
import updateNotifier from 'update-notifier'
import makeDir from 'make-dir'
import inquirer from 'inquirer'

import { getPackageJSON } from './utils/getPackageJSON'
import validateNpmName from './utils/validateNpmName'
import copyDirectory from './utils/copyDirectory'
import { loading } from './utils/loading'
import tryGitInit from './utils/tryGitInit'
import { checkFileExists } from './utils/checkFileExists'
import { getQuestions } from './constants/question'
import { TEMPLATE_COMMON_PATH } from './constants/templateChoices'
import { QuestionsAnswers, TemplateAPI, TemplateWebsite } from './typings/utils'

const CURRENT_DIRECTORY = process.cwd()

const [, , ...args] = process.argv

export class CreateFullstackAppCommand extends Command {
  public directoryName = Option.String()

  public onlyWebsite = Option.Boolean('--only-website', false, {
    description: 'generate only a website project'
  })

  public onlyAPI = Option.Boolean('--only-api', false, {
    description: 'generate only an API project'
  })

  async execute (): Promise<number> {
    const validationDirectory = validateNpmName(this.directoryName)
    if (!validationDirectory.isValid) {
      this.context.stderr.write(
        `${chalk.red('Invalid directory name:')} ${
          validationDirectory.problem
        }\n`
      )
      return 1
    }

    const projectDirectory = path.join(CURRENT_DIRECTORY, this.directoryName)

    if (await checkFileExists(projectDirectory)) {
      this.context.stderr.write(
        `Could not create a project called "${chalk.red(
          this.directoryName
        )}" because the folder name already exists...\n`
      )
      return 1
    }

    const answers = await inquirer.prompt(
      getQuestions(this.onlyAPI, this.onlyWebsite)
    )
    const {
      templateWebsite,
      templateAPI,
      projectName
    } = answers as QuestionsAnswers

    const createdProject = await this.copyFiles({
      templateAPI,
      templateWebsite
    })
    await this.installPackages({
      templateAPI,
      templateWebsite,
      createdProject
    })
    this.tryGitInit(createdProject)

    console.log(
      `\n ${chalk.green('Success:')} created "${projectName}" at ${
        createdProject.rootPath
      }`
    )

    return 0
  }

  private async copyFiles ({
    templateAPI,
    templateWebsite
  }: {
    templateAPI: TemplateAPI
    templateWebsite: TemplateWebsite
  }): Promise<{
      website: string
      api: string
      rootPath: string
      isFullstack: boolean
    }> {
    const createdProject = {
      website: '',
      api: '',
      rootPath: '',
      isFullstack: false
    }
    await loading('Copy files.', async () => {
      const projectDirectory = path.join(CURRENT_DIRECTORY, this.directoryName)
      createdProject.rootPath = await makeDir(projectDirectory)
      await copyDirectory(TEMPLATE_COMMON_PATH, createdProject.rootPath)

      if (this.onlyAPI) {
        createdProject.api = createdProject.rootPath
        await copyDirectory(templateAPI.path, createdProject.rootPath)
        return
      }

      if (this.onlyWebsite) {
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
    return createdProject
  }

  private async installPackages ({
    templateAPI,
    templateWebsite,
    createdProject
  }: {
    templateAPI: TemplateAPI
    templateWebsite: TemplateWebsite
    createdProject: {
      website: string
      api: string
      rootPath: string
      isFullstack: boolean
    }
  }): Promise<void> {
    await loading(
      'Installing npm packages. This might take a couple of minutes.',
      async () => {
        if (createdProject.api !== '') {
          const dependencies = templateAPI.dependencies.join(' ')
          const devDependencies = templateAPI.devDependencies.join(' ')
          await childProcess.exec(`npm install ${dependencies}`, {
            cwd: createdProject.api
          })
          await childProcess.exec(`npm install --save-dev ${devDependencies}`, {
            cwd: createdProject.api
          })
        }

        if (createdProject.website !== '') {
          const dependencies = templateWebsite.dependencies.join(' ')
          const devDependencies = templateWebsite.devDependencies.join(' ')
          await childProcess.exec(`npm install ${dependencies}`, {
            cwd: createdProject.website
          })
          await childProcess.exec(`npm install --save-dev ${devDependencies}`, {
            cwd: createdProject.website
          })
        }
      }
    )
  }

  private tryGitInit (createdProject: {
    website: string
    api: string
    rootPath: string
    isFullstack: boolean
  }): void {
    process.chdir(createdProject.rootPath)
    if (tryGitInit(createdProject.rootPath)) {
      console.log(logSymbols.success, 'Initialized a git repository.')
    }
  }
}

async function main (): Promise<void> {
  const packageJSON = await getPackageJSON()
  const cli = new Cli({
    binaryLabel: packageJSON.name,
    binaryName: packageJSON.name,
    binaryVersion: packageJSON.version
  })
  cli.register(CreateFullstackAppCommand)
  cli.register(Builtins.HelpCommand)
  cli.register(Builtins.VersionCommand)
  updateNotifier({ pkg: packageJSON }).notify()
  await cli.runExit(args, Cli.defaultContext)
}

main().catch(() => {
  console.error(chalk.red('Error occurred...'))
  process.exit(1)
})
