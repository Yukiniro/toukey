import { filterBlank, lowerCase } from "../src/util";
import { test, expect } from "vitest";

test("Test filterBlank", () => {
  expect(filterBlank("hello world")).toBe("helloworld");
  expect(filterBlank("   hello world")).toBe("helloworld");
  expect(filterBlank("hello  world   ")).toBe("helloworld");
});

test("Test lowerCase", () => {
  expect(lowerCase("hello world")).toBe("hello world");
  expect(lowerCase("Hello world")).toBe("hello world");
  expect(lowerCase("hello World")).toBe("hello world");
  expect(lowerCase("HELLO WORLD")).toBe("hello world");
});
