import { application } from '../../../application'

describe('POST /posts', () => {
  it('should succeeds', async () => {
    const post = { title: 'Title', description: 'Description...' }
    const response = await application.inject({
      method: 'POST',
      url: '/posts',
      payload: post
    })
    const responseJson = response.json()
    expect(response.statusCode).toEqual(201)
    expect(responseJson.title).toEqual(post.title)
    expect(responseJson.description).toEqual(post.description)
  })
})
