import path from 'path'
import logSymbols from 'log-symbols'
import childProcess from 'child-process-promise'

import tryGitInit from '../utils/tryGitInit'
import { Template, commonConfigTemplatesPath } from './Template'
import { copyDirectory } from '../utils/copyDirectory'
import { loading } from '../utils/loading'
import makeDirectory from 'make-dir'

export interface ProjectOptions {
  template: Template
  projectPath: string
  noInstall: boolean
}

export class Project implements ProjectOptions {
  public template: Template
  public projectPath: string
  public noInstall: boolean

  constructor (options: ProjectOptions) {
    this.template = options.template
    this.projectPath = options.projectPath
    this.noInstall = options.noInstall
  }

  public async create (): Promise<void> {
    await this.copyFiles()
    process.chdir(this.projectPath)
    this.tryGitInit()
    if (!this.noInstall) {
      await this.installPackages()
    }
  }

  private async copyFiles (): Promise<void> {
    await loading(
      `Copy the files from the template called : ${this.template.name}.`,
      async () => {
        await makeDirectory(this.projectPath)
        await copyDirectory(commonConfigTemplatesPath, this.projectPath)
        await copyDirectory(
          path.join(this.template.path, 'template'),
          this.projectPath
        )
      }
    )
  }

  private async installPackages (): Promise<void> {
    await loading(
      'Installing npm packages. This might take a couple of minutes.',
      async () => {
        await childProcess.exec('npm install', {
          cwd: this.projectPath
        })
      }
    )
  }

  private tryGitInit (): void {
    if (tryGitInit(this.projectPath)) {
      console.log(logSymbols.success, 'Initialized a git repository.')
    }
  }
}
