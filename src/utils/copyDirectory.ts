import * as fsWithCallbacks from 'fs'
import path from 'path'

const fs = fsWithCallbacks.promises

async function copyDirectory (
  source: string,
  destination: string
): Promise<void> {
  const filesToCreate = await fs.readdir(source)
  for (let file of filesToCreate) {
    const originalFilePath = path.join(source, file)
    const stats = await fs.stat(originalFilePath)
    if (stats.isFile()) {
      if (file === '.npmignore') {
        file = '.gitignore'
      }
      const writePath = path.join(destination, file)
      await fs.copyFile(originalFilePath, writePath)
    } else if (stats.isDirectory()) {
      await fs.mkdir(path.join(destination, file))
      await copyDirectory(path.join(source, file), path.join(destination, file))
    }
  }
}

export default copyDirectory
