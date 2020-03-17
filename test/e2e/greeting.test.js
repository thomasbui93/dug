const request = require('supertest')
const app = require('../../src/app')

describe('/api/greeting endpoint', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/api/greeting')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      greeter: expect.any(String),
    }))
  })
})
