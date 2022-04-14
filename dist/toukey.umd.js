(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.toukey = {}));
})(this, (function (exports) { 'use strict';

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values#modifier_keys
  function transModifierKey(key) {
    switch (key) {
      case "ctrl":
        return "Control";

      case "space":
        return " ";

      case "left":
        return "ArrowLeft";

      case "right":
        return "ArrowRight";

      case "up":
        return "ArrowUp";

      case "bottom":
        return "ArrowBottom";

      default:
        return key;
    }
  }

  /**
   * @desc Remove all blank of str
   * @param {string} str
   * @returns
   */
  function filterBlank(str) {
    return str.replace(/\s+/g, "");
  }
  /**
   * @desc Retrun the lowercase of value.
   * @param {string} value
   * @returns {string}
   */

  function lowerCase(value) {
    return value.toLowerCase();
  }

  /**
   * @description Check if value is classified as a number.
   * @param value The value to check.
   * @returns Returns true if value is a number, else false.
   */
  /**
   * @description Check if value is classified as a string.
   * @param value The value to check.
   * @returns Returns true if value is a string, else false.
   */


  function isString(value) {
    return typeof value === "string";
  }
  /**
   * @description Check if value is classified as an object.
   * @param value The value to check.
   * @returns Returns true if value is an object, else false.
   */


  function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  /**
   * @description Check if value is classified as an array.
   * @param value The value to check
   * @returns Returns true if value is an array, else false.
   */


  function isArray(value) {
    return Array.isArray(value);
  }
  /**
   * @description Check if value is classified as a function.
   * @param value The value to check.
   * @returns Returns true if value is a function, else false.
   */


  function isFunction(value) {
    return Object.prototype.toString.call(value) === "[object Function]";
  }
  /**
   * @description Removes a specified value or a matching value from an array.
   * @param array The array to modify.
   * @param checker The item or the function invoked per iteration.
   */


  function remove(array, checker) {
    if (!isArray(array)) {
      throw new Error("value must be array");
    }

    var newArray = array.filter(function (item) {
      return isFunction(checker) ? !checker(item) : checker !== item;
    });
    array.length = 0;
    array.push.apply(array, newArray);
  }

  var KEY_DOWN = "keydown";
  var KEY_UP = "keyup";
  var _curScope = "default";
  var _shouldBindToDocument = true;
  var _pressedKeys = [];

  var _handlerMap = new Map();

  _handlerMap.set("*", []);

  function _splitKeys(keys) {
    return filterBlank(keys).split(",");
  }

  function _composeKeys(keys, subStr) {
    return filterBlank(keys).split(subStr);
  }

  function _isComposeKey(key, subStr) {
    return key.split(subStr).length > 1;
  }

  function _isKeyMatch(key) {
    if (Array.isArray(key)) {
      return lowerCase(key.map(function (value) {
        return transModifierKey(value);
      }).sort().join("")) === lowerCase(_pressedKeys.join(""));
    } else {
      return _pressedKeys.length === 1 && lowerCase(_pressedKeys[0]) === lowerCase(transModifierKey(key));
    }
  }

  function _clearPressedKeys() {
    _pressedKeys.length = 0;
  }

  function _handleEvent(event) {
    _updatePressedKeys(event);

    var listForAll = _handlerMap.get("*") || [];
    var listForScope = _handlerMap.get(_curScope) || [];
    [].concat(_toConsumableArray(listForAll), _toConsumableArray(listForScope)).forEach(function (item) {
      var handler = item.handler,
          keydown = item.keydown,
          keyup = item.keyup,
          key = item.key,
          splitValue = item.splitValue;

      var chunks = _splitKeys(key);

      chunks.forEach(function (chunk) {
        if (_isComposeKey(chunk, splitValue)) {
          var composes = _composeKeys(chunk, splitValue);

          if (_isKeyMatch(composes)) {
            _dispatch(handler, keydown, keyup, event);
          }
        } else if (_isKeyMatch(chunk)) {
          _dispatch(handler, keydown, keyup, event);
        }
      });
    });
  }

  function _dispatch(handler, keydown, keyup, event) {
    var type = event.type;

    if (type === "keydown" && keydown || type === "keyup" && keyup) {
      handler.call(this, event);
    }
  }

  function _updatePressedKeys(event) {
    var type = event.type,
        key = event.key,
        repeat = event.repeat;

    if (type === "keydown" && !repeat) {
      _pressedKeys.push(key);
    }

    if (type === "keyup") {
      queueMicrotask(function () {
        remove(_pressedKeys, key);
      });
    }
  }
  /**
   * @desc Subscribe the key's keyboard event.
   * @param {string} key
   * @param {function} handler - Callback.
   * @param {string | object} options - If the options is a string. It will be the scope.
   * @param {string} options.scope
   * @param {string} options.splitValue
   * @param {boolean} options.keydown
   * @param {boolean} options.keyup
   * @returns {function} - Unsubscribe key's keyboard event.
   */


  function subscribe(key, handler, options) {
    if (!isString(key)) {
      throw new Error("key must be string");
    }

    if (!isFunction(handler)) {
      throw new Error("handler must be function");
    }

    var _key = key;
    var _scope = "default";
    var _splitValue = "+";
    var _shouldHandleInKeydown = false;
    var _shouldHandleInKeyup = false;

    if (isString(options)) {
      _scope = options;
    } else if (isObject(options)) {
      Object.keys(options).forEach(function (key) {
        if (key === "scope") {
          _scope = options[key];
        }

        if (key === "splitValue") {
          _splitValue = options[key];
        }

        if (key === KEY_DOWN) {
          _shouldHandleInKeydown = true;
        }

        if (key === KEY_UP) {
          _shouldHandleInKeyup = true;
        }
      });
    }

    if (!_shouldHandleInKeydown && !_shouldHandleInKeyup) {
      _shouldHandleInKeydown = true;
    }

    if (_shouldBindToDocument) {
      _shouldBindToDocument = false;
      document.addEventListener("keydown", _handleEvent);
      document.addEventListener("keyup", _handleEvent);
      window.addEventListener("focus", _clearPressedKeys);
      window.addEventListener("blur", _clearPressedKeys);
    }

    if (!_handlerMap.has(_scope)) {
      _handlerMap.set(_scope, []);
    }

    var _list = _handlerMap.get(_scope);

    var _item = {
      handler: handler,
      key: _key,
      splitValue: _splitValue,
      keydown: _shouldHandleInKeydown,
      keyup: _shouldHandleInKeyup
    };

    _list.push(_item);

    return function () {
      var _list = _handlerMap.get(_scope);

      if (_list) {
        remove(_list, _item);
      }
    };
  }
  /**
   * @desc Return the scope
   * @returns {string}
   */


  function getScope() {
    return _curScope;
  }
  /**
   * @desc Set the scope.
   * @param {string} scope
   */


  function setScope(scope) {
    if (!isString(scope)) {
      throw new Error("scope must be string");
    }

    _curScope = scope;
  }
  /**
   * @desc Delete the scope. But it will not success when the scope is *
   * @param {string} scope
   */


  function deleteScope(scope) {
    if (scope !== "*") {
      _handlerMap["delete"](scope);

      _curScope = "default";
    }
  }
  /**
   * @desc Clear all listener.
   */


  function clearAll() {
    _handlerMap.clear();

    _handlerMap.set("*", []);

    _curScope = "default";

    _clearPressedKeys();
  }

  exports.clearAll = clearAll;
  exports.deleteScope = deleteScope;
  exports.getScope = getScope;
  exports.setScope = setScope;
  exports.subscribe = subscribe;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
