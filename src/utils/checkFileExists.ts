import * as fsWithCallbacks from 'fs'

const fs = fsWithCallbacks.promises

export async function checkFileExists (path: string): Promise<boolean> {
  return await fs
    .access(path, fsWithCallbacks.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}
