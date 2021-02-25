#!/usr/bin/env node
import chalk from 'chalk'
import { Builtins, Cli } from 'clipanion'
import updateNotifier from 'update-notifier'

import { getPackageJSON } from './utils/getPackageJSON'
import { CreateFullstackAppCommand } from './CreateFullstackAppCommand'

const [, , ...args] = process.argv

// TODO: Read dynamically the templates availables with folder and read json file

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
