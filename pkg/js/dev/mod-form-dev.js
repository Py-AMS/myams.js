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
    global.modForm = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _jsrender) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.form = void 0;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

  function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  var $ = MyAMS.$;
  var _initialized = false;
  /**
   * MyAMS "form" module
   */

  var form = {
    init: function init() {
      if (_initialized) {
        return;
      }

      _initialized = true; // Add click listener on submit buttons

      $(document).on('click', '[type="submit"], .submit', function (evt) {
        var button = $(evt.currentTarget);

        if (button.exists()) {
          $(button).closest('form').data('ams-submit-button', button);
        }
      }); // Add unload event listener to check for modified forms

      $(window).on('beforeunload', MyAMS.form.checkBeforeUnload);
    },
    initElement: function initElement(element) {
      // Initialize form buttons
      $(element).on('click', 'button[type="submit"], button.submit', function (evt) {
        var button = $(evt.currentTarget);
        $(button.get(0).form).data('ams-submit-button', button);
      }); // Submit form when CTRL+Enter key is pressed in textarea

      $(element).on('keydown', 'textarea', function (evt) {
        if ((evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey)) {
          $(evt.currentTarget).closest('form').submit();
        }
      }); // Always blur readonly inputs

      $(element).on('focus', 'input[readonly="readonly"]', function (evt) {
        $(evt.currentTarget).blur();
      }); // Prevent bootstrap dialog from blocking TinyMCE focus

      $(element).on('focusin', function (evt) {
        if ($(evt.target).closest('.mce-window').length >= 0) {
          evt.stopImmediatePropagation();
        }
      });
      var forms;

      if (MyAMS.config.warnOnFormChange) {
        forms = $('form[data-ams-warn-on-change!="false"]', element);
      } else {
        forms = $('form[data-ams-warn-on-change="true"]', element);
      }

      forms.each(function (idx, elt) {
        var form = $(elt),
            formData = form.data(),
            callback = formData.amsChangedCallback || MyAMS.config.formChangeCallback;
        $('input, ' + 'select, ' + 'textarea, ' + '[data-ams-changed-event]', form).each(function (idx, elt) {
          var input = $(elt),
              inputData = input.data();

          if (inputData.amsIgnoreChange !== true) {
            var event = inputData.amsChangedEvent || 'change';
            input.on(event, function () {
              MyAMS.form.setChanged(form);
              MyAMS.core.executeFunctionByName(inputData.amsChangedCallback || callback, form, input);
            });
          }
        });
        form.on('reset', function (evt) {
          var form = $(evt.currentTarget);
          MyAMS.form.clearAlerts(form);
          MyAMS.form.resetChanged(form);
        });
      });
      MyAMS.form.setFocus(element);
    },
    setFocus: function setFocus(element) {
      var focused = $('[data-ams-focus-target]', element).first();

      if (!focused.exists()) {
        focused = $('input, select, textarea', element).first();
      }

      if (focused.exists()) {
        focused.focus();
      }
    },
    checkBeforeUnload: function checkBeforeUnload() {
      if (MyAMS.i18n) {
        var forms = $('form[data-ams-form-changed="true"]');

        if (forms.exists()) {
          return MyAMS.i18n.FORM_CHANGED_WARNING;
        }
      }
    },
    confirmChangedForm: function confirmChangedForm(element) {
      return new Promise(function (resolve, reject) {
        var forms = $('form[data-ams-form-changed="true"]', element);

        if (forms.exists()) {
          MyAMS.require('alert').then(function () {
            MyAMS.alert.bigBox({
              status: 'danger',
              title: MyAMS.i18n.WARNING,
              icon: 'text-danger fa-bell',
              message: MyAMS.i18n.FORM_CHANGED_WARNING
            }).then(function (button) {
              if (button === 'success') {
                form.resetChanged(forms);
              }

              resolve(button);
            });
          }, function () {
            reject("Missing 'alert' module!");
          });
        } else {
          form.resetChanged(forms);
          resolve('success');
        }
      });
    },

    /**
     * Update form "chenged" status flag
     */
    setChanged: function setChanged(form) {
      form.attr('data-ams-form-changed', true);
    },

    /**
     * Reset form changed flag
     */
    resetChanged: function resetChanged(form) {
      if (form !== undefined) {
        $(form).removeAttr('data-ams-form-changed');
      }
    },

    /**
     * Set widget's invalid status
     *
     * @param form: parent form
     * @param input: input name
     * @param message: associated message
     */
    setInvalid: function setInvalid(form, input, message) {
      if (typeof input === 'string') {
        input = $("[name=\"".concat(input, "\"]"), form);
      }

      if (input.exists()) {
        var widget = input.closest('.form-widget');
        $('.invalid-feedback', widget).remove();
        $('<span>').text(message).addClass('is-invalid invalid-feedback').appendTo(widget);
        input.removeClass('valid').addClass('is-invalid');
      }
    },

    /**
     * Clear remaining form alerts before submitting form
     */
    clearAlerts: function clearAlerts(form) {
      $('.alert-danger, SPAN.state-error', form).not('.persistent').remove();
      $('.state-error', form).removeClassPrefix('state-');
      $('.invalid-feedback', form).remove();
      $('.is-invalid', form).removeClass('is-invalid');
    },

    /**
     * Submit given form
     *
     * @param form: input form
     * @param handler: AJAX submit target
     * @param options: submit options
     */
    submit: function submit(form, handler) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // check arguments
      form = $(form);

      if (!form.exists()) {
        return false;
      }

      if (_typeof(handler) === 'object') {
        options = handler;
        handler = undefined;
      } // initialize default settings


      var formData = form.data(),
          button = $(formData.amsSubmitButton),
          buttonData = button.data() || {},
          defaults = {
        submitWarning: showFormSubmitWarning,
        getValidators: getFormValidators,
        checkValidators: checkFormValidators,
        clearAlerts: MyAMS.form.clearAlerts,
        initSubmitButton: initFormSubmitButton,
        resetSubmitButton: resetFormSubmitButton,
        getData: getFormData,
        initData: initFormData,
        initDataCallback: null,
        getTarget: getFormTarget,
        initTarget: initFormTarget,
        getAction: getFormAction,
        getAjaxSettings: getFormAjaxSettings,
        getProgressSettings: getFormProgressSettings,
        getProgressState: getFormProgressState,
        submit: submitForm,
        datatype: null,
        submitOptions: null,
        submitHandler: form.attr('action').replace(/#/, ''),
        submitTarget: form.attr('target'),
        submitMessage: null,
        submitCallback: formSubmitCallback,
        progressHandler: null,
        progressFieldName: 'progressId',
        progressInterval: 1000,
        progressCallback: null,
        progressEndCallback: null,
        resetBeforeSubmit: false,
        keepModalOpen: false,
        resetAfterSubmit: resetFormAfterSubmit,
        resetTimeout: 1000,
        resetAfterError: resetFormAfterError,
        downloadTarget: null,
        getDownloadTarget: getFormDownloadTarget,
        initDownloadTarget: initFormDownloadTarget,
        resetDownloadTarget: resetFormDownloadTarget
      },
          settings = $.extend({}, defaults); // extend default values with form, button and options properties

      $.extendPrefix(settings, 'amsForm', function (value) {
        return MyAMS.core.getFunctionByName(value) || value;
      }, formData, buttonData);
      $.extendOnly(settings, options); // prevent multiple submits

      if (formData.submitted) {
        settings.submitWarning(form, settings);
        return false;
      } // check custom submit validators


      settings.checkValidators(form, settings).then(function (status) {
        // check validation status
        if (status !== 'success') {
          return;
        } // submit form


        MyAMS.require('ajax', 'i18n').then(function () {
          MyAMS.ajax.check($.fn.ajaxSubmit, "".concat(MyAMS.env.baseURL, "../ext/jquery-form").concat(MyAMS.env.extext, ".js")).then(function () {
            // clear alerts and initialize submit button
            settings.clearAlerts(form, settings);
            settings.initSubmitButton(form, settings, button); // extract and initialize custom submit data

            var postData = settings.getData(form, settings, formData, button, buttonData, options),
                veto = {
              veto: false
            };
            settings.initData(form, settings, button, postData, options, veto);

            if (veto.veto) {
              settings.resetSubmitButton(form, settings, button);
              return;
            } // get and initialize post target


            var target = settings.getTarget(form, settings, formData, buttonData);

            if (target && target.exists()) {
              settings.initTarget(form, settings, target);
            } // get form action and POST settings


            var action = settings.getAction(form, settings, handler),
                ajaxSettings = settings.getAjaxSettings(form, settings, button, postData, action, target); // get and initialize download target

            var downloadTarget = settings.getDownloadTarget(form, settings);

            if (downloadTarget) {
              settings.initDownloadTarget(form, settings, downloadTarget, ajaxSettings);
            } // get progress settings


            ajaxSettings.progress = settings.getProgressSettings(form, settings, postData); // YESSSS!!!!
            // submit form!!

            settings.submit(form, settings, button, postData, ajaxSettings);

            if (downloadTarget) {
              settings.resetDownloadTarget(form, settings, downloadTarget, ajaxSettings);
            }
          });
        });
      }); // disable standard submit

      return false;
    }
  };
  /**
   * Show warning message if form was already submitted
   *
   * @param form: submitted form
   * @param settings: computed form settings
   */

  _exports.form = form;

  function showFormSubmitWarning(form, settings) {
    if (!form.data('ams-form-hide-submitted')) {
      MyAMS.require('i18n', 'alert').then(function () {
        MyAMS.alert.messageBox({
          status: 'warning',
          title: MyAMS.i18n.WAIT,
          message: MyAMS.i18n.FORM_SUBMITTED,
          icon: 'fa-save',
          timeout: form.data('ams-form-alert-timeout') || 5000
        });
      });
    }
  }
  /**
   * Extract custom validators from given form
   *
   * @param form: checked form
   * @param settings: computed form settings
   * @returns {Map<any, any>}
   */


  function getFormValidators(form, settings) {
    var result = new Map(),
        formValidators = (form.data('ams-form-validator') || '').trim().split(/[\s,;]+/);
    var validators = [];
    $(formValidators).each(function (idx, elt) {
      if (!elt) {
        return;
      }

      validators.push(elt);
    });

    if (validators.length > 0) {
      result.set(form, validators);
    }

    $('[data-ams-form-validator]', form).each(function (idx, elt) {
      var element = $(elt),
          elementValidators = (element.data('ams-form-validator') || '').trim().split(/[\s,;]+/);
      validators = [];
      $(elementValidators).each(function (innerIdx, innerElt) {
        if (!innerElt) {
          return;
        }

        validators.push(innerElt);
      });

      if (validators.length > 0) {
        result.set(element, validators);
      }
    });
    return result;
  }
  /**
   * Check custom form validators.
   * A form can handle several form validators which will be called before the form is submitted.
   *
   *
   * @param form: checked form
   * @param settings: computed form settings
   */


  function checkFormValidators(form, settings) {
    return new Promise(function (resolve, reject) {
      var validators = settings.getValidators(form, settings);

      if (!validators.size) {
        resolve('success');
        return;
      }

      var checks = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = validators.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              context = _step$value[0],
              contextValidators = _step$value[1];

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = contextValidators[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var validator = _step2.value;
              checks.push(MyAMS.core.executeFunctionByName(validator, document, form, context));
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

      $.when.apply($, checks).then(function () {
        var status = 'success',
            output = [];

        for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
          results[_key] = arguments[_key];
        }

        for (var _i = 0, _results = results; _i < _results.length; _i++) {
          var result = _results[_i];

          if (result !== true) {
            status = 'error';

            if (typeof result === 'string') {
              output.push(result);
            } else if ($.isArray(result) && result.length > 0) {
              output = output.concat(result);
            }
          }
        }

        if (output.length > 0) {
          MyAMS.require('i18n', 'alert').then(function () {
            var header = output.length === 1 ? MyAMS.i18n.ERROR_OCCURED : MyAMS.i18n.ERRORS_OCCURED;
            MyAMS.alert.alert({
              parent: form,
              status: 'danger',
              header: header,
              message: output
            });
          });
        }

        resolve(status);
      }, function () {
        reject('error');
      });
    });
  }
  /**
   * Initialize form submit button
   * Button is disabled and text is updated
   */


  function initFormSubmitButton(form, settings, button) {
    var text = button.data('ams-loading-text') || button.text().trim();

    if (text) {
      button.data('original-text', button.text()).prop('disabled', true).text("".concat(text, "..."));
      $('<div>').addClass('progress').appendTo(button);
    } else {
      // button without text
      button.data('original-html', button.html()).prop('disabled', true).html('<i class="fa fa-cog fa-spin"></i>');
    }
  } // reset form submit button


  function resetFormSubmitButton(form, settings, button) {
    $('.progress', button).remove();
    var text = button.data('original-text');

    if (text) {
      button.text(text);
    } else {
      var html = button.data('original-html');

      if (html) {
        button.html(html);
      }
    }

    button.prop('disabled', false);
  } // get form data


  function getFormData(form, settings, formData, button, buttonData, options) {
    var data = $.extend({}, formData.amsFormData, buttonData.amsFormData, options.data),
        name = button.attr('name');

    if (name) {
      data[name] = button.val();
    }

    return data;
  } // initialize form data


  function initFormData(form, settings, button, postData, options, veto) {
    var callback = settings.initDataCallback;

    if (callback) {
      $.extend(postData, callback(form, settings, button, postData, options, veto));
    }

    form.trigger('init-data.ams.form', [postData, veto]);
  } // get form target


  function getFormTarget(form, settings, formData, buttonData) {
    return $(settings.submitTarget);
  } // initialize form target


  var TARGET_INIT_TEMPLATE_STRING = "\n\t<div class=\"row m-3\">\n\t\t<div class=\"text-center w-100\">\n\t\t\t<i class=\"fa fa-3x fa-cog fa-spin\"></i>\n\t\t\t{{if message}}\n\t\t\t<strong>{{:message}}</strong>\n\t\t\t{{/if}}\n\t\t</div>\n\t</div>";
  var TARGET_INIT_TEMPLATE = $.templates({
    markup: TARGET_INIT_TEMPLATE_STRING
  });

  function initFormTarget(form, settings, target) {
    target.html(TARGET_INIT_TEMPLATE.render({
      message: settings.submitMessage
    }));
    target.parents('.hidden').removeClass('hidden');
  } // get form action


  function getFormAction(form, settings, handler) {
    var url;
    var formHandler = handler || settings.submitHandler;

    if (formHandler.startsWith(window.location.protocol)) {
      url = formHandler;
    } else {
      url = MyAMS.ajax.getAddr() + formHandler;
    }

    return url;
  } // get AJAX POST submit settings


  function getFormAjaxSettings(form, settings, button, postData, action, target) {
    var base = {
      url: action,
      type: 'post',
      cache: false,
      data: postData,
      dataType: settings.datatype,
      beforeSerialize: function beforeSerialize() {
        var veto = {
          veto: false
        };
        form.trigger('before-serialize.ams.form', [veto]);

        if (veto.veto) {
          return false;
        }

        if (typeof window.tinyMCE !== 'undefined') {
          tinyMCE.triggerSave();
        }
      },
      beforeSubmit: function beforeSubmit(data, form) {
        var veto = {
          veto: false
        };
        form.trigger('before-submit.ams.form', [data, veto]);

        if (veto.veto) {
          return false;
        }

        form.data('submitted', true);

        if (settings.resetBeforeSubmit) {
          setTimeout(function () {
            settings.resetSubmitButton(form, settings, button);
          }, 250);
        }
      },
      uploadProgress: function uploadProgress(evt, position, total, completed) {
        $('.progress', button).css('background-image', "linear-gradient(to right, white -45%, green ".concat(completed, "%, red ").concat(completed, "%, red)"));
      },
      complete: function complete(xhr) {
        form.trigger('complete.ams.form', [xhr]);
      },
      success: function success(result, status, request, form) {
        var veto = {
          veto: false
        };
        form.trigger('submit-success.ams.form', [result, status, request, veto]);

        if (veto.veto) {
          return;
        }

        var modal = form.closest('.modal-dialog');

        if (modal.exists() && !settings.keepModalOpen) {
          MyAMS.modal && MyAMS.modal.close(modal);
        }

        try {
          settings.submitCallback(form, settings, target, result, status, request);
        } finally {
          settings.resetAfterSubmit(form, settings, button);
          MyAMS.form.resetChanged(form);
        }
      },
      error: function error(request, status, _error, form) {
        form.trigger('submit-error.ams.form', [request, status, _error, target]);

        if (target) {
          settings.resetAfterError(form, settings, button, target);
        }

        settings.resetAfterSubmit(form, settings, button);
      },
      iframe: false
    };
    return $.extend({}, base, settings.submitOptions);
  } // get form submit processing progress settings


  function getFormProgressSettings(form, settings, postData) {
    var handler = settings.progressHandler;

    if (handler) {
      var fieldname = settings.progressFieldName;
      postData[fieldname] = MyAMS.core.generateUUID();
      return {
        handler: handler,
        interval: settings.progressInterval,
        fieldname: fieldname,
        callback: settings.progressCallback,
        endCallback: settings.progressEndCallback
      };
    }
  } // get form submit progress state


  function getFormProgressState(form, settings, postData, progress) {
    var timeout = setTimeout(_getProgressState, progress.interval);

    function _getProgressState() {
      var data = {};
      data[progress.fieldname] = postData[progress.fieldname];
      MyAMS.ajax.post(progress.handler, data).then(MyAMS.core.getFunctionByName(progress.callback || function (result, status) {
        if (status === 'success') {
          if (result.status === 'running') {
            if (result.message) {
              target.text(result.message);
            } else {
              var text = result.progress || target.data('ams-progress-text') || MyAMS.i18n.PROGRESS;

              if (result.current) {
                text += ": ".concat(result.current, " / ").concat(result.length || 100);
              } else {
                text += '...';
              }

              target.text(text);
            }

            timeout = setTimeout(_getProgressState, progress.interval);
          } else if (result.status === 'finished') {
            _clearProgressState();
          }
        } else {
          _clearProgressState();
        }
      }), _clearProgressState);
    }

    function _clearProgressState() {
      clearTimeout(timeout);
      settings.resetSubmitButton(form, settings, target);
      MyAMS.core.executeFunctionByName(progress.endCallback, document, form, settings, target);
      MyAMS.form.resetChanged(form);
    }
  } // submit form


  function submitForm(form, settings, button, postData, ajaxSettings) {
    if (ajaxSettings.progress) {
      settings.getProgressState(form, settings, postData, ajaxSettings.progress);
    }

    form.ajaxSubmit(ajaxSettings);
  }
  /**
   * Default form submit callback
   * 
   * @param form
   * @param settings: computed form settings
   * @param target
   * @param result
   * @param status
   * @param request
   */


  function formSubmitCallback(form, settings, target, result, status, request) {
    var dataType = settings.datatype;

    if (!dataType) {
      var response = MyAMS.ajax.getResponse(request);

      if (response) {
        dataType = response.contentType;
        result = response.data;
      }
    }

    switch (dataType) {
      case 'json':
        MyAMS.ajax.handleJSON(result, form, target);
        break;

      case 'script':
      case 'xml':
        break;

      default:
        // text or html
        MyAMS.form.resetChanged(form);
        target.css({
          opacity: '0.0'
        });
        target.removeClass('hidden').parents('.hidden').removeClass('.hidden');
        target.html(result).delay(50).animate({
          opacity: '1.0'
        }, 250);
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, target);
    }

    var callback = request.getResponseHeader('X-AMS-Callback');

    if (callback) {
      var options = request.getResponseHeader('X-AMS-Callback-Options') || "{}";
      MyAMS.core.executeFunctionByName(callback, document, form, settings, options, result, status, request);
    }

    form.trigger('after-submit.ams.form', [result]);
  }
  /**
   * Reset AJAX form after submit
   * 
   * @param form: current form
   * @param settings: computed form settings
   * @param button: button used to submit the form, if any
   */


  function resetFormAfterSubmit(form, settings, button) {
    if (form.data('submitted')) {
      settings.resetSubmitButton(form, settings, button);
      form.data('submitted', false);
      form.removeData('ams-submit-button');
      form.trigger('after-reset.ams.form');
    }
  }
  /**
   * Reset form after submit error
   *
   * @param form: current form
   * @param settings: computed form settings
   * @param target: previous form target
   */


  function resetFormAfterError(form, settings, target) {
    $('i', target).removeClass('fa-spin').removeClass('fa-cog').addClass('fa-ambulance');
  } // get form download target


  function getFormDownloadTarget(form, settings) {
    return settings.downloadTarget;
  } // initialize download target


  function initFormDownloadTarget(form, settings, target, ajaxSettings) {
    var iframe = $("iframe[name=\"".concat(target, "\"]"));

    if (!iframe.exists()) {
      iframe = $('<iframe>').attr('name', target).hide().appendTo(MyAMS.core.root);
    }

    $.extend(ajaxSettings, {
      iframe: true,
      iframeTarget: iframe
    });
  } // reset if download target


  function resetFormDownloadTarget(form, settings, target, ajaxSettings) {
    var modal = form.closest('.modal-dialog'),
        keepModal = settings.keepModalOpen;

    if (modal.exists() && keepModal !== true) {
      MyAMS.require('modal').then(function () {
        MyAMS.modal.close(modal);
      });
    }

    if (!ajaxSettings.progress) {
      setTimeout(function () {
        settings.resetAfterSubmit(form, settings, button);
        MyAMS.form.resetChanged(form);
      }, settings.resetTimeout);
    }
  }
  /**
   * Global module initialization
   */


  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('form');
    } else {
      MyAMS.form = form;
      console.debug("MyAMS: form module loaded...");
    }
  }
});
//# sourceMappingURL=mod-form-dev.js.map
