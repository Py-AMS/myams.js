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
    global.modAjax = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.ajax = void 0;

  /**
   * MyAMS AJAX features
   */
  var $ = MyAMS.$;

  function checkCsrfHeader(request, options) {
    if (window.Cookies) {
      var token = Cookies.get(MyAMS.config.csrfCookieName);

      if (token) {
        request.setRequestHeader(MyAMS.config.csrfHeaderName, token);
      }
    }
  }

  var ajax = {
    /**
     * Check for a given feature, and download script if necessary
     *
     * @param checker: pointer to a resource which will be downloaded if undefined
     * @param source: URL of a javascript file containing requested resource
     * @param callback: pointer to a function which will be called after the script is
     * 		downloaded; first argument of this callback is a boolean value indicating if the
     * 	    script was downloaded for the first time or not
     * @param options: additional callback options argument
     */
    check: function check(checker, source) {
      return new Promise(function (resolve, reject) {
        var deferred = [];

        if (checker === undefined) {
          if (!(source instanceof Array)) {
            source = [source];
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var src = _step.value;
              deferred.push(MyAMS.core.getScript(src));
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
        } else {
          if (!(checker instanceof Array)) {
            checker = [checker];
          }

          for (var index = 0; index < checker.length; index++) {
            if (checker[index] === undefined) {
              deferred.push(MyAMS.core.getScript(source[index]));
            }
          }
        }

        $.when.apply($, deferred).then(function () {
          resolve(deferred.length > 0);
        }, reject);
      });
    },

    /**
     * Get AJAX URL relative to current page
     *
     * @param addr
     */
    getAddr: function getAddr(addr) {
      var href = addr || $('html head base').attr('href') || window.location.href;
      return href.substr(0, href.lastIndexOf('/') + 1);
    },

    /**
     * JQuery AJAX start callback
     */
    start: function start() {
      $('#ajax-gear').show();
    },

    /**
     * JQuery AJAX stop callback
     */
    stop: function stop() {
      $('#ajax-gear').hide();
    },

    /**
     * Hnadle AJAX upload or download progress event
     *
     * @param event: source event
     */
    progress: function progress(event) {
      if (!event.lengthComputable) {
        return;
      }

      if (event.loaded >= event.total) {
        return;
      }

      if (console) {
        console.debug && console.debug("".concat(Math.round(event.loaded / event.total * 100), "%"));
      }
    },

    /**
     * Get data from given URL.
     * This is a simple wrapper around JQuery AJAX api to keep MyAMS API consistent
     *
     * @param url: target URL
     * @param params: url params
     * @param options: AJAX call options
     */
    get: function get(url, params, options) {
      return new Promise(function (resolve, reject) {
        var addr;

        if (url.startsWith(window.location.protocol)) {
          addr = url;
        } else {
          addr = MyAMS.ajax.getAddr() + url;
        }

        var defaults = {
          url: addr,
          type: 'get',
          cache: false,
          data: $.param(params),
          dataType: 'json',
          beforeSend: checkCsrfHeader
        };
        var settings = $.extend({}, defaults, options);
        $.ajax(settings).then(function (result, status, xhr) {
          resolve(result, status, xhr);
        }, function (xhr, status, error) {
          reject(error);
        });
      });
    },

    /**
     * Post data to given URL
     *
     * @param url: target URL
     * @param data: submit data
     * @param options: AJAX call options
     */
    post: function post(url, data, options) {
      return new Promise(function (resolve, reject) {
        var addr;

        if (url.startsWith(window.location.protocol)) {
          addr = url;
        } else {
          addr = MyAMS.ajax.getAddr() + url;
        }

        var defaults = {
          url: addr,
          type: 'post',
          cache: false,
          data: $.param(data),
          dataType: 'json',
          beforeSend: checkCsrfHeader
        };
        var settings = $.extend({}, defaults, options);
        $.ajax(settings).then(function (result, status, xhr) {
          resolve(result, status, xhr);
        }, function (xhr, status, error) {
          reject(error);
        });
      });
    },

    /**
     * Post data to given URL and handle result as JSON
     *
     * This form of function can be used in MyAMS "href" or "data-ams-url" attributes, like in
     * <a href="MyAMS.ajax.getJSON?url=...">Click me!</a>.
     */
    getJSON: function getJSON() {
      return function (options) {
        var url = options.url;
        delete options.url;
        return MyAMS.ajax.post(url, options).then(MyAMS.ajax.handleJSON);
      };
    },

    /**
     * Extract datatype and result from response object
     */
    getResponse: function getResponse(request) {
      var contentType = request.getResponseHeader('content-type');
      var dataType, result;

      if (contentType) {
        // Get server response
        if (contentType.startsWith('application/javascript')) {
          result = request.responseText;
          dataType = 'script';
        } else if (contentType.startsWith('text/html')) {
          result = request.responseText;
          dataType = 'html';
        } else if (contentType.startsWith('text/xml')) {
          result = request.responseText;
          dataType = 'xml';
        } else {
          // Supposed to be JSON...
          result = request.responseJSON;

          if (result) {
            dataType = 'json';
          } else {
            try {
              result = JSON.parse(request.responseText);
              dataType = 'json';
            } catch (e) {
              result = request.responseText;
              dataType = 'text';
            }
          }
        }
      } else {
        // Probably no response from server...
        result = {
          status: 'alert',
          alert: {
            title: MyAMS.i18n.ERROR_OCCURED,
            content: MyAMS.i18n.NO_SERVER_RESPONSE
          }
        };
        dataType = 'json';
      }

      return {
        contentType: dataType,
        data: result
      };
    },

    /**
     * Handle a server response in JSON format
     *
     * Result can be an object with several attributes:
     *  - main response status: alert, error, info, success, callback, callbacks, reload or
     *    redirect
     *  - close_form: boolean indicating if current modal should be closed
     *  - location: target URL for reload or redirect status
     *  - target: target container selector for loaded content ('#content' by default)
     *  - content: available for any status producing output; can be raw HTML, or an object
     *    with attributes:
     *      - target: target container selector (source form by default)
     *      - text or html: raw text or HTML result
     *  - message: available for any status producing an output message; an object with
     *    attributes:
     *      - status: message status
     *      -
     * @param result: response content
     * @param form: source form
     * @param target
     */
    handleJSON: function handleJSON(result, form, target) {
      function closeForm() {
        if (form !== undefined) {
          MyAMS.require('form', function () {
            MyAMS.form.resetChanged(form);
          });

          if (result.closeForm !== false) {
            MyAMS.require('modal', function () {
              MyAMS.modal.close(form);
            });
          }
        }
      }

      var url = null;
      var status = result.status;

      switch (status) {
        case 'alert':
          if (window.alert) {
            var alert = result.alert;
            window.alert("".concat(alert.title, "\n\n").concat(alert.content));
          }

          break;

        case 'error':
          MyAMS.require('error').then(function () {
            MyAMS.error.showErrors(form, result);
          });

          break;

        case 'message':
        case 'messagebox':
        case 'smallbox':
          break;

        case 'info':
        case 'success':
        case 'notify':
        case 'callback':
        case 'callbacks':
          closeForm();
          break;

        case 'modal':
          MyAMS.require('modal').then(function () {
            MyAMS.modal.open(result.location);
          });

          break;

        case 'reload':
          closeForm();
          url = result.location || window.location.hash;

          if (url.startsWith('#')) {
            url = url.substr(1);
          }

          var loadTarget = $(result.target || target || '#content');

          MyAMS.require('skin').then(function () {
            MyAMS.skin.loadURL(url, loadTarget, {
              preLoadCallback: MyAMS.core.getFunctionByName(result.preReload || function () {
                $('[data-ams-pre-reload]', loadTarget).each(function (index, element) {
                  MyAMS.core.executeFunctionByName($(element).data('ams-pre-reload'));
                });
              }),
              preLoadCallbackOptions: result.preReloadOptions,
              afterLoadCallback: MyAMS.core.getFunctionByName(result.postReload || function () {
                $('[data-ams-post-reload]', loadTarget).each(function (index, element) {
                  MyAMS.core.executeFunctionByName($(element).data('ams-post-reload'));
                });
              }),
              afterLoadCallbackOptions: result.postReloadOptions
            });
          });

          break;

        case 'redirect':
          closeForm();
          url = result.location || window.location.href;

          if (url.endsWith('##')) {
            url = url.replace(/##/, window.location.hash);
          }

          if (result.window) {
            window.open(url, result.window, result.options);
          } else {
            if (window.location.href === url) {
              window.location.reload();
            } else {
              window.location.href = url;
            }
          }

          break;

        default:
          if (window.console) {
            console.warn && console.warn("Unhandled JSON response status: ".concat(status));
          }

      } // Single content response


      if (result.content) {
        var content = result.content,
            container = $(content.target || target || '#content');

        if (typeof content === 'string') {
          container.html(content);
        } else {
          if (content.text) {
            container.text(content.text);
          } else {
            container.html(content.html);
          }

          MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, container);

          if (!content.keepHidden) {
            container.removeClass('hidden');
          }
        }
      } // Multiple contents response


      if (result.contents) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = result.contents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _content = _step2.value;

            var _container = $(_content.target);

            if (_content.text) {
              _container.text(_content.text);
            } else {
              _container.html(_content.html);
            }

            MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, _container);

            if (!_content.keepHidden) {
              _container.removeClass('hidden');
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
      } // Response with message


      if (result.message) {
        MyAMS.require('alert').then(function () {
          if (typeof result.message === 'string') {
            MyAMS.alert.smallBox({
              status: status,
              message: result.message,
              icon: 'fa-info-circle',
              timeout: 3000
            });
          } else {
            var message = result.message;
            MyAMS.alert.alert({
              parent: form,
              status: message.status || status,
              header: message.header,
              subtitle: message.subtitle,
              message: message.message
            });
          }
        });
      } // Response with message box


      if (result.messagebox) {
        MyAMS.require('alert').then(function () {
          if (typeof result.messagebox === 'string') {
            MyAMS.alert.messageBox({
              status: status,
              title: MyAMS.i18n.ERROR_OCCURED,
              icon: 'fa-info-circle',
              message: result.messagebox,
              timeout: 10000
            });
          } else {
            var message = result.messagebox;
            MyAMS.alert.messageBox({
              status: message.status || status,
              title: message.title || MyAMS.i18n.ERROR_OCCURED,
              icon: message.icon || 'fa-info-circle',
              message: message.message,
              content: message.content,
              timeout: message.timeout === 0 ? 0 : message.timeout || 10000
            });
          }
        });
      } // Response with small box


      if (result.smallbox) {
        MyAMS.require('alert').then(function () {
          if (typeof result.smallbox === 'string') {
            MyAMS.alert.smallBox({
              status: status,
              message: result.smallbox,
              icon: 'fa-info-circle',
              timeout: 3000
            });
          } else {
            var message = result.smallbox;
            MyAMS.alert.smallBox({
              status: message.status || status,
              message: message.message,
              content: message.content,
              icon: message.icon || 'fa-info-circle',
              timeout: message.timeout
            });
          }
        });
      } // Response with single event


      if (result.event) {
        form.trigger(result.event, result.eventOptions);
      } // Response with multiple events


      if (result.events) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = result.events[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var event = _step3.value;

            if (typeof event === 'string') {
              form.trigger(event, result.eventOptions);
            } else {
              form.trigger(event.event, event.options);
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
      } // Response with single callback


      if (result.callback) {
        MyAMS.core.executeFunctionByName(result.callback, document, form, result.options);
      } // Response with multiple callbacks


      if (result.callbacks) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = result.callbacks[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var callback = _step4.value;

            if (typeof callback === 'string') {
              MyAMS.core.executeFunctionByName(callback, document, form, result.options);
            } else {
              MyAMS.core.executeFunctionByName(callback.callback, document, form, callback.options);
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
    },

    /**
     * JQuery AJAX error handler
     */
    error: function error(event, response, request, _error) {
      // user shouldn't be notified of aborted requests
      if (_error === 'abort') {
        return;
      }

      if (response && response.statusText && response.statusText.toUpperCase() === 'OK') {
        return;
      }

      var parsedResponse = MyAMS.ajax.getResponse(response);

      if (parsedResponse) {
        if (parsedResponse.contentType === 'json') {
          MyAMS.ajax.handleJSON(parsedResponse.data);
        } else {
          MyAMS.require('i18n', 'alert').then(function () {
            var title = _error || event.statusText || event.type,
                message = parsedResponse.responseText;
            MyAMS.alert.messageBox({
              status: 'error',
              title: MyAMS.i18n.ERROR_OCCURED,
              content: "<h4>".concat(title, "</h4><p>").concat(message || '', "</p>"),
              icon: 'fa-exclamation-triangle',
              timeout: 5000
            });
          }, function () {
            if (window.console) {
              console.error && console.error(event);
              console.debug && console.debug(parsedResponse);
            }
          });
        }
      } else {
        if (window.console) {
          console.error && console.error("ERROR: Can't parse response!");
          console.debug && console.debug(response);
        }
      }
    }
  };
  /**
   * AJAX events callbacks
   */

  _exports.ajax = ajax;
  ajax.check(window.Cookies, "".concat(MyAMS.env.baseURL, "../ext/js-cookie").concat(MyAMS.env.devmode ? '.min' : '', ".js")).then(function () {
    var _xhr = $.ajaxSettings.xhr;
    $.ajaxSetup({
      beforeSend: function beforeSend(request, options) {
        if (MyAMS.config.safeMethods.indexOf(options.type) < 0) {
          if (window.Cookies !== undefined) {
            var token = Cookies.get(MyAMS.config.csrfCookieName);

            if (token) {
              request.setRequestHeader(MyAMS.config.csrfHeaderName, token);
            }
          }
        }
      },
      progress: ajax.progress,
      progressUpload: ajax.progress,
      xhr: function xhr() {
        var request = _xhr();

        if (request && typeof request.addEventListener === 'function') {
          if (ajax.progress) {
            request.addEventListener('progress', function (evt) {
              MyAMS.ajax.progress(evt);
            }, false);
          }
        }

        return request;
      }
    });
  });
  $(document).ajaxStart(ajax.start);
  $(document).ajaxStop(ajax.stop);
  $(document).ajaxError(ajax.error);
  /**
   * Global module initialization
   */

  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('ajax');
  } else {
    MyAMS.ajax = ajax;
    console.debug("MyAMS: AJAX module loaded...");
  }
});
//# sourceMappingURL=mod-ajax-dev.js.map
