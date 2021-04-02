import { application } from '../../../../application'
import Post from '../../../../models/Post'

describe('DELETE /posts/:postId', () => {
  it('should succeeds', async () => {
    const postToCreate = { title: 'Title', description: 'Description...' }
    const postToDelete = await Post.create({
      title: postToCreate.title,
      description: postToCreate.description
    })
    const response = await application.inject({
      method: 'DELETE',
      url: `/posts/${postToDelete.id}`
    })
    const responseJson = response.json()
    const posts = await Post.findAll()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.title).toEqual(postToCreate.title)
    expect(responseJson.description).toEqual(postToCreate.description)
    expect(posts.length).toEqual(0)
  })

  it("fails if the post doesn't exist", async () => {
    const response = await application.inject({
      method: 'DELETE',
      url: '/posts/5'
    })
    expect(response.statusCode).toEqual(404)
  })
})
