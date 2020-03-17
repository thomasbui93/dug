const request = require('supertest')
const app = require('../../src/app')

describe('/z/check endpoint', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/z/check')
    expect(response.statusCode).toBe(200)
    expect(response.ok).toBe(true)
  })
})
