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
    global.modHelpers = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.helpers = void 0;

  /**
   * MyAMS generic helpers
   */
  var $ = MyAMS.$;
  var helpers = {
    /**
     * Move given element to the end of it's parent
     *
     * @param element: the element to be moved
     * @returns {*}
     */
    moveElementToParentEnd: function moveElementToParentEnd(element) {
      var parent = element.parent();
      return element.detach().appendTo(parent);
    },

    /**
     * Toggle dropdown associated with given event target
     *
     * @param evt: source event
     */
    hideDropdown: function hideDropdown(evt) {
      $(evt.target).closest('.dropdown-menu').dropdown('hide');
    }
  };
  /**
   * Global module initialization
   */

  _exports.helpers = helpers;

  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('helpers');
    } else {
      MyAMS.helpers = helpers;
      console.debug("MyAMS: helpers module loaded...");
    }
  }
});
//# sourceMappingURL=mod-helpers-dev.js.map
