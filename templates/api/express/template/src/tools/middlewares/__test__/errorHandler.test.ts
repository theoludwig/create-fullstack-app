import { NotFoundError } from '../../errors/NotFoundError'
import { errorHandler } from '../errorHandler'

const mockRes = (): any => {
  const res: any = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('/tools/middlewares/errorHandler', () => {
  it('should send 500 error if not custom error', () => {
    const mockedRes = mockRes()
    errorHandler(new Error('random error'), {} as any, mockedRes, () => {})
    expect(mockedRes.json).toHaveBeenCalledWith({
      errors: [{ message: 'Internal server error' }]
    })
    expect(mockedRes.status).toHaveBeenCalledWith(500)
  })

  it('should send 404 error if NotFoundError', () => {
    const mockedRes = mockRes()
    errorHandler(new NotFoundError(), {} as any, mockedRes, () => {})
    expect(mockedRes.json).toHaveBeenCalledWith({
      errors: [{ message: 'Not Found' }]
    })
    expect(mockedRes.status).toHaveBeenCalledWith(404)
  })

  it('should call console.error in developement', () => {
    const consoleErrorOriginal = console.error
    process.env.NODE_ENV = 'development'
    console.error = jest.fn()
    errorHandler(new NotFoundError(), {} as any, mockRes(), () => {})
    expect(console.error).toHaveBeenCalled()
    process.env.NODE_ENV = 'test'
    console.error = consoleErrorOriginal
  })
})
