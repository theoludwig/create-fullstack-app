import path from 'path'
import * as fsWithCallbacks from 'fs'

import logSymbols from 'log-symbols'
import childProcess from 'child-process-promise'

import tryGitInit from '../utils/tryGitInit'
import {
  Template,
  commonConfigTemplatesPath,
  commondDockerTemplatesPath,
  commondGitHubTemplatesPath
} from './Template'
import { copyDirectory } from '../utils/copyDirectory'
import { loading } from '../utils/loading'
import makeDirectory from 'make-dir'

const fs = fsWithCallbacks.promises

export interface ProjectOptions {
  template: Template
  projectPath: string
  noInstall: boolean
  shouldCreateGitHubFolder: boolean
}

export class Project implements ProjectOptions {
  public template: Template
  public projectPath: string
  public noInstall: boolean
  public shouldCreateGitHubFolder: boolean

  constructor (options: ProjectOptions) {
    this.template = options.template
    this.projectPath = options.projectPath
    this.noInstall = options.noInstall
    this.shouldCreateGitHubFolder = options.shouldCreateGitHubFolder
  }

  public async create (): Promise<void> {
    await this.copyFiles()
    process.chdir(this.projectPath)
    this.tryGitInit()
    if (!this.noInstall) {
      await this.installPackages()
    }
    console.log('\n')
  }

  private async copyFiles (): Promise<void> {
    await loading(
      `Copy the files from the template called : ${this.template.name}.`,
      async () => {
        await makeDirectory(this.projectPath)
        await copyDirectory(commonConfigTemplatesPath, this.projectPath)
        if (this.shouldCreateGitHubFolder) {
          const githubFolderPath = path.join(this.projectPath, '.github')
          await makeDirectory(githubFolderPath)
          await copyDirectory(commondGitHubTemplatesPath, githubFolderPath)
        }
        await fs.copyFile(
          path.join(commondDockerTemplatesPath, 'Dockerfile'),
          path.join(this.projectPath, 'Dockerfile')
        )
        await fs.copyFile(
          path.join(
            commondDockerTemplatesPath,
            this.template.type,
            'docker-compose.yml'
          ),
          path.join(this.projectPath, 'docker-compose.yml')
        )
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
