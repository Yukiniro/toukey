/**
 * @desc Remove all blank of str
 * @param {string} str
 * @returns
 */
export function filterBlank(str: string): string {
  return str.replace(/\s+/g, "");
}

/**
 * @desc Retrun the lowercase of value.
 * @param {string} value
 * @returns {string}
 */
export function lowerCase(value: string): string {
  return value.toLowerCase();
}
