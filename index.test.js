const generator = require("./index.js");

test("Generates random date between 20 and 30", () => {
  let date = generator.randomDateOfBirth(20, 30);

  let now = new Date().getFullYear();

  let age = now - date.getFullYear();
  expect(age).toBeLessThanOrEqual(30);
  expect(age).toBeGreaterThanOrEqual(20);
});
test("Generates random date between 40 and 40", () => {
  let date = generator.randomDateOfBirth(40, 40);

  let now = new Date().getFullYear();

  let age = now - date.getFullYear();
  expect(age).toBe(40);
});

test("Validates nnin", () => {
  expect(generator.isValid("12129013131")).toBe(true);
});

test("Generated nnin should validate", () => {
  let nnin = generator.generate();
  console.log("generated nnin is", nnin);
  expect(generator.isValid(nnin)).toBe(true);
});
