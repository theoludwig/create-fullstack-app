import chalk from 'chalk'
import path from 'path'
import { Builtins, Cli, Command, Option } from 'clipanion'
import updateNotifier from 'update-notifier'

import { getPackageJSON } from './utils/getPackageJSON'
import validateNpmName from './utils/validateNpmName'
import { checkFileExists } from './utils/checkFileExists'

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

    return 0
  }
}

async function main (): Promise<void> {
  const packageJSON = await getPackageJSON()
  const cli = new Cli({
    binaryLabel: packageJSON.name,
    binaryName: `${packageJSON.name}`,
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
