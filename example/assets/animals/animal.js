var _ = require('../utils/')

function Animal(name) {
  this.name = name
  _.log('动物 ' + name + ' 出生了.')
}

module.exports = Animal
