console.log('intro utils')

exports.log = function() {
  console.log.apply(console, arguments)
}
