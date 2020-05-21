const childProcess = require("child-process-promise");
const ora          = require('ora');

/**
 * Run npm install on a specified path
 * @param {string} path 
 * @param {string} text 
 */
async function installPackages(path, text) {
    const spinnerPackages = ora({ text, spinner: 'dots', color: 'cyan' }).start();
    await childProcess.exec("npm install", { cwd: path });
    spinnerPackages.succeed();
}

module.exports = installPackages;