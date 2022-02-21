/**
 * @desc Return true if value is a string
 * @param {*} value 
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * @desc Return true if value is a function
 * @param {*} value 
 * @returns {boolean}
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * @desc Return true if value is a object
 * @param {*} value 
 * @returns {boolean}
 */
export function isObject(value) {
  return value && typeof value === 'object'
}