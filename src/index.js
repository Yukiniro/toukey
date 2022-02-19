import {isString, isFunction} from './util'

let _scope = 'default';

function subscribe(key, handler, options) {
  if (!isString(key)) {
    throw new Error('key must be string');
  }

  if (!isFunction(handler)) {
    throw new Error('handler must be function');
  }
 bn 
  const _key = key;
  const _handler = handler;
  let _scope = '*';

  if (isString(options)) {
    _scope = options;
  }
}

/**
 * @desc Return the scope
 * @returns {string}
 */
function getScope() {
  return _scope;
}

/**
 * @desc Set the scope.
 * @param {string} scope 
 */
function setScope(scope) {
  if (!isString(scope)) {
    throw new Error('scope must be string');
  }
  this._scope = scope;
}

function deleteScope() {

}

export default {
  subscribe,
  getScope,
  setScope,
  deleteScope,
}