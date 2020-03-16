const greetingService = require("../../src/services/greeting");

test("it would say hello to you!", () => {
  expect(typeof greetingService()).toBe("string");
});

test("saying good morning when it's morning", () => {
  expect(greetingService()).toBe("Good morning!")
})