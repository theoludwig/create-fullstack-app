import fs from 'fs';
import path from 'path';

function copyDirPromise(source: string, destination: string) {
    return new Promise((next) => {
        const filesToCreate = fs.readdirSync(source);
        filesToCreate.forEach(async (file) => {
            const originalFilePath = path.join(source, file);
            const stats = fs.statSync(originalFilePath);

            if (stats.isFile()) {
                const contents = fs.readFileSync(originalFilePath, "utf8");
                if (file === '.npmignore') file = '.gitignore';
                const writePath = path.join(destination, file);
                fs.writeFileSync(writePath, contents, "utf8");
            } else if (stats.isDirectory()) {
                fs.mkdirSync(path.join(destination, file));
                await copyDirPromise(path.join(source, file), path.join(destination, file));
            }
        });
        next();
    });
}

export default copyDirPromise;