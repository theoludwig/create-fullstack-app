#!/usr/bin/env node
import path from 'path'

import chalk from 'chalk'
import { Builtins, Cli } from 'clipanion'
import updateNotifier from 'update-notifier'
import readPackage from 'read-pkg'

import { CreateFullstackAppCommand } from './commands/CreateFullstackAppCommand'

const [, , ...args] = process.argv

const packageJSON = readPackage.sync({ cwd: path.join(__dirname, '..') })

async function main (): Promise<void> {
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
