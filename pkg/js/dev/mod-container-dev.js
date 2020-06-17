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
    global.modContainer = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.container = void 0;

  /* global MyAMS */

  /**
   * MyAMS container management
   */
  var $ = MyAMS.$;
  var container = {};
  /**
   * Global module initialization
   */

  _exports.container = container;

  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('container');
    } else {
      MyAMS.container = container;
      console.debug("MyAMS: container module loaded...");
    }
  }
});
//# sourceMappingURL=mod-container-dev.js.map
