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
    global.modEvents = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.events = void 0;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  /**
   * MyAMS events management
   */
  var $ = MyAMS.$;
  var _initialized = false;
  var events = {
    init: function init() {
      if (_initialized) {
        return;
      }

      _initialized = true;
    },
    initElement: function initElement(element) {
      $('[data-ams-events-handlers]', element).each(function (idx, elt) {
        var element = $(elt),
            handlers = element.data('ams-events-handlers');

        if (handlers) {
          for (var _i = 0, _Object$entries = Object.entries(handlers); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                event = _Object$entries$_i[0],
                handler = _Object$entries$_i[1];

            element.on(event, element.data('ams-events-options') || {}, MyAMS.core.getFunctionByName(handler));
          }
        }
      });
    }
  };
  /**
   * Global module initialization
   */

  _exports.events = events;

  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('events');
  } else {
    MyAMS.events = events;
    console.debug("MyAMS: events module loaded...");
  }
});
//# sourceMappingURL=mod-events-dev.js.map
