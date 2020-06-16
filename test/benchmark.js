const autocannon = require('autocannon')
const setup = require('../src/app')

const init = async () => {
  const port = process.env.PORT
  const app = await setup()
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
}

init()
