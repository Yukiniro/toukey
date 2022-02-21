
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.toukey = factory());
})(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
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

  var _curScope = 'default';
  var _shouldBindToDocument = true;

  var _handlerMap = new Map();

  _handlerMap.set('*', new Map());

  function _getKey(value) {
    return value.toLowerCase();
  }

  function _handleEvent(event) {
    var _this = this;

    var starScopeMap = _handlerMap.get('*');

    var curScopeMap = _handlerMap.get(_curScope);

    var eventKey = _getKey(event.key);

    if (event.type === 'keydown') {
      (starScopeMap.get(eventKey) || []).forEach(function (handler) {
        handler.call(_this, event);
      });
      (curScopeMap.get(eventKey) || []).forEach(function (handler) {
        handler.call(_this, event);
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

    var _key = key;
    var _scope = 'default';

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

    var _scopeMap = _handlerMap.get(_scope);

    if (!_scopeMap.has(_key)) {
      _scopeMap.set(_key, new Set());
    }

    var _handlerSet = _scopeMap.get(_key);

    _handlerSet.add(handler);

    return function () {
      var _scopeMap = _handlerMap.get(_scope);

      if (_scopeMap) {
        var _handlerSet2 = _scopeMap.get(_key);

        if (_handlerSet2) {
          _handlerSet2["delete"](handler);
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

  return toukey;

}));
