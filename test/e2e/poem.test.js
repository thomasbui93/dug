const request = require('supertest')
const app = require('../../src/app')

describe('/api/poem endpoint', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/api/poem')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      poem: expect.any(Array),
      link: expect.any(String),
    }))
  }, 10000)
})
