import { filterBlank, lowerCase } from "../src/util";
import { test, expect } from "vitest";

test("Test filterBlank", () => {
  const str = "hello world";
  expect(filterBlank(str)).toBe("helloworld");
});

test("Test lowerCase", () => {
  const str = "hello world";
  expect(lowerCase(str)).toBe("hello world");
});
