import { replaceInFile } from 'replace-in-file';
import path from "path";

interface ReplaceFilesObject {
    projectName: string;
}

function manageReplaceInFiles({ projectName }: ReplaceFilesObject, createdTemplatePathDirectory: string) {
    async function replaceAppName() {
        await replaceInFile({
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



export default manageReplaceInFiles;