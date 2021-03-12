import logSymbols from 'log-symbols'
import childProcess from 'child-process-promise'

import tryGitInit from '../utils/tryGitInit'
import { Template } from './Template'
import { copyDirectory } from '../utils/copyDirectory'
import { loading } from '../utils/loading'
import makeDirectory from 'make-dir'

export interface ProjectOptions {
  template: Template
  projectPath: string
}

export class Project implements ProjectOptions {
  public template: Template
  public projectPath: string

  constructor (options: ProjectOptions) {
    this.template = options.template
    this.projectPath = options.projectPath
  }

  public async copyFiles (): Promise<void> {
    await loading(`Copy ${this.template.name} files.`, async () => {
      await makeDirectory(this.projectPath)
      await copyDirectory(this.template.path, this.projectPath)
    })
  }

  public async installPackages (): Promise<void> {
    await loading(
      'Installing npm packages. This might take a couple of minutes.',
      async () => {
        const dependencies = this.template.dependencies.join(' ')
        const devDependencies = this.template.devDependencies.join(' ')
        await childProcess.exec(`npm install ${dependencies}`, {
          cwd: this.projectPath
        })
        await childProcess.exec(`npm install --save-dev ${devDependencies}`, {
          cwd: this.projectPath
        })
      }
    )
  }

  public tryGitInit (): void {
    process.chdir(this.projectPath)
    if (tryGitInit(this.projectPath)) {
      console.log(logSymbols.success, 'Initialized a git repository.')
    }
  }
}
