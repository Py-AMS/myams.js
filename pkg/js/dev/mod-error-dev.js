(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "jsrender"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("jsrender"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jsrender);
    global.modError = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _jsrender) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.error = void 0;

  /* global MyAMS */

  /**
   * MyAMS errors management
   */
  var $ = MyAMS.$;
  var ERRORS_TEMPLATE_STRING = "\n\t<div class=\"alert alert-{{:status}}\" role=\"alert\">\n\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\t\t\t\taria-label=\"{{*: MyAMS.i18n.BTN_CLODE }}\">\n\t\t\t<i class=\"fa fa-times\" aria-hidden=\"true\"></i>\t\n\t\t</button>\n\t\t{{if header}}\n\t\t<h5 class=\"alert-heading\">{{:header}}</h5>\n\t\t{{/if}}\n\t\t{{if message}}\n\t\t<p>{{:message}}</p>\n\t\t{{/if}}\n\t\t{{if messages}}\n\t\t<ul>\n\t\t{{for messages}}\n\t\t\t<li>\n\t\t\t\t{{if header}}<strong>{{:header}} :</strong>{{/if}}\n\t\t\t\t{{:message}}\n\t\t\t</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{/if}}\n\t\t{{if widgets}}\n\t\t<ul>\n\t\t{{for widgets}}\n\t\t\t<li>\n\t\t\t\t{{if header}}<strong>{{:header}} :</strong>{{/if}}\n\t\t\t\t{{:message}}\n\t\t\t</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{/if}}\n\t</div>";
  var ERROR_TEMPLATE = $.templates({
    markup: ERRORS_TEMPLATE_STRING,
    allowCode: true
  });
  var error = {
    /**
     * Show errors as alert in given parent
     *
     * @param parent: alert parent element
     * @param errors: errors properties
     */
    showErrors: function showErrors(parent, errors) {
      return new Promise(function (resolve, reject) {
        if (typeof errors === 'string') {
          // simple error message
          MyAMS.require('i18n', 'alert').then(function () {
            MyAMS.alert.alert({
              parent: parent,
              status: 'danger',
              header: MyAMS.i18n.ERROR_OCCURED,
              message: errors
            });
          }).then(resolve, reject);
        } else if ($.isArray(errors)) {
          // array of messages
          MyAMS.require('i18n', 'alert').then(function () {
            MyAMS.alert.alert({
              parent: parent,
              status: 'danger',
              header: MyAMS.i18n.ERRORS_OCCURED,
              message: errors
            });
          }).then(resolve, reject);
        } else {
          // full errors with widgets
          MyAMS.require('i18n', 'alert', 'form').then(function () {
            // clear previous alerts
            MyAMS.form.clearAlerts(parent); // create new alert

            var messages = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (errors.messages || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var message = _step.value;

                if (typeof message === 'string') {
                  messages.push({
                    header: null,
                    message: message
                  });
                } else {
                  messages.push(message);
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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = (errors.widgets || [])[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var widget = _step2.value;
                messages.push({
                  header: widget.label,
                  message: widget.message
                });
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

            var header = errors.header || (messages.length > 1 ? MyAMS.i18n.ERRORS_OCCURED : MyAMS.i18n.ERROR_OCCURED),
                props = {
              status: 'danger',
              header: header,
              message: errors.error || null,
              messages: messages
            };
            $(ERROR_TEMPLATE.render(props)).prependTo(parent); // update status of invalid widgets

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = (errors.widgets || [])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _widget = _step3.value;
                var input = void 0;

                if (_widget.id) {
                  input = $("#".concat(_widget.id), parent);
                } else {
                  input = $("[name=\"".concat(_widget.name, "\"]"), parent);
                }

                if (input.exists()) {
                  MyAMS.form.setInvalid(parent, input, _widget.message);
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                  _iterator3["return"]();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }
          }).then(resolve, reject);
        }
      });
    }
  };
  /**
   * Global module initialization
   */

  _exports.error = error;

  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('error');
    } else {
      MyAMS.error = error;
      console.debug("MyAMS: error module loaded...");
    }
  }
});
//# sourceMappingURL=mod-error-dev.js.map
