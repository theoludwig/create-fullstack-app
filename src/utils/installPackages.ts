import childProcess from 'child-process-promise'
import ora from 'ora'

/**
 * Run npm install on a specified path
 * @param {string} path
 * @param {string} text
 */
async function installPackages (path: string, text: string) {
  const spinnerPackages = ora({
    text,
    spinner: 'dots',
    color: 'cyan'
  }).start()
  await childProcess.exec('npm install', { cwd: path })
  spinnerPackages.succeed()
}

export default installPackages
