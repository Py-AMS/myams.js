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
    global.modModal = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.modal = void 0;

  /**
   * MyAMS modal dialogs support
   */
  var $ = MyAMS.$;
  var _initialized = false;
  var modal = {
    init: function init() {
      if (_initialized) {
        return;
      }

      _initialized = true;

      if (MyAMS.config.ajaxNav) {
        // Initialize modal dialogs links
        $(document).on('click', '[data-toggle="modal"]', function (evt) {
          var source = $(evt.currentTarget),
              handlers = source.data('ams-disabled-handlers');

          if (handlers === true || handlers === 'click' || handlers === 'all') {
            return;
          }

          if (source.data('ams-context-menu') === true) {
            return;
          }

          if (source.data('ams-stop-propagation') === true) {
            evt.stopPropagation();
          }

          evt.preventDefault();

          MyAMS.require('modal').then(function () {
            MyAMS.modal.open(source);
          });
        });
      }
      /**
       * Handle modal events to allow modals stacking
       */


      var zIndexModal = 1100;
      $(document).on('shown.bs.modal', '.modal', function (evt) {
        // Enable modals stacking
        var dialog = $(evt.target),
            visibleModalsCount = $('.modal:visible').length,
            zIndex = zIndexModal + 100 * visibleModalsCount;
        dialog.css('z-index', zIndex);
        setTimeout(function () {
          $('.modal-backdrop').not('.modal-stack').first().css('z-index', zIndex - 10).addClass('modal-stack');
        }, 0); // Check form contents before closing modals

        $(dialog).off('click', '[data-dismiss="modal"]').on('click', '[data-dismiss="modal"]', function (evt) {
          var source = $(evt.currentTarget),
              dialog = source.parents('.modal').first();
          dialog.data('modal-result', $(evt.currentTarget).data('modal-dismiss-value'));

          if (MyAMS.form) {
            MyAMS.form.confirmChangedForm(dialog).then(function (status) {
              if (status === 'success') {
                dialog.modal('hide');
              }
            });
          } else {
            dialog.modal('hide');
          }
        });
      });
      $(document).on('hidden.bs.modal', '.modal', function () {
        if ($('.modal:visible').length > 0) {
          $.fn.modal.Constructor.prototype._checkScrollbar();

          $.fn.modal.Constructor.prototype._setScrollbar();

          $('body').addClass('modal-open');
        }
      });
    },
    initElement: function initElement(element) {},
    open: function open(source, options) {
      return new Promise(function (resolve, reject) {
        var sourceData = {},
            url = source;

        if (typeof source !== 'string') {
          sourceData = source.data();
          url = source.attr('href') || sourceData.amsUrl;
          var urlGetter = MyAMS.core.getFunctionByName(url);

          if (typeof urlGetter === 'function') {
            url = urlGetter.call(source);
          }
        }

        if (!url) {
          reject("No provided URL!");
        }

        if (url.startsWith('#')) {
          // Open inner modal
          $(url).modal('show');
          resolve();
        } else {
          $.ajax({
            type: 'get',
            url: url,
            cache: sourceData.amsAllowCache === undefined ? false : sourceData.amsAllowCache,
            data: options
          }).then(function (data, status, request) {
            MyAMS.require('ajax').then(function () {
              var response = MyAMS.ajax.getResponse(request),
                  dataType = response.contentType,
                  result = response.data;

              switch (dataType) {
                case 'json':
                  MyAMS.ajax.handleJSON(result, $($(source).data('ams-json-target') || '#content'));
                  break;

                case 'script':
                case 'xml':
                  break;

                case 'html':
                case 'text':
                default:
                  var content = $(result),
                      dialog = $('.modal-dialog', content.wrap('<div></div>').parent()),
                      dialogData = dialog.data() || {},
                      dialogOptions = {
                    backdrop: dialogData.backdrop === undefined ? 'static' : dialogData.backdrop
                  };
                  var settings = $.extend({}, dialogOptions, dialogData.amsOptions);
                  settings = MyAMS.core.executeFunctionByName(dialogData.amsInit, dialog, settings) || settings;
                  $('<div>').addClass('modal fade').data('dynamic', true).append(content).on('show.bs.modal', modal.show).on('hidden.bs.modal', modal.hidden).modal(settings);

                  if (MyAMS.stats && !(sourceData.amsLogEvent === false || dialogData.amsLogEvent === false)) {
                    MyAMS.stats.logPageview(url);
                  }

              }
            }).then(function () {
              resolve();
            });
          });
        }
      });
    },

    /**
     * Dynamic modal 'shown' callback
     * This callback is used to initialize modal's viewport size
     *
     * @param evt: source event
     */
    show: function show(evt) {
      var dialog = $(evt.target);
      MyAMS.core.initContent(dialog);
    },

    /**
     * Close modal associated with given element
     *
     * @param element: the element contained into closed modal
     */
    close: function close(element) {
      if (typeof element === 'string') {
        element = $(element);
      } else if (typeof element === 'undefined') {
        element = $('.modal-dialog:last');
      }

      var dialog = element.objectOrParentWithClass('modal');

      if (dialog.length > 0) {
        dialog.modal('hide');
      }
    },

    /**
     * Dynamic modal 'hidden' callback
     * This callback is used to remove dynamic modals
     *
     * @param evt: source event
     */
    hidden: function hidden(evt) {
      var dialog = $(evt.target);
      MyAMS.core.clearContent(dialog);

      if (dialog.data('dynamic') === true) {
        dialog.remove();
      }
    }
  };
  /**
   * Global module initialization
   */

  _exports.modal = modal;

  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('modal');
  } else {
    MyAMS.modal = modal;
    console.debug("MyAMS: modal module loaded...");
  }
});
//# sourceMappingURL=mod-modal-dev.js.map
