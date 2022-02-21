import {
  isString,
  isFunction,
  isObject
} from './util'

let _curScope = 'default';
let _shouldBindToDocument = true;
const _handlerMap = new Map();
_handlerMap.set('*', new Map());

function _getKey(value) {
  return value.toLowerCase();
}

function _handleEvent(event) {
  const starScopeMap = _handlerMap.get('*');
  const curScopeMap = _handlerMap.get(_curScope);
  const eventKey = _getKey(event.key);
  if (event.type === 'keydown') {
    (starScopeMap.get(eventKey) || []).forEach(handler => {
      handler.call(this, event);
    });
    (curScopeMap.get(eventKey) || []).forEach(handler => {
      handler.call(this, event);
    });
  }
}

/**
 * @desc Subscribe the key's keyboard event.
 * @param {string} key 
 * @param {function} handler - Callback.
 * @param {string | object} options - If the options is a string. It will be the scope.
 * @param {string} options.scope
 * @returns {function} - Unsubscribe key's keyboard event.
 */
function subscribe(key, handler, options) {
  if (!isString(key)) {
    throw new Error('key must be string');
  }

  if (!isFunction(handler)) {
    throw new Error('handler must be function');
  }

  const _key = key;
  let _scope = 'default';

  if (isString(options)) {
    _scope = options;
  } else if (isObject(options)) {
    _scope = options.scope;
  }

  if (_shouldBindToDocument) {
    _shouldBindToDocument = false;
    document.addEventListener('keydown', _handleEvent);
    document.addEventListener('keyup', _handleEvent);
  }

  if (!_handlerMap.has(_scope)) {
    _handlerMap.set(_scope, new Map());
  }
  
  const _scopeMap = _handlerMap.get(_scope);

  if (!_scopeMap.has(_key)) {
    _scopeMap.set(_key, new Set());
  }

  const _handlerSet = _scopeMap.get(_key);
  _handlerSet.add(handler);

  return () => {
    const _scopeMap = _handlerMap.get(_scope);
    if (_scopeMap) {
      const _handlerSet = _scopeMap.get(_key);
      if (_handlerSet) {
        _handlerSet.delete(handler);
      }
    }
  }
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
  _handlerMap.delete(scope);
  _curScope = 'default';
}

export default {
  subscribe,
  getScope,
  setScope,
  deleteScope,
}