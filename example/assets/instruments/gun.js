var _ = require('../utils/')

function Gun(name) {
  this.name = name
  _.log('枪支 ' + name + ' 生产出来了!')
}

Gun.prototype.shot = function(animal) {
  _.log('枪支 ' + this.name + ' 击中了 ' + animal.name)

  return animal.name === 'rabbit'
}

module.exports = new Gun('AK47')
