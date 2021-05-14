import { application } from '../../../../application'
import { postExample } from '../../../../models/Post'
import { prismaMock } from '../../../../__test__/setup'

describe('PUT /posts/:postId', () => {
  it('should only edit the title', async () => {
    const updatedPost = { ...postExample }
    updatedPost.title = 'Title edited'
    prismaMock.post.findUnique.mockResolvedValue(postExample)
    prismaMock.post.update.mockResolvedValue(updatedPost)
    const response = await application.inject({
      method: 'PUT',
      url: `/posts/${postExample.id}`,
      payload: { title: updatedPost.title }
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.title).toEqual(updatedPost.title)
    expect(responseJson.content).toEqual(postExample.content)
  })

  it('should only edit the content', async () => {
    const updatedPost = { ...postExample }
    updatedPost.content = 'Content edited'
    prismaMock.post.findUnique.mockResolvedValue(postExample)
    prismaMock.post.update.mockResolvedValue(updatedPost)
    const response = await application.inject({
      method: 'PUT',
      url: `/posts/${postExample.id}`,
      payload: { content: updatedPost.content }
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.title).toEqual(postExample.title)
    expect(responseJson.content).toEqual(updatedPost.content)
  })

  it("fails if the post doesn't exist", async () => {
    prismaMock.post.findUnique.mockResolvedValue(null)
    const response = await application.inject({
      method: 'PUT',
      url: '/posts/5',
      payload: { title: 'new title' }
    })
    expect(response.statusCode).toEqual(404)
  })
})
