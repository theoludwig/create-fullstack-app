import fs from "fs";
import path from "path";

/**
 * Delete Files by name (without taking into account the extension)
 */
function deleteFilesByName(
    filesNameToRemove: string,
    directoyPath: string
): Promise<void> {
    return new Promise((next) => {
        fs.readdir(path.resolve(directoyPath), (_error, fileNames) => {
            for (const name of fileNames) {
                const splitedName = name.split(".");
                if (splitedName.length === 2) {
                    const fileName = splitedName[0];
                    if (
                        fileName === filesNameToRemove &&
                        name !== "default.png"
                    ) {
                        fs.unlinkSync(path.join(directoyPath, name));
                    }
                }
            }
            return next();
        });
    });
}

export default deleteFilesByName;
