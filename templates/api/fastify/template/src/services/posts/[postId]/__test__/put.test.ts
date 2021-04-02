import { application } from '../../../../application'
import Post from '../../../../models/Post'

describe('PUT /posts/:postId', () => {
  it('should only edit the title', async () => {
    const postEdited = { title: 'new title' }
    const postToEdit = await Post.create({
      title: 'Title',
      description: 'Description'
    })
    const response = await application.inject({
      method: 'PUT',
      url: `/posts/${postToEdit.id}`,
      payload: postEdited
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.title).toEqual(postEdited.title)
    expect(responseJson.description).toEqual(postToEdit.description)
  })

  it('should only edit the description', async () => {
    const postEdited = { description: 'new description' }
    const postToEdit = await Post.create({
      title: 'Title',
      description: 'Description'
    })
    const response = await application.inject({
      method: 'PUT',
      url: `/posts/${postToEdit.id}`,
      payload: postEdited
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.title).toEqual(postToEdit.title)
    expect(responseJson.description).toEqual(postEdited.description)
  })

  it("fails if the post doesn't exist", async () => {
    const response = await application.inject({
      method: 'PUT',
      url: '/posts/5',
      payload: { title: 'new title' }
    })
    expect(response.statusCode).toEqual(404)
  })
})
