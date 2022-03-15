import { transModifierKey } from "./keys";
import {
  isString,
  isFunction,
  isObject,
  removeFromArray,
  filterBlank,
  lowerCase
} from "./util";

const KEY_DOWN = "keydown";
const KEY_UP = "keyup";

let _curScope = "default";
let _shouldBindToDocument = true;
const _pressedKeys = [];
const _handlerMap = new Map();
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
    return (
      lowerCase(
        key
          .map((value) => transModifierKey(value))
          .sort()
          .join("")
      ) === lowerCase(_pressedKeys.join(""))
    );
  } else {
    return (
      _pressedKeys.length === 1 &&
      lowerCase(_pressedKeys[0]) === lowerCase(transModifierKey(key))
    );
  }
}

function _clearPressedKeys() {
  _pressedKeys.length = 0;
}

function _handleEvent(event) {
  _updatePressedKeys(event);
  const listForAll = _handlerMap.get("*") || [];
  const listForScope = _handlerMap.get(_curScope) || [];
  [...listForAll, ...listForScope].forEach((item) => {
    const { handler, keydown, keyup, key, splitValue } = item;

    const chunks = _splitKeys(key);
    chunks.forEach((chunk) => {
      if (_isComposeKey(chunk, splitValue)) {
        const composes = _composeKeys(chunk, splitValue);
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
  const { type } = event;
  if ((type === "keydown" && keydown) || (type === "keyup" && keyup)) {
    handler.call(this, event);
  }
}

function _updatePressedKeys(event) {
  const { type, key, repeat } = event;
  if (type === "keydown" && !repeat) {
    _pressedKeys.push(key);
  }
  if (type === "keyup") {
    queueMicrotask(() => {
      removeFromArray(_pressedKeys, key);
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

  const _key = key;
  let _scope = "default";
  let _splitValue = "+";
  let _shouldHandleInKeydown = false;
  let _shouldHandleInKeyup = false;

  if (isString(options)) {
    _scope = options;
  } else if (isObject(options)) {
    Object.keys(options).forEach((key) => {
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

  const _list = _handlerMap.get(_scope);
  const _item = {
    handler,
    key: _key,
    splitValue: _splitValue,
    keydown: _shouldHandleInKeydown,
    keyup: _shouldHandleInKeyup
  };

  _list.push(_item);

  return () => {
    const _list = _handlerMap.get(_scope);
    if (_list) {
      removeFromArray(_list, _item);
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
    _handlerMap.delete(scope);
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

export { clearAll, subscribe, getScope, setScope, deleteScope };
