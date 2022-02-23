import { isString, isFunction, isObject, isUndefined, removeFromArray, filterBlank, lowerCase } from "../src/util";

test("Test isString", () => {
  expect(isString('hello world')).toBe(true);
  expect(isString(1)).toBe(false);
  expect(isString(true)).toBe(false);
  expect(isString({})).toBe(false);
  expect(isString([])).toBe(false);
  expect(isString(null)).toBe(false);
  expect(isString(() => {})).toBe(false);
  expect(isString(undefined)).toBe(false);
});

test("Test isFunction", () => {
  expect(isFunction('hello world')).toBe(false);
  expect(isFunction(1)).toBe(false);
  expect(isFunction(true)).toBe(false);
  expect(isFunction({})).toBe(false);
  expect(isFunction([])).toBe(false);
  expect(isFunction(null)).toBe(false);
  expect(isFunction(() => {})).toBe(true);
  expect(isFunction(undefined)).toBe(false);
});

test("Test isObject", () => {
  expect(isObject('hello world')).toBe(false);
  expect(isObject(1)).toBe(false);
  expect(isObject(true)).toBe(false);
  expect(isObject({})).toBe(true);
  expect(isObject([])).toBe(false);
  expect(isObject(null)).toBe(false);
  expect(isObject(() => {})).toBe(false);
  expect(isObject(undefined)).toBe(false);
});

test("Test isUndefined", () => {
  expect(isUndefined('hello world')).toBe(false);
  expect(isUndefined(1)).toBe(false);
  expect(isUndefined(true)).toBe(false);
  expect(isUndefined({})).toBe(false);
  expect(isUndefined([])).toBe(false);
  expect(isUndefined(null)).toBe(false);
  expect(isUndefined(() => {})).toBe(false);
  expect(isUndefined(undefined)).toBe(true);
});

test("Test removeFromArray", () => {
  const arr = [1, 2, 3];
  removeFromArray(arr, 2)
  expect(arr).toEqual([1, 3]);
  removeFromArray(arr, true);
  expect(arr).toEqual([1, 3]);
});

test("Test filterBlank", () => {
  const str = "hello world";
  expect(filterBlank(str)).toBe("helloworld");
});

test("Test lowerCase", () => {
  const str = "hello world";
  expect(lowerCase(str)).toBe("hello world");
});