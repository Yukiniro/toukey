export default {

  /**
   * @desc Return true if value is a string
   * @param {*} value 
   * @returns {boolean}
   */
  isString: function (value) {
    return typeof value === 'string';
  },

    /**
   * @desc Return true if value is a function
   * @param {*} value 
   * @returns {boolean}
   */
  isFunction: function (value) {
    return typeof value === 'function';
  }
}