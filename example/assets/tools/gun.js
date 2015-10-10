function Gun(name) {
  this.name = name
  window.log('Gun ' + name + ' is created!')
}

Gun.prototype.shot = function(animal) {
  console.log('Gun ' + this.name + ' shot ' + animal.name)
}

module.exports = new Gun('AK47')
