import chalk from 'chalk'
import path from 'path'
import { Command, Option } from 'clipanion'
import inquirer from 'inquirer'

import validateNpmName from '../utils/validateNpmName'
import { checkFileExists } from '../utils/checkFileExists'
import { copyDirectory } from '../utils/copyDirectory'
import { getQuestions, QuestionsAnswers } from '../services/Question'
import makeDirectory from 'make-dir'
import { getTemplate, commonTemplatesPath } from '../services/Template'
import { Project } from '../services/Project'

const CURRENT_DIRECTORY = process.cwd()

export class CreateFullstackAppCommand extends Command {
  static usage = {
    description:
      'Create Fullstack TypeScript application with ease.'
  }

  public directoryName = Option.String()

  public onlyWebsite = Option.Boolean('--only-website', false, {
    description: 'Generate only a website project.'
  })

  public onlyAPI = Option.Boolean('--only-api', false, {
    description: 'Generate only an API project.'
  })

  public noInstall = Option.Boolean('--no-install', false, {
    description:
      'It avoids the installation of npm packages inside `node_modules`.'
  })

  public github = Option.Boolean('--github', false, {
    description:
      'It creates a `.github` folder that contains issues templates, pull request templates and configurations for GitHub Actions.'
  })

  async execute (): Promise<number> {
    if (this.onlyAPI && this.onlyWebsite) {
      this.context.stderr.write(
        `${chalk.red(
          "You can't set both --only-api and --only-website options."
        )}\n`
      )
      return 1
    }
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
    const questions = await getQuestions(this.onlyAPI, this.onlyWebsite)
    const answers = (await inquirer.prompt(questions)) as QuestionsAnswers
    this.context.stdout.write('\n')
    await makeDirectory(projectDirectory)
    await copyDirectory(commonTemplatesPath, projectDirectory)
    if (this.onlyAPI) {
      const templateAPI = await getTemplate({
        type: 'api',
        name: answers.templateAPI
      })
      const projectAPI = new Project({
        template: templateAPI,
        projectPath: projectDirectory,
        noInstall: this.noInstall,
        shouldCreateGitHubFolder: this.github
      })
      await projectAPI.create()
    } else if (this.onlyWebsite) {
      const templateWebsite = await getTemplate({
        type: 'website',
        name: answers.templateWebsite
      })
      const projectWebsite = new Project({
        template: templateWebsite,
        projectPath: projectDirectory,
        noInstall: this.noInstall,
        shouldCreateGitHubFolder: this.github
      })
      await projectWebsite.create()
    } else {
      const pathAPI = path.join(projectDirectory, 'api')
      const pathWebsite = path.join(projectDirectory, 'website')
      await makeDirectory(projectDirectory)
      const templateAPI = await getTemplate({
        type: 'api',
        name: answers.templateAPI
      })
      const projectAPI = new Project({
        template: templateAPI,
        projectPath: pathAPI,
        noInstall: this.noInstall,
        shouldCreateGitHubFolder: this.github
      })
      const templateWebsite = await getTemplate({
        type: 'website',
        name: answers.templateWebsite
      })
      const projectWebsite = new Project({
        template: templateWebsite,
        projectPath: pathWebsite,
        noInstall: this.noInstall,
        shouldCreateGitHubFolder: this.github
      })
      await projectWebsite.create()
      await projectAPI.create()
    }
    this.context.stdout.write(
      `${chalk.green(
        'Success:'
      )} created the new project at ${projectDirectory}\n`
    )
    return 0
  }
}
