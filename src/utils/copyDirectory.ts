import fs from 'fs'
import path from 'path'

function copyDirectory (source: string, destination: string) {
  return new Promise(resolve => {
    const filesToCreate = fs.readdirSync(source)
    filesToCreate.forEach(async file => {
      const originalFilePath = path.join(source, file)
      const stats = fs.statSync(originalFilePath)
      if (stats.isFile()) {
        if (file === '.npmignore') file = '.gitignore'
        const writePath = path.join(destination, file)
        fs.copyFileSync(originalFilePath, writePath)
      } else if (stats.isDirectory()) {
        fs.mkdirSync(path.join(destination, file))
        await copyDirectory(
          path.join(source, file),
          path.join(destination, file)
        )
      }
    })
    resolve()
  })
}

export default copyDirectory
