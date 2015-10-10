exports.log = function() {
  if (typeof window === 'undefined' || !window.log) {
    console.log.apply(console, arguments)
  }
  else {
    window.log.apply(null, arguments)
  }
}

exports.log('test log:', 0, true, false, null, {x: 3})
