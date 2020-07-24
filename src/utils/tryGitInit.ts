import { execSync } from 'child_process'
import path from 'path'
import rimraf from 'rimraf'

function isInGitRepository (): boolean {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch {}
  return false
}

function isInMercurialRepository (): boolean {
  try {
    execSync('hg --cwd . root', { stdio: 'ignore' })
    return true
  } catch {}
  return false
}

export default function tryGitInit (root: string): boolean {
  let didInit = false
  try {
    execSync('git --version', { stdio: 'ignore' })
    if (isInGitRepository() || isInMercurialRepository()) {
      return false
    }

    execSync('git init', { stdio: 'ignore' })
    didInit = true
    return true
  } catch {
    if (didInit) {
      try {
        rimraf.sync(path.join(root, '.git'))
      } catch {}
    }
    return false
  }
}
