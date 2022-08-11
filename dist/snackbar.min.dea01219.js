// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"vendor/snackbar/snackbar.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*!
 * Snackbar v0.1.9
 * http://polonel.com/Snackbar
 *
 * Copyright 2017 Chris Brame and other contributors
 * Released under the MIT license
 * https://github.com/polonel/Snackbar/blob/master/LICENSE
 */
!function (a, b) {
  "use strict";

  "function" == typeof define && define.amd ? define([], function () {
    return a.Snackbar = b();
  }) : "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && module.exports ? module.exports = a.Snackbar = b() : a.Snackbar = b();
}(this, function () {
  var a = {};
  a.current = null;
  var b = {
    text: "Default Text",
    textColor: "#FFFFFF",
    width: "auto",
    showAction: !0,
    actionText: "Dismiss",
    actionTextColor: "#25d5e4",
    showSecondButton: !1,
    secondButtonText: "",
    secondButtonTextColor: "#25d5e4",
    backgroundColor: "#3b3f5c",
    pos: "bottom-left",
    duration: 5e3,
    customClass: "",
    onActionClick: function onActionClick(a) {
      a.style.opacity = 0;
    },
    onSecondButtonClick: function onSecondButtonClick(a) {}
  };
  a.show = function (d) {
    var e = c(!0, b, d);
    a.current && (a.current.style.opacity = 0, setTimeout(function () {
      var a = this.parentElement;
      a && // possible null if too many/fast Snackbars
      a.removeChild(this);
    }.bind(a.current), 500)), a.snackbar = document.createElement("div"), a.snackbar.className = "snackbar-container " + e.customClass, a.snackbar.style.width = e.width;
    var f = document.createElement("p");

    if (f.style.margin = 0, f.style.padding = 0, f.style.color = e.textColor, f.style.fontSize = "14px", f.style.fontWeight = 300, f.style.lineHeight = "1em", f.innerHTML = e.text, a.snackbar.appendChild(f), a.snackbar.style.background = e.backgroundColor, e.showSecondButton) {
      var g = document.createElement("button");
      g.className = "action", g.innerHTML = e.secondButtonText, g.style.color = e.secondButtonTextColor, g.addEventListener("click", function () {
        e.onSecondButtonClick(a.snackbar);
      }), a.snackbar.appendChild(g);
    }

    if (e.showAction) {
      var h = document.createElement("button");
      h.className = "action", h.innerHTML = e.actionText, h.style.color = e.actionTextColor, h.addEventListener("click", function () {
        e.onActionClick(a.snackbar);
      }), a.snackbar.appendChild(h);
    }

    e.duration && setTimeout(function () {
      a.current === this && (a.current.style.opacity = 0, // When natural remove event ocurs let's move the snackbar to its origins
      a.current.style.top = "-100px", a.current.style.bottom = "-100px");
    }.bind(a.snackbar), e.duration), a.snackbar.addEventListener("transitionend", function (b, c) {
      "opacity" === b.propertyName && "0" === this.style.opacity && (this.parentElement.removeChild(this), a.current === this && (a.current = null));
    }.bind(a.snackbar)), a.current = a.snackbar, document.body.appendChild(a.snackbar);
    getComputedStyle(a.snackbar).bottom, getComputedStyle(a.snackbar).top;
    a.snackbar.style.opacity = 1, a.snackbar.className = "snackbar-container " + e.customClass + " snackbar-pos " + e.pos;
  }, a.close = function () {
    a.current && (a.current.style.opacity = 0);
  }; // Pure JS Extend
  // http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/

  var c = function c() {
    var a = {},
        b = !1,
        c = 0,
        d = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (b = arguments[0], c++);

    for (var e = function e(c) {
      for (var d in c) {
        Object.prototype.hasOwnProperty.call(c, d) && (b && "[object Object]" === Object.prototype.toString.call(c[d]) ? a[d] = extend(!0, a[d], c[d]) : a[d] = c[d]);
      }
    }; c < d; c++) {
      var f = arguments[c];
      e(f);
    }

    return a;
  };

  return a;
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38101" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","vendor/snackbar/snackbar.min.js"], null)
//# sourceMappingURL=/snackbar.min.dea01219.js.map