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
    global.modClipboard = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.clipboard = void 0;

  /**
   * MyAMS i18n translations
   */
  if (!window.jQuery) {
    window.$ = window.jQuery = require('jquery');
  }

  var clipboard = {};
  /**
   * Global module initialization
   */

  _exports.clipboard = clipboard;

  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('clipboard');
    } else {
      MyAMS.clipboard = clipboard;
      console.debug("MyAMS: clipboard module loaded...");
    }
  }
});
//# sourceMappingURL=mod-clipboard-dev.js.map
