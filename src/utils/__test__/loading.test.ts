import { loading } from '../loading'

const wait = async (ms: number): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe('utils/loading', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
  })

  it('prints a loader', async () => {
    await loading('test', async () => {
      await wait(100)
    })
  })
})
