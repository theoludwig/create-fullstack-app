import { application } from '../../../application'

describe('GET /hello', () => {
  it('should succeeds', async () => {
    const response = await application.inject({
      method: 'GET',
      url: '/hello'
    })
    expect(response.statusCode).toEqual(200)
    expect(response.json().hello).toEqual('world')
  })
})
