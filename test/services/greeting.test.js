const greetingService = require("../../src/services/greeting");
const MockDate = require('mockdate');

test("it would say hello to you!", () => {
  expect(typeof greetingService().greeter).toBe("string");
});

test("saying good morning when it's morning", () => {
  MockDate.set(new Date(2020, 11, 1, 8, 0, 0))
  expect(greetingService().greeter).toBe("Good morning!")
  MockDate.reset()
})

test("saying noon time when it's noon", () => {
  MockDate.set(new Date(2020, 11, 1, 12, 0, 0))
  expect(greetingService().greeter).toBe("It's noon time!")
  MockDate.reset()
})

test("saying good afternoon when it's afternoon", () => {
  MockDate.set(new Date(2020, 11, 1, 14, 0, 0))
  expect(greetingService().greeter).toBe("Good afternoon!")
  MockDate.reset()
})

test("saying good evening when it's evening", () => {
  MockDate.set(new Date(2020, 11, 1, 18, 0, 0))
  expect(greetingService().greeter).toMatch(/Good evening!/)
  MockDate.reset()
})
