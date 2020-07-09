(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.modPlugins = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  "use strict";

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  /* global MyAMS, bsCustomFileInput */

  /**
   * MyAMS standard plugins
   */
  var $ = MyAMS.$;
  /**
   * Fieldset checker plug-in
   * A checker is like a simple switcher, but also provides a checkbox which is used
   * as "switcher" input field.
   * The "checker" class is applied to the fieldset legend; checkbox is created automatically
   * by the plug-in.
   * Check options are given as data attributes, all prefixed with "ams-checker-":
   *  - state: is 'off' by default; can be set to 'on' to automatically activate the checker
   *  - mode: is 'hide' by default, which make the fieldset hidden when the checker is not activated;
   *    you cna set it to "disable" to make fieldset content visible but disabled when the checker
   *    is not activated
   *  - fieldname: is the name of the input checkbox created by the plug-in
   *  - value: this is the "checked" value of the main checkbox field
   *  - readonly: if "true", the checkbox is disabled and in read-only mode
   *  - hidden-prefix: if not null, this is a prefix which will be assigned to an additional
   *    hidden input field, updated automatically when the checker is switched; the name of the
   *    hidden input if made of this prefix, followed by the "fieldname" value
   *  - value-on: this is the "checked" value of the hidden input; "true" by default
   *  - value-off: this is the "unchecked" value of the hidden input; "false" by default
   *  - marker: if not null, another hidden input with a fixed value of 1 will be created; the name
   *    of this input will be the "fieldname" value followed by this "marker" value
   *  - change-handler: this optional handler will be called on checker switch
   *  - cancel-default: if "true", the default behaviour will not be executed on checker switch
   */

  var CHECKER_TEMPLATE_STRING = "\n\t<span class=\"custom-control custom-switch\">\n\t\t<input type=\"checkbox\"\n\t\t\t   id=\"{{: fieldId }}\" name=\"{{: fieldName }}\"\n\t\t\t   class=\"custom-control-input checker\"\n\t\t\t   {{if checked}}checked{{/if}}\n\t\t\t   {{if readonly}}disabled{{/if}}\n\t\t\t   value=\"{{: value }}\" />\n\t\t{{if prefix}}\n\t\t<input type=\"hidden\" class=\"prefix\"\n\t\t\t   id=\"{{: prefix}}{{: fieldName}}_prefix\"\n\t\t\t   name=\"{{: prefix}}{{: fieldName}}\"\n\t\t\t   value=\"{{if state==='on'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}\" />\n\t\t{{else marker}}\n\t\t<input type=\"hidden\" class=\"marker\"\n\t\t\t   name=\"{{: fieldName}}{{: marker}}\"\n\t\t\t   value=\"1\" />\n\t\t{{/if}}\n\t\t<label for=\"{{: fieldId }}\"\n\t\t\t   class=\"custom-control-label\">\n\t\t\t{{: legend }}\n\t\t</label>\n\t</span>\n";
  var CHECKER_TEMPLATE = $.templates({
    markup: CHECKER_TEMPLATE_STRING
  });

  function checker(element) {
    $('legend.checker', element).each(function (idx, elt) {
      var legend = $(elt),
          data = legend.data();

      if (!data.amsChecker) {
        var fieldset = legend.parent('fieldset'),
            checked = fieldset.hasClass('switched') || data.amsCheckerState === 'on',
            fieldName = data.amsCheckerFieldname || "checker_".concat(MyAMS.core.generateId()),
            fieldId = fieldName.replace(/\./g, '_'),
            prefix = data.amsCheckerHiddenPrefix,
            marker = data.amsCheckerMarker || false,
            checkerMode = data.amsCheckerMode || 'hide',
            checkedValue = data.amsCheckerValueOn || 'true',
            uncheckedValue = data.amsCheckerValueOff || 'false',
            props = {
          legend: legend.text(),
          fieldName: fieldName,
          fieldId: fieldId,
          value: data.amsCheckerValue || true,
          checked: checked,
          readonly: data.amsCheckerReadonly,
          prefix: prefix,
          state: data.amsCheckerState,
          checkedValue: checkedValue,
          uncheckedValue: uncheckedValue,
          marker: marker
        };
        legend.html(CHECKER_TEMPLATE.render(props));
        $('input', legend).change(function (evt) {
          var input = $(evt.target),
              checked = input.is(':checked'),
              veto = {
            veto: false
          };
          legend.trigger('before-switch.ams.checker', [legend, veto]);

          if (veto.veto) {
            input.prop('checked', !checked);
            return;
          }

          MyAMS.core.executeFunctionByName(data.amsCheckerChangeHandler, document, legend, checked);

          if (!data.amsCheckerCancelDefault) {
            var _prefix = input.siblings('.prefix');

            if (checkerMode === 'hide') {
              if (checked) {
                fieldset.removeClass('switched');

                _prefix.val(checkedValue);

                legend.trigger('opened.ams.checker', [legend]);
              } else {
                fieldset.addClass('switched');

                _prefix.val(uncheckedValue);

                legend.trigger('closed.ams.checker', [legend]);
              }
            } else {
              fieldset.prop('disabled', !checked);

              _prefix.val(checked ? checkedValue : uncheckedValue);
            }
          }
        });
        legend.closest('form').on('reset', function () {
          var checker = $('.checker', legend);

          if (checker.prop('checked') !== checked) {
            checker.click();
          }
        });

        if (!checked) {
          if (checkerMode === 'hide') {
            fieldset.addClass('switched');
          } else {
            fieldset.prop('disabled', true);
          }
        }

        legend.data('ams-checker', true);
      }
    });
  }
  /**
   * Context menu plug-in
   */


  function contextMenu(element) {
    var menus = $('.context-menu', element);

    if (menus.length > 0) {
      MyAMS.require('menu').then(function () {
        menus.each(function (idx, elt) {
          var menu = $(elt),
              data = menu.data(),
              options = {
            menuSelector: data.amsContextmenuSelector || data.amsMenuSelector
          };
          var settings = $.extend({}, options, data.amsContextmenuOptions || data.amsOptions);
          settings = MyAMS.core.executeFunctionByName(data.amsContextmenuinitCallback || data.amsInit, menu, settings) || settings;
          var plugin = menu.contextMenu(settings);
          MyAMS.core.executeFunctionByName(data.amsContextmenuAfterInitCallback || data.amsAfterinit, menu, plugin, settings);
        });
      });
    }
  }
  /**
   * Bootstrap custom file input manager
   */


  function fileInput(element) {
    var inputs = $('.custom-file-input', element);

    if (inputs.length > 0) {
      MyAMS.require('ajax').then(function () {
        MyAMS.ajax.check(window.bsCustomFileInput, "".concat(MyAMS.env.baseURL, "../ext/bs-custom-file-input").concat(MyAMS.env.extext, ".js")).then(function () {
          $(inputs).each(function (idx, elt) {
            var input = $(elt),
                inputId = input.attr('id'),
                inputSelector = inputId ? "#".concat(inputId) : input.attr('name'),
                form = $(elt.form),
                formId = form.attr('id'),
                formSelector = formId ? "#".concat(formId) : form.attr('name');
            bsCustomFileInput.init(inputSelector, formSelector);
          });
        });
      });
    }
  }
  /**
   * Select2 plug-in integration
   */


  var _select2Helpers = {
    select2UpdateHiddenField: function select2UpdateHiddenField(input) {
      var values = [];
      input.parent().find('ul.select2-selection__rendered').children('li[title]').each(function (idx, elt) {
        values.push(input.children("option[data-content=\"".concat(elt.title, "\"]")).attr('value'));
      });
      input.data('select2-target').val(values.join(input.data('ams-select2-separator') || ','));
    }
  };

  function select2(element) {
    var selects = $('.select2', element);

    if (selects.length > 0) {
      MyAMS.require('ajax', 'helpers').then(function () {
        MyAMS.ajax.check($.fn.select2, "".concat(MyAMS.env.baseURL, "../ext/select2/select2").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          var required = [];

          if (firstLoad) {
            required.push(MyAMS.core.getScript("".concat(MyAMS.env.baseURL, "../ext/select2/i18n/").concat(MyAMS.i18n.language, ".js")));
            required.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL, "../../css/ext/select2").concat(MyAMS.env.extext, ".css"), 'select2'));
            required.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL, "../../css/ext/select2-bootstrap4").concat(MyAMS.env.extext, ".css"), 'select2_bs4'));
          }

          $.when.apply($, required).then(function () {
            selects.each(function (idx, elt) {
              var select = $(elt),
                  data = select.data();

              if (data.select2) {
                return; // already initialized
              }

              var defaultOptions = {
                theme: 'bootstrap4',
                language: MyAMS.i18n.language
              };

              if (select.hasClass('sortable')) {
                // create hidden input for sortable selections
                var hidden = $("<input type=\"hidden\" name=\"".concat(select.attr('name'), "\">")).insertAfter(select);
                hidden.val($('option:selected', select).listattr('value').join(data.amsSelect2Separator || ','));
                select.data('select2-target', hidden).removeAttr('name');

                defaultOptions.templateSelection = function (data) {
                  var elt = $(data.element);
                  elt.attr('data-content', elt.html());
                  return data.text;
                };
              }

              var settings = $.extend({}, defaultOptions, data.amsSelect2Options || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsSelect2InitCallback || data.amsInit, select, settings) || settings;
              var plugin = select.select2(settings);
              select.on('select2:opening select2:selecting select2:unselecting select2:clearing', function (evt) {
                if ($(evt.target).is(':disabled')) {
                  return false;
                }
              });
              select.on('select2:opening', function (evt) {
                var modal = $(evt.currentTarget).parents('.modal').first();

                if (modal.exists()) {
                  var zIndex = parseInt(modal.css('z-index'));
                  plugin.data('select2').$dropdown.css('z-index', zIndex + 1);
                }
              });

              if (select.hasClass('sortable')) {
                MyAMS.ajax.check($.fn.sortable, "".concat(MyAMS.env.baseURL, "../ext/jquery-ui").concat(MyAMS.env.extext, ".js")).then(function () {
                  select.parent().find('ul.select2-selection__rendered').sortable({
                    containment: 'parent',
                    update: function update() {
                      _select2Helpers.select2UpdateHiddenField(select);
                    }
                  });
                  select.on('select2:select select2:unselect', function (evt) {
                    var id = evt.params.data.id,
                        target = $(evt.currentTarget),
                        option = target.children("option[value=\"".concat(id, "\"]"));
                    MyAMS.helpers.moveElementToParentEnd(option);
                    target.trigger('change');

                    _select2Helpers.select2UpdateHiddenField(target);
                  });
                });
              }

              MyAMS.core.executeFunctionByName(data.amsSelect2AfterInitCallback || data.amsAfterInit, select, plugin, settings);
            });
          });
        });
      });
    }
  }
  /**
   * SVG image plug-in
   */


  function svgPlugin(element) {
    var svgs = $('.svg-container', element);

    if (svgs.length > 0) {
      svgs.each(function (idx, elt) {
        var container = $(elt),
            svg = $('svg', container),
            width = svg.attr('width'),
            height = svg.attr('height');

        if (width && height) {
          elt.setAttribute('viewBox', "0 0 ".concat(Math.round(parseFloat(width)), " ").concat(Math.round(parseFloat(height))));
        }

        svg.attr('width', '100%').attr('height', 'auto');
      });
    }
  }
  /**
   * Fieldset switcher plug-in
   */


  function switcher(element) {
    $('legend.switcher', element).each(function (idx, elt) {
      var legend = $(elt),
          fieldset = legend.parent('fieldset'),
          data = legend.data(),
          minusClass = data.amsSwitcherMinusClass || data.amsMinusClass || 'minus',
          plusClass = data.amsSwitcherPlusClass || data.amsPlusClass || 'plus';

      if (!data.amsSwitcher) {
        $("<i class=\"fa fa-".concat(data.amsSwitcherState === 'open' ? minusClass : plusClass, " mr-2\"></i>")).prependTo(legend);
        legend.on('click', function (evt) {
          evt.preventDefault();
          var veto = {};
          legend.trigger('before-switch.ams.switcher', [legend, veto]);

          if (veto.veto) {
            return;
          }

          if (fieldset.hasClass('switched')) {
            fieldset.removeClass('switched');
            MyAMS.core.switchIcon($('i', legend), plusClass, minusClass);
            legend.trigger('opened.ams.switcher', [legend]);
            var id = legend.attr('id');

            if (id) {
              $("legend.swicther[data-ams-switcher-sync=\"".concat(id, "\"]"), fieldset).each(function (idx, elt) {
                var switcher = $(elt);

                if (switcher.parents('fieldset').hasClass('switched')) {
                  switcher.click();
                }
              });
            }
          } else {
            fieldset.addClass('switched');
            MyAMS.core.switchIcon($('i', legend), minusClass, plusClass);
            legend.trigger('closed.ams.switcher', [legend]);
          }
        });

        if (data.amsSwitcherState !== 'open') {
          fieldset.addClass('switched');
        }

        legend.data('ams-switcher', true);
      }
    });
  }
  /**
   * Form validation plug-in
   */


  function validate(element) {
    var forms = $('form:not([novalidate])', element);

    if (forms.length > 0) {
      MyAMS.require('ajax', 'i18n').then(function () {
        MyAMS.ajax.check($.fn.validate, "".concat(MyAMS.env.baseURL, "../ext/validate/jquery-validate").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          if (firstLoad && MyAMS.i18n.language !== 'en') {
            MyAMS.core.getScript("".concat(MyAMS.env.baseURL, "../ext/validate/i18n/messages_").concat(MyAMS.i18n.language).concat(MyAMS.env.extext, ".js")).then(function () {});
          }

          forms.each(function (idx, elt) {
            var form = $(elt),
                data = form.data(),
                dataOptions = {
              ignore: null,
              invalidHandler: MyAMS.core.getFunctionByName(data.amsValidateInvalidHandler) || function (evt, validator) {
                // automatically display hidden fields with errors!
                $('span.is-invalid', form).remove();
                $('.is-invalid', form).removeClass('is-invalid');

                var _iterator = _createForOfIteratorHelper(validator.errorList),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var error = _step.value;

                    var _element = $(error.element),
                        panels = _element.parents('.tab-pane'),
                        fieldsets = _element.parents('fieldset.switched');

                    fieldsets.each(function (idx, elt) {
                      $('legend.switcher', elt).click();
                    });
                    panels.each(function (idx, elt) {
                      var panel = $(elt),
                          tabs = panel.parents('.tab-content').siblings('.nav-tabs');
                      $("li:nth-child(".concat(panel.index() + 1, ")"), tabs).addClass('is-invalid');
                      $('li.is-invalid:first a', tabs).click();
                    });
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              },
              errorElement: data.amsValidateErrorElement || 'span',
              errorClass: data.amsValidateErrorClass || 'is-invalid',
              errorPlacement: MyAMS.core.getFunctionByName(data.amsvalidateErrorPlacement) || function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-widget').append(error);
              },
              submitHandler: MyAMS.core.getFunctionByName(data.amsValidateSubmitHandler) || (form.attr('data-async') !== undefined ? function () {
                MyAMS.require('form').then(function () {
                  MyAMS.form.submit(form);
                });
              } : function () {
                form.get(0).submit();
              })
            };
            $('[data-ams-validate-rules]', form).each(function (idx, elt) {
              if (idx === 0) {
                dataOptions.rules = {};
              }

              dataOptions.rules[$(elt).attr('name')] = $(elt).data('ams-validate-rules');
            });
            $('[data-ams-validate-messages]', form).each(function (idx, elt) {
              if (idx === 0) {
                dataOptions.messages = {};
              }

              dataOptions.messages[$(elt).attr('name')] = $(elt).data('ams-validate-messages');
            });
            var settings = $.extend({}, dataOptions, data.amsValidateOptions || data.amsOptions);
            settings = MyAMS.core.executeFunctionByName(data.amsValidateInitCallback || data.amsInit, form, settings) || settings;
            var plugin = form.validate(settings);
            MyAMS.core.executeFunctionByName(data.amsValidateAfterInitCallback || data.amsAfterInit, form, plugin, settings);
          });
        });
      });
    }
  }
  /**
   * Global module initialization
   */


  if (window.MyAMS) {
    // register loaded plug-ins
    MyAMS.registry.register(checker, 'checker');
    MyAMS.registry.register(contextMenu, 'contextMenu');
    MyAMS.registry.register(fileInput, 'fileInput');
    MyAMS.registry.register(select2, 'select2');
    MyAMS.registry.register(svgPlugin, 'svg');
    MyAMS.registry.register(switcher, 'switcher');
    MyAMS.registry.register(validate, 'validate'); // register module

    MyAMS.config.modules.push('plugins');

    if (!MyAMS.env.bundle) {
      console.debug("MyAMS: plugins module loaded...");
    }
  }
});
//# sourceMappingURL=mod-plugins-dev.js.map
