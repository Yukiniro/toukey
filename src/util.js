/**
 * @desc Return true if value is a string
 * @param {*} value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === "string";
}

/**
 * @desc Return true if value is a function
 * @param {*} value
 * @returns {boolean}
 */
export function isFunction(value) {
  return typeof value === "function";
}

/**
 * @desc Return true if value is a object
 * @param {*} value
 * @returns {boolean}
 */
export function isObject(value) {
  return value && typeof value === "object";
}

/**
 * @desc Return true if value is undefined
 * @param {*} value
 * @returns
 */
export function isUndefined(value) {
  return typeof value === "undefined";
}

/**
 * @desc Remove item from array.
 * @param {Array} array
 * @param {*} item
 */
export function removeFromArray(array, item) {
  const index = array.indexOf(item);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

/**
 * @desc Remove all blank of str
 * @param {string} str
 * @returns
 */
export function filterBlank(str) {
  return str.replace(/\s+/g, "");
}

/**
 * @desc Retrun the lowercase of value.
 * @param {string} value
 * @returns {string}
 */
export function lowerCase(value) {
  return value.toLowerCase();
}
