var _ = require('./utils/')

_.log('This is the entry module.')

var rabbit = require('./animals/rabbit')
var deer = require('./animals/deer')
var gun = require('./instruments/gun')

var shotAnimalAndDisplayResult = function(animal) {
  var result = gun.shot(animal)
  _.log('动物 ' + animal.name + (result ? ' 死了.' : ' 还没死.'))
}

setTimeout(function() {
  shotAnimalAndDisplayResult(rabbit)
}, 400)

setTimeout(function() {
  shotAnimalAndDisplayResult(deer)
}, 800)
