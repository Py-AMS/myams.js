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
    global.modPlugins = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.checker = checker;
  _exports.contextMenu = contextMenu;
  _exports.datatables = datatables;
  _exports.dragdrop = dragdrop;
  _exports.fileInput = fileInput;
  _exports.select2 = select2;
  _exports.svgPlugin = svgPlugin;
  _exports.switcher = switcher;
  _exports.validate = validate;

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  /* global MyAMS, bsCustomFileInput */

  /**
   * MyAMS standard plugins
   */
  var $ = MyAMS.$;

  if (!$.templates) {
    var jsrender = require('jsrender');

    $.templates = jsrender.templates;
  }
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
    return new Promise(function (resolve, reject) {
      var checkers = $('legend.checker', element);

      if (checkers.length > 0) {
        checkers.each(function (idx, elt) {
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
            },
                veto = {
              veto: false
            };
            legend.trigger('before-init.ams.checker', [legend, props, veto]);

            if (veto.veto) {
              return;
            }

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

            legend.trigger('after-init.ams.checker', [legend]);
            legend.data('ams-checker', true);
          }
        });
        resolve(checkers);
      } else {
        resolve(null);
      }
    });
  }
  /**
   * Context menu plug-in
   */


  function contextMenu(element) {
    return new Promise(function (resolve, reject) {
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
            settings = MyAMS.core.executeFunctionByName(data.amsContextmenuInitCallback || data.amsInit, document, menu, settings) || settings;
            var veto = {
              veto: false
            };
            menu.trigger('before-init.ams.contextmenu', [menu, settings, veto]);

            if (veto.veto) {
              return;
            }

            var plugin = menu.contextMenu(settings);
            MyAMS.core.executeFunctionByName(data.amsContextmenuAfterInitCallback || data.amsAfterInit, document, menu, plugin, settings);
            menu.trigger('after-init.ams.contextmenu', [menu, plugin]);
          });
        }, reject).then(function () {
          resolve(menus);
        });
      } else {
        resolve(null);
      }
    });
  }
  /**
   * JQuery Datatable plug-in
   */


  var _datatablesHelpers = {
    init: function init() {
      // Add autodetect formats
      try {
        var _types = $.fn.dataTable.ext.type;
      } catch (e) {
        return;
      }

      types.detect.unshift(function (data) {
        if (data !== null && data.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3}$/)) {
          return 'date-euro';
        }

        return null;
      });
      types.detect.unshift(function (data) {
        if (data !== null && data.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3} - ([0-1][0-9]|2[0-3]):[0-5][0-9]$/)) {
          return 'datetime-euro';
        }

        return null;
      }); // Add sorting methods

      $.extend(types.order, {
        // numeric values using commas separators
        "numeric-comma-asc": function numericCommaAsc(a, b) {
          var x = a.replace(/,/, ".").replace(/ /g, '');
          var y = b.replace(/,/, ".").replace(/ /g, '');
          x = parseFloat(x);
          y = parseFloat(y);
          return x < y ? -1 : x > y ? 1 : 0;
        },
        "numeric-comma-desc": function numericCommaDesc(a, b) {
          var x = a.replace(/,/, ".").replace(/ /g, '');
          var y = b.replace(/,/, ".").replace(/ /g, '');
          x = parseFloat(x);
          y = parseFloat(y);
          return x < y ? 1 : x > y ? -1 : 0;
        },
        // date-euro column sorter
        "date-euro-pre": function dateEuroPre(a) {
          var trimmed = $.trim(a);
          var x;

          if (trimmed !== '') {
            var frDate = trimmed.split('/');
            x = (frDate[2] + frDate[1] + frDate[0]) * 1;
          } else {
            x = 10000000; // = l'an 1000 ...
          }

          return x;
        },
        "date-euro-asc": function dateEuroAsc(a, b) {
          return a - b;
        },
        "date-euro-desc": function dateEuroDesc(a, b) {
          return b - a;
        },
        // datetime-euro column sorter
        "datetime-euro-pre": function datetimeEuroPre(a) {
          var trimmed = $.trim(a);
          var x;

          if (trimmed !== '') {
            var frDateTime = trimmed.split(' - ');
            var frDate = frDateTime[0].split('/');
            var frTime = frDateTime[1].split(':');
            x = (frDate[2] + frDate[1] + frDate[0] + frTime[0] + frTime[1]) * 1;
          } else {
            x = 100000000000; // = l'an 1000 ...
          }

          return x;
        },
        "datetime-euro-asc": function datetimeEuroAsc(a, b) {
          return a - b;
        },
        "datetime-euro-desc": function datetimeEuroDesc(a, b) {
          return b - a;
        }
      });
    }
  };

  function datatables(element) {
    var baseJS = "".concat(MyAMS.env.baseURL, "../ext/datatables/"),
        baseCSS = "".concat(MyAMS.env.baseURL, "../../css/ext/datatables/");
    return new Promise(function (resolve, reject) {
      var tables = $('.datatable', element);

      if (tables.length > 0) {
        MyAMS.ajax.check($.fn.dataTable, "".concat(MyAMS.env.baseURL, "../ext/datatables/dataTables").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          var required = [];

          if (firstLoad) {
            required.push(MyAMS.core.getScript("".concat(baseJS, "dataTables-bootstrap4").concat(MyAMS.env.extext, ".js")));
            required.push(MyAMS.core.getCSS("".concat(baseCSS, "dataTables-bootstrap4").concat(MyAMS.env.extext, ".css"), 'datatables-bs4'));
          }

          $.when.apply($, required).then(function () {
            var css = {},
                bases = [],
                extensions = [],
                depends = [],
                loaded = {};
            tables.each(function (idx, elt) {
              var table = $(elt),
                  data = table.data();

              if (data.buttons === 'default') {
                table.attr('data-buttons', '["copy", "print"]');
                table.removeData('buttons');
                data.buttons = table.data('buttons');
              } else if (data.buttons === 'all') {
                table.attr('data-buttons', '["copy", "csv", "excel", "print", "pdf", "colvis"]');
                table.removeData('buttons');
                data.buttons = table.data('buttons');
              }

              if (data.autoFill && !loaded.autoFill && !$.fn.dataTable.AutoFill) {
                bases.push("".concat(baseJS, "autoFill").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "autoFill-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-autofill-bs4'] = "".concat(baseCSS, "autoFill-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.autoFill = true;
              }

              if (data.buttons) {
                if (!loaded.buttons && !$.fn.dataTable.Buttons) {
                  bases.push("".concat(baseJS, "buttons").concat(MyAMS.env.extext, ".js"));
                  extensions.push("".concat(baseJS, "buttons-bootstrap4").concat(MyAMS.env.extext, ".js"));
                  extensions.push("".concat(baseJS, "buttons-html5").concat(MyAMS.env.extext, ".js"));
                  css['dt-buttons-bs4'] = "".concat(baseCSS, "buttons-bootstrap4").concat(MyAMS.env.extext, ".css");
                  loaded.buttons = true;
                }

                if ($.isArray(data.buttons)) {
                  if (data.buttons.indexOf('print') >= 0) {
                    if (!loaded.buttons_print && !$.fn.dataTable.ext.buttons.print) {
                      depends.push("".concat(baseJS, "buttons-print").concat(MyAMS.env.extext, ".js"));
                      loaded.buttons_print = true;
                    }
                  }

                  if (data.buttons.indexOf('excel') >= 0) {
                    if (!loaded.buttons_excel && !$.fn.dataTable.ext.buttons.excelHtml5) {
                      bases.push("".concat(baseJS, "jszip").concat(MyAMS.env.extext, ".js"));
                      loaded.buttons_excel = true;
                    }
                  }

                  if (data.buttons.indexOf('pdf') >= 0) {
                    if (!loaded.buttons_pdf && !window.pdfMake) {
                      bases.push("".concat(baseJS, "pdfmake").concat(MyAMS.env.extext, ".js"));
                      extensions.push("".concat(baseJS, "vfs_fonts").concat(MyAMS.env.extext, ".js"));
                      loaded.buttons_pdf = true;
                    }
                  }

                  if (data.buttons.indexOf('colvis') >= 0) {
                    if (!loaded.buttons_colvis && !$.fn.dataTable.ext.buttons.colvis) {
                      depends.push("".concat(baseJS, "buttons-colVis").concat(MyAMS.env.extext, ".js"));
                      loaded.buttons_colvis = true;
                    }
                  }
                }
              }

              if (data.colReorder && !loaded.colReorder && !$.fn.dataTable.ColReorder) {
                bases.push("".concat(baseJS, "colReorder").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "colReorder-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-colreorder-bs4'] = "".concat(baseCSS, "colReorder-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.colReorder = true;
              }

              if (data.fixedColumns && !loaded.fixedColumns && !$.fn.dataTable.FixedColumns) {
                bases.push("".concat(baseJS, "fixedColumns").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "fixedColumns-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-fixedcolumns-bs4'] = "".concat(baseCSS, "fixedColumns-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.fixedColumns = true;
              }

              if (data.fixedHeader && !loaded.fixedHeader && !$.fn.dataTable.FixedHeader) {
                bases.push("".concat(baseJS, "fixedHeader").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "fixedHeader-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-fixedheader-bs4'] = "".concat(baseCSS, "fixedHeader-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.fixedHeader = true;
              }

              if (data.keyTable && !loaded.keyTable && !$.fn.dataTable.KeyTable) {
                bases.push("".concat(baseJS, "keyTable").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "keyTable-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-keytable-bs4'] = "".concat(baseCSS, "keyTable-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.keyTable = true;
              }

              if (data.responsive !== false && !loaded.responsive && !$.fn.dataTable.Responsive) {
                bases.push("".concat(baseJS, "responsive").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "responsive-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-responsive-bs4'] = "".concat(baseCSS, "responsive-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.responsive = true;
              }

              if (data.rowGroup && !loaded.rowGroup && !$.fn.dataTable.RowGroup) {
                bases.push("".concat(baseJS, "rowGroup").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "rowGroup-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-rowgroup-bs4'] = "".concat(baseCSS, "rowGroup-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.rowGroup = true;
              }

              if (data.rowReorder && !loaded.rowReorder && !$.fn.dataTable.RowReorder) {
                bases.push("".concat(baseJS, "rowReorder").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "rowReorder-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-rowreorder-bs4'] = "".concat(baseCSS, "rowReorder-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.rowReorder = true;
              }

              if (data.scroller && !loaded.scroller && !$.fn.dataTable.Scroller) {
                bases.push("".concat(baseJS, "scroller").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "scroller-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-scroller-bs4'] = "".concat(baseCSS, "scroller-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.scroller = true;
              }

              if (data.searchBuilder && !loaded.searchBuilder && !$.fn.dataTable.SearchBuilder) {
                bases.push("".concat(baseJS, "searchBuilder").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "searchBuilder-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-searchbuilder-bs4'] = "".concat(baseCSS, "searchBuilder-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.searchBuilder = true;
              }

              if (data.searchPanes && !loaded.searchPanes && !$.fn.dataTable.SearchPanes) {
                if (!loaded.select && !$.fn.dataTable.select) {
                  bases.push("".concat(baseJS, "select").concat(MyAMS.env.extext, ".js"));
                  extensions.push("".concat(baseJS, "select-bootstrap4").concat(MyAMS.env.extext, ".js"));
                  css['dt-select-bs4'] = "".concat(baseCSS, "select-bootstrap4").concat(MyAMS.env.extext, ".css");
                  loaded.select = true;
                }

                extensions.push("".concat(baseJS, "searchPanes").concat(MyAMS.env.extext, ".js"));
                depends.push("".concat(baseJS, "searchPanes-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-searchpanes-bs4'] = "".concat(baseCSS, "searchPanes-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.searchPanes = true;
              }

              if (data.select && !loaded.select && !$.fn.dataTable.select) {
                bases.push("".concat(baseJS, "select").concat(MyAMS.env.extext, ".js"));
                extensions.push("".concat(baseJS, "select-bootstrap4").concat(MyAMS.env.extext, ".js"));
                css['dt-select-bs4'] = "".concat(baseCSS, "select-bootstrap4").concat(MyAMS.env.extext, ".css");
                loaded.select = true;
              }
            });
            $.when.apply($, bases.map(MyAMS.core.getScript)).then(function () {
              return $.when.apply($, extensions.map(MyAMS.core.getScript)).then(function () {
                return $.when.apply($, depends.map(MyAMS.core.getScript)).then(function () {
                  if (firstLoad) {
                    _datatablesHelpers.init();
                  }

                  for (var _i = 0, _Object$entries = Object.entries(css); _i < _Object$entries.length; _i++) {
                    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                        name = _Object$entries$_i[0],
                        url = _Object$entries$_i[1];

                    MyAMS.core.getCSS(url, name);
                  }

                  tables.each(function (idx, elt) {
                    var table = $(elt);

                    if ($.fn.dataTable.isDataTable(table)) {
                      return;
                    }

                    var data = table.data();
                    var dom = data.amsDatatableDom || data.amsDom || data.dom || '';

                    if (!dom) {
                      if (data.buttons) {
                        dom += "B";
                      }

                      if (data.searchBuilder) {
                        dom += "Q";
                      }

                      if (data.searchPanes) {
                        dom += "P";
                      }

                      if (data.searching !== false || data.lengthChange !== false) {
                        dom += "<'row px-2'";

                        if (data.searching !== false) {
                          dom += "<'col-sm-6 col-md-8'f>";
                        }

                        if (data.lengthChange !== false) {
                          dom += "<'col-sm-6 col-md-4'l>";
                        }

                        dom += ">";
                      }

                      dom += "<'row'<'col-sm-12'tr>>";

                      if (data.info !== false || data.paging !== false) {
                        dom += "<'row px-2 py-1'";

                        if (data.info !== false) {
                          dom += "<'col-sm-12 col-md-5'i>";
                        }

                        if (data.paging !== false) {
                          dom += "<'col-sm-12 col-md-7'p>";
                        }

                        dom += ">";
                      }
                    }

                    var defaultOptions = {
                      language: data.amsDatatableLanguage || data.amsLanguage || MyAMS.i18n.plugins.datatables,
                      responsive: true,
                      dom: dom
                    };
                    var settings = $.extend({}, defaultOptions, data.amsDatatableOptions || data.amsOptions);
                    settings = MyAMS.core.executeFunctionByName(data.amsDatatableInitCallback || data.amsInit, document, table, settings) || settings;
                    var veto = {
                      veto: false
                    };
                    table.trigger('before-init.ams.datatable', [table, settings, veto]);

                    if (veto.veto) {
                      return;
                    }

                    var plugin = table.DataTable(settings);
                    MyAMS.core.executeFunctionByName(data.amsDatatableAfterInitCallback || data.amsAfterInit, document, table, plugin, settings);
                    table.trigger('after-init.ams.datatable', [table, plugin]);
                  });
                  resolve(tables);
                }, reject);
              }, reject);
            }, reject);
          }, reject);
        }, reject);
      } else {
        resolve(null);
      }
    });
  }
  /**
   * JQuery-UI drag and drop plug-ins
   */


  function dragdrop(element) {
    return new Promise(function (resolve, reject) {
      var dragitems = $('.draggable, .droppable, .sortable', element);

      if (dragitems.length > 0) {
        MyAMS.ajax.check($.fn.draggable, "".concat(MyAMS.env.baseURL, "../ext/jquery-ui").concat(MyAMS.env.extext, ".js")).then(function () {
          dragitems.each(function (idx, elt) {
            var item = $(elt),
                data = item.data(); // draggable components

            if (item.hasClass('draggable')) {
              var dragOptions = {
                cursor: data.amsDraggableCursor || 'move',
                containment: data.amsDraggableContainment,
                handle: data.amsDraggableHandle,
                connectToSortable: data.amsDraggableConnectSortable,
                helper: MyAMS.core.getFunctionByName(data.amsDraggableHelper) || data.amsDraggableHelper,
                start: MyAMS.core.getFunctionByName(data.amsDraggableStart),
                stop: MyAMS.core.getFunctionByName(data.amsDraggableStop)
              };
              var settings = $.extend({}, dragOptions, data.amsDraggableOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsDraggableInitCallback || data.amsInit, document, item, settings) || settings;
              var veto = {
                veto: false
              };
              item.trigger('before-init.ams.draggable', [item, settings, veto]);

              if (veto.veto) {
                return;
              }

              var plugin = item.draggable(settings);
              item.disableSelection();
              MyAMS.core.executeFunctionByName(data.amsDraggableAfterInitCallback || data.amsAfterInit, document, item, plugin, settings);
              item.trigger('after-init.ams.draggable', [item, plugin]);
            } // droppable components


            if (item.hasClass('droppable')) {
              var dropOptions = {
                accept: data.amsDroppableAccept || data.amsAccept,
                drop: MyAMS.core.getFunctionByName(data.amsDroppableDrop)
              };

              var _settings = $.extend({}, dropOptions, data.amsDroppableOptions || data.amsOptions);

              _settings = MyAMS.core.executeFunctionByName(data.amsDroppableInitCallback || data.amsInit, document, item, _settings) || _settings;
              var _veto = {
                veto: false
              };
              item.trigger('before-init.ams.droppable', [item, _settings, _veto]);

              if (_veto.veto) {
                return;
              }

              var _plugin = item.droppable(_settings);

              MyAMS.core.executeFunctionByName(data.amsDroppableAfterInitCallback || data.amsAfterInit, document, item, _plugin, _settings);
              item.trigger('after-init.ams.droppable', [item, _plugin]);
            } // sortable components


            if (item.hasClass('sortable')) {
              var sortOptions = {
                items: data.amsSortableItems,
                handle: data.amsSortableHandle,
                helper: MyAMS.core.getFunctionByName(data.amsSortableHelper) || data.amsSortableHelper,
                connectWith: data.amsSortableConnectwith,
                containment: data.amsSortableContainment,
                placeholder: data.amsSortablePlaceholder,
                start: MyAMS.core.getFunctionByName(data.amsSortableStart),
                over: MyAMS.core.getFunctionByName(data.amsSortableOver),
                stop: MyAMS.core.getFunctionByName(data.amsSortableStop)
              };

              var _settings2 = $.extend({}, sortOptions, data.amsSortableOptions || data.amsOptions);

              _settings2 = MyAMS.core.executeFunctionByName(data.amsSortableInitCallback || data.amsInit, document, item, _settings2) || _settings2;
              var _veto2 = {
                veto: false
              };
              item.trigger('before-init.ams.sortable', [item, _settings2, _veto2]);

              if (_veto2.veto) {
                return;
              }

              var _plugin2 = item.sortable(_settings2);

              item.disableSelection();
              MyAMS.core.executeFunctionByName(data.amsSortableAfterInitCallback || data.amsAfterInit, document, item, _plugin2, _settings2);
              item.trigger('after-init.ams.sortable', [item, _plugin2]);
            }
          });
        }, reject).then(function () {
          resolve(dragitems);
        });
      } else {
        resolve(null);
      }
    });
  }
  /**
   * Bootstrap custom file input manager
   */


  function fileInput(element) {
    return new Promise(function (resolve, reject) {
      var inputs = $('.custom-file-input', element);

      if (inputs.length > 0) {
        MyAMS.require('ajax').then(function () {
          MyAMS.ajax.check(window.bsCustomFileInput, "".concat(MyAMS.env.baseURL, "../ext/bs-custom-file-input").concat(MyAMS.env.extext, ".js")).then(function () {
            inputs.each(function (idx, elt) {
              var input = $(elt),
                  inputId = input.attr('id'),
                  inputSelector = inputId ? "#".concat(inputId) : input.attr('name'),
                  form = $(elt.form),
                  formId = form.attr('id'),
                  formSelector = formId ? "#".concat(formId) : form.attr('name'),
                  veto = {
                veto: false
              };
              input.trigger('before-init.ams.fileinput', [input, veto]);

              if (veto.veto) {
                return;
              }

              bsCustomFileInput.init(inputSelector, formSelector);
              input.trigger('after-init.ams.fileinput', [input]);
            });
          }, reject).then(function () {
            resolve(inputs);
          });
        }, reject);
      } else {
        resolve(null);
      }
    });
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
    return new Promise(function (resolve, reject) {
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
                  theme: data.amsSelect2Theme || data.amsTheme || 'bootstrap4',
                  language: data.amsSelect2Language || data.amsLanguage || MyAMS.i18n.language,
                  escapeMarkup: MyAMS.core.getFunctionByName(data.amsSelect2EscapeMarkup || data.amsEscapeMarkup),
                  matcher: MyAMS.core.getFunctionByName(data.amsSelect2Matcher || data.amsMatcher),
                  sorter: MyAMS.core.getFunctionByName(data.amsSelect2Sorter || data.amsSorter),
                  templateResult: MyAMS.core.getFunctionByName(data.amsSelect2TemplateResult || data.amsTemplateResult),
                  templateSelection: MyAMS.core.getFunctionByName(data.amsSelect2TemplateSelection || data.amsTemplateSelection),
                  tokenizer: MyAMS.core.getFunctionByName(data.amsSelect2Tokenizer || data.amsTokenizer)
                };
                var ajaxUrl = data.amsSelect2AjaxUrl || data.amsAjaxUrl || data['ajax-Url'];

                if (ajaxUrl) {
                  defaultOptions.ajax = {
                    url: MyAMS.core.getFunctionByName(data.amsSelect2AjaxUrl || data.amsAjaxUrl) || data.amsSelect2AjaxUrl || data.amsAjaxUrl,
                    data: MyAMS.core.getFunctionByName(data.amsSelect2AjaxData || data.amsAjaxData) || data.amsSelect2AjaxData || data.amsAjaxData,
                    processResults: MyAMS.core.getFunctionByName(data.amsSelect2AjaxProcessResults || data.amsAjaxProcessResults) || data.amsSelect2AjaxProcessResults || data.amsAjaxProcessResults,
                    transport: MyAMS.core.getFunctionByName(data.amsSelect2AjaxTransport || data.amsAjaxTransport) || data.amsSelect2AjaxTransport || data.amsAjaxTransport
                  };
                  defaultOptions.minimumInputLength = data.amsSelect2MinimumInputLength || data.amsMinimumInputLength || data.minimumInputLength || 1;
                }

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
                settings = MyAMS.core.executeFunctionByName(data.amsSelect2InitCallback || data.amsInit, document, select, settings) || settings;
                var veto = {
                  veto: false
                };
                select.trigger('before-init.ams.select2', [select, settings, veto]);

                if (veto.veto) {
                  return;
                }

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

                MyAMS.core.executeFunctionByName(data.amsSelect2AfterInitCallback || data.amsAfterInit, document, select, plugin, settings);
                select.trigger('after-init.ams.select2', [select, plugin]);
              });
            }, reject).then(function () {
              resolve(selects);
            });
          }, reject);
        }, reject);
      } else {
        resolve(null);
      }
    });
  }
  /**
   * SVG image plug-in
   */


  function svgPlugin(element) {
    return new Promise(function (resolve, reject) {
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
        resolve(svgs);
      } else {
        resolve(null);
      }
    });
  }
  /**
   * Fieldset switcher plug-in
   */


  function switcher(element) {
    return new Promise(function (resolve, reject) {
      var switchers = $('legend.switcher', element);

      if (switchers.length > 0) {
        switchers.each(function (idx, elt) {
          var legend = $(elt),
              fieldset = legend.parent('fieldset'),
              data = legend.data(),
              minusClass = data.amsSwitcherMinusClass || data.amsMinusClass || 'minus',
              plusClass = data.amsSwitcherPlusClass || data.amsPlusClass || 'plus';

          if (!data.amsSwitcher) {
            var veto = {
              veto: false
            };
            legend.trigger('before-init.ams.switcher', [legend, data, veto]);

            if (veto.veto) {
              return;
            }

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
                  $("legend.switcher[data-ams-switcher-sync=\"".concat(id, "\"]"), fieldset).each(function (idx, elt) {
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

            legend.trigger('after-init.ams.switcher', [legend]);
            legend.data('ams-switcher', true);
          }
        });
        resolve(switchers);
      } else {
        resolve(null);
      }
    });
  }
  /**
   * Form validation plug-in
   */


  function validate(element) {
    return new Promise(function (resolve, reject) {
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
                errorPlacement: MyAMS.core.getFunctionByName(data.amsValidateErrorPlacement) || function (error, element) {
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
              settings = MyAMS.core.executeFunctionByName(data.amsValidateInitCallback || data.amsInit, document, form, settings) || settings;
              var veto = {
                veto: false
              };
              form.trigger('before-init.ams.validate', [form, settings, veto]);

              if (veto.veto) {
                return;
              }

              var plugin = form.validate(settings);
              MyAMS.core.executeFunctionByName(data.amsValidateAfterInitCallback || data.amsAfterInit, document, form, plugin, settings);
              form.trigger('after-init.ams.validate', [form, plugin]);
            });
          }, reject).then(function () {
            resolve(forms);
          });
        }, reject);
      }
    });
  }
  /**
   * Global module initialization
   */


  if (window.MyAMS) {
    // register loaded plug-ins
    MyAMS.registry.register(checker, 'checker');
    MyAMS.registry.register(contextMenu, 'contextMenu');
    MyAMS.registry.register(datatables, 'datatables');
    MyAMS.registry.register(dragdrop, 'dragdrop');
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
