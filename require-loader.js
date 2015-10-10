/*! A toy CommonJS module loader.
 * ==============================
 * Author: Berton Zhu <bertonzh@gmail.com>
 * 2015/10/9
 */

(function(win) {
  /**
   * path utils, inspired by nodejs's path module
   */
  var pathUtils = {
    normalize: function(path) {
      if (!path) {
        return ''
      }

      var updir = '..'
      var pathArray = path.split('/')
      var newArray = [pathArray[0]]

      for (var i = 1; i < pathArray.length; i++) {
        var dirname = pathArray[i]
        if (dirname === '.') {} else if (dirname === updir) {
          var lastItem = newArray[newArray.length - 1]
          if (lastItem === updir) {
            newArray.push(dirname)
          }
          else if (lastItem === '.') {
            newArray.pop()
            newArray.push(dirname)
          }
          else {
            newArray.pop()
          }
        }
        else {
          newArray.push(dirname)
        }
      }

      return newArray.join('/')
    },

    resolve: function(basePath, path) {
      return this.normalize(basePath.replace(/[^\/]*$/, '') + path)
    },

    fulljs: function(path) {
      if (/\.js$/i.test(path)) {
        return path
      }
      else if (/\/$/.test(path)) {
        return path + 'index.js'
      }
      else {
        return path + '.js'
      }
    }
  }

  var _ = {
    // async/sync .each()
    each: function(arr, iterator, callback) {
      var total = arr.length
      var count = 0
      var item
      if (total) {
        for (var i = 0; i < arr.length; i++) {
          iterator(arr[i], function() {
            count++
            if (count === total) {
              callback()
            }
          })
        }
      } else {
        callback()
      }
    },

    // XMLHttpRequest GET
    get: function(url, callback) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.send()
      xhr.onload = function() {
        if (/^2/.test(xhr.status)) {
          callback(null, xhr.responseText)
        } else {
          callback(1)
        }
      }
      xhr.onerror = function() {
        callback(1)
      }
    },

    errorLog: function() {
      var console = window.console || {}
      console.error = console.error || console.log || function() {}
      console.error.apply(console, arguments)
    }
  }

  var cache = {}

  // 解析代码，获取依赖列表
  function analysisContent(content) {
    var reg = /require\(('|")(.+)\1\)/
    var regg = new RegExp(reg.source, 'g')

    return (content.match(regg) || []).map(function(incstr) {
      return incstr.match(reg)[2]
    })
  }

  // 获取一个 module
  function prepareModule(path, callback) {
    path = pathUtils.fulljs(path)
    var mod = cache[path]

    // 命中缓存
    if (mod && mod.status) {
      callback(null, mod)
    } else {
      // 缓存中不存在
      if (!mod) {
        mod = {
          callbacks: [],
          status: 0,
          path: path
        }
        cache[path] = mod
          // ajax 获取文件
        _.get(path, function(err, content) {
          if (err) {
            mod.status = -1
            mod.callbacks.forEach(function(cb) {
              cb(1, mod)
            })
          }
          else {
            // 分析依赖
            var deps = analysisContent(content)
            mod.deps = deps

            // define
            mod.main = new Function('module', 'exports', 'require', content)

            // 获取所有依赖
            _.each(deps, function(dep, cb) {
              prepareModule(pathUtils.resolve(path, dep), cb)
            }, function() {
              mod.status = 1
              mod.callbacks.forEach(function(cb) {
                cb(null, mod)
              })
            })
          }
        })
      }

      mod.callbacks.push(callback)
    }
  }

  function setupModule(mod) {
    var _exports = {}
    var _module = {
      exports: _exports
    }

    mod.main(_module, _exports, function(relativeId) {
      var depMod = cache[pathUtils.fulljs(pathUtils.resolve(mod.path, relativeId))]
      if (!depMod || depMod.status === -1) {
        _.errorLog('module \'' + relativeId + '\' required by module \'' + mod.path + '\' not found!')
      }
      if (depMod.status === 1) {
        setupModule(depMod)
      }

      return depMod.exports
    })

    mod.exports = _module.exports
    mod.status = 2

  }

  function loadPackage(intro) {
    prepareModule(intro, function(err, mod) {
      err || setupModule(mod)
    })
  }

  document.addEventListener("DOMContentLoaded", function(event) {
    _.each(document.querySelectorAll('script[src-entry]'), function(item) {
      var intro = item.getAttribute('src-entry')
      loadPackage(intro)
    })
  })

  win.requireLoad = loadPackage
})(this)
