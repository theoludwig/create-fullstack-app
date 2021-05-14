import { application } from '../../../../application'
import { postExample } from '../../../../models/Post'
import { prismaMock } from '../../../../__test__/setup'

describe('DELETE /posts/:postId', () => {
  it('should succeeds', async () => {
    prismaMock.post.findUnique.mockResolvedValue(postExample)
    prismaMock.post.delete.mockResolvedValue(postExample)
    const response = await application.inject({
      method: 'DELETE',
      url: `/posts/${postExample.id}`
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.id).toEqual(postExample.id)
    expect(responseJson.title).toEqual(postExample.title)
    expect(responseJson.content).toEqual(postExample.content)
  })

  it("fails if the post doesn't exist", async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
    const response = await application.inject({
      method: 'DELETE',
      url: '/posts/5'
    })
    expect(response.statusCode).toEqual(404)
  })
})
