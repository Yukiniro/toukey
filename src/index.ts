import { transModifierKey } from "./keys";
import { filterBlank, lowerCase } from "./util";
import { isString, isFunction, isObject, remove } from "bittydash";
import { ToukeyHandler, ToukeyItem, ToukeyOffOptions, ToukeyOptions } from "./types";

const KEY_DOWN = "keydown";
const KEY_UP = "keyup";

let _curScope = "default";
let _shouldBindToDocument = true;
let _isEnabled = true;
const _pressedKeys = [];
const _handlerMap = new Map();
_handlerMap.set("*", []);

function _splitKeys(keys: string): string[] {
  return filterBlank(keys).split(",");
}

function _composeKeys(keys: string, subStr: string): string[] {
  return filterBlank(keys).split(subStr);
}

function _isComposeKey(key: string, subStr: string): boolean {
  return key.split(subStr).length > 1;
}

function _isKeyMatch(key: string | string[]): boolean {
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
    return _pressedKeys.length === 1 && lowerCase(_pressedKeys[0]) === lowerCase(transModifierKey(key));
  }
}

function _isKeyEventMatch(event: KeyboardEvent, keydown: boolean, keyup: boolean): boolean {
  const { type } = event;
  return (type === "keydown" && keydown) || (type === "keyup" && keyup);
}

function _clearPressedKeys(): void {
  _pressedKeys.length = 0;
}

function _handleEvent(event: KeyboardEvent) {
  _updatePressedKeys(event);

  if (!isEnabled()) {
    return;
  }

  const listForAll = _handlerMap.get("*") || [];
  const listForScope = _handlerMap.get(_curScope) || [];

  [...listForAll, ...listForScope].forEach((item) => {
    const { handler, keydown, keyup, key, splitValue, once } = item;
    const triggerIfMatch = (matchKey: string | string[]) => {
      if (_isKeyMatch(matchKey) && _isKeyEventMatch(event, keydown, keyup)) {
        handler.call(this, event);
        once && queueMicrotask(() => unsubscribe(item, _curScope));
      }
    };

    const chunks = _splitKeys(key);
    chunks.forEach((chunk) => {
      if (_isComposeKey(chunk, splitValue)) {
        const composes = _composeKeys(chunk, splitValue);
        triggerIfMatch(composes);
      } else {
        triggerIfMatch(chunk);
      }
    });
  });
}

function _updatePressedKeys(event: KeyboardEvent) {
  const { type, key, repeat } = event;
  if (type === "keydown" && !repeat) {
    _pressedKeys.push(key);
  }
  if (type === "keyup") {
    queueMicrotask(() => {
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
 * @param {boolean} options.once
 * @returns {function} - Unsubscribe key's keyboard event.
 */
function subscribe(key: string, handler: ToukeyHandler, options?: string | ToukeyOptions): () => void {
  if (!isString(key)) {
    throw new Error("key must be string");
  }

  if (!isFunction(handler)) {
    throw new Error("handler must be function");
  }

  const _key = key;
  let _scope = "default";
  let _splitValue = "+";
  let _shouldHandleInKeydown = true;
  let _shouldHandleInKeyup = false;
  let _once = false;

  if (isString(options)) {
    _scope = options as string;
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
      if (key === "once") {
        _once = true;
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
  const _item: ToukeyItem = {
    handler,
    key: _key,
    splitValue: _splitValue,
    keydown: _shouldHandleInKeydown,
    keyup: _shouldHandleInKeyup,
    once: _once
  };

  _list.push(_item);

  return () => {
    unsubscribe(_item, _scope);
  };
}

function unsubscribe(item: ToukeyItem, scope: string) {
  const _list = _handlerMap.get(scope);
  _list && remove(_list, item);
}

/**
 * @desc Return the scope
 * @returns {string}
 */
function getScope(): string {
  return _curScope;
}

/**
 * @desc Set the scope.
 * @param {string} scope
 */
function setScope(scope: string) {
  if (!isString(scope)) {
    throw new Error("scope must be string");
  }
  _curScope = scope;
}

/**
 * @desc Delete the scope. But it will not success when the scope is *
 * @param {string} scope
 */
function deleteScope(scope: string) {
  if (scope !== "*") {
    _handlerMap.delete(scope);
    _curScope = "default";
  }
}

/**
 * @desc Clear all listener.
 */
function clearAll(): void {
  _handlerMap.clear();
  _handlerMap.set("*", []);
  _curScope = "default";
  _clearPressedKeys();
}

/**
 * @desc Set all listeners enable
 */
function enable(): void {
  _isEnabled = true;
}

/**
 * @desc Set all listeners disable
 */
function disable(): void {
  _isEnabled = false;
}

/**
 * @desc Return true if toukey is enabled
 */
function isEnabled(): boolean {
  return _isEnabled;
}

function on(key: string, handler: ToukeyHandler, options?: ToukeyOptions) {
  subscribe(key, handler, options);
}

function off(key: string, handler: ToukeyHandler, options: ToukeyOffOptions = {}) {
  const { scope = "default", keydown = false, keyup = false, splitValue = "+" } = options;
  const listForAll = _handlerMap.get("*") || [];
  const listForScope = _handlerMap.get(scope) || [];
  const removeList = [...listForAll, ...listForScope].filter(
    (item) =>
      item.handler === handler &&
      item.key === key &&
      item.keydown === keydown &&
      item.keyup === keyup &&
      item.splitValue === splitValue
  );
  removeList.forEach((item) => {
    unsubscribe(item, scope);
  });
}

export { on, off, clearAll, subscribe, getScope, setScope, deleteScope, enable, disable, isEnabled };
