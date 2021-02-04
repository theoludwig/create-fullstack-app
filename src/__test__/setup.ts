import fsMock from 'mock-fs'

afterEach(async () => {
  fsMock.restore()
})
