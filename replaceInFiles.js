const replace = require('replace-in-file');
const path    = require("path");

function manageReplaceInFiles({ projectName }, createdTemplatePathDirectory) {
    async function replaceAppName() {
        await replace({
            files : path.join(createdTemplatePathDirectory, 'README.md'),
            from: '{{ projectName }}',
            to:  projectName
        });
    }

    return new Promise(async (next) => {
        await replaceAppName();
        next();
    }); 
}



module.exports = manageReplaceInFiles;