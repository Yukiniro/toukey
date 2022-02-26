'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/toukey.min.js');
} else {
  module.exports = require('./dist/toukey.js');
}
