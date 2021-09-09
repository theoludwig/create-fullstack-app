import fsMock from 'mock-fs'

import { checkFileExists } from '../checkFileExists'

describe('utils/checkFileExists', () => {
  afterEach(async () => {
    fsMock.restore()
  })

  it('should return true if file exists', async () => {
    fsMock({
      '/source': {
        'default.png': ''
      }
    })
    expect(await checkFileExists('/source/default.png')).toBeTruthy()
  })

  it('should return false if file does not exist', async () => {
    fsMock({
      '/source': {
        'default.png': ''
      }
    })
    expect(await checkFileExists('/destination/default.png')).toBeFalsy()
  })
})
