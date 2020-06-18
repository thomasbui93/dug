const getPoemContent = require('../../src/services/poem/get_poem_content')

jest.mock('../../src/services/poem/get_poem_content', () => jest.fn())
const { poemQueueHandler } = require('../../src/jobs/poem')

describe('poemQueueHandler', () => {
  it('should call out crawler poem content', () => {
    poemQueueHandler({
      data: {
        searchKey: 'poemKey',
        links: ['www.google.com', 'www.yahoo.com'],
      },
    }).then(() => {
      expect(getPoemContent).toHaveBeenCalledTimes(2)
    })
  })
})
