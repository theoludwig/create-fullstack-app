import { application } from '../../../application'
import Post from '../../../models/Post'

describe('GET /posts', () => {
  it('should succeeds', async () => {
    const post = { title: 'Title', description: 'Description...' }
    await Post.create({ title: post.title, description: post.description })
    const response = await application.inject({
      method: 'GET',
      url: '/posts'
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(200)
    expect(responseJson.totalItems).toEqual(1)
    expect(responseJson.hasMore).toBeFalsy()
    expect(responseJson.page).toEqual(1)
    expect(responseJson.itemsPerPage).toEqual(20)
    expect(responseJson.rows.length).toEqual(1)
    expect(responseJson.rows[0].title).toEqual(post.title)
    expect(responseJson.rows[0].description).toEqual(post.description)
  })
})
