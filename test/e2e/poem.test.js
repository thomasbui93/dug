const request = require('supertest')
const app = require('../../src/app')

describe('/api/poem endpoint', () => {
  test('It should response the GET method without query', async () => {
    const response = await request(app).get('/api/poem')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      poem: expect.any(Array),
      link: expect.any(String),
    }))
  }, 10000)

  test('It should response the GET method with query parameters', async () => {
    const response = await request(app).get('/api/poem?author=Nguy%E1%BB%85n%20Tr%C3%A3i')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(expect.objectContaining({
      poem: expect.any(Array),
      link: expect.any(String),
    }))
  }, 10000)

  test('It should response the GET method with invalid query parameters', async () => {
    const response = await request(app).get('/api/poem?author=adbc')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      poem: [],
      link: false,
    })
  }, 10000)
})
