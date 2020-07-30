// import fs from 'fs'

import * as fsWithCallbacks from 'fs'
import path from 'path'

const fs = fsWithCallbacks.promises

/**
 * Delete Files by name (without taking into account the extension)
 */
async function deleteFilesByName (
  filesNameToRemove: string,
  directoyPath: string
): Promise<void> {
  const filesName = await fs.readdir(path.resolve(directoyPath))
  for (const name of filesName) {
    const splitedName = name.split('.')
    if (splitedName.length === 2) {
      const fileName = splitedName[0]
      if (fileName === filesNameToRemove && name !== 'default.png') {
        await fs.unlink(path.join(directoyPath, name))
      }
    }
  }
}

export default deleteFilesByName
