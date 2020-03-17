const MockDate = require('mockdate');
const greeter = require('../../src/services/greeting/time_greeter');

test('it would say hello to you!', () => {
  expect(typeof greeter()).toBe('string');
});

describe('Greeting depends on time of the day', () => {
  afterEach(() => {
    MockDate.reset()
  })

  test("saying good morning when it's morning", () => {
    MockDate.set(new Date(2020, 11, 1, 8, 0, 0))
    expect(greeter()).toBe('Good morning!')
  })

  test("saying noon time when it's noon", () => {
    MockDate.set(new Date(2020, 11, 1, 12, 0, 0))
    expect(greeter()).toBe("It's noon time!")
  })

  test("saying good afternoon when it's afternoon", () => {
    MockDate.set(new Date(2020, 11, 1, 14, 0, 0))
    expect(greeter()).toBe('Good afternoon!')
  })

  test("saying good evening when it's evening", () => {
    MockDate.set(new Date(2020, 11, 1, 18, 0, 0))
    expect(greeter()).toMatch(/Good evening!/)
  })
})
