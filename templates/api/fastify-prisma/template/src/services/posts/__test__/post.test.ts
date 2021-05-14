import { application } from '../../../application'
import { postExample } from '../../../models/Post'
import { prismaMock } from '../../../__test__/setup'

describe('POST /posts', () => {
  it('should succeeds', async () => {
    prismaMock.post.create.mockResolvedValue(postExample)
    const response = await application.inject({
      method: 'POST',
      url: '/posts',
      payload: postExample
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(201)
    expect(responseJson.title).toEqual(postExample.title)
    expect(responseJson.content).toEqual(postExample.content)
  })
})
