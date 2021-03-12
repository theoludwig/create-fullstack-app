import chalk from 'chalk'
import path from 'path'
import { Command, Option } from 'clipanion'
import inquirer from 'inquirer'

import validateNpmName from '../utils/validateNpmName'
import { checkFileExists } from '../utils/checkFileExists'
import { getQuestions, QuestionsAnswers } from '../services/Question'
import makeDirectory from 'make-dir'

const CURRENT_DIRECTORY = process.cwd()

export class CreateFullstackAppCommand extends Command {
  public directoryName = Option.String()

  public onlyWebsite = Option.Boolean('--only-website', false, {
    description: 'generate only a website project'
  })

  public onlyAPI = Option.Boolean('--only-api', false, {
    description: 'generate only an API project'
  })

  async execute (): Promise<number> {
    if (this.onlyAPI && this.onlyWebsite) {
      this.context.stderr.write(
        `${chalk.red(
          "You can't set both --onlyAPI and --onlyWebsite flags."
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
    const answers = (await inquirer.prompt(
      await getQuestions(this.onlyAPI, this.onlyWebsite)
    )) as QuestionsAnswers
    await makeDirectory(projectDirectory)
    this.context.stdout.write(
      `\n ${chalk.green('Success:')} created "${
        answers.projectName
      }" at ${projectDirectory}`
    )
    return 0
  }
}
