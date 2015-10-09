console.log('intro a')

var _ = require('../utils/utils')
var b = require('./b')

_.log('mod a')
_.log(b.name)

module.exports = function() {
  _.log('a')
}
