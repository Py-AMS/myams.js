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
    global.modHandlers = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.handlers = void 0;

  /* global MyAMS */

  /**
   * MyAMS events handlers
   */
  var $ = MyAMS.$;
  var _initialized = false;
  var handlers = {
    init: function init() {
      if (_initialized) {
        return;
      }

      _initialized = true; // Initialize custom click handlers

      $(document).on('click', '[data-ams-click-handler]', function (evt) {
        var source = $(evt.currentTarget),
            handlers = source.data('ams-disabled-handlers');

        if (handlers === true || handlers === 'click' || handlers === 'all') {
          return;
        }

        var data = source.data();

        if (data.amsClickHandler) {
          if (data.amsPreventDefault !== false && data.amsClickPreventDefault !== false) {
            evt.preventDefault();
          }

          if (data.amsStopPropagation !== false && data.amsClickStopPropagation !== false) {
            evt.stopPropagation();
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data.amsClickHandler.split(/[\s,;]+/)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var handler = _step.value;
              var callback = MyAMS.core.getFunctionByName(handler);

              if (callback !== undefined) {
                callback.call(source, evt, data.amsClickHandlerOptions);
              }
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
        }
      }); // Initialize custom change handlers

      $(document).on('change', '[data-ams-change-handler]', function (evt) {
        var source = $(evt.currentTarget); // Disable change handlers for readonly inputs
        // These change handlers are activated by IE!!!

        if (source.prop('readonly')) {
          return;
        }

        var handlers = source.data('ams-disabled-handlers');

        if (handlers === true || handlers === 'change' || handlers === 'all') {
          return;
        }

        var data = source.data();

        if (data.amsChangeHandler) {
          if (data.amsKeepDefault !== false && data.amsChangeKeepDefault !== false) {
            evt.preventDefault();
          }

          if (data.amsStopPropagation !== false && data.amsChangeStopPropagation !== false) {
            evt.stopPropagation();
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = data.amsChangeHandler.split(/[\s,;]+/)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var handler = _step2.value;
              var callback = MyAMS.core.getFunctionByName(handler);

              if (callback !== undefined) {
                callback.call(source, evt, data.amsChangeHandlerOptions);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }); // Notify reset to update Select2 widgets

      $(document).on('reset', 'form', function (evt) {
        var form = $(evt.currentTarget);
        setTimeout(function () {
          $('.alert-danger, SPAN.state-error', form).not('.persistent').remove();
          $('LABEL.state-error', form).removeClass('state-error');
          form.find('.select2').trigger('change');
          $('[data-ams-reset-callback]', form).each(function (idx, elt) {
            var element = $(elt),
                data = element.data(),
                callback = MyAMS.core.getFunctionByName(data.amsResetCallback);

            if (callback !== undefined) {
              callback.call(form, element, data.amsResetCallbackOptions);
            }
          });
        }, 10);
        MyAMS.form && MyAMS.form.setFocus(form);
      }); // Initialize custom reset handlers

      $(document).on('reset', '[data-ams-reset-handler]', function (evt) {
        var form = $(evt.currentTarget),
            data = form.data();

        if (data.amsResetHandler) {
          if (data.amsKeepDefault !== true && data.amsResetKeepDefault !== true) {
            evt.preventDefault();
          }

          var callback = MyAMS.core.getFunctionByName(data.amsResetHandler);

          if (callback !== undefined) {
            callback.call(form, data.amsResetHandlerOptions);
          }
        }
      }); // Initialize custom event on click

      $(document).on('click', '[data-ams-click-event]', function (evt) {
        var source = $(evt.currentTarget);
        $(evt.target).trigger(source.data('ams-click-event'), source.data('ams-click-event-options'));
      }); // Cancel clicks on readonly checkbox

      $(document).on('click', 'input[type="checkbox"][readonly]', function () {
        return false;
      });
    }
  };
  /**
   * Global module initialization
   */

  _exports.handlers = handlers;

  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('handlers');
  } else {
    MyAMS.handlers = handlers;
    console.debug("MyAMS: handlers module loaded...");
  }
});
//# sourceMappingURL=mod-handlers-dev.js.map
