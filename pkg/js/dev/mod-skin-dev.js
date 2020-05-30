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
    global.modSkin = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.skin = void 0;

  var _this = void 0;

  /**
   * MyAMS generic skin features
   */
  var $ = MyAMS.$;
  var _initialized = false;
  var skin = {
    /**
     * Main *skin* module initialization
     */
    init: function init() {
      if (_initialized) {
        return;
      }

      _initialized = true; // handle tooltips

      if (MyAMS.config.enableTooltips) {
        MyAMS.dom.root.tooltip({
          selector: '.hint',
          html: MyAMS.config.enableHtmlTooltips
        });
      }

      $('.hint').mousedown(function (evt) {
        $(evt.currentTarget).tooltip('hide');
      }); // check URL when hash is changed

      skin.checkURL();
      $(window).on('hashchange', skin.checkURL);
    },

    /**
     * Specific content initialization
     *
     * @param element: the element to initialize
     */
    initElement: function initElement(element) {
      if (!MyAMS.config.enableTooltips) {
        $('.hint', element).tooltip({
          html: MyAMS.config.enableHtmlTooltips
        });
      }
    },

    /**
     * URL checking function.
     *
     * This function is an event handler for window's "hashchange" event, which is
     * triggered when the window location hash is modified; this can notably occur when a
     * navigation menu, for example, is clicked.
     */
    checkURL: function checkURL(evt) {
      var nav = MyAMS.dom.nav;
      var hash = location.hash,
          url = hash.replace(/^#/, ''),
          tag = null;
      var tagPosition = url.indexOf('!');

      if (tagPosition > 0) {
        hash = hash.substring(0, tagPosition + 1);
        tag = url.substring(tagPosition + 1);
        url = url.substring(0, tagPosition);
      }

      var menu;

      if (url) {
        // new hash
        var container = $('#content');

        if (!container.exists()) {
          container = MyAMS.dom.root;
        } // try to activate matching navigation menu


        menu = $("a[href=\"".concat(hash, "\"]"), nav);

        if (menu.exists()) {
          MyAMS.require('nav').then(function () {
            MyAMS.nav.setActiveMenu(menu);
          });
        } // load specified URL into '#content'


        skin.loadURL(url, container).then(function () {
          var prefix = $('html head title').data('ams-title-prefix'),
              fullPrefix = prefix ? "".concat(prefix, " > ") : '';
          document.title = "".concat(fullPrefix).concat($('[data-ams-page-title]:first', container).data('ams-page-title') || menu.attr('title') || document.title);

          if (tag) {
            var anchor = $("#".concat(tag));

            if (anchor.exists()) {
              MyAMS.require('ajax').then(function () {
                MyAMS.ajax.check($.fn.scrollTo, "".concat(MyAMS.env.baseURL, "../ext/jquery-scrollto").concat(MyAMS.env.extext, ".js")).then(function () {
                  $('#main').scrollTo(anchor, {
                    offset: -15
                  });
                });
              });
            }
          }
        }, function () {});
      } else {
        // empty hash! We try to check if a specific menu was activated with a custom
        // data attribute, otherwise we go to the first navigation menu!
        var activeUrl = $('[data-ams-active-menu]').data('ams-active-menu');

        if (activeUrl) {
          menu = $("a[href=\"".concat(activeUrl, "\"]"), nav);
        } else {
          menu = $('>ul >li >a[href!="#"]', nav).first();
        }

        if (menu.exists()) {
          MyAMS.require('nav').then(function () {
            MyAMS.nav.setActiveMenu(menu);

            if (activeUrl) {
              MyAMS.nav.drawBreadcrumbs();
            } else {
              // we use location.replace to avoid storing intermediate URL
              // into browser's history
              window.location.replace(window.location.href + menu.attr('href'));
            }
          });
        }
      }
    },

    /**
     * Load specific URL into given container target.
     *
     * The function returns a Promise which is resolved when the remote content is actually
     * loaded and initialized
     *
     * @param url: remote content URL
     * @param target: jQuery selector or target container
     * @param options: additional options to AJAX call
     * @returns {Promise<string>}
     */
    loadURL: function loadURL(url, target) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return new Promise(function (resolve, reject) {
        if (url.startsWith('#')) {
          url = url.substr(1);
        }

        target = $(target);
        MyAMS.core.clearContent(target).then(function (status) {
          if (!status) {
            // applied veto!
            return;
          }

          var defaults = {
            type: 'GET',
            url: url,
            dataType: 'html',
            cache: false,
            beforeSend: function beforeSend() {
              target.html("<h1 class=\"loading\"><i class=\"fa fa-cog fa-spin\"></i> ".concat(MyAMS.i18n.LOADING, "</h1>"));

              if (options && options.preLoadCallback) {
                MyAMS.core.executeFunctionByName(options.preLoadCallback, _this, options.preLoadCallbackOptions);
              }

              if (target[0] === $('#content')[0]) {
                MyAMS.require('nav').then(function () {
                  MyAMS.nav.drawBreadcrumbs();
                  var prefix = $('html head title').data('ams-title-prefix'),
                      fullPrefix = prefix ? "".concat(prefix, " > ") : '';
                  document.title = "".concat(fullPrefix).concat($('.breadcrumb li:last-child').text());
                  MyAMS.dom.root.animate({
                    scrollTop: 0
                  }, 'fast');
                });
              }
            }
          };
          var settings = $.extend({}, defaults, options),
              veto = {
            veto: false
          };
          target.trigger('before-load.myams.content', [settings, veto]);

          if (veto.veto) {
            return;
          }

          $.ajax(settings).then(function (result, status, xhr) {
            MyAMS.require('ajax').then(function () {
              var response = MyAMS.ajax.getResponse(xhr);

              if (response) {
                var dataType = response.contentType,
                    _result = response.data;
                $('.loading', target).remove();

                switch (dataType) {
                  case 'json':
                    MyAMS.ajax.handleJSON(_result, target);
                    resolve(_result, status, xhr);
                    break;

                  case 'script':
                  case 'xml':
                    resolve(_result, status, xhr);
                    break;

                  case 'html':
                  case 'text':
                  default:
                    target.parents('.hidden').removeClass('hidden'); // TODO: update alerts container class!!!

                    $('.alert', target.parents('.alerts')).remove();
                    target.css({
                      opacity: '0.0'
                    }).html(_result).removeClass('hidden').delay(30).animate({
                      opacity: '1.0'
                    }, 300);
                    MyAMS.core.executeFunctionByName(MyAMS.config.initContent, window, target).then(function () {
                      MyAMS.form && MyAMS.form.setFocus(target);
                      target.trigger('after-load.myams.content');
                      resolve(_result, status, xhr);
                    });
                }

                MyAMS.stats && MyAMS.stats.logPageview();
              }
            });
          }, function (xhr, status, error) {
            target.html("<h3 class=\"error\"><i class=\"fa fa-exclamation-triangle text-danger\"></i> \n\t\t\t\t\t\t\t\t".concat(MyAMS.i18n.ERROR, " ").concat(error, "</h3>").concat(xhr.responseText));
            reject(error);
          });
        });
      });
    }
  };
  /**
   * Global module initialization
   */

  _exports.skin = skin;

  if (window.MyAMS) {
    if (MyAMS.env.bundle) {
      MyAMS.config.modules.push('skin');
    } else {
      MyAMS.skin = skin;
      console.debug("MyAMS: skin module loaded...");
    }
  }
});
//# sourceMappingURL=mod-skin-dev.js.map
