import { application } from '../../../application'
import { postExample } from '../../../models/Post'
import { prismaMock } from '../../../__test__/setup'

describe('GET /posts', () => {
  it('should succeeds', async () => {
    prismaMock.post.findMany.mockResolvedValue([postExample])
    const response = await application.inject({
      method: 'GET',
      url: '/posts'
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.length).toEqual(1)
    expect(responseJson[0].id).toEqual(postExample.id)
    expect(responseJson[0].title).toEqual(postExample.title)
    expect(responseJson[0].content).toEqual(postExample.content)
  })
})
