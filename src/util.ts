/**
 * Removes all blanks from a string.
 *
 * @param str The string to remove blanks from.
 * @returns The string without blanks.
 */
export function filterBlank(str: string): string {
  return str.replace(/\s+/g, "");
}

/**
 * Returns the lowercase version of a string.
 *
 * @param value The string to convert to lowercase.
 * @returns The lowercase string.
 */
export function lowerCase(value: string): string {
  return value.toLowerCase();
}

/**
 * Checks if a value is a string.
 *
 * @param value The value to check.
 * @returns True if the value is a string, otherwise false.
 */
export function isString(value: unknown): boolean {
  return typeof value === "string";
}

/**
 * Checks if a value is a function.
 *
 * @param value The value to check.
 * @returns True if the value is a function, otherwise false.
 */
export function isFunction(value: unknown): boolean {
  return typeof value === "function";
}

/**
 * Checks if a value is an object.
 *
 * @param value The value to check.
 * @returns True if the value is an object, otherwise false.
 */
export function isObject(value: unknown): boolean {
  return typeof value === "object";
}

/**
 * Checks if a value is undefined.
 *
 * @param value The value to check.
 * @returns True if the value is undefined, otherwise false.
 */
export function isUndefined(value: unknown): boolean {
  return typeof value === "undefined";
}

/**
 * Removes the specified value from an array.
 *
 * @param arr The array from which to remove the value.
 * @param value The value to remove from the array.
 * @returns void
 */
export function remove(arr: unknown[], value: unknown): void {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr.splice(index, 1);
  }
}
