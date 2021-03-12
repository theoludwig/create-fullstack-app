import fsMock from 'mock-fs'
import * as fsWithCallbacks from 'fs'

import { copyDirectory } from '../copyDirectory'

const fs = fsWithCallbacks.promises

describe('utils/copyDirectory', () => {
  it('copy the files', async () => {
    fsMock({
      '/source': {
        'default.png': '',
        'index.ts': '',
        '.npmignore': ''
      },
      '/destination': {}
    })

    let destinationDirectoryContent = await fs.readdir('/destination')
    let sourceDirectoryContent = await fs.readdir('/source')
    expect(destinationDirectoryContent.length).toEqual(0)
    expect(sourceDirectoryContent.length).toEqual(3)

    await copyDirectory('/source', '/destination')
    destinationDirectoryContent = await fs.readdir('/destination')
    sourceDirectoryContent = await fs.readdir('/source')
    expect(destinationDirectoryContent.length).toEqual(3)
    expect(sourceDirectoryContent.length).toEqual(3)
    expect(destinationDirectoryContent).toEqual(
      expect.arrayContaining(['default.png', 'index.ts', '.gitignore'])
    )
    expect(sourceDirectoryContent).toEqual(
      expect.arrayContaining(['default.png', 'index.ts', '.npmignore'])
    )
  })

  it('copy the files and folders recursively', async () => {
    fsMock({
      '/source': {
        'random-folder': {
          'default.png': '',
          'second-random-folder': {
            'mycode.ts': ''
          }
        },
        'index.ts': '',
        '.npmignore': ''
      },
      '/destination': {}
    })

    let destinationDirectoryContent = await fs.readdir('/destination')
    let sourceDirectoryContent = await fs.readdir('/source')
    let randomFolderContent = await fs.readdir('/source/random-folder')
    let secondRandomFolderContent = await fs.readdir(
      '/source/random-folder/second-random-folder'
    )
    expect(randomFolderContent.length).toEqual(2)
    expect(secondRandomFolderContent.length).toEqual(1)
    expect(destinationDirectoryContent.length).toEqual(0)
    expect(sourceDirectoryContent.length).toEqual(3)

    await copyDirectory('/source', '/destination')
    destinationDirectoryContent = await fs.readdir('/destination')
    sourceDirectoryContent = await fs.readdir('/source')
    randomFolderContent = await fs.readdir('/destination/random-folder')
    secondRandomFolderContent = await fs.readdir(
      '/destination/random-folder/second-random-folder'
    )
    expect(destinationDirectoryContent.length).toEqual(3)
    expect(sourceDirectoryContent.length).toEqual(3)
    expect(destinationDirectoryContent).toEqual(
      expect.arrayContaining(['random-folder', 'index.ts', '.gitignore'])
    )
    expect(sourceDirectoryContent).toEqual(
      expect.arrayContaining(['random-folder', 'index.ts', '.npmignore'])
    )
    expect(randomFolderContent.length).toEqual(2)
    expect(secondRandomFolderContent.length).toEqual(1)
    expect(randomFolderContent).toEqual(
      expect.arrayContaining(['default.png', 'second-random-folder'])
    )
    expect(secondRandomFolderContent).toEqual(
      expect.arrayContaining(['mycode.ts'])
    )
  })
})
