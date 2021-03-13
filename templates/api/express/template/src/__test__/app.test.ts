import request from 'supertest'

import app from '../app'

describe('app', () => {
  it("returns a 404 on route that doesn't exist", async () => {
    return await request(app).post('/404routenotfound').send().expect(404)
  })
})
