#!/usr/bin/env node
const chalk           = require("chalk");
const ora             = require('ora');
const path            = require("path");
const inquirer        = require("inquirer");
const Commander       = require("commander");
const makeDir         = require("make-dir");
const directoryExists = require("directory-exists");

const packageJson       = require("./package.json");
const validateNpmName   = require("./utils/validate-package");
const copyDirPromise    = require("./utils/copyDirPromise");
const installPackages   = require('./utils/installPackages');
const replaceInFiles    = require('./replaceInFiles');
const CURRENT_DIRECTORY = process.cwd();
const TEMPLATE_PATH     = path.join(__dirname, "template");

let projectDirectory;
const program = new Commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments("[project-directory]")
    .usage(`${chalk.green("[project-directory]")}`)
    .action((name) => {
        projectDirectory = name;
    })
    .allowUnknownOption()
    .parse(process.argv);

if (!projectDirectory || typeof projectDirectory !== 'string') {
    console.log();
    console.log("Please specify the project directory:");
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green("[project-directory]")}`
    );
    console.log();
    console.log("For example:");
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green("my-fullstack-app")}`
    );
    console.log();
    console.log(
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
}

projectDirectory = projectDirectory.trim();
const validationDirectory = validateNpmName(projectDirectory);
if (!validationDirectory.valid) {
    console.log(chalk.red("Invalid directory name: ") + validationDirectory.problems[0]);
}

const QUESTIONS = [
    {
        name: "projectName",
        type: "input",
        message: "Project name:"
    }
];

inquirer.prompt(QUESTIONS).then(async (answers) => {
    console.log();
    const { projectName } = answers;
    const folderToCreatePath = path.join(CURRENT_DIRECTORY, projectDirectory);

    if (directoryExists.sync(folderToCreatePath)) {
        console.error(
            `Could not create a project called "${chalk.red(
                projectDirectory
            )}" because the folder name already exists...`
        );
        process.exit(1);
    }

    // Copy files
    const spinnerFiles = ora({ text: "Copy files...", spinner: 'dots', color: 'cyan' }).start();
    const createdTemplatePathDirectory = await makeDir(folderToCreatePath);
    await copyDirPromise(TEMPLATE_PATH, createdTemplatePathDirectory);
    spinnerFiles.succeed();

    // Install NPM packages...
    await installPackages(path.join(createdTemplatePathDirectory, 'website'), 'Installing "website" npm packages...');
    await installPackages(path.join(createdTemplatePathDirectory, 'api'), 'Installing "api" npm packages...');

    // Replace files 
    const spinnerReplaceFiles = ora({ text: "Replace template variables in files...", spinner: 'dots', color: 'cyan' }).start();
    await replaceInFiles({ projectName }, createdTemplatePathDirectory);
    spinnerReplaceFiles.succeed();

    console.log(
        `\n ${chalk.green(
            "Success!"
        )} Created "${projectName}" at ${createdTemplatePathDirectory}`
    );
});
