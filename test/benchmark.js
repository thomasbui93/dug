const autocannon = require('autocannon')
const app = require('../src/app')

const port = process.env.PORT

const server = app.listen(port, () => {
  const url = `http://localhost:${port}/api/poem`

  autocannon({
    url,
    connections: 1000,
    duration: 10,
  }, (err, res) => {
    if (err) {
      console.log('Benchmark failed: ', err)
    }
    console.log('Finished batch of benchmark.', res)
    server.close()
  })
})
