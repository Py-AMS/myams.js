(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.modCallbacks = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.callbacks = void 0;

  /**
   * MyAMS callbacks management
   */
  var $ = MyAMS.$;
  var _initialized = false;
  var callbacks = {
    init: function init() {
      if (_initialized) {
        return;
      }

      _initialized = true;
    },
    initElement: function initElement(element) {
      return new Promise(function (resolve, reject) {
        var deferred = [];
        $('[data-ams-callback]', element).each(function (idx, elt) {
          var data = $(elt).data();
          var callbacks = data.amsCallback;

          if (typeof callbacks === 'string') {
            try {
              callbacks = JSON.parse(data.amsCallback);
            } catch (e) {
              callbacks = data.amsCallback.split(/[\s,;]+/);
            }
          }

          if (!$.isArray(callbacks)) {
            callbacks = [callbacks];
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            var _loop = function _loop() {
              var callback = _step.value;
              var callname = void 0,
                  callable = void 0,
                  source = void 0,
                  options = void 0;

              if (typeof callback === 'string') {
                callname = callback;
                callable = MyAMS.core.getFunctionByName(callname);
                source = data.amsCallbackOptions;
                options = data.amsCallbackOptions;

                if (typeof options === 'string') {
                  options = options.unserialize();
                }
              } else {
                // JSON object
                callname = callback.callback;
                callable = MyAMS.core.getFunctionByName(callname);
                source = callback.source;
                options = callback.options;
              }

              if (typeof callable === 'undefined') {
                if (source) {
                  deferred.push(MyAMS.core.getScript(source).then(function () {
                    callable = MyAMS.core.getFunctionByName(callname);

                    if (typeof callable === 'undefined') {
                      console.warn("Missing callback ".concat(callname, "!"));
                    } else {
                      callable.call(document, elt, options);
                    }
                  }));
                } else {
                  console.warn("Missing source for undefined callback ".concat(callback, "!"));
                }
              } else {
                deferred.push(Promise.resolve(callable.call(document, elt, options)));
              }
            };

            for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _loop();
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });
        $.when.apply($, deferred).then(function () {
          resolve();
        });
      });
    }
  };
  /**
   * Global module initialization
   */

  _exports.callbacks = callbacks;

  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('callbacks');
    } else {
      MyAMS.callbacks = callbacks;
      console.debug("MyAMS: callbacks module loaded...");
    }
  }
});
//# sourceMappingURL=mod-callbacks-dev.js.map
