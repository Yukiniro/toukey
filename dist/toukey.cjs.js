
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
'use strict';

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

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

/**
 * @desc Return true if value is a string
 * @param {*} value 
 * @returns {boolean}
 */
function isString(value) {
  return typeof value === 'string';
}
/**
 * @desc Return true if value is a function
 * @param {*} value 
 * @returns {boolean}
 */

function isFunction(value) {
  return typeof value === 'function';
}
/**
 * @desc Return true if value is a object
 * @param {*} value 
 * @returns {boolean}
 */

function isObject(value) {
  return value && _typeof(value) === 'object';
}
/**
 * @desc Remove item from array.
 * @param {Array} array 
 * @param {*} item 
 */

function removeFromArray(array, item) {
  var index = array.indexOf(item);

  if (index !== -1) {
    array.splice(index, 1);
  }
}
/**
 * @desc Remove all blank of str
 * @param {string} str 
 * @returns 
 */

function filterBlank(str) {
  return str.replace(/\s+/g, '');
}

var KEY_DOWN = 'keydown';
var KEY_UP = 'keyup';
var _curScope = 'default';
var _shouldBindToDocument = true;
var _pressedKeys = [];

var _handlerMap = new Map();

_handlerMap.set('*', []);

function _getKey(value) {
  return value.toLowerCase();
}

function _splitKeys(keys) {
  return filterBlank(keys).split(',');
}

function _composeKeys(keys, subStr) {
  return filterBlank(keys).split(subStr);
}

function _handleEvent(event) {
  _updatePressedKeys(event);

  var listForAll = _handlerMap.get('*') || [];
  var listForScope = _handlerMap.get(_curScope) || [];
  [].concat(_toConsumableArray(listForAll), _toConsumableArray(listForScope)).forEach(function (item) {
    var handler = item.handler,
        keydown = item.keydown,
        keyup = item.keyup,
        key = item.key,
        splitValue = item.splitValue;

    var chunks = _splitKeys(key);

    chunks.forEach(function (chunk) {
      if (chunk === splitValue) {
        _dispatch(handler, chunk, keydown, keyup, event);
      } else {
        var composes = _composeKeys(chunk);

        composes.forEach(function (subCompose) {
          _dispatch(handler, subCompose, keydown, keyup, event);
        });
      }
    });
  });
}

function _dispatch(handler, triggerKey, keydown, keyup, event) {
  var type = event.type;

  var pressedKeyString = _pressedKeys.join('');

  if (_getKey(pressedKeyString) === _getKey(triggerKey)) {
    if (type === 'keydown' && keydown || type === 'keyup' && keyup) {
      handler.call(this, event);
    }
  }
}

function _updatePressedKeys(event) {
  var type = event.type,
      key = event.key,
      repeat = event.repeat;

  if (type === 'keydown' && !repeat) {
    _pressedKeys.push(key);
  }

  if (type === 'keyup') {
    removeFromArray(_pressedKeys, key);
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
    throw new Error('key must be string');
  }

  if (!isFunction(handler)) {
    throw new Error('handler must be function');
  }

  var _key = key;
  var _scope = 'default';
  var _splitValue = '+';
  var _shouldHandleInKeydown = false;
  var _shouldHandleInKeyup = false;

  if (isString(options)) {
    _scope = options;
  } else if (isObject(options)) {
    Object.keys(options).forEach(function (key) {
      if (key === 'scope') {
        _scope = options[key];
      }

      if (key === 'splitValue') {
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
    document.addEventListener('keydown', _handleEvent);
    document.addEventListener('keyup', _handleEvent);
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
    var _scopeMap = _handlerMap.get(_scope);

    if (_scopeMap) {
      var _list2 = _scopeMap.get(_key);

      if (_list2) {
        removeFromArray(_list2, _item);
      }
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
    throw new Error('scope must be string');
  }

  this._curScope = scope;
}

function deleteScope(scope) {
  _handlerMap["delete"](scope);

  _curScope = 'default';
}

var toukey = {
  subscribe: subscribe,
  getScope: getScope,
  setScope: setScope,
  deleteScope: deleteScope
};

module.exports = toukey;
