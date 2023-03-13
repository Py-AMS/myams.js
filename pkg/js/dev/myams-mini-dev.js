/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/ext-base.js":
/*!****************************!*\
  !*** ./src/js/ext-base.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearContent": function() { return /* binding */ clearContent; },
/* harmony export */   "executeFunctionByName": function() { return /* binding */ executeFunctionByName; },
/* harmony export */   "generateId": function() { return /* binding */ generateId; },
/* harmony export */   "generateUUID": function() { return /* binding */ generateUUID; },
/* harmony export */   "getCSS": function() { return /* binding */ getCSS; },
/* harmony export */   "getFunctionByName": function() { return /* binding */ getFunctionByName; },
/* harmony export */   "getModules": function() { return /* binding */ getModules; },
/* harmony export */   "getObject": function() { return /* binding */ getObject; },
/* harmony export */   "getQueryVar": function() { return /* binding */ getQueryVar; },
/* harmony export */   "getScript": function() { return /* binding */ getScript; },
/* harmony export */   "getSource": function() { return /* binding */ getSource; },
/* harmony export */   "init": function() { return /* binding */ init; },
/* harmony export */   "initContent": function() { return /* binding */ initContent; },
/* harmony export */   "initData": function() { return /* binding */ initData; },
/* harmony export */   "initPage": function() { return /* binding */ initPage; },
/* harmony export */   "switchIcon": function() { return /* binding */ switchIcon; }
/* harmony export */ });
/* harmony import */ var _ext_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ext-registry */ "./src/js/ext-registry.js");
/* global $, FontAwesome */
/**
 * MyAMS base features
 */

if (!window.jQuery) {
  window.$ = window.jQuery = __webpack_require__(/*! jquery */ "jquery");
}


/**
 * Init JQuery extensions
 */
function init($) {
  /**
   * String prototype extensions
   */
  $.extend(String.prototype, {
    /**
     * Replace dashed names with camelCase variation
     */
    camelCase: function () {
      if (!this) {
        return this;
      }
      return this.replace(/-(.)/g, (dash, rest) => {
        return rest.toUpperCase();
      });
    },
    /**
     * Replace camelCase string with dashed name
     */
    deCase: function () {
      if (!this) {
        return this;
      }
      return this.replace(/[A-Z]/g, cap => {
        return `-${cap.toLowerCase()}`;
      });
    },
    /**
     * Convert first letter only to lowercase
     */
    initLowerCase: function () {
      if (!this) {
        return this;
      }
      return this.charAt(0).toLowerCase() + this.slice(1);
    },
    /**
     * Convert URL params to object
     */
    unserialize: function () {
      if (!this) {
        return this;
      }
      const str = decodeURIComponent(this),
        chunks = str.split('&'),
        obj = {};
      for (const chunk of chunks) {
        const [key, val] = chunk.split('=', 2);
        obj[key] = val;
      }
      return obj;
    }
  });

  /**
   * Array class prototype extension
   */
  $.extend(Array.prototype, {
    /**
     * Extend an array with another one
     */
    extendWith: function (source) {
      for (const element of source) {
        this.push(element);
      }
    }
  });

  /**
   * Global JQuery object extensions
   */
  $.extend($, {
    /**
     * Extend source object with given extensions, but only for properties matching
     * given prefix.
     *
     * @param source: source object, which will be updated in-place
     * @param prefix: property names prefix selector
     * @param getter: optional getter used to extract final value
     * @param extensions: list of extensions object
     * @returns {*}: modified source object
     */
    extendPrefix: function (source, prefix, getter) {
      for (var _len = arguments.length, extensions = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        extensions[_key - 3] = arguments[_key];
      }
      for (const extension of extensions) {
        for (const [key, value] of Object.entries(extension)) {
          if (key.startsWith(prefix)) {
            source[key.substring(prefix.length).initLowerCase()] = getter === null ? value : getter(value);
          }
        }
      }
      return source;
    },
    /**
     * Extend source with given extensions, but only for existing attributes
     *
     * @param source: source object, which will be updated in-place
     * @param getter: optional getter used to extract final value
     * @param extensions: list of extensions object
     * @returns {*}: modified source object
     */
    extendOnly: function (source, getter) {
      for (var _len2 = arguments.length, extensions = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        extensions[_key2 - 2] = arguments[_key2];
      }
      for (const extension of extensions) {
        for (const [key, value] of Object.entries(extension)) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            source[key] = getter === null ? value : getter(value);
          }
        }
      }
      return source;
    }
  });

  /**
   * New JQuery functions
   */
  $.fn.extend({
    /**
     * Check if current object is empty or not
     */
    exists: function () {
      return $(this).length > 0;
    },
    /**
     * Get object if it supports given CSS class,
     * otherwise look for parents
     */
    objectOrParentWithClass: function (klass) {
      if (this.hasClass(klass)) {
        return this;
      }
      return this.parents(`.${klass}`);
    },
    /**
     * Build an array of attributes of the given selection
     */
    listattr: function (attr) {
      const result = [];
      this.each((index, element) => {
        result.push($(element).attr(attr));
      });
      return result;
    },
    /**
     * CSS style function - get or set object style attribute
     * Code from Aram Kocharyan on stackoverflow.com
     */
    style: function (styleName, value, priority) {
      let result = this;
      this.each((idx, node) => {
        // Ensure we have a DOM node
        if (typeof node === 'undefined') {
          return false;
        }
        // CSSStyleDeclaration
        const style = node.style;
        // Getter/Setter
        if (typeof styleName !== 'undefined') {
          if (typeof value !== 'undefined') {
            // Set style property
            priority = typeof priority !== 'undefined' ? priority : '';
            style.setProperty(styleName, value, priority);
          } else {
            // Get style property
            result = style.getPropertyValue(styleName);
            return false;
          }
        } else {
          // Get CSSStyleDeclaration
          result = style;
          return false;
        }
      });
      return result;
    },
    /**
     * Remove CSS classes starting with a given prefix
     */
    removeClassPrefix: function (prefix) {
      this.each(function (i, it) {
        const classes = it.className.split(/\s+/).map(item => {
          return item.startsWith(prefix) ? "" : item;
        });
        it.className = $.trim(classes.join(" "));
      });
      return this;
    }
  });

  /**
   * JQuery 'hasvalue' function expression
   * Filter inputs containing value:
   *
   *     $('span:hasvalue("value")')
   */
  $.expr[":"].hasvalue = function (obj, index, meta /*, stack*/) {
    return $(obj).val() !== "";
  };

  /**
   * JQuery 'econtains' function expression
   * Case insensitive contains expression:
   *
   *     $('span:econtains("text")')
   */
  $.expr[":"].econtains = function (obj, index, meta /*, stack*/) {
    return (obj.textContent || obj.innerText || $(obj).text() || "").toLowerCase() === meta[3].toLowerCase();
  };

  /**
   * JQuery 'withtext' expression
   * Case sensitive exact search expression.
   * For example:
   *
   *    $('span:withtext("text")')
   */
  $.expr[":"].withtext = function (obj, index, meta /*, stack*/) {
    return (obj.textContent || obj.innerText || $(obj).text() || "") === meta[3];
  };

  /**
   * JQuery filter on parents class
   * This filter is often combined with ":not()" to select DOM objects which don't have
   * parents of a given class.
   * For example:
   *
   *   $('.hint:not(:parents(.nohints))', element);
   *
   * will select all elements with ".hint" class which don't have a parent with '.nohints' class.
   */
  $.expr[':'].parents = function (obj, index, meta /*, stack*/) {
    return $(obj).parents(meta[3]).length > 0;
  };
  $(document).ready(() => {
    const html = $('html');
    html.removeClass('no-js').addClass('js');
    MyAMS.core.executeFunctionByName(html.data('ams-init-page') || MyAMS.config.initPage);
  });
}

/**
 * Get list of modules names required by given element
 *
 * @param element: parent element
 * @returns {*[]}
 */
function getModules(element) {
  let modules = [];
  const mods = element.data('ams-modules');
  if (typeof mods === 'string') {
    modules = modules.concat(mods.trim().split(/[\s,;]+/));
  } else if (mods) {
    for (const [name, props] of Object.entries(mods)) {
      const entry = {};
      entry[name] = props;
      modules.push(entry);
    }
  }
  $('[data-ams-modules]', element).each((idx, elt) => {
    const mods = $(elt).data('ams-modules');
    if (typeof mods === 'string') {
      modules = modules.concat(mods.trim().split(/[\s,;]+/));
    } else if (mods) {
      for (const [name, props] of Object.entries(mods)) {
        const entry = {};
        entry[name] = props;
        modules.push(entry);
      }
    }
  });
  return [...new Set(modules)];
}

/**
 * Main page initialization
 */
function initPage() {
  return MyAMS.require('i18n').then(() => {
    MyAMS.dom = getDOM();
    MyAMS.theme = getTheme();
    executeFunctionByName(MyAMS.config.initData, window, MyAMS.dom.root);
    const modules = getModules(MyAMS.dom.root);
    MyAMS.require(...modules).then(() => {
      for (const moduleName of MyAMS.config.modules) {
        executeFunctionByName(`MyAMS.${moduleName}.init`);
      }
      executeFunctionByName(MyAMS.dom.page.data('ams-init-content') || MyAMS.config.initContent);
    });
  });
}

/**
 * Data attributes initializer
 *
 * This function converts a single "data-ams-data" attribute into a set of several "data-*"
 * attributes.
 * This can be used into HTML templates engines which don't allow creating dynamic attributes
 * easily.
 *
 * @param element: parent element
 */
function initData(element) {
  $('[data-ams-data]', element).each((idx, elt) => {
    const $elt = $(elt),
      data = $elt.data('ams-data');
    if (data) {
      for (const name in data) {
        if (!Object.prototype.hasOwnProperty.call(data, name)) {
          continue;
        }
        let elementData = data[name];
        if (typeof elementData !== 'string') {
          elementData = JSON.stringify(elementData);
        }
        $elt.attr(`data-${name}`, elementData);
      }
    }
    $elt.removeAttr('data-ams-data');
  });
}

/**
 * Main content initialization; this function will initialize all plug-ins, callbacks and
 * events listeners in the selected element
 *
 * @param element: source element to initialize
 */
function initContent() {
  let element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (element === null) {
    element = $('body');
  }
  element = $(element);
  function initElementModules() {
    for (const moduleName of MyAMS.config.modules) {
      executeFunctionByName(`MyAMS.${moduleName}.initElement`, document, element);
    }
  }
  return new Promise((resolve, reject) => {
    executeFunctionByName(MyAMS.config.initData, window, element);
    const modules = getModules(element);
    return MyAMS.require(...modules).then(() => {
      element.trigger('before-init.ams.content');
      if (MyAMS.config.useRegistry && !element.data('ams-disable-registry')) {
        MyAMS.registry.initElement(element).then(() => {
          initElementModules();
        }).then(() => {
          MyAMS.registry.run(element);
          element.trigger('after-init.ams.content');
        }).then(resolve);
      } else {
        initElementModules();
        resolve();
      }
    }, () => {
      reject("Missing MyAMS modules!");
    });
  });
}

/**
 * Container clearing function.
 *
 * This function is called before replacing an element contents with new DOM elements;
 * an 'ams.container.before-cleaning' event is triggered, with arguments which are the
 * container and a "veto" object containing a single boolean "veto" property; if any
 * handler attached to this event set the "veto" property to *true*,
 *
 * The function returns a Promise which is resolved with the opposite value of the "veto"
 * property.
 *
 * @param element: the parent element which may be cleaned
 * @returns {Promise<boolean>}
 */
function clearContent(element) {
  if (typeof element === 'string') {
    element = $(element);
  }
  return new Promise((resolve, reject) => {
    const veto = {
      veto: false
    };
    $(document).trigger('clear.ams.content', [veto, element]);
    if (!veto.veto) {
      MyAMS.require('events').then(() => {
        $(MyAMS.events.getHandlers(element, 'clear.ams.content')).each((idx, elt) => {
          $(elt).trigger('clear.ams.content', [veto]);
          if (veto.veto) {
            return false;
          }
        });
        if (!veto.veto) {
          $(MyAMS.events.getHandlers(element, 'cleared.ams.content')).each((idx, elt) => {
            $(elt).trigger('cleared.ams.content');
          });
          $(document).trigger('cleared.ams.content', [element]);
        }
        resolve(!veto.veto);
      }, () => {
        reject("Missing MyAMS.events module!");
      });
    } else {
      resolve(!veto.veto);
    }
  });
}

/**
 * Get an object given by name
 *
 * @param objectName: dotted name of the object
 * @param context: source context, or window if undefined
 * @returns {Object|undefined}
 */
function getObject(objectName, context) {
  if (!objectName) {
    return undefined;
  }
  if (typeof objectName !== 'string') {
    return objectName;
  }
  const namespaces = objectName.split('.');
  context = context === undefined || context === null ? window : context;
  for (const name of namespaces) {
    try {
      context = context[name];
    } catch (exc) {
      return undefined;
    }
  }
  return context;
}

/**
 * Get function object from name
 *
 * @param functionName: dotted name of the function
 * @param context: source context; window if undefined
 * @returns {function|undefined}
 */
function getFunctionByName(functionName, context) {
  if (functionName === null || typeof functionName === 'undefined') {
    return undefined;
  } else if (typeof functionName === 'function') {
    return functionName;
  } else if (typeof functionName !== 'string') {
    return undefined;
  }
  const namespaces = functionName.split("."),
    func = namespaces.pop();
  context = context === undefined || context === null ? window : context;
  for (const name of namespaces) {
    try {
      context = context[name];
    } catch (e) {
      return undefined;
    }
  }
  try {
    return context[func];
  } catch (e) {
    return undefined;
  }
}

/**
 * Execute a function, given by it's name
 *
 * @param functionName: dotted name of the function
 * @param context: parent context, or window if undefined
 * @param args...: optional function arguments
 * @returns {*}: result of the called function
 */
function executeFunctionByName(functionName, context /*, args */) {
  const func = getFunctionByName(functionName, window);
  if (typeof func === 'function') {
    const args = Array.prototype.slice.call(arguments, 2);
    return func.apply(context, args);
  }
}

/**
 * Get target URL matching given source
 *
 * Given URL can include variable names (with their namespace), given between braces,
 * as in {MyAMS.env.baseURL}
 */
function getSource(url) {
  return url.replace(/{[^{}]*}/g, match => {
    return getObject(match.substr(1, match.length - 2));
  });
}

/**
 * Dynamic script loader function
 *
 * @param url: script URL
 * @param options: a set of options to be added to AJAX call
 */
function getScript(url) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise((resolve, reject) => {
    const defaults = {
      dataType: 'script',
      url: MyAMS.core.getSource(url),
      cache: MyAMS.env.devmode,
      async: true
    };
    const settings = $.extend({}, defaults, options);
    $.ajax(settings).then(() => {
      resolve(url);
    }, (xhr, status, error) => {
      reject(error);
    });
  });
}

/**
 * Get CSS matching given URL
 *
 * @param url: CSS source URL
 * @param name: name of the given CSS
 */
function getCSS(url, name) {
  return new Promise((resolve /*, reject */) => {
    const head = $('HEAD');
    let style = $(`style[data-ams-id="${name}"]`, head);
    if (style.length === 0) {
      style = $('<style>').attr('data-ams-id', name).text(`@import "${getSource(url)}";`).appendTo(head);
      const styleInterval = setInterval(() => {
        try {
          // eslint-disable-next-line no-unused-vars
          const _check = style[0].sheet.cssRules; // Is only populated when file is loaded
          clearInterval(styleInterval);
          resolve(true);
        } catch (e) {
          // CSS is not loaded yet, just wait...
        }
      }, 10);
    } else {
      resolve(false);
    }
  });
}

/**
 * Extract parameter value from given query string
 *
 * @param src: source URL
 * @param varName: variable name
 * @returns {boolean|*}
 */
function getQueryVar(src, varName) {
  // Check src
  if (typeof src !== 'string' || src.indexOf('?') < 0) {
    return undefined;
  }
  if (!src.endsWith('&')) {
    src += '&';
  }
  // Dynamic replacement RegExp
  const regex = new RegExp(`.*?[&\\?]${varName}=(.*?)&.*`);
  // Apply RegExp to the query string
  const val = src.replace(regex, "$1");
  // If the string is the same, we didn't find a match - return null
  return val === src ? null : val;
}

/**
 * Generate a random ID
 */
function generateId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + s4() + s4();
}

/**
 * Generate a random unique UUID
 */
function generateUUID() {
  let d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
}

/**
 * Switch a FontAwesome icon.
 * Use FontAwesome API to get image as SVG, if FontAwesome is loaded from Javascript and is using
 * SVG auto-replace, otherwise just switch CSS class.
 *
 * @param element: source element
 * @param fromClass: initial CSS class (without "fa-" prefix)
 * @param toClass: new CSS class (without "fa-" prefix)
 * @param prefix: icon prefix (defaults to "fa")
 */
function switchIcon(element, fromClass, toClass) {
  let prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'fa';
  if (typeof element === 'string') {
    element = $(element);
  }
  if (MyAMS.config.useSVGIcons) {
    const iconDef = FontAwesome.findIconDefinition({
      iconName: toClass,
      prefix: prefix
    });
    if (iconDef) {
      element.html(FontAwesome.icon(iconDef).html);
    }
  } else {
    element.removeClass(`fa-${fromClass}`).addClass(`fa-${toClass}`);
  }
}

/**
 * MyAMS base environment getter
 *
 * @type {Object}
 *
 * Returns an object with the following attributes matching MyAMS environment:
 * - bundle: boolean; true if MyAMS is published using modules bundle
 * - devmode: boolean; true if MyAMS is published in development mode
 * - devext: string: extension used in development mode
 * - extext: string: extension used for external extensions
 * - theme: string: current MyAMS theme name
 * - baseURL: string: base MyAMS URL
 * }}
 */
function getEnv($) {
  const script = $('script[src*="/myams.js"], script[src*="/myams-dev.js"], ' + 'script[src*="/emerald.js"], script[src*="/emerald-dev.js"], ' + 'script[src*="/darkmode.js"], script[src*="/darkmode-dev.js"], ' + 'script[src*="/myams-core.js"], script[src*="/myams-core-dev.js"], ' + 'script[src*="/myams-mini.js"], script[src*="/myams-mini-dev.js"]'),
    src = script.attr('src'),
    devmode = src ? src.indexOf('-dev.js') >= 0 : true,
    // testing mode
    bundle = src ? src.indexOf('-core') < 0 : true; // MyAMS modules not included in 'core' package
  return {
    bundle: bundle,
    devmode: devmode,
    devext: devmode ? '-dev' : '',
    extext: devmode ? '' : '.min',
    baseURL: src ? src.substring(0, src.lastIndexOf('/') + 1) : '/'
  };
}

/**
 * MyAMS theme getter
 */
function getTheme() {
  let theme = MyAMS.theme;
  if (!theme) {
    const css = $('link[href*="/myams.css"], link[href*="/emerald.css"], link[href*="/darkmode.css"]');
    theme = css.length > 0 ? /.*\/([a-z]+).css/.exec(css.attr('href'))[1] : 'unknown';
  }
  return theme;
}

/**
 * Get base DOM elements
 */
function getDOM() {
  return {
    page: $('html'),
    root: $('body'),
    nav: $('nav'),
    main: $('#main'),
    leftPanel: $('#left-panel'),
    shortcuts: $('#shortcuts')
  };
}

/**
 * MyAMS default configuration
 *
 * @type {Object}
 *
 * Returns an object matching current MyAMS configuration:
 * - modules: array of loaded extension modules
 * - ajaxNav: true if AJAX navigation is enabled
 * - enableFastclick: true is "smart-click" extension is to be activated on mobile devices
 * - menuSpeed: menu speed, in miliseconds
 * - initPage: dotted name of MyAMS global init function
 * - initContent: dotted name of MyAMS content init function
 * - alertContainerCLass: class of MyAMS alerts container
 * - safeMethods: HTTP methods which can be used without CSRF cookie verification
 * - csrfCookieName: CSRF cookie name
 * - csrfHeaderName: CSRF header name
 * - enableTooltips: global tooltips enable flag
 * - enableHtmlTooltips: allow HTML code in tooltips
 * - warnOnFormChange: flag to specify if form changes should be warned
 * - formChangeCallback: global form change callback
 * - isMobile: boolean, true if device is detected as mobile
 * - device: string: 'mobile' or 'desktop'
 */
const isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
  config = {
    modules: [],
    ajaxNav: true,
    enableFastclick: true,
    useSVGIcons: window.FontAwesome !== undefined && FontAwesome.config.autoReplaceSvg === 'nest',
    menuSpeed: 235,
    initPage: 'MyAMS.core.initPage',
    initData: 'MyAMS.core.initData',
    initContent: 'MyAMS.core.initContent',
    clearContent: 'MyAMS.core.clearContent',
    useRegistry: true,
    alertsContainerClass: 'toast-wrapper',
    safeMethods: ['GET', 'HEAD', 'OPTIONS', 'TRACE'],
    csrfCookieName: 'csrf_token',
    csrfHeaderName: 'X-CSRF-Token',
    enableTooltips: true,
    enableHtmlTooltips: true,
    warnOnFormChange: true,
    formChangeCallback: null,
    isMobile: isMobile,
    device: isMobile ? 'mobile' : 'desktop'
  },
  core = {
    getObject: getObject,
    getFunctionByName: getFunctionByName,
    executeFunctionByName: executeFunctionByName,
    getSource: getSource,
    getScript: getScript,
    getCSS: getCSS,
    getQueryVar: getQueryVar,
    generateId: generateId,
    generateUUID: generateUUID,
    switchIcon: switchIcon,
    initPage: initPage,
    initData: initData,
    initContent: initContent,
    clearContent: clearContent
  };
const MyAMS = {
  $: $,
  env: getEnv($),
  config: config,
  core: core,
  registry: _ext_registry__WEBPACK_IMPORTED_MODULE_0__.registry
};
window.MyAMS = MyAMS;
/* harmony default export */ __webpack_exports__["default"] = (MyAMS);

/***/ }),

/***/ "./src/js/ext-registry.js":
/*!********************************!*\
  !*** ./src/js/ext-registry.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "registry": function() { return /* binding */ registry; }
/* harmony export */ });
/* global $, MyAMS */
/**
 * MyAMS dynamic plug-ins loading management
 */

/**
 * Plug-ins loading order
 *  - initialize registry
 *  - initialize DOM data attributes
 *  - register all plug-ins from given DOM element
 *  - load all plug-ins from given DOM element
 *  - get list of disabled plug-ins into given DOM element
 *  - call callbacks for all enabled plug-ins
 *  - call callbacks for enabled "async" plug-ins
 */

/**
 * Base plug-in class
 */
class Plugin {
  constructor(name) {
    let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let loaded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // plug-in name
    this.name = name;
    // plug-in source URL
    this.src = props.src;
    // plug-in associated CSS
    this.css = props.css;
    // plug-in callbacks
    this.callbacks = [];
    if (props.callback) {
      this.callbacks.push({
        callback: props.callback,
        context: props.context || 'body'
      });
    }
    // async plug-ins are loaded simultaneously; sync ones are loaded and called after...
    this.async = props.async === undefined ? true : props.async;
    // loaded flag
    this.loaded = loaded;
  }

  /**
   * Load plug-in from remote script
   *
   * @returns {Promise<void>|*}
   */
  load() {
    return new Promise((resolve, reject) => {
      if (!this.loaded) {
        const deferred = [];
        if (this.src) {
          deferred.push(MyAMS.core.getScript(this.src));
        }
        if (this.css) {
          deferred.push(MyAMS.core.getCSS(this.css, `${this.name}_css`));
        }
        $.when.apply($, deferred).then(() => {
          this.loaded = true;
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }

  /**
   * Run plug-in
   *
   * @param element: plug-in execution context
   */
  run(element) {
    const results = [];
    for (const callback of this.callbacks) {
      if (typeof callback.callback === 'string') {
        console.debug(`Resolving callback ${callback.callback}`);
        callback.callback = MyAMS.core.getFunctionByName(callback.callback) || callback.callback;
      }
      results.push(callback.callback(element, callback.context));
    }
    return Promise.all(results);
  }
}

/**
 * Plug-ins registry class
 */
class PluginsRegistry {
  constructor() {
    this.plugins = new Map();
  }

  /**
   * Register new plug-in
   *
   * @param props: plugin function caller, or object containing plug-in properties
   * @param name: plug-in unique name
   */
  register(props, name) {
    // check arguments
    if (!name && Object.prototype.hasOwnProperty.call(props, 'name')) {
      name = props.name;
    }
    // check for already registered plug-in
    const plugins = this.plugins;
    if (plugins.has(name)) {
      if (window.console) {
        console.debug && console.debug(`Plug-in ${name} is already registered!`);
      }
      const plugin = plugins.get(name);
      let addContext = true;
      for (const callback of plugin.callbacks) {
        if (callback.callback === props.callback && callback.context === props.context) {
          addContext = false;
          break;
        }
      }
      if (addContext) {
        plugin.callbacks.push({
          callback: props.callback,
          context: props.context || 'body'
        });
      }
      return plugin;
    }
    // register new plug-in
    if (typeof props === 'string') {
      // callable name
      props = MyAMS.core.getFunctionByName(props);
    }
    if (typeof props === 'function') {
      // callable object
      plugins.set(name, new Plugin(name, {
        callback: props
      }, true));
    } else if (typeof props === 'object') {
      // plug-in properties object
      plugins.set(name, new Plugin(name, props, !(props.src || props.css)));
    }
    // check callback
    return plugins.get(name);
  }

  /**
   * Load plug-ins declared into DOM element
   *
   * @param element
   */
  load(element) {
    // scan element for new plug-ins
    const asyncPlugins = [],
      syncPlugins = [];
    $('[data-ams-plugins]', element).each((idx, elt) => {
      const source = $(elt),
        names = source.data('ams-plugins');
      let plugin, props;
      if (typeof names === 'string') {
        for (const name of names.split(/[\s,;]+/)) {
          const lowerName = name.toLowerCase();
          props = {
            src: source.data(`ams-plugin-${lowerName}-src`),
            css: source.data(`ams-plugin-${lowerName}-css`),
            callback: source.data(`ams-plugin-${lowerName}-callback`),
            context: source,
            async: source.data(`ams-plugin-${lowerName}-async`)
          };
          plugin = this.register(props, name);
          if (!plugin.loaded) {
            if (props.async === false) {
              syncPlugins.push(plugin.load());
            } else {
              asyncPlugins.push(plugin.load());
            }
          }
        }
      } else {
        // JSON plug-in declaration
        for (props of $.isArray(names) ? names : [names]) {
          $.extend(props, {
            context: source
          });
          plugin = this.register(props);
          if (!plugin.loaded) {
            if (plugin.async === false) {
              syncPlugins.push(plugin.load());
            } else {
              asyncPlugins.push(plugin.load());
            }
          }
        }
      }
    });
    // load plug-ins
    let result = $.when.apply($, asyncPlugins);
    // eslint-disable-next-line no-unused-vars
    for (const plugin of syncPlugins) {
      result = result.done(() => {});
    }
    return result;
  }

  /**
   * Run registered plug-ins on given element
   *
   * @param element: source element
   * @param names: array list of plug-ins to activate, or all registered plug-ins if null
   */
  run(element) {
    let names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    // check for disabled plug-ins
    const disabled = new Set();
    $('[data-ams-plugins-disabled]', element).each((idx, elt) => {
      const names = $(elt).data('ams-plugins-disabled').split(/[\s,;]+/);
      for (const name of names) {
        disabled.add(name);
      }
    });
    const plugins = this.plugins;
    if (names) {
      // only run given plug-ins, EVEN DISABLED ONES
      for (const name of names) {
        if (plugins.has(name)) {
          plugins.get(name).run(element);
        }
      }
    } else {
      // run all plug-ins, except disabled ones
      for (const [name, plugin] of plugins.entries()) {
        if (disabled.has(name)) {
          continue;
        }
        plugin.run(element);
      }
    }
  }
}
const plugins = new PluginsRegistry();
const registry = {
  /**
   * Plug-ins registry
   */
  plugins: plugins,
  /**
   * Initialize plug-ins registry from DOM
   *
   * @param element: source element to initialize from
   */
  initElement: function () {
    let element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#content';
    // populate data attributes
    MyAMS.core.executeFunctionByName(MyAMS.config.initData, window, element);
    // load plug-ins from given DOM element
    return plugins.load(element);
  },
  /**
   * Register a new plug-in through Javascript instead of HTML data attributes
   *
   * @param plugin: callable object, or object containing plug-in properties
   * @param name: plug-in name, used if @plugin is a function
   * @param callback: callback function which can be called after plug-in registration
   */
  register: function (plugin, name, callback) {
    return plugins.register(plugin, name, callback);
  },
  /**
   * Run registered plug-ins on given element
   *
   * @param element: DOM element
   * @param names: names of plug-in to run on given element; all if null
   */
  run: function (element) {
    let names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return plugins.run(element, names);
  }
};

/***/ }),

/***/ "./src/js/ext-require.js":
/*!*******************************!*\
  !*** ./src/js/ext-require.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ myams_require; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS dynamic module loader
 */

const $ = MyAMS.$;
function getModule(module, name) {
  let moduleSrc, moduleCss;
  if (typeof module === 'object') {
    moduleSrc = module.src;
    moduleCss = module.css;
  } else {
    if (module.startsWith('http://') || module.startsWith('https://')) {
      moduleSrc = module;
    } else if (module.endsWith('.js')) {
      // custom module with relative path
      moduleSrc = module;
    } else {
      // standard MyAMS module
      moduleSrc = `${MyAMS.env.baseURL}mod-${module}${MyAMS.env.devext}.js`;
    }
  }
  const deferred = [MyAMS.core.getScript(moduleSrc, {
    async: true
  }, console.error)];
  if (moduleCss) {
    deferred.push(MyAMS.core.getCSS(moduleCss, `${name}_css`));
  }
  return deferred;
}

/**
 * Dynamic loading of MyAMS modules
 *
 * @param modules: single module name, or array of modules names
 * @returns Promise
 */
function myams_require() {
  for (var _len = arguments.length, modules = new Array(_len), _key = 0; _key < _len; _key++) {
    modules[_key] = arguments[_key];
  }
  return new Promise((resolve, reject) => {
    const names = [],
      deferred = [],
      loaded = MyAMS.config.modules;
    for (const module of modules) {
      if (typeof module === 'string') {
        if (loaded.indexOf(module) < 0) {
          names.push(module);
          deferred.extendWith(getModule(module));
        }
      } else if ($.isArray(module)) {
        // strings array
        for (const name of module) {
          if (loaded.indexOf(name) < 0) {
            names.push(name);
            deferred.extendWith(getModule(name));
          }
        }
      } else {
        // object
        for (const [name, props] of Object.entries(module)) {
          if (loaded.indexOf(name) < 0) {
            names.push(name);
            deferred.extendWith(getModule(props, name));
          }
        }
      }
    }
    $.when.apply($, deferred).then(() => {
      for (const moduleName of names) {
        if (loaded.indexOf(moduleName) < 0) {
          loaded.push(moduleName);
          MyAMS.core.executeFunctionByName(`MyAMS.${moduleName}.init`);
        }
      }
      resolve();
    }, () => {
      reject(`Can't load requested modules (${names})!`);
    });
  });
}

/***/ }),

/***/ "./src/js/mod-ajax.js":
/*!****************************!*\
  !*** ./src/js/mod-ajax.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ajax": function() { return /* binding */ ajax; }
/* harmony export */ });
/* global jQuery, MyAMS, Cookies */
/**
 * MyAMS AJAX features
 */

const $ = MyAMS.$;

/**
 * CSRF cookie checker
 *
 * Automatically set CSRF request header when CSRF cookie was specified.
 *
 * @param request: outgoing request
 */
function checkCsrfHeader(request /*, options */) {
  if (window.Cookies) {
    const token = Cookies.get(MyAMS.config.csrfCookieName);
    if (token) {
      request.setRequestHeader(MyAMS.config.csrfHeaderName, token);
    }
  }
}
const ajax = {
  /**
   * Check for a given feature, and download script if necessary
   *
   * @param checker: pointer to a resource which will be downloaded if undefined
   * @param source: URL of a javascript file containing requested resource
   */
  check: (checker, source) => {
    return new Promise((resolve, reject) => {
      const deferred = [];
      if (checker === undefined) {
        if (!(source instanceof Array)) {
          source = [source];
        }
        for (const src of source) {
          deferred.push(MyAMS.core.getScript(src));
        }
      } else {
        if (!(checker instanceof Array)) {
          checker = [checker];
        }
        checker.forEach((elt, idx) => {
          if (elt === undefined) {
            deferred.push(MyAMS.core.getScript(source[idx]));
          }
        });
      }
      $.when.apply($, deferred).then(() => {
        resolve(deferred.length > 0);
      }, reject);
    });
  },
  /**
   * Get AJAX URL relative to current page
   *
   * @param addr
   */
  getAddr: addr => {
    const href = addr || $('html head base').attr('href') || window.location.href;
    return href.substring(0, href.lastIndexOf('/') + 1);
  },
  /**
   * JQuery AJAX start callback
   */
  start: () => {
    $('#ajax-gear').show();
  },
  /**
   * JQuery AJAX stop callback
   */
  stop: () => {
    $('#ajax-gear').hide();
  },
  /**
   * Handle AJAX upload or download progress event
   *
   * @param event: source event
   */
  progress: event => {
    if (!event.lengthComputable) {
      return;
    }
    if (event.loaded >= event.total) {
      return;
    }
    if (console) {
      console.debug && console.debug(`${Math.round(event.loaded / event.total * 100)}%`);
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
  get: (url, params, options) => {
    return new Promise((resolve, reject) => {
      let addr;
      if (url.startsWith(window.location.protocol)) {
        addr = url;
      } else {
        addr = MyAMS.ajax.getAddr() + url;
      }
      const defaults = {
        url: addr,
        type: 'get',
        cache: false,
        data: $.param(params || null),
        dataType: 'json',
        beforeSend: checkCsrfHeader
      };
      const settings = $.extend({}, defaults, options);
      $.ajax(settings).then((result, status, xhr) => {
        resolve(result, status, xhr);
      }, (xhr, status, error) => {
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
  post: (url, data, options) => {
    return new Promise((resolve, reject) => {
      let addr;
      if (url.startsWith(window.location.protocol)) {
        addr = url;
      } else {
        addr = MyAMS.ajax.getAddr() + url;
      }
      const defaults = {
        url: addr,
        type: 'post',
        cache: false,
        data: $.param(data || null),
        dataType: 'json',
        beforeSend: checkCsrfHeader
      };
      const settings = $.extend({}, defaults, options);
      $.ajax(settings).then((result, status, xhr) => {
        resolve(result, status, xhr);
      }, (xhr, status, error) => {
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
  getJSON: () => {
    return (source, options) => {
      const url = options.url;
      delete options.url;
      return MyAMS.ajax.post(url, options).then(MyAMS.ajax.handleJSON);
    };
  },
  /**
   * Extract datatype and result from response object
   */
  getResponse: request => {
    let dataType = 'unknown',
      result;
    if (request) {
      let contentType = request.getResponseHeader('content-type');
      if (!contentType) {
        try {
          contentType = request.responseXML.contentType;
        } catch (e) {
          contentType = null;
        }
      }
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
              dataType = 'binary';
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
  handleJSON: (result, form, target) => {
    function closeForm() {
      return new Promise((resolve, reject) => {
        if (form !== undefined) {
          MyAMS.require('form').then(() => {
            MyAMS.form.resetChanged(form);
          }).then(() => {
            if (result.closeForm !== false) {
              MyAMS.require('modal').then(() => {
                MyAMS.modal.close(form);
              }).then(resolve, reject);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
    let url = null,
      loadTarget = null;
    const status = result.status,
      promises = [];
    if (target instanceof jQuery && !target.length) {
      target = null;
    }
    switch (status) {
      case 'alert':
        if (window.alert) {
          const alert = result.alert;
          window.alert(`${alert.title}\n\n${alert.content}`);
        }
        break;
      case 'error':
        promises.push(MyAMS.require('error').then(() => {
          MyAMS.error.showErrors(form, result);
        }));
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
        promises.push(closeForm());
        break;
      case 'modal':
        promises.push(MyAMS.require('modal').then(() => {
          MyAMS.modal.open(result.location);
        }));
        break;
      case 'reload':
        closeForm();
        url = result.location || window.location.hash;
        if (url.startsWith('#')) {
          url = url.substring(1);
        }
        loadTarget = $(result.target || target || '#content');
        promises.push(MyAMS.require('skin').then(() => {
          MyAMS.skin.loadURL(url, loadTarget, {
            preLoadCallback: MyAMS.core.getFunctionByName(result.preReload || function () {
              $('[data-ams-pre-reload]', loadTarget).each((index, element) => {
                MyAMS.core.executeFunctionByName($(element).data('ams-pre-reload'));
              });
            }),
            preLoadCallbackOptions: result.preReloadOptions,
            afterLoadCallback: MyAMS.core.getFunctionByName(result.postReload || function () {
              $('[data-ams-post-reload]', loadTarget).each((index, element) => {
                MyAMS.core.executeFunctionByName($(element).data('ams-post-reload'));
              });
            }),
            afterLoadCallbackOptions: result.postReloadOptions
          });
        }));
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
          $(window).off('beforeunload');
          if (window.location.href === url) {
            window.location.reload();
          } else {
            window.location.replace(url);
          }
        }
        break;
      default:
        if (result.code) {
          // Standard HTTP error?
          promises.push(MyAMS.require('error').then(() => {
            MyAMS.error.showHTTPError(result);
          }));
        } else {
          if (window.console) {
            console.warn && console.warn(`Unhandled JSON response status: ${status}`);
          }
        }
    }

    // Single content response
    if (result.content) {
      const content = result.content,
        container = $(content.target || target || '#content');
      if (typeof content === 'string') {
        container.html(content);
      } else {
        if (content.text) {
          container.text(content.text);
        } else {
          container.html(content.html);
        }
        promises.push(MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, container).then(() => {
          if (!content.keepHidden) {
            container.removeClass('hidden');
          }
        }));
      }
    }

    // Multiple contents response
    if (result.contents) {
      for (const content of result.contents) {
        const container = $(content.target);
        if (content.text) {
          container.text(content.text);
        } else {
          container.html(content.html);
        }
        promises.push(MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, container).then(() => {
          if (!content.keepHidden) {
            container.removeClass('hidden');
          }
        }));
      }
    }

    // Response with message
    if (result.message && !result.code) {
      promises.push(MyAMS.require('alert').then(() => {
        if (typeof result.message === 'string') {
          MyAMS.alert.smallBox({
            status: status,
            message: result.message,
            icon: 'fa-info-circle',
            timeout: 3000
          });
        } else {
          const message = result.message;
          MyAMS.alert.alert({
            parent: form,
            status: message.status || status,
            header: message.header,
            subtitle: message.subtitle,
            message: message.message
          });
        }
      }));
    }

    // Response with message box
    if (result.messagebox) {
      promises.push(MyAMS.require('alert').then(() => {
        if (typeof result.messagebox === 'string') {
          MyAMS.alert.messageBox({
            status: status,
            title: MyAMS.i18n.ERROR_OCCURED,
            icon: 'fa-info-circle',
            message: result.messagebox,
            timeout: 10000
          });
        } else {
          const message = result.messagebox;
          MyAMS.alert.messageBox({
            status: message.status || status,
            title: message.title || MyAMS.i18n.ERROR_OCCURED,
            icon: message.icon || 'fa-info-circle',
            message: message.message,
            content: message.content,
            timeout: message.timeout === 0 ? 0 : message.timeout || 10000
          });
        }
      }));
    }

    // Response with small box
    if (result.smallbox) {
      promises.push(MyAMS.require('alert').then(() => {
        if (typeof result.smallbox === 'string') {
          MyAMS.alert.smallBox({
            status: status,
            message: result.smallbox,
            icon: 'fa-info-circle',
            timeout: 3000
          });
        } else {
          const message = result.smallbox;
          MyAMS.alert.smallBox({
            status: message.status || status,
            message: message.message,
            content: message.content,
            icon: message.icon || 'fa-info-circle',
            timeout: message.timeout
          });
        }
      }));
    }

    // Response with single event
    if (result.event) {
      form.trigger(result.event, result.eventOptions);
    }

    // Response with multiple events
    if (result.events) {
      for (const event of result.events) {
        if (typeof event === 'string') {
          form.trigger(event, result.eventOptions);
        } else {
          form.trigger(event.event, event.options);
        }
      }
    }

    // Response with single callback
    if (result.callback) {
      promises.push(MyAMS.core.executeFunctionByName(result.callback, document, form, result.options));
    }

    // Response with multiple callbacks
    if (result.callbacks) {
      for (const callback of result.callbacks) {
        if (typeof callback === 'string') {
          promises.push(MyAMS.core.executeFunctionByName(callback, document, form, result.options));
        } else {
          promises.push(MyAMS.require(callback.module || []).then(() => {
            MyAMS.core.executeFunctionByName(callback.callback, document, form, callback.options);
          }));
        }
      }
    }
    return Promise.all(promises);
  },
  /**
   * JQuery AJAX error handler
   */
  error: (event, response, request, error) => {
    // user shouldn't be notified of aborted requests
    if (error === 'abort') {
      return;
    }
    // don't display errors on OK status
    if (response && response.statusText && response.statusText.toUpperCase() === 'OK') {
      return;
    }
    // don't display errors twice (via AJAX HTTP error handler and JSON response)
    if (response.x_ams_handled === true) {
      return;
    }
    const parsedResponse = MyAMS.ajax.getResponse(response);
    if (parsedResponse) {
      if (parsedResponse.contentType === 'json') {
        MyAMS.ajax.handleJSON(parsedResponse.data);
        response.x_ams_handled = true;
      } else {
        MyAMS.require('i18n', 'alert').then(() => {
          const title = error || event.statusText || event.type,
            message = parsedResponse.responseText;
          MyAMS.alert.messageBox({
            status: 'error',
            title: MyAMS.i18n.ERROR_OCCURED,
            content: `<h4>${title}</h4><p>${message || ''}</p>`,
            icon: 'fa-exclamation-triangle',
            timeout: 5000
          });
        }, () => {
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
if (typeof jest === 'undefined') {
  // don't check cookies extension in test mode!
  ajax.check(window.Cookies, `${MyAMS.env.baseURL}../ext/js-cookie${MyAMS.env.extext}.js`).then(() => {
    const xhr = $.ajaxSettings.xhr;
    $.ajaxSetup({
      beforeSend: (request, options) => {
        if (MyAMS.config.safeMethods.indexOf(options.type) < 0) {
          if (window.Cookies !== undefined) {
            const token = Cookies.get(MyAMS.config.csrfCookieName);
            if (token) {
              request.setRequestHeader(MyAMS.config.csrfHeaderName, token);
            }
          }
        }
      },
      progress: ajax.progress,
      progressUpload: ajax.progress,
      xhr: function () {
        const request = xhr();
        if (request && typeof request.addEventListener === 'function') {
          if (ajax.progress) {
            request.addEventListener('progress', evt => {
              MyAMS.ajax.progress(evt);
            }, false);
          }
        }
        return request;
      }
    });
  });
}
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

/***/ }),

/***/ "./src/js/mod-alert.js":
/*!*****************************!*\
  !*** ./src/js/mod-alert.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "alert": function() { return /* binding */ alert; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS alerts management
 */

const $ = MyAMS.$;
if (!$.templates) {
  const jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");
  $.templates = jsrender.templates;
}

/**
 * Alert template
 */
const ALERT_TEMPLATE_STRING = `
	<div class="alert alert-{{:status}}" role="alert">
		<button type="button" class="close" data-dismiss="alert" 
				aria-label="{{*: MyAMS.i18n.BTN_CLODE }}">
			<i class="fa fa-times" aria-hidden="true"></i>	
		</button>
		{{if header}}
		<h5 class="alert-heading">{{:header}}</h5>
		{{/if}}
		{{* if (typeof message === 'string') { }}
		<ul>
			<li>{{:message}}</li>
		</ul>
		{{* } else { }}
		<ul>
		{{for message}}
			<li>{{:}}</li>
		{{/for}}
		</ul>
		{{* } }}
	</div>`;
const ALERT_TEMPLATE = $.templates({
  markup: ALERT_TEMPLATE_STRING,
  allowCode: true
});

/**
 * Standard message template
 */

const MESSAGE_TEMPLATE_STRING = `
	<div role="alert" class="toast toast-{{:status}} fade hide"
		 data-autohide="{{*: Boolean(data.timeout !== 0).toString() }}"
		 data-delay="{{: timeout || 5000}}">
		<div class="toast-header">
		{{if icon}}
			<i class="fa {{:icon}} mr-2"></i>
		{{/if}}
			<strong class="mr-auto">{{:title}}</strong>
		{{if !hideTimestamp}}
			<small>{{*: new Date().toLocaleTimeString() }}</small>
		{{/if}}
			<button type="button" class="ml-2 mb-1 close" data-dismiss="toast">
				<i class="fa fa-times text-white"></i>
			</button>
		</div>
		<div class="toast-body">
			<div>
			{{if content}}
				{{:content}}
			{{else}}
				<p>{{:message}}</p>
			{{/if}}
			</div>
		</div>
	</div>`;
const MESSAGE_TEMPLATE = $.templates({
  markup: MESSAGE_TEMPLATE_STRING,
  allowCode: true
});

/**
 * Small box message template
 */

const SMALLBOX_TEMPLATE_STRING = `
	<div role="alert" class="toast toast-{{:status}} fade hide"
		 data-autohide="true"
		 data-delay="{{: timeout || 5000}}">
		<div class="toast-body">
			<div>
			{{if content}}
				{{:content}}
			{{else}}
				<span>
					{{if icon}}
					<i class="fa {{:icon}} mr-2"></i>
					{{/if}}
					{{:message}}
				</span>
			{{/if}}
			</div>
		</div>
	</div>`;
const SMALLBOX_TEMPLATE = $.templates({
  markup: SMALLBOX_TEMPLATE_STRING,
  allowCode: true
});

/**
 * Big box message template
 */

const BIGBOX_TEMPLATE_STRING = `
	<div class="modal fade" data-backdrop="static" role="dialog">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header alert-{{:status}}">
					<h5 class="modal-title">
					{{if icon}}
						<i class="fa {{:icon}} mr-2"></i>
					{{/if}}
					{{:title}}
					</h5>
					<button type="button" class="close" 
							data-dismiss="modal" data-modal-dismiss-value="cancel">
						<i class="fa fa-times"></i>
					</button>
				</div>
				<div class="modal-body">
					<p>{{:message}}</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-primary" 
							data-dismiss="modal" data-modal-dismiss-value="success">
						{{*: data.successLabel || MyAMS.i18n.BTN_OK }}
					</button>
					<button type="button" class="btn btn-secondary" 
							data-dismiss="modal" data-modal-dismiss-value="cancel">
						{{*: data.cancelLabel || MyAMS.i18n.BTN_CANCEL }}
					</button>
				</div>
			</div>
		</div>
	</div>`;
const BIGBOX_TEMPLATE = $.templates({
  markup: BIGBOX_TEMPLATE_STRING,
  allowCode: true
});

/**
 * Main alert object
 */

const alert = {
  /**
   * Display alert message into current document
   *
   * @param props:
   *  - parent: DOM element which should receive the alert
   *  - status: alert status ('info', 'success', 'warning', 'danger'...)
   *  - header: alert header
   *  - subtitle: message sub-title
   *  - message: main alert message
   */
  alert: function () {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let status = props.status || 'info';
    if (status === 'error') {
      status = 'danger';
    }
    props.status = status;
    $(`.alert-${status}`, props.parent).not('.persistent').remove();
    $(ALERT_TEMPLATE.render(props)).prependTo(props.parent);
    MyAMS.require('helpers').then(() => {
      MyAMS.helpers.scrollTo('#content', props.parent, {
        offset: -15
      });
    });
  },
  /**
   * Display notification message on bottom right
   *
   * @param props: message properties:
   *  - status: message status: 'info', 'success', 'warning', 'danger'
   *  - title: message title
   *  - icon: message icon
   *  - content: full HTML content
   *  - message: simple string message
   *  - hideTimestamp: boolean value to specify if timestamp must be hidden
   *  - timeout: timeout in ms; default to 5000, set to 0 to disable auto-hide
   */
  messageBox: function () {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let status = props.status || 'info';
    if (status === 'error') {
      status = 'danger';
    }
    props.status = status;
    let wrapper = $(`.${MyAMS.config.alertsContainerClass}`);
    if (wrapper.length === 0) {
      wrapper = $('<div></div>').addClass(MyAMS.config.alertsContainerClass).appendTo(MyAMS.dom.root);
    }
    $(MESSAGE_TEMPLATE.render(props)).appendTo(wrapper).toast('show').on('hidden.bs.toast', evt => {
      $(evt.currentTarget).remove();
    });
  },
  /**
   * Display small notification message on top right
   *
   * @param props
   */
  smallBox: function () {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let status = props.status || 'info';
    if (status === 'error') {
      status = 'danger';
    }
    props.status = status;
    let wrapper = $(`.${MyAMS.config.alertsContainerClass}`);
    if (wrapper.length === 0) {
      wrapper = $('<div></div>').addClass(MyAMS.config.alertsContainerClass).appendTo(MyAMS.dom.root);
    }
    $(SMALLBOX_TEMPLATE.render(props)).appendTo(wrapper).toast('show').on('hidden.bs.toast', evt => {
      $(evt.currentTarget).remove();
    });
  },
  /**
   * Modal message box
   *
   * @param props
   * @returns {Promise<unknown>}
   */
  bigBox: function () {
    let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise((resolve, reject) => {
      let status = props.status || 'info';
      if (status === 'error') {
        status = 'danger';
      }
      props.status = status;
      MyAMS.require('modal').then(() => {
        const alert = $(BIGBOX_TEMPLATE.render(props)).appendTo(MyAMS.dom.root);
        alert.on('shown.bs.modal', evt => {
          $('.btn-primary', evt.target).focus();
        });
        alert.on('hidden.bs.modal', () => {
          resolve(alert.data('modal-result'));
          alert.remove();
        });
        alert.modal('show');
      }, () => {
        reject("Missing 'modal' module!");
      });
    });
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('alert');
  } else {
    MyAMS.alert = alert;
    console.debug("MyAMS: alert module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-callbacks.js":
/*!*********************************!*\
  !*** ./src/js/mod-callbacks.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "callbacks": function() { return /* binding */ callbacks; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS callbacks management
 */

const $ = MyAMS.$;
let _initialized = false;
const callbacks = {
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;
  },
  initElement: element => {
    return new Promise((resolve, reject) => {
      const deferred = [];
      $('[data-ams-callback]', element).each((idx, elt) => {
        const data = $(elt).data();
        let callbacks = data.amsCallback;
        if (typeof callbacks === 'string') {
          try {
            callbacks = JSON.parse(data.amsCallback);
          } catch (e) {
            callbacks = data.amsCallback.split(/[\s,;]+/);
          }
        }
        if (!$.isArray(callbacks)) {
          callbacks = [callbacks];
        }
        for (const callback of callbacks) {
          let callname, callable, source, options;
          if (typeof callback === 'string') {
            callname = callback;
            callable = MyAMS.core.getFunctionByName(callname);
            source = data.amsCallbackOptions;
            options = data.amsCallbackOptions;
            if (typeof options === 'string') {
              options = options.unserialize();
            }
          } else {
            // JSON object
            callname = callback.callback;
            callable = MyAMS.core.getFunctionByName(callname);
            source = callback.source;
            options = callback.options;
          }
          if (typeof callable === 'undefined') {
            if (source) {
              deferred.push(MyAMS.core.getScript(source).then(() => {
                callable = MyAMS.core.getFunctionByName(callname);
                if (typeof callable === 'undefined') {
                  console.warn(`Missing callback ${callname}!`);
                } else {
                  callable.call(document, elt, options);
                }
              }));
            } else {
              console.warn(`Missing source for undefined callback ${callback}!`);
            }
          } else {
            deferred.push(Promise.resolve(callable.call(document, elt, options)));
          }
        }
      });
      $.when.apply($, deferred).then(resolve, reject);
    });
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('callbacks');
  } else {
    MyAMS.callbacks = callbacks;
    console.debug("MyAMS: callbacks module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-clipboard.js":
/*!*********************************!*\
  !*** ./src/js/mod-clipboard.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clipboard": function() { return /* binding */ clipboard; }
/* harmony export */ });
/* global MyAMS, clipboardData */
/**
 * MyAMS i18n translations
 */

const $ = MyAMS.$;

/**
 * Internal function used to copy text to clipboard
 *
 * @param text: text to be copied
 */
function doCopy(text) {
  let copied = false;
  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code
    copied = clipboardData.setData("Text", text);
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    const textarea = $('<textarea>');
    textarea.val(text).css('position', 'fixed') // prevent scrolling to bottom of page in Edge
    .appendTo(MyAMS.dom.root);
    textarea.get(0).select();
    try {
      document.execCommand('copy'); // security exception may be thrown by some browsers!
      copied = true;
    } catch (e) {
      console.warn("Clipboard copy failed!", e);
    } finally {
      textarea.remove();
    }
  }
  if (copied) {
    MyAMS.require('i18n', 'alert').then(() => {
      MyAMS.alert.smallBox({
        status: 'success',
        message: text.length > 1 ? MyAMS.i18n.CLIPBOARD_TEXT_COPY_OK : MyAMS.i18n.CLIPBOARD_CHARACTER_COPY_OK,
        icon: 'fa-info-circle',
        timeout: 3000
      });
    });
  } else {
    MyAMS.require('i18n').then(() => {
      prompt(MyAMS.i18n.CLIPBOARD_COPY, text);
    });
  }
}
const clipboard = {
  /**
   * Copy given text to system's clipboard
   *
   * @param text: text to be copied
   */
  copy: text => {
    if (typeof text === 'undefined') {
      return function () {
        const source = $(this),
          text = source.text();
        source.parents('.btn-group').removeClass('open');
        doCopy(text);
      };
    } else {
      doCopy(text);
    }
  },
  /**
   * Copy input value or text to system's clipboard
   */
  copyText: event => {
    const source = $(event.currentTarget),
      input = $(source.data('ams-clipboard-target')),
      value = input.val() || input.text();
    doCopy(value);
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('clipboard');
  } else {
    MyAMS.clipboard = clipboard;
    console.debug("MyAMS: clipboard module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-container.js":
/*!*********************************!*\
  !*** ./src/js/mod-container.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "container": function() { return /* binding */ container; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS container management
 */

const $ = MyAMS.$;
const container = {
  /**
   * Switch attribute of container element
   *
   * @param action
   */
  switchElementAttribute: action => {
    return function (link, params) {
      MyAMS.require('ajax', 'alert', 'i18n').then(() => {
        const cell = link.parents('td').first(),
          icon = $('i', cell),
          row = cell.parents('tr'),
          table = row.parents('table'),
          col = $(`thead th:nth-child(${cell.index() + 1})`, table);
        let location = link.data('ams-location') || col.data('ams-location') || row.data('ams-location') || table.data('ams-location') || '';
        if (location) {
          location += '/';
        }
        const updateTarget = link.data('ams-update-target') || col.data('ams-update-target') || row.data('ams-update-target') || table.data('ams-update-target') || 'switch-element-attribute.json',
          objectName = row.data('ams-element-name'),
          hint = icon.attr('data-original-title') || icon.attr('title');
        icon.tooltip('hide').replaceWith('<i class="fas fa-spinner fa-spin"></i>');
        MyAMS.ajax.post(location + updateTarget, {
          object_name: objectName,
          attribute_name: col.data('ams-attribute-name')
        }).then((result, status, xhr) => {
          let icon = $('i', cell);
          if (result.status === 'success') {
            if (result.state) {
              icon.replaceWith(`<i class="${col.data('ams-icon-on')}"></i>`);
            } else {
              icon.replaceWith(`<i class="${col.data('ams-icon-off')}"></i>`);
            }
            if (hint) {
              icon = $('i', cell);
              icon.addClass('hint').attr('data-original-title', hint);
            }
            if (result.handle_json) {
              MyAMS.ajax.handleJSON(result);
            }
          } else {
            MyAMS.ajax.handleJSON(result);
          }
        });
      });
    };
  },
  /**
   * Delete element from container
   *
   * @param action
   * @returns {(function(*, *): void)|*}
   */
  deleteElement: action => {
    return function (link, params) {
      MyAMS.require('ajax', 'alert', 'i18n').then(() => {
        MyAMS.alert.bigBox({
          status: 'danger',
          icon: 'fas fa-bell',
          title: MyAMS.i18n.WARNING,
          message: MyAMS.i18n.CONFIRM_REMOVE,
          successLabel: MyAMS.i18n.CONFIRM,
          cancelLabel: MyAMS.i18n.BTN_CANCEL
        }).then(status => {
          if (status !== 'success') {
            return;
          }
          const cell = link.parents('td'),
            row = cell.parents('tr'),
            table = row.parents('table'),
            col = $(`thead th:nth-child(${cell.index() + 1})`, table);
          let location = link.data('ams-location') || col.data('ams-location') || row.data('ams-location') || table.data('ams-location') || '';
          if (location) {
            location += '/';
          }
          const deleteTarget = link.data('ams-delete-target') || col.data('ams-delete-target') || row.data('ams-delete-target') || table.data('ams-delete-target') || 'delete-element.json',
            objectName = row.data('ams-element-name');
          MyAMS.ajax.post(location + deleteTarget, {
            'object_name': objectName
          }).then((result, status, xhr) => {
            if (result.status === 'success') {
              if (table.hasClass('datatable')) {
                table.DataTable().row(row).remove().draw();
              } else {
                row.remove();
              }
              if (result.handle_json) {
                MyAMS.ajax.handleJSON(result);
              }
            } else {
              MyAMS.ajax.handleJSON(result);
            }
          });
        });
      });
    };
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('container');
  } else {
    MyAMS.container = container;
    console.debug("MyAMS: container module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-datatable.js":
/*!*********************************!*\
  !*** ./src/js/mod-datatable.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datatable": function() { return /* binding */ datatable; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS datatables management
 */

const $ = MyAMS.$;
const datatable = {};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('datatable');
  } else {
    MyAMS.datatable = datatable;
    console.debug("MyAMS: datatable module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-error.js":
/*!*****************************!*\
  !*** ./src/js/mod-error.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "error": function() { return /* binding */ error; }
/* harmony export */ });
/* harmony import */ var jsrender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");
/* harmony import */ var jsrender__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsrender__WEBPACK_IMPORTED_MODULE_0__);
/* global MyAMS */
/**
 * MyAMS errors management
 */


const $ = MyAMS.$;
const ERRORS_TEMPLATE_STRING = `
	<div class="alert alert-{{:status}}" role="alert">
		<button type="button" class="close" data-dismiss="alert" 
				aria-label="{{*: MyAMS.i18n.BTN_CLOSE }}">
			<i class="fa fa-times" aria-hidden="true"></i>	
		</button>
		{{if header}}
		<h5 class="alert-heading">{{:header}}</h5>
		{{/if}}
		{{if message}}
		<p>{{:message}}</p>
		{{/if}}
		{{if messages}}
		<ul>
		{{for messages}}
			<li>
				{{if header}}<strong>{{:header}} :</strong>{{/if}}
				{{:message}}
			</li>
		{{/for}}
		</ul>
		{{/if}}
		{{if widgets}}
		<ul>
		{{for widgets}}
			<li>
				{{if header}}<strong>{{:header}} :</strong>{{/if}}
				{{:message}}
			</li>
		{{/for}}
		</ul>
		{{/if}}
	</div>`;
const ERROR_TEMPLATE = $.templates({
  markup: ERRORS_TEMPLATE_STRING,
  allowCode: true
});
const error = {
  /**
   * Show errors as alert in given parent
   *
   * @param parent: alert parent element
   * @param errors: errors properties
   */
  showErrors: (parent, errors) => {
    return new Promise((resolve, reject) => {
      if (typeof errors === 'string') {
        // simple error message
        MyAMS.require('i18n', 'alert').then(() => {
          MyAMS.alert.alert({
            parent: parent,
            status: 'danger',
            header: MyAMS.i18n.ERROR_OCCURED,
            message: errors
          });
        }).then(resolve, reject);
      } else if ($.isArray(errors)) {
        // array of messages
        MyAMS.require('i18n', 'alert').then(() => {
          MyAMS.alert.alert({
            parent: parent,
            status: 'danger',
            header: MyAMS.i18n.ERRORS_OCCURED,
            message: errors
          });
        }).then(resolve, reject);
      } else {
        // full errors with widgets
        MyAMS.require('i18n', 'ajax', 'alert', 'form').then(() => {
          // clear previous alerts
          MyAMS.form.clearAlerts(parent);
          // create new alert
          const messages = [];
          for (const message of errors.messages || []) {
            if (typeof message === 'string') {
              messages.push({
                header: null,
                message: message
              });
            } else {
              messages.push(message);
            }
          }
          for (const widget of errors.widgets || []) {
            messages.push({
              header: widget.label,
              message: widget.message
            });
          }
          const header = errors.header || (messages.length > 1 ? MyAMS.i18n.ERRORS_OCCURED : MyAMS.i18n.ERROR_OCCURED),
            props = {
              status: 'danger',
              header: header,
              message: errors.error || null,
              messages: messages
            };
          $(ERROR_TEMPLATE.render(props)).prependTo(parent);
          // update status of invalid widgets
          for (const widget of errors.widgets || []) {
            let input;
            if (widget.id) {
              input = $(`#${widget.id}`, parent);
            } else {
              input = $(`[name="${widget.name}"]`, parent);
            }
            if (input.exists()) {
              MyAMS.form.setInvalid(parent, input, widget.message);
            }
            // open parent fieldsets switchers
            const fieldsets = input.parents('fieldset.switched');
            fieldsets.each((idx, elt) => {
              $('legend.switcher', elt).click();
            });
            // open parent tab panels
            const panels = input.parents('.tab-pane');
            panels.each((idx, elt) => {
              const panel = $(elt),
                tabs = panel.parents('.tab-content').siblings('.nav-tabs');
              $(`li:nth-child(${panel.index() + 1})`, tabs).addClass('is-invalid');
              $('li.is-invalid:first a', tabs).click();
            });
          }
          MyAMS.require('helpers').then(() => {
            let scrollBox = parent.parents('.modal-body');
            if (!scrollBox.exists()) {
              scrollBox = $('#main');
            }
            MyAMS.helpers.scrollTo(scrollBox, parent, {
              offset: -15
            });
          });
        }).then(resolve, reject);
      }
    });
  },
  /**
   * Display message for standard HTTP error
   *
   * @param error: error object
   */
  showHTTPError: error => {
    return new Promise((resolve, reject) => {
      MyAMS.require('alert').then(() => {
        MyAMS.alert.messageBox({
          status: 'error',
          title: error.title,
          message: error.message,
          hideTimestamp: false,
          timeout: 0
        });
      }).then(resolve, reject);
    });
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('error');
  } else {
    MyAMS.error = error;
    console.debug("MyAMS: error module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-events.js":
/*!******************************!*\
  !*** ./src/js/mod-events.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "events": function() { return /* binding */ events; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS events management
 */

const $ = MyAMS.$;
let _initialized = false;
const events = {
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;

    // Initialize custom click handlers
    $(document).on('click', '[data-ams-click-handler]', MyAMS.events.clickHandler);

    // Initialize custom change handlers
    $(document).on('change', '[data-ams-change-handler]', MyAMS.events.changeHandler);

    // Initialize custom event on click
    $(document).on('click', '[data-ams-click-event]', MyAMS.events.triggerEvent);
  },
  initElement: element => {
    $('[data-ams-events-handlers]', element).each((idx, elt) => {
      const source = $(elt),
        handlers = source.data('ams-events-handlers');
      if (handlers) {
        const selector = source.data('ams-events-handlers-context'),
          context = selector ? source.parents(selector) : source;
        for (const [event, handler] of Object.entries(handlers)) {
          context.on(event, function (event) {
            for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              options[_key - 1] = arguments[_key];
            }
            if (options.length > 0) {
              MyAMS.core.executeFunctionByName(handler, document, event, ...options);
            } else {
              MyAMS.core.executeFunctionByName(handler, document, event, source.data('ams-events-options') || {});
            }
          });
        }
      }
    });
  },
  /**
   * Get events handlers on given element for a specific event
   *
   * @param element: the checked element
   * @param event: event for which handlers lookup is made
   * @returns: an array of elements for which the event handler is defined
   */
  getHandlers: (element, event) => {
    const result = [],
      handlers = element.data('ams-events-handlers');
    if (handlers && handlers[event]) {
      result.push(element);
    }
    $('[data-ams-events-handlers]', element).each((idx, elt) => {
      const context = $(elt),
        handlers = context.data('ams-events-handlers');
      if (handlers && handlers[event]) {
        result.push(context);
      }
    });
    return result;
  },
  /**
   * Generic click event handler
   */
  clickHandler: event => {
    const source = $(event.currentTarget),
      handlers = source.data('ams-disabled-handlers');
    if (handlers === true || handlers === 'click' || handlers === 'all') {
      return;
    }
    const data = source.data();
    if (data.amsClickHandler) {
      if (data.amsPreventDefault !== false && data.amsClickPreventDefault !== false) {
        event.preventDefault();
      }
      if (data.amsStopPropagation !== false && data.amsClickStopPropagation !== false) {
        event.stopPropagation();
      }
      for (const handler of data.amsClickHandler.split(/[\s,;]+/)) {
        const callback = MyAMS.core.getFunctionByName(handler);
        if (callback !== undefined) {
          callback.call(document, event, data.amsClickHandlerOptions);
        }
      }
    }
  },
  /**
   * Generic change event handler
   */
  changeHandler: event => {
    const source = $(event.currentTarget);
    // Disable change handlers for readonly inputs
    // These change handlers are activated by IE!!!
    if (source.prop('readonly')) {
      return;
    }
    const handlers = source.data('ams-disabled-handlers');
    if (handlers === true || handlers === 'change' || handlers === 'all') {
      return;
    }
    const data = source.data();
    if (data.amsChangeHandler) {
      if (data.amsKeepDefault !== false && data.amsChangeKeepDefault !== false) {
        event.preventDefault();
      }
      if (data.amsStopPropagation !== false && data.amsChangeStopPropagation !== false) {
        event.stopPropagation();
      }
      for (const handler of data.amsChangeHandler.split(/[\s,;]+/)) {
        const callback = MyAMS.core.getFunctionByName(handler);
        if (callback !== undefined) {
          callback.call(document, event, data.amsChangeHandlerOptions);
        }
      }
    }
  },
  /**
   * Generic click event trigger
   */
  triggerEvent: event => {
    const source = $(event.currentTarget);
    $(event.target).trigger(source.data('ams-click-event'), source.data('ams-click-event-options'));
  }
};

/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
  MyAMS.config.modules.push('events');
} else {
  MyAMS.events = events;
  console.debug("MyAMS: events module loaded...");
}

/***/ }),

/***/ "./src/js/mod-form.js":
/*!****************************!*\
  !*** ./src/js/mod-form.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkFormValidators": function() { return /* binding */ checkFormValidators; },
/* harmony export */   "form": function() { return /* binding */ form; },
/* harmony export */   "formSubmitCallback": function() { return /* binding */ formSubmitCallback; },
/* harmony export */   "getFormAction": function() { return /* binding */ getFormAction; },
/* harmony export */   "getFormAjaxSettings": function() { return /* binding */ getFormAjaxSettings; },
/* harmony export */   "getFormData": function() { return /* binding */ getFormData; },
/* harmony export */   "getFormDownloadTarget": function() { return /* binding */ getFormDownloadTarget; },
/* harmony export */   "getFormProgressSettings": function() { return /* binding */ getFormProgressSettings; },
/* harmony export */   "getFormProgressState": function() { return /* binding */ getFormProgressState; },
/* harmony export */   "getFormTarget": function() { return /* binding */ getFormTarget; },
/* harmony export */   "getFormValidators": function() { return /* binding */ getFormValidators; },
/* harmony export */   "initFormData": function() { return /* binding */ initFormData; },
/* harmony export */   "initFormDownloadTarget": function() { return /* binding */ initFormDownloadTarget; },
/* harmony export */   "initFormSubmitButton": function() { return /* binding */ initFormSubmitButton; },
/* harmony export */   "initFormTarget": function() { return /* binding */ initFormTarget; },
/* harmony export */   "resetFormAfterError": function() { return /* binding */ resetFormAfterError; },
/* harmony export */   "resetFormAfterSubmit": function() { return /* binding */ resetFormAfterSubmit; },
/* harmony export */   "resetFormDownloadTarget": function() { return /* binding */ resetFormDownloadTarget; },
/* harmony export */   "resetFormSubmitButton": function() { return /* binding */ resetFormSubmitButton; },
/* harmony export */   "showFormSubmitWarning": function() { return /* binding */ showFormSubmitWarning; },
/* harmony export */   "submitForm": function() { return /* binding */ submitForm; }
/* harmony export */ });
/* global MyAMS, tinyMCE */
/**
 * MyAMS forms support
 */

const $ = MyAMS.$;
if (!$.templates) {
  const jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");
  $.templates = jsrender.templates;
}
let _initialized = false;

/**
 * MyAMS "form" module
 */
const form = {
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;

    // Add click listener on submit buttons
    $(document).on('click', '[type="submit"], .submit', evt => {
      const button = $(evt.currentTarget);
      if (button.exists()) {
        $(button).closest('form').data('ams-submit-button', button);
      }
    });

    // Cancel clicks on readonly checkbox
    $(document).on('click', 'input[type="checkbox"][readonly]', () => {
      return false;
    });

    // Initialize generic and custom reset handlers
    $(document).on('reset', MyAMS.form.resetHandler);
    $(document).on('reset', '[data-ams-reset-handler]', MyAMS.form.customResetHandler);

    // Submit form when CTRL+Enter key is pressed in textarea
    $(document).on('keydown', 'textarea', evt => {
      if ((evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey)) {
        const form = $(evt.currentTarget).closest('form');
        $('button[type="submit"]', form).first().click();
      }
    });

    // Always blur readonly inputs
    $(document).on('focus', 'input[readonly]', evt => {
      $(evt.currentTarget).blur();
    });

    // Prevent bootstrap dialog from blocking TinyMCE focus
    $(document).on('focusin', evt => {
      if ($(evt.target).closest('.mce-window').length >= 0) {
        evt.stopImmediatePropagation();
      }
    });

    // Add unload event listener to check for modified forms
    $(window).on('beforeunload', MyAMS.form.checkBeforeUnload);
  },
  initElement: element => {
    if (typeof element === 'string') {
      element = $(element);
    }
    let forms;
    if (MyAMS.config.warnOnFormChange) {
      forms = $('form[data-ams-warn-on-change!="false"]', element);
    } else {
      forms = $('form[data-ams-warn-on-change="true"]', element);
    }
    forms.each((idx, elt) => {
      const form = $(elt),
        formData = form.data(),
        callback = formData.amsChangedCallback || MyAMS.config.formChangeCallback;
      $('input, select, textarea, [data-ams-changed-event]', form).each((idx, elt) => {
        const input = $(elt),
          inputData = input.data();
        if (inputData.amsIgnoreChange !== true) {
          const event = inputData.amsChangedEvent || 'change';
          input.on(event, () => {
            MyAMS.form.setChanged(form);
            MyAMS.core.executeFunctionByName(inputData.amsChangedCallback || callback, document, form, input);
          });
        }
      });
    });
    MyAMS.form.setFocus(element);
  },
  setFocus: element => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let focused = $('[data-ams-focus-target]', element).first();
        if (!focused.exists()) {
          if (window?.process?.env?.NODE_ENV === 'test') {
            focused = $('input, select, textarea', element).first();
          } else {
            focused = $('input:enabled:visible, ' + 'select:enabled:visible, ' + 'textarea:enabled:visible', element).first();
          }
        }
        if (focused.exists()) {
          focused.get(0).focus();
        }
        resolve(focused);
      }, 100);
    });
  },
  checkBeforeUnload: () => {
    if (MyAMS.i18n) {
      const forms = $('form[data-ams-form-changed="true"]');
      if (forms.exists()) {
        return MyAMS.i18n.FORM_CHANGED_WARNING;
      }
    }
  },
  confirmChangedForm: element => {
    return new Promise((resolve, reject) => {
      const forms = $('form[data-ams-form-changed="true"]', element);
      if (forms.exists()) {
        MyAMS.require('alert').then(() => {
          MyAMS.alert.bigBox({
            status: 'danger',
            title: MyAMS.i18n.WARNING,
            icon: 'text-danger fa-bell',
            message: MyAMS.i18n.FORM_CHANGED_WARNING
          }).then(button => {
            if (button === 'success') {
              MyAMS.form.resetChanged(forms);
            }
            resolve(button);
          });
        }, () => {
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
  setChanged: form => {
    form.attr('data-ams-form-changed', true);
  },
  /**
   * Default form reset handler
   *
   * @param event: the original reset event
   */
  resetHandler: event => {
    const form = $(event.target);
    MyAMS.form.clearAlerts(form);
    MyAMS.form.handleDefaultReset(form);
  },
  /**
   * Clear remaining form alerts before submitting form
   */
  clearAlerts: form => {
    $('.alert-danger, SPAN.state-error', form).not('.persistent').remove();
    $('.state-error', form).removeClassPrefix('state-');
    $('.invalid-feedback', form).remove();
    $('.is-invalid', form).removeClass('is-invalid');
  },
  /**
   * Call reset callbacks defined on a form
   */
  handleDefaultReset: form => {
    setTimeout(() => {
      form.find('.select2').trigger('change');
      $('[data-ams-reset-callback]', form).each((idx, elt) => {
        const element = $(elt),
          data = element.data(),
          callback = MyAMS.core.getFunctionByName(data.amsResetCallback);
        if (callback !== undefined) {
          callback.call(document, form, element, data.amsResetCallbackOptions);
        }
      });
      MyAMS.form.resetChanged(form);
    }, 10);
  },
  /**
   * Reset form changed flag
   */
  resetChanged: form => {
    if (form !== undefined) {
      $(form).removeAttr('data-ams-form-changed');
    }
  },
  /**
   * Custom reset handler
   */
  customResetHandler: event => {
    const form = $(event.target),
      data = form.data();
    if (data.amsResetHandler) {
      if (data.amsKeepDefault !== true && data.amsResetKeepDefault !== true) {
        event.preventDefault();
      }
      const callback = MyAMS.core.getFunctionByName(data.amsResetHandler);
      if (callback !== undefined) {
        callback.call(document, event, form, data.amsResetHandlerOptions);
      }
    }
  },
  /**
   * Set widget's invalid status
   *
   * @param form: parent form
   * @param input: input name
   * @param message: associated message
   */
  setInvalid: (form, input, message) => {
    if (typeof input === 'string') {
      input = $(`[name="${input}"]`, form);
    }
    if (input.exists()) {
      const widget = input.closest('.form-widget');
      $('.invalid-feedback', widget).remove();
      $('<span>').text(message).addClass('is-invalid invalid-feedback').appendTo(widget);
      input.removeClass('valid').addClass('is-invalid');
    }
  },
  /**
   * Get all settings for given form
   *
   * @param form: submitted form
   * @param formData: form data
   * @param button: submit button
   * @param buttonData: submit button data
   * @param options: submit options
   */
  getSettings: (form, formData, button, buttonData, options) => {
    const defaults = {
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
        submitHandler: (form.attr('action') || '').replace(/#/, ''),
        submitTarget: form.attr('target') || null,
        submitMessage: null,
        submitCallback: formSubmitCallback,
        progressHandler: null,
        progressFieldName: 'progressId',
        progressInterval: 1000,
        progressTarget: null,
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
      settings = $.extend({}, defaults);

    // extend default values with form, button and options properties
    $.extendPrefix(settings, 'amsForm', value => {
      return MyAMS.core.getFunctionByName(value) || value;
    }, formData, buttonData);
    $.extendOnly(settings, value => {
      return MyAMS.core.getFunctionByName(value) || value;
    }, options);
    return settings;
  },
  /**
   * Submit given form
   *
   * @param form: input form
   * @param handler: AJAX submit target
   * @param options: submit options
   */
  submit: function (form, handler) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // check arguments
    form = $(form);
    if (!form.exists()) {
      return false;
    }
    if (typeof handler === 'object') {
      options = handler;
      handler = undefined;
    }

    // initialize default settings
    const formData = form.data(),
      button = $(formData.amsSubmitButton),
      buttonData = button.data() || {},
      settings = MyAMS.form.getSettings(form, formData, button, buttonData, options);

    // prevent multiple submits
    if (formData.submitted) {
      settings.submitWarning(form, settings);
      return false;
    }

    // check custom submit validators
    settings.checkValidators(form, settings).then(status => {
      // check validation status
      if (status !== 'success') {
        return;
      }

      // submit form
      MyAMS.require('ajax', 'i18n').then(() => {
        MyAMS.ajax.check($.fn.ajaxSubmit, `${MyAMS.env.baseURL}../ext/jquery-form${MyAMS.env.extext}.js`).then(() => {
          // clear alerts and initialize submit button
          settings.clearAlerts(form, settings);
          settings.initSubmitButton(form, settings, button);

          // extract and initialize custom submit data
          const postData = settings.getData(form, settings, formData, button, buttonData, options),
            veto = {
              veto: false
            };
          settings.initData(form, settings, button, postData, options, veto);
          if (veto.veto) {
            settings.resetSubmitButton(form, settings, button);
            return;
          }

          // get and initialize post target
          const target = settings.getTarget(form, settings, formData, buttonData);
          if (target && target.exists()) {
            settings.initTarget(form, settings, target);
          }

          // get form action and POST settings
          const action = settings.getAction(form, settings, handler),
            ajaxSettings = settings.getAjaxSettings(form, settings, button, postData, action, target);

          // get and initialize download target
          const downloadTarget = settings.getDownloadTarget(form, settings);
          if (downloadTarget) {
            settings.initDownloadTarget(form, settings, downloadTarget, ajaxSettings);
          }

          // get progress settings
          ajaxSettings.progress = settings.getProgressSettings(form, settings, button, postData);

          // YESSSS!!!!
          // submit form!!
          settings.submit(form, settings, button, postData, ajaxSettings, target);
          if (downloadTarget) {
            settings.resetDownloadTarget(form, settings, button, downloadTarget, ajaxSettings);
          }
        });
      });
    });

    // disable standard submit
    return false;
  },
  /**
   * Submit a form from a button click handler
   */
  submitForm: evt => {
    const button = $(evt.currentTarget),
      form = button.parents('form');
    form.data('ams-submit-button', button);
    form.submit();
  }
};

/**
 * Show warning message if form was already submitted
 *
 * @param form: submitted form
 * @param settings: computed form settings
 */
function showFormSubmitWarning(form /*, settings */) {
  return new Promise((resolve, reject) => {
    if (!form.data('ams-form-hide-submitted')) {
      MyAMS.require('i18n', 'alert').then(() => {
        MyAMS.alert.messageBox({
          status: 'warning',
          title: MyAMS.i18n.WAIT,
          message: MyAMS.i18n.FORM_SUBMITTED,
          icon: 'fa-save',
          timeout: form.data('ams-form-alert-timeout') || 5000
        });
      }).then(resolve, reject);
    } else {
      resolve();
    }
  });
}

/**
 * Extract custom validators from given form
 *
 * @param form: checked form
 * @param settings: computed form settings
 * @returns {Map<any, any>}
 */
function getFormValidators(form /*, settings */) {
  const result = new Map(),
    formValidators = (form.data('ams-form-validator') || '').trim().split(/[\s,;]+/);
  let validators = [];
  $(formValidators).each((idx, elt) => {
    if (!elt) {
      return;
    }
    validators.push(elt);
  });
  if (validators.length > 0) {
    result.set(form, validators);
  }
  $('[data-ams-form-validator]', form).each((idx, elt) => {
    const element = $(elt),
      elementValidators = (element.data('ams-form-validator') || '').trim().split(/[\s,;]+/);
    validators = [];
    $(elementValidators).each((innerIdx, innerElt) => {
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
  return new Promise((resolve, reject) => {
    const validators = settings.getValidators(form, settings);
    if (!validators.size) {
      resolve('success');
      return;
    }
    const checks = [];
    for (const [context, contextValidators] of validators.entries()) {
      for (const validator of contextValidators) {
        checks.push(MyAMS.core.executeFunctionByName(validator, document, form, context));
      }
    }
    $.when.apply($, checks).then(function () {
      let status = 'success',
        output = [];
      for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
        results[_key] = arguments[_key];
      }
      for (const result of results) {
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
        MyAMS.require('i18n', 'alert').then(() => {
          const header = output.length === 1 ? MyAMS.i18n.ERROR_OCCURED : MyAMS.i18n.ERRORS_OCCURED;
          MyAMS.alert.alert({
            parent: form,
            status: 'danger',
            header: header,
            message: output
          });
          resolve(status);
        });
      } else {
        resolve(status);
      }
    }, () => {
      reject('error');
    });
  });
}

/**
 * Initialize form submit button
 * Button is disabled and text is updated
 */
function initFormSubmitButton(form, settings, button) {
  const text = button.data('ams-loading-text') || button.text().trim();
  if (text) {
    button.data('original-text', button.text()).prop('disabled', true).text(`${text}...`);
    $('<div>').addClass('progress').appendTo(button);
  } else {
    // button without text
    button.data('original-html', button.html()).prop('disabled', true).html('<i class="fa fa-cog fa-spin"></i>');
  }
}

// reset form submit button
function resetFormSubmitButton(form, settings, button) {
  $('.progress', button).remove();
  const text = button.data('original-text');
  if (text) {
    button.text(text);
  } else {
    const html = button.data('original-html');
    if (html) {
      button.html(html);
    }
  }
  button.prop('disabled', false);
}

// get form data
function getFormData(form, settings, formData, button, buttonData, options) {
  const data = $.extend({}, formData.amsFormData, buttonData.amsFormData, options.data),
    name = button.attr('name');
  if (name) {
    data[name] = button.val();
  }
  return data;
}

// initialize form data
function initFormData(form, settings, button, postData, options, veto) {
  const callback = settings.initDataCallback;
  if (callback) {
    $.extend(postData, callback(form, settings, button, postData, options, veto));
  }
  form.trigger('init-data.ams.form', [postData, veto]);
}

// get form target
function getFormTarget(form, settings /*, formData, buttonData */) {
  return $(settings.submitTarget);
}

// initialize form target
const TARGET_INIT_TEMPLATE_STRING = `
	<div class="row m-3">
		<div class="text-center w-100">
			<i class="fa fa-3x fa-cog fa-spin"></i>
			{{if message}}
			<strong>{{:message}}</strong>
			{{/if}}
		</div>
	</div>`;
const TARGET_INIT_TEMPLATE = $.templates({
  markup: TARGET_INIT_TEMPLATE_STRING
});
function initFormTarget(form, settings, target) {
  target.html(TARGET_INIT_TEMPLATE.render({
    message: settings.submitMessage
  }));
  target.parents('.hidden').removeClass('hidden');
}

// get form action
function getFormAction(form, settings, handler) {
  let url;
  const formHandler = handler || settings.submitHandler;
  if (formHandler.startsWith(window.location.protocol)) {
    url = formHandler;
  } else {
    url = MyAMS.ajax.getAddr() + formHandler;
  }
  return url;
}

// get AJAX POST submit settings
function getFormAjaxSettings(form, settings, button, postData, action, target) {
  const base = {
    url: action,
    type: 'post',
    cache: false,
    data: postData,
    dataType: settings.datatype,
    beforeSerialize: (form /*, options */) => {
      const veto = {
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
    beforeSubmit: (data, form /*, options */) => {
      const veto = {
        veto: false
      };
      form.trigger('before-submit.ams.form', [data, veto]);
      if (veto.veto) {
        return false;
      }
      form.data('submitted', true);
      if (settings.resetBeforeSubmit) {
        setTimeout(() => {
          settings.resetSubmitButton(form, settings, button);
        }, 250);
      }
    },
    uploadProgress: (evt, position, total, completed) => {
      $('.progress', button).css('background-image', `linear-gradient(to right, white -45%, green ${completed}%, red ${completed}%, red)`);
    },
    complete: xhr => {
      form.trigger('complete.ams.form', [xhr]);
    },
    success: (result, status, request, form) => {
      const veto = {
        veto: false
      };
      form.trigger('submit-success.ams.form', [result, status, request, veto]);
      if (veto.veto) {
        return;
      }
      if (result && result.status !== 'error' && result.closeForm !== false) {
        const modal = form.closest('.modal-dialog');
        if (modal.exists() && !settings.keepModalOpen) {
          MyAMS.modal && MyAMS.modal.close(modal);
        }
      }
      try {
        settings.submitCallback(form, settings, target, result, status, request);
      } finally {
        settings.resetAfterSubmit(form, settings, button);
        MyAMS.form.resetChanged(form);
      }
    },
    error: (request, status, error, form) => {
      form.trigger('submit-error.ams.form', [request, status, error, target]);
      if (target) {
        settings.resetAfterError(form, settings, button, target);
      }
      settings.resetAfterSubmit(form, settings, button);
    },
    iframe: false
  };
  return $.extend({}, base, settings.submitOptions);
}

// get form submit processing progress settings
function getFormProgressSettings(form, settings, button, postData) {
  const handler = settings.progressHandler;
  if (handler) {
    // check fieldname
    const fieldname = settings.progressFieldName;
    postData[fieldname] = MyAMS.core.generateUUID();
    // check progress target
    let progressTarget = button;
    if (settings.progressTarget) {
      progressTarget = $(settings.progressTarget);
    }
    return {
      handler: handler,
      interval: settings.progressInterval,
      fieldname: fieldname,
      target: progressTarget,
      callback: settings.progressCallback,
      endCallback: settings.progressEndCallback
    };
  }
}

// get form submit progress state
function getFormProgressState(form, settings, postData, progress, target) {
  let timeout = setTimeout(_getProgressState, progress.interval);
  function _getProgressState() {
    const data = {};
    data[progress.fieldname] = postData[progress.fieldname];
    MyAMS.ajax.post(progress.handler, data).then(MyAMS.core.getFunctionByName(progress.callback || function (result, status) {
      if ($.isArray(result)) {
        status = result[1];
        result = result[0];
      }
      if (status === 'success') {
        if (result.status === 'running') {
          if (result.message) {
            target.text(result.message);
          } else {
            let text = result.progress || target.data('ams-progress-text') || MyAMS.i18n.PROGRESS;
            if (result.current) {
              text += `: ${result.current} / ${result.length || 100}`;
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
}

// submit form
function submitForm(form, settings, button, postData, ajaxSettings, target) {
  if (ajaxSettings.progress) {
    settings.getProgressState(form, settings, postData, ajaxSettings.progress, target);
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
  let dataType = settings.datatype;
  if (!dataType) {
    const response = MyAMS.ajax.getResponse(request);
    if (response) {
      dataType = response.contentType;
      result = response.data;
    }
  }
  switch (dataType) {
    case 'binary':
    case 'script':
    case 'xml':
      break;
    case 'json':
      MyAMS.ajax.handleJSON(result, form, target);
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
      MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, target).then(() => {
        MyAMS.require('helpers').then(() => {
          MyAMS.helpers.scrollTo('#main', target, {
            offset: -15
          });
        });
      });
  }
  const callback = request.getResponseHeader('X-AMS-Callback');
  if (callback) {
    const options = request.getResponseHeader('X-AMS-Callback-Options') || "{}";
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
    if (form.data('ams-reset-after-submit')) {
      form.get(0).reset();
    }
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
}

// get form download target
function getFormDownloadTarget(form, settings) {
  return settings.downloadTarget;
}

// initialize download target
function initFormDownloadTarget(form, settings, target, ajaxSettings) {
  let iframe = $(`iframe[name="${target}"]`);
  if (!iframe.exists()) {
    iframe = $('<iframe>').attr('name', target).hide().appendTo(MyAMS.dom.root);
  }
  $.extend(ajaxSettings, {
    iframe: true,
    iframeTarget: iframe
  });
}

// reset if download target
function resetFormDownloadTarget(form, settings, button, target, ajaxSettings) {
  const modal = form.closest('.modal-dialog'),
    keepModal = settings.keepModalOpen;
  if (modal.exists() && keepModal !== true) {
    MyAMS.require('modal').then(() => {
      MyAMS.modal.close(modal);
    });
  }
  if (!ajaxSettings.progress) {
    setTimeout(() => {
      settings.resetAfterSubmit(form, settings, button);
      MyAMS.ajax && MyAMS.ajax.stop();
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

/***/ }),

/***/ "./src/js/mod-graph.js":
/*!*****************************!*\
  !*** ./src/js/mod-graph.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "graph": function() { return /* binding */ graph; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS graphs management
 */

const $ = MyAMS.$;
const graph = {};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('graph');
  } else {
    MyAMS.graph = graph;
    console.debug("MyAMS: graph module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-helpers.js":
/*!*******************************!*\
  !*** ./src/js/mod-helpers.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpers": function() { return /* binding */ helpers; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS generic helpers
 */

const $ = MyAMS.$;
const helpers = {
  /**
   * Click handler used to clear input
   */
  clearValue: evt => {
    const target = $(evt.currentTarget).data('target');
    if (target) {
      $(target).val(null);
    }
  },
  /**
   * Click handler used to clear datetime input
   */
  clearDatetimeValue: evt => {
    const target = $(evt.currentTarget).data('target'),
      picker = $(target).data('datetimepicker');
    if (picker) {
      picker.date(null);
    }
  },
  /**
   * Scroll anchor parent element to given anchor
   *
   * @param anchor: scroll target
   * @param parent: scroll parent
   * @param props: scroll properties
   */
  scrollTo: function () {
    let parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#content';
    let anchor = arguments.length > 1 ? arguments[1] : undefined;
    let {
      ...props
    } = arguments.length > 2 ? arguments[2] : undefined;
    if (typeof anchor === 'string') {
      anchor = $(anchor);
    }
    if (anchor.exists()) {
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.check($.fn.scrollTo, `${MyAMS.env.baseURL}../ext/jquery-scrollto${MyAMS.env.extext}.js`).then(() => {
          $(parent).scrollTo(anchor, props);
        });
      });
    }
  },
  /**
   * Store location hash when redirecting to log in form
   *
   * This helper is used to store window location hash into form input, to redirect
   * user correctly after login.
   */
  setLoginHash: () => {
    const form = $('#login_form'),
      hash = $(`input[name="login_form.widgets.hash"]`, form);
    hash.val(window.location.hash);
  },
  /**
   * SEO input helper
   *
   * This helper is used to display a small coloured progress bar below a text input
   * to display its SEO quality based on text length.
   */
  setSEOStatus: evt => {
    const input = $(evt.target),
      progress = input.siblings('.progress').children('.progress-bar'),
      length = Math.min(input.val().length, 100);
    let status = 'success';
    if (length < 20 || length > 80) {
      status = 'danger';
    } else if (length < 40 || length > 66) {
      status = 'warning';
    }
    progress.removeClassPrefix('bg-').addClass('bg-' + status).css('width', length + '%');
  },
  /**
   * Select2 change helper
   *
   * This helper is used to handle a change event on a Select2 input. Data attributes
   * defined on Select2 input can be used to define behaviour of this helper:
   *  - data-ams-select2-helper-type: can be set to "html" when HTML code is loaded via a
   *    webservice call, and included into a *target* element
   *  - data-ams-select2-helper-url: remote webservice URL
   *  - data-ams-select2-helper-target: CSS selector of a DOM element which will receive
   *    result of a webservice call
   *  - data-ams-select2-helper-argument: name of the argument used to call webservice; if
   *    not defined, the used name is 'value'; this argument is filled with the selected value
   *    of the Select2 input
   *  - data-ams-select2-helper-callback: name of a callback function which can be used to
   *    handle webservice result; if no callback is defined, the webservice result will be
   *    inserted directly into defined target
   */
  select2ChangeHelper: evt => {
    return new Promise((resolve, reject) => {
      const source = $(evt.currentTarget),
        data = source.data(),
        target = $(data.amsSelect2HelperTarget),
        params = {};
      let callback;
      switch (data.amsSelect2HelperType) {
        case 'html':
          target.html('<div class="text-center"><i class="fas fa-2x fa-spinner fa-spin"></i></div>');
          params[data.amsSelect2HelperArgument || 'value'] = source.val();
          $.get(data.amsSelect2HelperUrl, params).then(result => {
            callback = MyAMS.core.getFunctionByName(data.amsSelect2HelperCallback) || (result => {
              if (result) {
                target.html(result);
                MyAMS.core.initContent(target).then(() => {
                  resolve();
                });
              } else {
                target.empty();
                resolve();
              }
            });
            callback(result);
          }).catch(() => {
            target.empty();
            reject();
          });
          break;
        default:
          callback = data.amsSelect2HelperCallback;
          if (callback) {
            MyAMS.core.executeFunctionByName(callback, source, data);
            resolve();
          }
      }
    });
  },
  /**
   * Refresh a DOM element with content provided in
   * the <code>options</code> object.
   *
   * @param form: optional parent element
   * @param options: element properties:
   *   - object_id: ID of the refreshed element
   *   - content: new element content
   */
  refreshElement: (form, options) => {
    return new Promise((resolve, reject) => {
      let element = $(`[id="${options.object_id}"]`);
      MyAMS.core.executeFunctionByName(MyAMS.config.clearContent, document, element).then(() => {
        element.replaceWith($(options.content));
        element = $(`[id="${options.object_id}"]`);
        const parent = element.parents().first();
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, parent).then(() => {
          resolve(element);
        }, reject);
      }, reject);
    });
  },
  /**
   * Refresh a form widget with content provided in
   * the <code>options</code> object
   *
   * @param form: optional parent form
   * @param options: updated widget properties:
   *   - widget_id: ID of the refreshed widget
   *   - content: new element content
   */
  refreshWidget: (form, options) => {
    return new Promise((resolve, reject) => {
      let widget = $(`[id="${options.widget_id}"]`),
        group = widget.parents('.widget-group');
      MyAMS.core.executeFunctionByName(MyAMS.config.clearContent, document, group).then(() => {
        group.replaceWith($(options.content));
        widget = $(`[id="${options.widget_id}"]`);
        group = widget.parents('.widget-group');
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, group).then(() => {
          resolve(widget);
        }, reject);
      }, reject);
    });
  },
  /**
   * Add new row to table
   *
   * @param form: optional parent form
   * @param options: added row properties:
   *  - content: new row content
   */
  addTableRow: (form, options) => {
    return new Promise((resolve, reject) => {
      const selector = `table[id="${options.table_id}"]`,
        table = $(selector),
        dtTable = table.DataTable();
      let newRow;
      if (options.data) {
        dtTable.rows.add(options.data).draw();
        newRow = $(`tr[id="${options.row_id}"]`, table);
        resolve(newRow);
      } else {
        newRow = $(options.content);
        dtTable.rows.add(newRow).draw();
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, newRow).then(() => {
          resolve(newRow);
        }, reject);
      }
    });
  },
  /**
   * Refresh a table row with content provided in
   * the <code>options</code> object
   *
   * @param form: optional parent form
   * @param options: updated row properties:
   *   - row_id: ID of the refreshed row
   *   - content: new row content
   */
  refreshTableRow: (form, options) => {
    return new Promise((resolve, reject) => {
      const selector = `tr[id="${options.row_id}"]`,
        row = $(selector),
        table = row.parents('table').first();
      if (options.data) {
        if ($.fn.DataTable) {
          const dtTable = table.DataTable();
          if (typeof options.data === 'string') {
            dtTable.row(selector).remove();
            dtTable.row.add($(options.data)).draw();
          } else {
            dtTable.row(selector).data(options.data).draw();
          }
          resolve(row);
        } else {
          reject('No DataTable plug-in available!');
        }
      } else {
        const newRow = $(options.content);
        row.replaceWith(newRow);
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, newRow).then(() => {
          resolve(newRow);
        }, reject);
      }
    });
  },
  /**
   * Refresh a single image with content provided in
   * the <code>options</code> object.
   *
   * @param form: optional parent element
   * @param options: image properties:
   *   - image_id: ID of the refreshed image
   *   - src: new image source URL
   */
  refreshImage: (form, options) => {
    const image = $(`[id="${options.image_id}"]`);
    image.attr('src', options.src);
  },
  /**
   * Move given element to the end of it's parent
   *
   * @param element: the element to be moved
   * @returns {*}
   */
  moveElementToParentEnd: element => {
    const parent = element.parent();
    return element.detach().appendTo(parent);
  },
  /**
   * Add given element to the end of specified parent
   *
   * @param source: event source
   * @param element: the provided element
   * @param parent: the parent to which element should be added
   * @param props: additional props
   * @returns {*}
   */
  addElementToParent: (source, _ref) => {
    let {
      element,
      parent,
      ...props
    } = _ref;
    element = $(element);
    parent = $(parent);
    const result = element.appendTo(parent);
    if (props.scrollTo) {
      MyAMS.helpers.scrollTo(props.scrollParent, element);
    }
    return result;
  },
  /**
   * Toggle dropdown associated with given event target
   *
   * @param evt: source event
   */
  hideDropdown: evt => {
    $(evt.target).closest('.dropdown-menu').dropdown('hide');
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('helpers');
  } else {
    MyAMS.helpers = helpers;
    console.debug("MyAMS: helpers module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-i18n.js":
/*!****************************!*\
  !*** ./src/js/mod-i18n.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i18n": function() { return /* binding */ i18n; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS i18n translations
 */

const $ = MyAMS.$;
let _initialized = false;
const i18n = {
  language: 'en',
  INFO: "Information",
  WARNING: "!! WARNING !!",
  ERROR: "ERROR: ",
  LOADING: "Loading...",
  PROGRESS: "Processing",
  WAIT: "Please wait!",
  FORM_SUBMITTED: "This form was already submitted...",
  NO_SERVER_RESPONSE: "No response from server!",
  ERROR_OCCURED: "An error occured!",
  ERRORS_OCCURED: "Some errors occured!",
  BAD_LOGIN_TITLE: "Bad login!",
  BAD_LOGIN_MESSAGE: "Your anthentication credentials didn't allow you to open a session; " + "please check your credentials or contact administrator.",
  CONFIRM: "Confirm",
  CONFIRM_REMOVE: "Removing this content can't be undone. Do you confirm?",
  BTN_OK: "OK",
  BTN_CANCEL: "Cancel",
  BTN_YES: "Yes",
  BTN_NO: "No",
  BTN_CLOSE: "Close",
  CLIPBOARD_COPY: "Copy to clipboard with Ctrl+C, and Enter",
  CLIPBOARD_CHARACTER_COPY_OK: "Character copied to clipboard.",
  CLIPBOARD_TEXT_COPY_OK: "Text copied to clipboard.",
  FORM_CHANGED_WARNING: "Some changes were not saved. These updates will be lost if you leave this page.",
  DELETE_WARNING: "This change can't be undone. Are you sure that you want to delete this element?",
  NO_UPDATE: "No changes were applied.",
  DATA_UPDATED: "Data successfully updated.",
  HOME: "Home",
  LOGOUT: "Logout?",
  LOGOUT_COMMENT: "You can improve your security further after logging out by closing this opened browser",
  LAST_UPDATE: "Last update: ",
  DT_COLUMNS: "Columns",
  NO_SELECTED_VALUE: "No selected value",
  /**
   * Plug-ins translations container
   */
  plugins: {
    datatables: {
      search: "",
      searchPlaceholder: "Search..."
    }
  },
  /**
   * MyAMS i18n package
   */
  init: function () {
    let force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return new Promise((resolve, reject) => {
      if (_initialized && !force) {
        resolve();
        return;
      }
      _initialized = true;
      const html = $('html'),
        lang = html.attr('lang') || html.attr('xml:lang');
      if (lang && !lang.startsWith('en')) {
        MyAMS.core.getScript(`${MyAMS.env.baseURL}i18n/myams-${lang.substr(0, 2)}.js`).then(resolve, reject);
      } else {
        resolve();
      }
    });
  }
};

/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
  MyAMS.config.modules.push('i18n');
} else {
  MyAMS.i18n = i18n;
  console.debug("MyAMS: I18n module loaded...");
}

/***/ }),

/***/ "./src/js/mod-jsonrpc.js":
/*!*******************************!*\
  !*** ./src/js/mod-jsonrpc.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "jsonrpc": function() { return /* binding */ jsonrpc; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS JSON-RPC protocol support
 */

const $ = MyAMS.$;
const jsonrpc = {};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('jsonrpc');
  } else {
    MyAMS.jsonrpc = jsonrpc;
    console.debug("MyAMS: jsonrpc module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-menu.js":
/*!****************************!*\
  !*** ./src/js/mod-menu.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": function() { return /* binding */ menu; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS menus management
 */

const $ = MyAMS.$;

/**
 * Context menu handler
 */
function _contextMenuHandler(menu) {
  if (menu.get(0).tagName !== 'A') {
    menu = menu.parents('a').first();
  }
  const menuData = menu.data();
  if (menuData.toggle === 'modal') {
    MyAMS.require('modal').then(() => {
      MyAMS.modal.open(menu);
    });
  } else {
    let href = menu.attr('href') || menuData.amsUrl;
    if (!href || href.startsWith('javascript:') || menu.attr('target')) {
      return;
    }
    const hrefGetter = MyAMS.core.getFunctionByName(href);
    if (typeof hrefGetter === 'function') {
      href = hrefGetter(menu);
    }
    if (typeof href === 'undefined') {
      return;
    }
    if (typeof href === 'function') {
      href(menu);
    } else {
      MyAMS.require('form', 'skin').then(() => {
        href = href.replace(/%23/, '#');
        const target = menu.data('ams-target');
        if (target) {
          MyAMS.form.confirmChangedForm(target).then(status => {
            if (status !== 'success') {
              return;
            }
            MyAMS.skin.loadURL(href, target, menu.data('ams-link-options'), menu.data('ams-link-callback'));
          });
        } else {
          MyAMS.form.confirmChangedForm().then(status => {
            if (status !== 'success') {
              return;
            }
            if (href.startsWith('#')) {
              if (href !== location.hash) {
                if (MyAMS.dom.root.hasClass('mobile-view-activated')) {
                  MyAMS.dom.root.removeClass('hidden-menu');
                  setTimeout(() => {
                    window.location.hash = href;
                  }, 50);
                } else {
                  window.location.hash = href;
                }
              }
            } else {
              window.location = href;
            }
          });
        }
      });
    }
  }
}
let _initialized = false;

/**
 * MyAMS "menu" module
 */
const menu = {
  /**
   * Global module initialization.
   * This function extends jQuery with a "contextMenu()" function, which
   * allows to create a new context menu.
   */
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;
    $.fn.extend({
      /**
       * JQuery context menu constructor
       */
      contextMenu: function (settings) {
        function getMenuPosition(mouse, direction) {
          const win = $(window)[direction](),
            menu = $(settings.menuSelector)[direction]();
          let position = mouse;
          // opening menu would pass the side of the page
          if (mouse + menu > win && menu < mouse) {
            position -= menu;
          }
          return position;
        }
        return this.each((idx, elt) => {
          const source = $(elt),
            menu = $(settings.menuSelector);

          // Set flag on menu items
          $('a', menu).each((idx, elt) => {
            $(elt).data('ams-context-menu', true);
          });
          source.on("contextmenu", function (evt) {
            // return native menu if pressing CTRL key
            if (evt.ctrlKey) {
              return;
            }
            // open menu
            menu.data('contextmenu-event-source', source).dropdown('show').css({
              position: 'fixed',
              left: getMenuPosition(evt.clientX, 'width') - 10,
              top: getMenuPosition(evt.clientY, 'height') - 10
            }).off('click').on('click', clickEvt => {
              clickEvt.stopPropagation();
              clickEvt.preventDefault();
              menu.dropdown('hide');
              _contextMenuHandler($(clickEvt.target));
            });
            return false;
          });

          // make sure menu closes on any click
          $(document).click(() => {
            menu.dropdown('hide');
          });
        });
      }
    });

    // Automatically set orientation of dropdown menus
    $(document).on('show.bs.dropdown', '.btn-group', evt => {
      // check menu height
      const menu = $(evt.currentTarget),
        ul = menu.children('.dropdown-menu'),
        menuRect = menu.get(0).getBoundingClientRect(),
        position = menuRect.top,
        buttonHeight = menuRect.height,
        menuHeight = ul.outerHeight();
      if (position > menuHeight && $(window).height() - position < buttonHeight + menuHeight) {
        menu.addClass("dropup");
      }
      // activate first input
      $('input, select, textarea', ul).first().focus();
    }).on('hidden.bs.dropdown', '.btn-group', evt => {
      // always reset after close
      $(evt.currentTarget).removeClass('dropup');
    });
    $(document).on('hide.bs.dropdown', evt => {
      if (evt.clickEvent) {
        const dropdown = $(evt.clickEvent.target).parents('.dropdown-menu');
        if (dropdown.data('ams-click-dismiss') === false) {
          evt.preventDefault();
          return false;
        }
      }
    });
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('menu');
  } else {
    MyAMS.menu = menu;
    console.debug("MyAMS: menu module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-modal.js":
/*!*****************************!*\
  !*** ./src/js/mod-modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dynamicModalHiddenEventHandler": function() { return /* binding */ dynamicModalHiddenEventHandler; },
/* harmony export */   "dynamicModalShowEventHandler": function() { return /* binding */ dynamicModalShowEventHandler; },
/* harmony export */   "dynamicModalShownEventHandler": function() { return /* binding */ dynamicModalShownEventHandler; },
/* harmony export */   "modal": function() { return /* binding */ modal; },
/* harmony export */   "modalDismissEventHandler": function() { return /* binding */ modalDismissEventHandler; },
/* harmony export */   "modalHiddenEventHandler": function() { return /* binding */ modalHiddenEventHandler; },
/* harmony export */   "modalShownEventHandler": function() { return /* binding */ modalShownEventHandler; },
/* harmony export */   "modalToggleEventHandler": function() { return /* binding */ modalToggleEventHandler; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS modal dialogs support
 */

const $ = MyAMS.$;
let _initialized = false;

/*
 * Standard data-toggle="modal" handler
 */
function modalToggleEventHandler(evt) {
  return new Promise((resolve, reject) => {
    const source = $(evt.currentTarget),
      handlers = source.data('ams-disabled-handlers');
    if (source.attr('disabled') || source.hasClass('disabled') || handlers === true || handlers === 'click' || handlers === 'all') {
      resolve(false);
      return;
    }
    if (source.data('ams-context-menu') === true) {
      resolve(false);
      return;
    }
    if (source.data('ams-stop-propagation') === true) {
      evt.stopPropagation();
    }
    evt.preventDefault();
    source.tooltip('hide');
    MyAMS.modal.open(source).then(() => {
      resolve(true);
    }, reject);
  });
}

/**
 * Standard modal shown event handler
 * This handler is used to allow modals stacking
 */
function modalShownEventHandler(evt) {
  const zIndexModal = 1100;

  // Enable modals stacking
  const dialog = $(evt.target),
    visibleModalsCount = $('.modal:visible').length,
    zIndex = zIndexModal + 100 * visibleModalsCount;
  dialog.css('z-index', zIndex);
  setTimeout(() => {
    $('.modal-backdrop').not('.modal-stack').first().css('z-index', zIndex - 10).addClass('modal-stack');
  }, 0);
  // Check form contents before closing modals
  $(dialog).off('click', '[data-dismiss="modal"]').on('click', '[data-dismiss="modal"]', evt => {
    const handler = $(evt.currentTarget).data('ams-dismiss-handler') || modalDismissEventHandler;
    return MyAMS.core.executeFunctionByName(handler, document, evt);
  });
}

/**
 * Dynamic modal 'show' callback
 * This callback is used to initialize modal's viewport size
 *
 * @param evt: source event
 */
function dynamicModalShowEventHandler(evt) {
  const dialog = $(evt.target);
  return MyAMS.core.executeFunctionByName(dialog.data('ams-init-content') || MyAMS.config.initContent, document, dialog);
}

/**
 * Dynamic modal 'shown' callback
 * This callback is used to set focus on first modal input
 *
 * @param evt: source event
 */
function dynamicModalShownEventHandler(evt) {
  return new Promise((resolve, reject) => {
    MyAMS.require('form').then(() => {
      const modal = $(evt.target);
      MyAMS.form.setFocus(modal);
      resolve(modal);
    }, reject);
  });
}

/**
 * Modal dismiss handler
 */
function modalDismissEventHandler(evt) {
  return new Promise((resolve, reject) => {
    const source = $(evt.currentTarget),
      dialog = source.parents('.modal').first();
    dialog.data('modal-result', $(evt.currentTarget).data('modal-dismiss-value'));
    if (MyAMS.form) {
      MyAMS.form.confirmChangedForm(dialog).then(status => {
        if (status === 'success') {
          dialog.modal('hide');
        }
      }).then(resolve, reject);
    } else {
      dialog.modal('hide');
      resolve();
    }
  });
}

/**
 * Standard modal hidden event handler
 *
 * If several visible modals are still, a "modal-open" class is added to body to ensure
 * modals are still visible.
 */
function modalHiddenEventHandler() {
  if ($('.modal:visible').length > 0) {
    $.fn.modal.Constructor.prototype._checkScrollbar();
    $.fn.modal.Constructor.prototype._setScrollbar();
    $('body').addClass('modal-open');
  }
}

/**
 * Dynamic modal 'hidden' callback
 * This callback is used to clear and remove dynamic modals
 *
 * @param evt: source event
 */
function dynamicModalHiddenEventHandler(evt) {
  const dialog = $(evt.target);
  MyAMS.core.executeFunctionByName(dialog.data('ams-clear-content') || MyAMS.config.clearContent, document, dialog).then(() => {
    if (dialog.data('dynamic') === true) {
      dialog.remove();
      if (MyAMS.form) {
        MyAMS.form.setFocus($('.modal-dialog').last());
      }
    }
  });
}

/**
 * Main modal module definition
 */
const modal = {
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;
    if (MyAMS.config.ajaxNav) {
      // Initialize modal dialogs links
      // Standard Bootstrap handlers are removed!!
      $(document).off('click', '[data-toggle="modal"]').on('click', '[data-toggle="modal"]', evt => {
        evt.stopPropagation();
        const handler = $(evt.currentTarget).data('ams-modal-handler') || modalToggleEventHandler;
        MyAMS.core.executeFunctionByName(handler, document, evt);
      });
    }

    // Handle modal shown event to allow modals stacking
    $(document).on('shown.bs.modal', '.modal', evt => {
      const handler = $(evt.currentTarget).data('ams-shown-handler') || modalShownEventHandler;
      MyAMS.core.executeFunctionByName(handler, document, evt);
    });

    // Handle modal hidden event to check remaining modals
    $(document).on('hidden.bs.modal', '.modal', evt => {
      const handler = $(evt.currentTarget).data('ams-hidden-handler') || modalHiddenEventHandler;
      MyAMS.core.executeFunctionByName(handler, document, evt);
    });
  },
  open: (source, options) => {
    return new Promise((resolve, reject) => {
      let sourceData = {},
        url = source;
      if (typeof source !== 'string') {
        sourceData = source.data();
        url = source.attr('href') || sourceData.amsUrl;
      }
      const urlGetter = MyAMS.core.getFunctionByName(url);
      if (typeof urlGetter === 'function') {
        url = urlGetter(source);
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
        }).then((data, status, request) => {
          let modal = null;
          MyAMS.require('ajax').then(() => {
            const response = MyAMS.ajax.getResponse(request),
              dataType = response.contentType,
              result = response.data;
            let content, dialog, dialogData, dialogOptions, settings;
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
                content = $(result), dialog = $('.modal-dialog', content.wrap('<div></div>').parent()), dialogData = dialog.data() || {}, dialogOptions = {
                  backdrop: dialogData.backdrop === undefined ? 'static' : dialogData.backdrop,
                  keyboard: dialogData.keyboard === undefined ? true : dialogData.keyboard
                };
                settings = $.extend({}, dialogOptions, dialogData.amsOptions);
                settings = MyAMS.core.executeFunctionByName(dialogData.amsInit, dialog, settings) || settings;
                modal = $('<div>').addClass('modal fade').attr('tabIndex', '-1').data('dynamic', true).append(content).on('show.bs.modal', dynamicModalShowEventHandler).on('shown.bs.modal', dynamicModalShownEventHandler).on('hidden.bs.modal', dynamicModalHiddenEventHandler).modal(settings);
                if (MyAMS.stats && !(sourceData.amsLogEvent === false || dialogData.amsLogEvent === false)) {
                  MyAMS.stats.logPageview(url);
                }
            }
          }).then(() => {
            resolve(modal);
          });
        });
      }
    });
  },
  fitWidthToImage: (evt, options) => {
    setTimeout(() => {
      const source = evt.currentTarget,
        image = options ? $(options['resize-target']) : source;
      if (image.exists()) {
        const dialog = image.parents('.modal-dialog'),
          padding = dialog.width() - image.width();
        dialog.css('max-width', Math.min($(window).width(), image.get(0).naturalWidth + padding));
      }
    }, 150);
  },
  /**
   * Close modal associated with given element
   *
   * @param element: the element contained into closed modal
   */
  close: element => {
    if (typeof element === 'string') {
      element = $(element);
    } else if (typeof element === 'undefined') {
      element = $('.modal-dialog:last');
    }
    const dialog = element.objectOrParentWithClass('modal');
    if (dialog.length > 0) {
      dialog.modal('hide');
    }
  }
};

/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
  MyAMS.config.modules.push('modal');
} else {
  MyAMS.modal = modal;
  console.debug("MyAMS: modal module loaded...");
}

/***/ }),

/***/ "./src/js/mod-nav.js":
/*!***************************!*\
  !*** ./src/js/mod-nav.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigationMenu": function() { return /* binding */ NavigationMenu; },
/* harmony export */   "linkClickHandler": function() { return /* binding */ linkClickHandler; },
/* harmony export */   "nav": function() { return /* binding */ nav; }
/* harmony export */ });
/* global MyAMS, FontAwesome, Hammer */
/**
 * MyAMS navigation module
 */

const $ = MyAMS.$;

/**
 * Dynamic navigation menu class
 */
class MenuHeader {
  constructor(props) {
    this.props = props;
  }
  render() {
    return $('<li class="header"></li>').text(this.props.header || '');
  }
}
class MenuDivider {
  render() {
    return $('<li class="divider"></li>');
  }
}
class Menu {
  constructor(items) {
    this.items = items;
  }
  render() {
    const menu = $('<div></div>');
    for (const item of this.items) {
      if (item.label) {
        const props = $('<li></li>'),
          link = $('<a></a>').attr('href', item.href || '#').attr('title', item.label);
        for (const [key, val] of Object.entries(item.attrs || {})) {
          link.attr(key, val);
        }
        if (item.icon) {
          $('<i class="fa-lg fa-fw mr-1"></i>').addClass(item.icon).appendTo(link);
        }
        $('<span class="menu-item-parent"></span>').text(item.label).appendTo(link);
        if (item.badge) {
          $('<span class="badge ml-1 mr-3 float-right"></span>').addClass(`bg-${item.badge.status}`).text(item.badge.value).appendTo(link);
        }
        link.appendTo(props);
        if (item.items) {
          $('<ul></ul>').append(new Menu(item.items).render()).appendTo(props);
        }
        props.appendTo(menu);
      } else {
        new MenuDivider().render().appendTo(menu);
      }
    }
    return menu.children();
  }
}
class NavigationMenu {
  constructor(menus, parent, settings) {
    this.menus = menus;
    this.parent = parent;
    this.settings = settings;
  }
  getMenus() {
    const nav = $('<ul></ul>');
    for (const props of this.menus) {
      if (props.header !== undefined) {
        nav.append(new MenuHeader(props).render());
      }
      nav.append(new Menu(props.items).render());
    }
    return nav;
  }
  render() {
    const menus = this.getMenus();
    this.init(menus);
    this.parent.append(menus);
  }
  init(menus) {
    const settings = this.settings;
    // add mark to menus with children
    menus.find('li').each((idx, elt) => {
      const menuItem = $(elt);
      if (menuItem.find('ul').length > 0) {
        const firstLink = menuItem.find('a:first');
        // add multi-level sign next to link
        const sign = $(`<b class="collapse-sign">${settings.closedSign}</b>`);
        sign.on('click', evt => {
          evt.preventDefault();
        });
        firstLink.append(sign);
        // avoid jumping to top of page when href is a #
        if (firstLink.attr('href') === '#') {
          firstLink.click(() => {
            return false;
          });
        }
      }
    });
    // slide down open menus
    menus.find('li.open').each((idx, elt) => {
      const menu = $(elt),
        subMenu = $('> ul', menu);
      subMenu.slideDown(settings.speed);
      menu.find('>a b.collapse-sign').html(settings.openedSign);
    });
    // open active level
    menus.find('li.active').each((idx, elt) => {
      const activeParent = $(elt).parents('ul'),
        activeItem = activeParent.parent('li');
      activeParent.slideDown(settings.speed);
      activeItem.find('b:first').html(settings.openedSign);
      activeItem.addClass('open');
    });
    // handle click event
    menus.find("li a").on('click', evt => {
      const link = $(evt.currentTarget);
      if (link.hasClass('active')) {
        return;
      }
      link.parents('li').removeClass('active');
      const href = link.attr('href').replace(/^#/, ''),
        parentUL = link.parent().find("ul");
      if (settings.accordion) {
        const parents = link.parent().parents("ul"),
          visibleMenus = menus.find("ul:visible");
        visibleMenus.each((visibleIndex, visibleElt) => {
          let close = true;
          parents.each((parentIndex, parentElt) => {
            if (parentElt === visibleElt) {
              close = false;
              return false;
            }
          });
          if (close && parentUL !== visibleElt) {
            const visibleItem = $(visibleElt);
            if (href || !visibleItem.hasClass('active')) {
              visibleItem.slideUp(settings.speed, () => {
                visibleItem.parent("li").removeClass('open').find("b:first").delay(settings.speed).html(settings.closedSign);
              });
            }
          }
        });
      }
      const firstUL = link.parent().find("ul:first");
      if (!href && firstUL.is(":visible") && !firstUL.hasClass("active")) {
        firstUL.slideUp(settings.speed, () => {
          link.parent("li").removeClass("open").find("b:first").delay(settings.speed).html(settings.closedSign);
        });
      } else {
        firstUL.slideDown(settings.speed, () => {
          link.parent("li").addClass("open").find("b:first").delay(settings.speed).html(settings.openedSign);
        });
      }
    });
  }
}
let _initialized = false,
  _hammer = null;

/**
 * Main navigation module
 */

function _openPage(href) {
  if (location && href.startsWith('#')) {
    if (href !== location.hash) {
      location.hash = href;
    }
  } else {
    if (location.toString() === href) {
      location.reload();
    } else {
      window.location = href;
    }
  }
}

/**
 * Main link click event handler
 *
 * @param evt
 */
function linkClickHandler(evt) {
  return new Promise((resolve, reject) => {
    const link = $(evt.currentTarget),
      handlers = link.data('ams-disabled-handlers');
    if (handlers === true || handlers === 'click' || handlers === 'all') {
      return;
    }
    let href = link.attr('href') || link.data('ams-url');
    if (!href || href.startsWith('javascript:') || link.attr('target') || link.data('ams-context-menu') === true) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    let url, target, params;
    if (href.indexOf('?') >= 0) {
      url = href.split('?');
      target = url[0];
      params = url[1].unserialize();
    } else {
      target = href;
      params = undefined;
    }
    const hrefGetter = MyAMS.core.getFunctionByName(target);
    if (typeof hrefGetter === 'function') {
      href = hrefGetter(link, params);
    }
    if (!href) {
      resolve(null);
    } else if (typeof href === 'function') {
      resolve(href(link, params));
    } else {
      // Standard AJAX or browser URL call
      // Convert %23 characters to #
      href = href.replace(/%23/, '#');
      if (evt.ctrlKey) {
        window.open && window.open(href);
        resolve();
      } else {
        const linkTarget = link.data('ams-target') || link.attr('target');
        if (linkTarget) {
          if (linkTarget === '_blank') {
            window.open && window.open(href);
            resolve();
          } else if (linkTarget === '_top') {
            window.location = href;
            resolve();
          } else {
            if (MyAMS.form) {
              MyAMS.form.confirmChangedForm().then(result => {
                if (result !== 'success') {
                  return;
                }
                MyAMS.skin && MyAMS.skin.loadURL(href, linkTarget, link.data('ams-link-options'), link.data('ams-link-callback')).then(resolve, reject);
              });
            } else {
              MyAMS.skin && MyAMS.skin.loadURL(href, linkTarget, link.data('ams-link-options'), link.data('ams-link-callback')).then(resolve, reject);
            }
          }
        } else {
          if (MyAMS.form) {
            MyAMS.form.confirmChangedForm().then(result => {
              if (result !== 'success') {
                return;
              }
              _openPage(href);
            }).then(resolve);
          } else {
            _openPage(href);
            resolve();
          }
        }
      }
    }
  });
}
const nav = {
  /**
   * initialize navigation through data attributes
   */
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;
    $.fn.extend({
      navigationMenu: function (options) {
        if (this.length === 0) {
          return;
        }
        const data = this.data();
        const defaults = {
          accordion: data.amsMenuAccordion !== false,
          speed: 200
        };
        if (MyAMS.config.useSVGIcons) {
          const downIcon = FontAwesome.findIconDefinition({
              iconName: 'angle-down'
            }),
            upIcon = FontAwesome.findIconDefinition({
              iconName: 'angle-up'
            });
          $.extend(defaults, {
            closedSign: `<em data-fa-i2svg>${FontAwesome.icon(downIcon).html}</em>`,
            openedSign: `<em data-fa-i2svg>${FontAwesome.icon(upIcon).html}</em>`
          });
        } else {
          $.extend(defaults, {
            closedSign: '<em class="fa fa-angle-down"></em>',
            openedSign: '<em class="fa fa-angle-up"></em>'
          });
        }
        const settings = $.extend({}, defaults, options),
          menuFactory = MyAMS.core.getObject(data.amsMenuFactory) || NavigationMenu;
        if (data.amsMenuConfig) {
          MyAMS.require('ajax', 'skin').then(() => {
            MyAMS.ajax.get(data.amsMenuConfig).then(result => {
              new menuFactory(result, $(this), settings).render();
              MyAMS.skin.checkURL();
            });
          });
        } else {
          // static menus
          const menus = $('ul', this);
          new menuFactory(null, $(this), settings).init(menus);
        }
      }
    });
    if (MyAMS.config.ajaxNav) {
      // Disable clicks on # hrefs
      $(document).on('click', 'a[href="#"]', evt => {
        evt.preventDefault();
      });

      // Activate clicks
      $(document).on('click', 'a[href!="#"]:not([data-toggle]), [data-ams-url]:not([data-toggle])', evt => {
        // check for specific click handler
        const handler = $(evt).data('ams-click-handler');
        if (handler) {
          return;
        }
        // check for DataTable collapse handler
        if (evt.target.tagName === 'TD') {
          const target = $(evt.target);
          if (target.hasClass('dtr-control')) {
            const table = target.parents('table.datatable');
            if (table.hasClass('collapsed')) {
              return;
            }
          }
        }
        return linkClickHandler(evt);
      });

      // Blank target clicks
      $(document).on('click', 'a[target="_blank"]', evt => {
        evt.preventDefault();
        const target = $(evt.currentTarget);
        window.open && window.open(target.attr('href'));
        MyAMS.stats && MyAMS.stats.logEvent(target.data('ams-stats-category') || 'Navigation', target.data('ams-stats-action') || 'External', target.data('ams-stats-label') || target.attr('href'));
      });

      // Top target clicks
      $(document).on('click', 'a[target="_top"]', evt => {
        evt.preventDefault();
        MyAMS.form && MyAMS.form.confirmChangedForm().then(result => {
          if (result !== 'success') {
            return;
          }
          window.location = $(evt.currentTarget).attr('href');
        });
      });

      // Disable clicks on disabled tabs
      $(document).on("click", '.nav-tabs a[data-toggle=tab]', evt => {
        if ($(evt.currentTarget).parent('li').hasClass("disabled")) {
          evt.stopPropagation();
          evt.preventDefault();
          return false;
        }
      });

      // Enable tabs dynamic loading
      $(document).on('show.bs.tab', evt => {
        let link = $(evt.target);
        if (link.exists() && link.get(0).tagName !== 'A') {
          link = $('a[href]', link);
        }
        const data = link.data();
        if (data && data.amsUrl) {
          if (data.amsTabLoaded) {
            return;
          }
          link.append('<i class="fa fa-spin fa-cog ml-1"></i>');
          MyAMS.require('skin').then(() => {
            MyAMS.skin.loadURL(data.amsUrl, link.attr('href')).then(() => {
              if (data.amsTabLoadOnce) {
                data.amsTabLoaded = true;
              }
              $('i', link).remove();
            }, () => {
              $('i', link).remove();
            });
          });
        }
      });
      if (!MyAMS.config.isMobile) {
        MyAMS.dom.root.addClass('desktop-detected');
      } else {
        MyAMS.dom.root.addClass('mobile-detected');
        MyAMS.require('ajax').then(() => {
          if (MyAMS.config.enableFastclick) {
            MyAMS.ajax.check($.fn.noClickDelay, `${MyAMS.env.baseURL}../ext/js-smartclick${MyAMS.env.extext}.js`).then(() => {
              $('a', MyAMS.dom.nav).noClickDelay();
              $('a', '#hide-menu').noClickDelay();
            });
          }
          if (MyAMS.dom.root.exists()) {
            MyAMS.ajax.check(window.Hammer, `${MyAMS.env.baseURL}../ext/hammer${MyAMS.env.extext}.js`).then(() => {
              _hammer = new Hammer.Manager(MyAMS.dom.root.get(0));
              _hammer.add(new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 200
              }));
              _hammer.on('panright', () => {
                if (!MyAMS.dom.root.hasClass('hidden-menu')) {
                  MyAMS.nav.switchMenu();
                }
              });
              _hammer.on('panleft', () => {
                if (MyAMS.dom.root.hasClass('hidden-menu')) {
                  MyAMS.nav.switchMenu();
                }
              });
            });
          }
        });
      }
    }
    nav.restoreState();
  },
  initElement: element => {
    $('nav', element).navigationMenu({
      speed: MyAMS.config.menuSpeed
    });
  },
  /**
   * Display current active menu
   *
  	 * @param menu: current active menu
   */
  setActiveMenu: menu => {
    const nav = MyAMS.dom.nav;
    $('.active', nav).removeClass('active');
    menu.addClass('open').addClass('active');
    menu.parents('li').addClass('open active').children('ul').addClass('active').show();
    menu.parents('li:first').removeClass('open');
    menu.parents('ul').addClass(menu.attr('href').replace(/^#/, '') ? 'active' : '').show();
    if (menu.exists()) {
      const scroll = nav.scrollTop(),
        position = $(menu).parents('li:last').position();
      if (position.top < scroll) {
        nav.scrollTop(position.top);
      } else if (position.top > nav.height() + scroll) {
        nav.scrollTop(position.top);
      }
    }
  },
  /**
   * Internal breadcrumbs drawing function
   *
   * @private
   */
  drawBreadcrumbs: () => {
    const crumb = $('ol.breadcrumb', '#ribbon');
    $('li', crumb).not('.persistent').remove();
    if (!$('li', crumb).exists()) {
      const template = `<li class="breadcrumb-item">
					<a class="p-r-1" href="${$('a[href!="#"]:first', MyAMS.dom.nav).attr('href')}">
						${MyAMS.i18n.HOME}
					</a>
				</li>`;
      crumb.append($(template));
    }
    $('li.active >a', MyAMS.dom.nav).each((idx, elt) => {
      const menu = $(elt),
        text = $.trim(menu.clone().children('.badge').remove().end().text()),
        href = menu.attr('href'),
        item = $('<li class="breadcrumb-item"></li>').append(href.replace(/^#/, '') ? $('<a></a>').html(text).attr('href', href) : text);
      crumb.append(item);
    });
  },
  /**
   * Click handler for navigation menu "minify" button
   *
   * @param evt: original click event
   */
  minifyMenu: evt => {
    evt && evt.preventDefault();
    MyAMS.dom.root.toggleClass('minified');
    if (MyAMS.dom.root.hasClass('minified')) {
      MyAMS.core.switchIcon($('i', evt.currentTarget), 'arrow-circle-left', 'arrow-circle-right');
    } else {
      MyAMS.core.switchIcon($('i', evt.currentTarget), 'arrow-circle-right', 'arrow-circle-left');
    }
    if (window.localStorage) {
      if (MyAMS.dom.root.hasClass('minified')) {
        localStorage.setItem('window-state', 'minified');
      } else {
        localStorage.setItem('window-state', '');
      }
    }
  },
  /**
   * Click handler for menu hide button
   *
   * @param evt: original click event
   */
  switchMenu: evt => {
    evt && evt.preventDefault();
    MyAMS.dom.root.toggleClass('hidden-menu');
    if (window.localStorage) {
      if (MyAMS.dom.root.hasClass('hidden-menu')) {
        localStorage.setItem('window-state', 'hidden-menu');
      } else {
        localStorage.setItem('window-state', '');
      }
    }
  },
  /**
   * Restore window state on application startup
   *
   * Previous window state is stored in local storage.
   */
  restoreState: () => {
    // restore window state
    if (window.localStorage) {
      const state = localStorage.getItem('window-state');
      if (state === 'minified') {
        MyAMS.nav.minifyMenu({
          currentTarget: $('#minifyme'),
          preventDefault: () => {}
        });
      } else {
        MyAMS.dom.root.addClass(state);
      }
    }
  }
};

/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
  MyAMS.config.modules.push('nav');
} else {
  MyAMS.nav = nav;
  console.debug("MyAMS: nav module loaded...");
}

/***/ }),

/***/ "./src/js/mod-notifications.js":
/*!*************************************!*\
  !*** ./src/js/mod-notifications.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "notifications": function() { return /* binding */ notifications; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS notifications handlers
 */

const $ = MyAMS.$;
if (!$.templates) {
  const jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");
  $.templates = jsrender.templates;
}

/**
 * Notifications list template string
 */

const ITEM_TEMPLATE_STRING = `
	<li class="p-1 my-1{{if status}} alert-{{:status}}{{/if}}">
		<a class="d-flex flex-row"{{if url}} href="{{:url}}"{{/if}}>
			{{if source.avatar}}
			<img class="avatar mx-1 mt-1" src="{{:source.avatar}}"
				 alt="{{:source.title}}" title="{{:source.title}}" />
			{{else}}
			<i class="avatar fa fa-fw fa-2x fa-user mx-1 mt-1"
			   title="{{:source.title}}"></i>
			{{/if}}
			<div class="flex-grow-1 ml-2">
				<small class="timestamp float-right text-muted">
					{{*: new Date(data.timestamp).toLocaleString()}}
				</small>
				<strong class="title d-block">
					{{:title}}
				</strong>
				<p class="text-muted mb-2">{{:message}}</p>
			</div>
		</a>
	</li>`;
const ITEM_TEMPLATE = $.templates({
  markup: ITEM_TEMPLATE_STRING,
  allowCode: true
});
const LIST_TEMPLATE_STRING = `
	<ul class="list-style-none flex-grow-1 overflow-auto m-0 p-0">
		{{for notifications tmpl=~itemTemplate /}}
	</ul>
	{{if !~options.hideTimestamp}}
	<div class="timestamp border-top pt-1">
		<span>{{*: MyAMS.i18n.LAST_UPDATE }}{{: ~timestamp.toLocaleString() }}</span>
		<i class="fa fa-fw fa-sync float-right"
		   data-ams-click-handler="MyAMS.notifications.getNotifications"
		   data-ams-click-handler-options='{"localTimestamp": "{{: ~useLocalTime }}"}'></i>
	</div>
	{{/if}}`;
const LIST_TEMPLATE = $.templates({
  markup: LIST_TEMPLATE_STRING,
  allowCode: true
});
class NotificationsList {
  /**
   * List constructor
   *
   * @param values: notifications data (may be loaded from JSON)
   * @param options: list rendering options
   */
  constructor(values) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.values = values;
    this.options = options;
  }

  /**
   * Render list into given parent
   *
   * @param parent: JQUery parent object into which the list must be rendered
   */
  render(parent) {
    $(parent).html(LIST_TEMPLATE.render(this.values, {
      itemTemplate: ITEM_TEMPLATE,
      timestamp: this.options.localTimestamp ? new Date() : new Date(this.values.timestamp),
      useLocalTime: this.options.localTimestamp ? 'true' : 'false',
      options: this.options
    }));
  }
}
const notifications = {
  /**
   * Check permission to display desktop notifications
   */
  checkPermission: () => {
    const checkNotificationPromise = () => {
      try {
        Notification.requestPermission().then();
      } catch (e) {
        return false;
      }
      return true;
    };
    return new Promise((resolve, reject) => {
      if (!('Notification' in window)) {
        console.debug("Notifications are not supported by this browser!");
        resolve(false);
      } else if (Notification.permission !== 'denied') {
        if (Notification.permission === 'default') {
          if (checkNotificationPromise()) {
            Notification.requestPermission().then(permission => {
              resolve(permission === 'granted');
            });
          } else {
            Notification.requestPermission(permission => {
              resolve(permission === 'granted');
            });
          }
        } else {
          resolve(true);
        }
      } else {
        resolve(false);
      }
    });
  },
  checkUserPermission: () => {
    MyAMS.notifications.checkPermission().then(() => {});
  },
  /**
   * Load user notifications
   *
   * @param evt: source event
   * @param options: notifications options (which can also be extracted from event data)
   */
  getNotifications: (evt, options) => {
    const data = $.extend({}, options, evt.data),
      target = $(evt.target),
      current = $(evt.currentTarget),
      remote = current.data('ams-notifications-source') || current.parents('[data-ams-notifications-source]').data('ams-notifications-source');
    return new Promise((resolve, reject) => {
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.get(remote, current.data('ams-notifications-params') || '', current.data('ams-notifications-options') || {}).then(result => {
          const tab = $(target.data('ams-notifications-target') || target.parents('[data-ams-notifications-target]').data('ams-notifications-target') || current.attr('href'));
          new NotificationsList(result, data).render(tab);
          $('#notifications-count').text('');
          notifications.checkUserPermission();
          resolve();
        }, reject);
      }, reject);
    });
  },
  /**
   * Add new notification to notifications list
   *
   * @param message: notification element
   * @param showDesktop: if true, also try to display desktop notification
   */
  addNotification: (message, showDesktop) => {
    const pane = $('ul', '#notifications-pane'),
      notification = $(ITEM_TEMPLATE.render(message)),
      badge = $('#notifications-count'),
      count = parseInt(badge.text()) || 0;
    pane.prepend(notification);
    badge.text(count + 1);
    if (showDesktop) {
      notifications.showDesktopNotification(message);
    }
  },
  /**
   * Show new desktop notification
   *
   * @param message: notification elements
   */
  showDesktopNotification: message => {
    notifications.checkPermission().then(status => {
      if (!status) {
        return;
      }
      const options = {
          title: message.title,
          body: message.message,
          icon: message.source.avatar
        },
        notification = new Notification(options.title, options);
      if (message.url) {
        notification.onclick = () => {
          window.open(message.url);
        };
      }
    });
  }
};

/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
  MyAMS.config.modules.push('notifications');
} else {
  MyAMS.notifications = notifications;
  console.debug("MyAMS: notifications module loaded...");
}

/***/ }),

/***/ "./src/js/mod-plugins.js":
/*!*******************************!*\
  !*** ./src/js/mod-plugins.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checker": function() { return /* binding */ checker; },
/* harmony export */   "contextMenu": function() { return /* binding */ contextMenu; },
/* harmony export */   "datatables": function() { return /* binding */ datatables; },
/* harmony export */   "datetime": function() { return /* binding */ datetime; },
/* harmony export */   "dragdrop": function() { return /* binding */ dragdrop; },
/* harmony export */   "editor": function() { return /* binding */ editor; },
/* harmony export */   "fileInput": function() { return /* binding */ fileInput; },
/* harmony export */   "imgAreaSelect": function() { return /* binding */ imgAreaSelect; },
/* harmony export */   "select2": function() { return /* binding */ select2; },
/* harmony export */   "svgPlugin": function() { return /* binding */ svgPlugin; },
/* harmony export */   "switcher": function() { return /* binding */ switcher; },
/* harmony export */   "tinymce": function() { return /* binding */ tinymce; },
/* harmony export */   "treeview": function() { return /* binding */ treeview; },
/* harmony export */   "validate": function() { return /* binding */ validate; }
/* harmony export */ });
/* global MyAMS, bsCustomFileInput */
/**
 * MyAMS standard plugins
 */

const $ = MyAMS.$;
if (!$.templates) {
  const jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");
  $.templates = jsrender.templates;
}

/**
 * Fieldset checker plug-in
 *
 * A checker is like a simple switcher, but also provides a checkbox which is used
 * as "switcher" input field.
 *
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

const CHECKER_TEMPLATE_STRING = `
	<span class="custom-control custom-switch">
		<input type="checkbox"
			   id="{{: fieldId }}" name="{{: fieldName }}"
			   class="custom-control-input checker"
			   {{if checked}}checked{{/if}}
			   {{if readonly}}disabled{{/if}}
			   value="{{: value }}" />
		{{if prefix}}
		<input type="hidden" class="prefix"
			   id="{{: prefix}}{{: fieldName}}_prefix"
			   name="{{: prefix}}{{: fieldName}}"
			   value="{{if state==='on'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}" />
		{{else marker}}
		<input type="hidden" class="marker"
			   name="{{: fieldName}}{{: marker}}"
			   value="1" />
		{{/if}}
		<label for="{{: fieldId }}"
			   class="custom-control-label">
			{{: legend }}
		</label>
	</span>
`;
const CHECKER_TEMPLATE = $.templates({
  markup: CHECKER_TEMPLATE_STRING
});
function checker(element) {
  return new Promise(resolve => {
    const checkers = $('legend.checker', element);
    if (checkers.length > 0) {
      checkers.each((idx, elt) => {
        const legend = $(elt),
          data = legend.data();
        if (!data.amsChecker) {
          const fieldset = legend.parent('fieldset'),
            state = data.amsCheckerState || data.amsState,
            checked = fieldset.hasClass('switched') || state === 'on',
            fieldName = data.amsCheckerFieldname || data.amsFieldname || `checker_${MyAMS.core.generateId()}`,
            fieldId = fieldName.replace(/\./g, '_'),
            prefix = data.amsCheckerHiddenPrefix || data.amsHiddenPrefix,
            marker = data.amsCheckerMarker || data.amsMarker || false,
            checkerMode = data.amsCheckerMode || data.amsMode || 'hide',
            checkedValue = data.amsCheckerValueOn || data.amsValueOn || 'true',
            uncheckedValue = data.amsCheckerValueOff || data.amsValueOff || 'false',
            value = data.amsCheckerValue || data.amsValue,
            readonly = data.amsCheckerReadonly || data.amsReadonly,
            props = {
              legend: legend.text(),
              fieldName: fieldName,
              fieldId: fieldId,
              value: value || true,
              checked: checked,
              readonly: readonly,
              prefix: prefix,
              state: state,
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
          $('input', legend).change(evt => {
            const input = $(evt.target),
              checked = input.is(':checked'),
              veto = {
                veto: false
              };
            legend.trigger('before-switch.ams.checker', [legend, veto]);
            if (veto.veto) {
              input.prop('checked', !checked);
              return;
            }
            MyAMS.core.executeFunctionByName(data.amsCheckerChangeHandler || data.amsChangeHandler, document, legend, checked);
            if (!data.amsCheckerCancelDefault && !data.amsCancelDefault) {
              const prefix = input.siblings('.prefix');
              if (checkerMode === 'hide') {
                if (checked) {
                  fieldset.removeClass('switched');
                  prefix.val(checkedValue);
                  legend.trigger('opened.ams.checker', [legend]);
                } else {
                  fieldset.addClass('switched');
                  prefix.val(uncheckedValue);
                  legend.trigger('closed.ams.checker', [legend]);
                }
              } else {
                fieldset.prop('disabled', !checked);
                prefix.val(checked ? checkedValue : uncheckedValue);
              }
            }
          });
          legend.closest('form').on('reset', () => {
            const checker = $('.checker', legend);
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
  return new Promise((resolve, reject) => {
    const menus = $('.context-menu', element);
    if (menus.length > 0) {
      MyAMS.require('menu').then(() => {
        menus.each((idx, elt) => {
          const menu = $(elt),
            data = menu.data(),
            options = {
              menuSelector: data.amsContextmenuSelector || data.amsMenuSelector
            };
          let settings = $.extend({}, options, data.amsContextmenuOptions || data.amsOptions);
          settings = MyAMS.core.executeFunctionByName(data.amsContextmenuInitCallback || data.amsInit, document, menu, settings) || settings;
          const veto = {
            veto: false
          };
          menu.trigger('before-init.ams.contextmenu', [menu, settings, veto]);
          if (veto.veto) {
            return;
          }
          const plugin = menu.contextMenu(settings);
          MyAMS.core.executeFunctionByName(data.amsContextmenuAfterInitCallback || data.amsAfterInit, document, menu, plugin, settings);
          menu.trigger('after-init.ams.contextmenu', [menu, plugin]);
        });
        resolve(menus);
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * JQuery Datatable plug-in
 */

const _datatablesHelpers = {
  init: () => {
    // Add autodetect formats
    const types = $.fn.dataTable.ext.type;
    types.detect.unshift(data => {
      if (data !== null && data.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3}$/)) {
        return 'date-euro';
      }
      return null;
    });
    types.detect.unshift(data => {
      if (data !== null && data.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3} - ([0-1][0-9]|2[0-3]):[0-5][0-9]$/)) {
        return 'datetime-euro';
      }
      return null;
    });

    // Add sorting methods
    $.extend(types.order, {
      // numeric values using commas separators
      "numeric-comma-asc": (a, b) => {
        let x = a.replace(/,/, ".").replace(/ /g, '');
        let y = b.replace(/,/, ".").replace(/ /g, '');
        x = parseFloat(x);
        y = parseFloat(y);
        return x < y ? -1 : x > y ? 1 : 0;
      },
      "numeric-comma-desc": (a, b) => {
        let x = a.replace(/,/, ".").replace(/ /g, '');
        let y = b.replace(/,/, ".").replace(/ /g, '');
        x = parseFloat(x);
        y = parseFloat(y);
        return x < y ? 1 : x > y ? -1 : 0;
      },
      // date-euro column sorter
      "date-euro-pre": a => {
        const trimmed = $.trim(a);
        let x;
        if (trimmed !== '') {
          const frDate = trimmed.split('/');
          x = (frDate[2] + frDate[1] + frDate[0]) * 1;
        } else {
          x = 10000000; // = l'an 1000 ...
        }

        return x;
      },
      "date-euro-asc": (a, b) => {
        return a - b;
      },
      "date-euro-desc": (a, b) => {
        return b - a;
      },
      // datetime-euro column sorter
      "datetime-euro-pre": a => {
        const trimmed = $.trim(a);
        let x;
        if (trimmed !== '') {
          const frDateTime = trimmed.split(' - ');
          const frDate = frDateTime[0].split('/');
          const frTime = frDateTime[1].split(':');
          x = (frDate[2] + frDate[1] + frDate[0] + frTime[0] + frTime[1]) * 1;
        } else {
          x = 100000000000; // = l'an 1000 ...
        }

        return x;
      },
      "datetime-euro-asc": (a, b) => {
        return a - b;
      },
      "datetime-euro-desc": (a, b) => {
        return b - a;
      }
    });
  },
  /**
   * Store reorder source before reorder
   *
   * @param evt: original event
   * @param node: source node
   */
  preReorder: function (evt, node) {
    const table = $(evt.target);
    table.data('ams-reorder-source', node);
  },
  /**
   * Handle table rows reordering
   *
   * @param evt: original event
   */
  reorderRows: function (evt) {
    return new Promise((resolve, reject) => {
      const table = $(evt.target),
        dtTable = table.DataTable(),
        data = table.data();
      // extract target and URL
      let target = data.amsReorderInputTarget,
        url = data.amsReorderUrl,
        ids;
      if (!(target || url)) {
        resolve();
      }
      // extract reordered rows IDs
      const rows = $('tbody tr', table),
        getter = MyAMS.core.getFunctionByName(data.amsReorderData) || 'data-ams-row-value';
      if (typeof getter === 'function') {
        ids = $.makeArray(rows).map(getter);
      } else {
        ids = rows.listattr(getter);
      }
      // set target input value (if any)
      const separator = data.amsReorderSeparator || ';';
      if (target) {
        target = $(target);
        if (target.exists()) {
          target.val(ids.join(separator));
        }
      } else {
        ids = ids.join(separator);
      }
      // call target URL (if any)
      if (url) {
        url = MyAMS.core.executeFunctionByName(url, document, table) || url;
        if (!(url.startsWith(window.location.protocol) || url.startsWith('/'))) {
          const location = table.data('ams-location');
          url = `${location || ''}/${url}`;
        }
        if (ids.length > 0) {
          let postData;
          if (data.amsReorderPostData) {
            postData = MyAMS.core.executeFunctionByName(data.amsReorderPostData, document, table, ids);
          } else {
            const attr = data.amsReorderPostAttr || 'order';
            postData = {};
            postData[attr] = ids;
          }
          MyAMS.require('ajax').then(() => {
            MyAMS.ajax.post(url, postData).then((result, status, xhr) => {
              $('td.sorter', table).each((idx, elt) => {
                $(elt).removeData().attr('data-order', idx);
                dtTable.row($(elt).parents('tr').get(0)).invalidate().draw();
              });
              const callback = data.amsReorderCallback;
              if (callback) {
                MyAMS.core.executeFunctionByName(callback, document, table, result, status, xhr).then(function () {
                  for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
                    results[_key] = arguments[_key];
                  }
                  resolve.apply(table, ...results);
                });
              } else {
                MyAMS.ajax.handleJSON(result, table.parents('.dataTables_wrapper')).then(() => {
                  resolve(result);
                });
              }
            }, reject);
          });
        }
      }
    });
  }
};
function datatables(element) {
  const baseJS = `${MyAMS.env.baseURL}../ext/datatables/`,
    baseCSS = `${MyAMS.env.baseURL}../../css/ext/datatables/`;
  return new Promise((resolve, reject) => {
    const tables = $('.datatable', element);
    if (tables.length > 0) {
      MyAMS.ajax.check($.fn.dataTable, `${MyAMS.env.baseURL}../ext/datatables/dataTables${MyAMS.env.extext}.js`).then(firstLoad => {
        const required = [];
        if (firstLoad) {
          required.push(MyAMS.core.getScript(`${baseJS}dataTables.bootstrap4${MyAMS.env.extext}.js`));
          required.push(MyAMS.core.getCSS(`${baseCSS}dataTables.bootstrap4${MyAMS.env.extext}.css`, 'datatables-bs4'));
        }
        $.when.apply($, required).then(() => {
          const css = {},
            bases = [],
            extensions = [],
            depends = [],
            loaded = {};
          tables.each((idx, elt) => {
            const table = $(elt),
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
              bases.push(`${baseJS}dataTables.autoFill${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}autoFill.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-autofill-bs4'] = `${baseCSS}autoFill.bootstrap4${MyAMS.env.extext}.css`;
              loaded.autoFill = true;
            }
            if (data.buttons) {
              if (!loaded.buttons && !$.fn.dataTable.Buttons) {
                bases.push(`${baseJS}dataTables.buttons${MyAMS.env.extext}.js`);
                extensions.push(`${baseJS}buttons.bootstrap4${MyAMS.env.extext}.js`);
                extensions.push(`${baseJS}buttons.html5${MyAMS.env.extext}.js`);
                css['dt-buttons-bs4'] = `${baseCSS}buttons.bootstrap4${MyAMS.env.extext}.css`;
                loaded.buttons = true;
              }
              if ($.isArray(data.buttons)) {
                if (data.buttons.indexOf('print') >= 0) {
                  if (!loaded.buttons_print && !$.fn.dataTable.ext.buttons.print) {
                    depends.push(`${baseJS}buttons.print${MyAMS.env.extext}.js`);
                    loaded.buttons_print = true;
                  }
                }
                if (data.buttons.indexOf('excel') >= 0) {
                  if (!loaded.buttons_excel && !$.fn.dataTable.ext.buttons.excelHtml5) {
                    bases.push(`${baseJS}jszip${MyAMS.env.extext}.js`);
                    loaded.buttons_excel = true;
                  }
                }
                if (data.buttons.indexOf('pdf') >= 0) {
                  if (!loaded.buttons_pdf && !window.pdfMake) {
                    bases.push(`${baseJS}pdfmake${MyAMS.env.extext}.js`);
                    extensions.push(`${baseJS}vfs_fonts${MyAMS.env.extext}.js`);
                    loaded.buttons_pdf = true;
                  }
                }
                if (data.buttons.indexOf('colvis') >= 0) {
                  if (!loaded.buttons_colvis && !$.fn.dataTable.ext.buttons.colvis) {
                    depends.push(`${baseJS}buttons.colVis${MyAMS.env.extext}.js`);
                    loaded.buttons_colvis = true;
                  }
                }
              }
            }
            if (data.colReorder && !loaded.colReorder && !$.fn.dataTable.ColReorder) {
              bases.push(`${baseJS}dataTables.colReorder${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}colReorder.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-colreorder-bs4'] = `${baseCSS}colReorder.bootstrap4${MyAMS.env.extext}.css`;
              loaded.colReorder = true;
            }
            if (data.fixedColumns && !loaded.fixedColumns && !$.fn.dataTable.FixedColumns) {
              bases.push(`${baseJS}dataTables.fixedColumns${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}fixedColumns.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-fixedcolumns-bs4'] = `${baseCSS}fixedColumns.bootstrap4${MyAMS.env.extext}.css`;
              loaded.fixedColumns = true;
            }
            if (data.fixedHeader && !loaded.fixedHeader && !$.fn.dataTable.FixedHeader) {
              bases.push(`${baseJS}dataTables.fixedHeader${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}fixedHeader.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-fixedheader-bs4'] = `${baseCSS}fixedHeader.bootstrap4${MyAMS.env.extext}.css`;
              loaded.fixedHeader = true;
            }
            if (data.keyTable && !loaded.keyTable && !$.fn.dataTable.KeyTable) {
              bases.push(`${baseJS}dataTables.keyTable${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}keyTable.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-keytable-bs4'] = `${baseCSS}keyTable.bootstrap4${MyAMS.env.extext}.css`;
              loaded.keyTable = true;
            }
            if (data.responsive !== false && !loaded.responsive && !$.fn.dataTable.Responsive) {
              bases.push(`${baseJS}dataTables.responsive${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}responsive.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-responsive-bs4'] = `${baseCSS}responsive.bootstrap4${MyAMS.env.extext}.css`;
              loaded.responsive = true;
            }
            if (data.rowGroup && !loaded.rowGroup && !$.fn.dataTable.RowGroup) {
              bases.push(`${baseJS}dataTables.rowGroup${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}rowGroup.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-rowgroup-bs4'] = `${baseCSS}rowGroup.bootstrap4${MyAMS.env.extext}.css`;
              loaded.rowGroup = true;
            }
            if (data.rowReorder && !loaded.rowReorder && !$.fn.dataTable.RowReorder) {
              bases.push(`${baseJS}dataTables.rowReorder${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}rowReorder.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-rowreorder-bs4'] = `${baseCSS}rowReorder.bootstrap4${MyAMS.env.extext}.css`;
              loaded.rowReorder = true;
            }
            if (data.scroller && !loaded.scroller && !$.fn.dataTable.Scroller) {
              bases.push(`${baseJS}dataTables.scroller${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}scroller.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-scroller-bs4'] = `${baseCSS}scroller.bootstrap4${MyAMS.env.extext}.css`;
              loaded.scroller = true;
            }
            if (data.searchBuilder && !loaded.searchBuilder && !$.fn.dataTable.SearchBuilder) {
              bases.push(`${baseJS}dataTables.searchBuilder${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}searchBuilder.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-searchbuilder-bs4'] = `${baseCSS}searchBuilder.bootstrap4${MyAMS.env.extext}.css`;
              loaded.searchBuilder = true;
            }
            if (data.searchPanes && !loaded.searchPanes && !$.fn.dataTable.SearchPanes) {
              if (!loaded.select && !$.fn.dataTable.select) {
                bases.push(`${baseJS}dataTables.select${MyAMS.env.extext}.js`);
                extensions.push(`${baseJS}select.bootstrap4${MyAMS.env.extext}.js`);
                css['dt-select-bs4'] = `${baseCSS}select.bootstrap4${MyAMS.env.extext}.css`;
                loaded.select = true;
              }
              extensions.push(`${baseJS}dataTables.searchPanes${MyAMS.env.extext}.js`);
              depends.push(`${baseJS}searchPanes.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-searchpanes-bs4'] = `${baseCSS}searchPanes.bootstrap4${MyAMS.env.extext}.css`;
              loaded.searchPanes = true;
            }
            if (data.select && !loaded.select && !$.fn.dataTable.select) {
              bases.push(`${baseJS}dataTables.select${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}select.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-select-bs4'] = `${baseCSS}select.bootstrap4${MyAMS.env.extext}.css`;
              loaded.select = true;
            }
            if (data.stateRestore && !loaded.stateRestore && !$.fn.dataTables.stateRestore) {
              bases.push(`${baseJS}dataTables.stateRestore${MyAMS.env.extext}.js`);
              extensions.push(`${baseJS}stateRestore.bootstrap4${MyAMS.env.extext}.js`);
              css['dt-staterestore-bs4'] = `${baseCSS}stateRestore.bootstrap4${MyAMS.env.extext}.css`;
              loaded.stateRestore = true;
            }
          });
          $.when.apply($, bases.map(MyAMS.core.getScript)).then(() => {
            return $.when.apply($, extensions.map(MyAMS.core.getScript)).then(() => {
              return $.when.apply($, depends.map(MyAMS.core.getScript)).then(() => {
                if (firstLoad) {
                  _datatablesHelpers.init();
                }
                for (const [name, url] of Object.entries(css)) {
                  MyAMS.core.getCSS(url, name);
                }
                tables.each((idx, elt) => {
                  const table = $(elt);
                  if ($.fn.dataTable.isDataTable(table)) {
                    return;
                  }
                  const data = table.data();

                  // initialize dom property
                  let dom = data.amsDatatableDom || data.amsDom || data.dom || '';
                  if (!dom) {
                    if (data.buttons) {
                      dom += "<'row my-2 px-4 justify-content-end'B>";
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
                  if (!data.buttons && !data.searchBuilder && !data.searchPanes && data.searching === false || data.lengthChange === false) {
                    table.siblings('h3').addClass('mb-0');
                  }

                  // initialize default options
                  const defaultOptions = {
                    language: data.amsDatatableLanguage || data.amsLanguage || MyAMS.i18n.plugins.datatables,
                    responsive: true,
                    dom: dom
                  };

                  // initialize sorting
                  let order = data.amsDatatableOrder || data.amsOrder;
                  if (typeof order === 'string') {
                    const orders = order.split(';');
                    order = [];
                    for (const col of orders) {
                      const colOrder = col.split(',');
                      colOrder[0] = parseInt(colOrder[0]);
                      order.push(colOrder);
                    }
                  }
                  if (order) {
                    defaultOptions.order = order;
                  }

                  // initialize columns definition based on header settings
                  const heads = $('thead th', table),
                    columns = [];
                  heads.each((idx, th) => {
                    columns[idx] = $(th).data('ams-column') || {};
                  });
                  const sortables = heads.listattr('data-ams-sortable');
                  for (const iterator of sortables.entries()) {
                    const [idx, sortable] = iterator;
                    if (data.rowReorder) {
                      columns[idx].sortable = false;
                    } else if (sortable !== undefined) {
                      columns[idx].sortable = typeof sortable === 'string' ? JSON.parse(sortable) : sortable;
                    }
                  }
                  const types = heads.listattr('data-ams-type');
                  for (const iterator of types.entries()) {
                    const [idx, stype] = iterator;
                    if (stype !== undefined) {
                      columns[idx].type = stype;
                    }
                  }
                  defaultOptions.columns = columns;

                  // initialize final settings and initialize plug-in
                  let settings = $.extend({}, defaultOptions, data.amsDatatableOptions || data.amsOptions);
                  settings = MyAMS.core.executeFunctionByName(data.amsDatatableInitCallback || data.amsInit, document, table, settings) || settings;
                  const veto = {
                    veto: false
                  };
                  table.trigger('before-init.ams.datatable', [table, settings, veto]);
                  if (veto.veto) {
                    return;
                  }
                  setTimeout(() => {
                    const plugin = table.DataTable(settings);
                    MyAMS.core.executeFunctionByName(data.amsDatatableAfterInitCallback || data.amsAfterInit, document, table, plugin, settings);
                    table.trigger('after-init.ams.datatable', [table, plugin]);

                    // set reorder events
                    if (settings.rowReorder) {
                      plugin.on('pre-row-reorder', MyAMS.core.getFunctionByName(data.amsDatatablePreReorder || data.amsPreReorder) || _datatablesHelpers.preReorder);
                      plugin.on('row-reorder', MyAMS.core.getFunctionByName(data.amsDatatableReordered || data.amsReordered) || _datatablesHelpers.reorderRows);
                    }
                  }, 100);
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
 * Bootstrap 4 Tempus/Dominus date/time picker
 */

function datetime(element) {
  return new Promise((resolve, reject) => {
    const inputs = $('.datetime', element);
    if (inputs.length > 0) {
      MyAMS.ajax.check(window.moment, `${MyAMS.env.baseURL}../ext/moment${MyAMS.env.extext}.js`).then(() => {
        MyAMS.ajax.check($.fn.datetimepicker, `${MyAMS.env.baseURL}../ext/tempusdominus-bootstrap4${MyAMS.env.extext}.js`).then(firstLoad => {
          const required = [];
          if (firstLoad) {
            required.push(MyAMS.core.getCSS(`${MyAMS.env.baseURL}../../css/ext/tempusdominus-bootstrap4${MyAMS.env.extext}.css`, 'tempusdominus'));
          }
          $.when.apply($, required).then(() => {
            inputs.each((idx, elt) => {
              const input = $(elt),
                data = input.data(),
                defaultOptions = {
                  locale: data.amsDatetimeLanguage || data.amsLanguage || MyAMS.i18n.language,
                  icons: {
                    time: 'far fa-clock',
                    date: 'far fa-calendar',
                    up: 'fas fa-arrow-up',
                    down: 'fas fa-arrow-down',
                    previous: 'fas fa-chevron-left',
                    next: 'fas fa-chevron-right',
                    today: 'far fa-calendar-check-o',
                    clear: 'far fa-trash',
                    close: 'far fa-times'
                  },
                  date: input.val(),
                  format: data.amsDatetimeFormat || data.amsFormat
                };
              let settings = $.extend({}, defaultOptions, data.datetimeOptions || data.options);
              settings = MyAMS.core.executeFunctionByName(data.amsDatetimeInitCallback || data.amsInit, document, input, settings) || settings;
              const veto = {
                veto: false
              };
              input.trigger('before-init.ams.datetime', [input, settings, veto]);
              if (veto.veto) {
                return;
              }
              input.datetimepicker(settings);
              const plugin = input.data('datetimepicker');
              if (data.amsDatetimeIsoTarget || data.amsIsoTarget) {
                input.on('change.datetimepicker', evt => {
                  const source = $(evt.currentTarget),
                    data = source.data(),
                    target = $(data.amsDatetimeIsoTarget || data.amsIsoTarget);
                  target.val(evt.date ? evt.date.toISOString(true) : null);
                });
              }
              input.trigger('after-init.ams.datetime', [input, plugin]);
            });
            resolve(inputs);
          });
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
  return new Promise((resolve, reject) => {
    const dragitems = $('.draggable, .droppable, .sortable, .resizable', element);
    if (dragitems.length > 0) {
      MyAMS.ajax.check($.fn.draggable, `${MyAMS.env.baseURL}../ext/jquery-ui${MyAMS.env.extext}.js`).then(() => {
        MyAMS.core.getCSS(`${MyAMS.env.baseURL}../../css/ext/jquery-ui.structure${MyAMS.env.extext}.css`, 'jquery-ui').then(() => {
          dragitems.each((idx, elt) => {
            const item = $(elt),
              data = item.data();
            // draggable components
            if (item.hasClass('draggable')) {
              const dragOptions = {
                cursor: data.amsDraggableCursor || 'move',
                containment: data.amsDraggableContainment,
                handle: data.amsDraggableHandle,
                connectToSortable: data.amsDraggableConnectSortable,
                helper: MyAMS.core.getFunctionByName(data.amsDraggableHelper) || data.amsDraggableHelper,
                start: MyAMS.core.getFunctionByName(data.amsDraggableStart),
                stop: MyAMS.core.getFunctionByName(data.amsDraggableStop)
              };
              let settings = $.extend({}, dragOptions, data.amsDraggableOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsDraggableInitCallback || data.amsInit, document, item, settings) || settings;
              const veto = {
                veto: false
              };
              item.trigger('before-init.ams.draggable', [item, settings, veto]);
              if (veto.veto) {
                return;
              }
              const plugin = item.draggable(settings);
              item.disableSelection();
              MyAMS.core.executeFunctionByName(data.amsDraggableAfterInitCallback || data.amsAfterInit, document, item, plugin, settings);
              item.trigger('after-init.ams.draggable', [item, plugin]);
            }
            // droppable components
            if (item.hasClass('droppable')) {
              const dropOptions = {
                accept: data.amsDroppableAccept || data.amsAccept,
                drop: MyAMS.core.getFunctionByName(data.amsDroppableDrop)
              };
              let settings = $.extend({}, dropOptions, data.amsDroppableOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsDroppableInitCallback || data.amsInit, document, item, settings) || settings;
              const veto = {
                veto: false
              };
              item.trigger('before-init.ams.droppable', [item, settings, veto]);
              if (veto.veto) {
                return;
              }
              const plugin = item.droppable(settings);
              MyAMS.core.executeFunctionByName(data.amsDroppableAfterInitCallback || data.amsAfterInit, document, item, plugin, settings);
              item.trigger('after-init.ams.droppable', [item, plugin]);
            }
            // sortable components
            if (item.hasClass('sortable')) {
              const sortOptions = {
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
              let settings = $.extend({}, sortOptions, data.amsSortableOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsSortableInitCallback || data.amsInit, document, item, settings) || settings;
              const veto = {
                veto: false
              };
              item.trigger('before-init.ams.sortable', [item, settings, veto]);
              if (veto.veto) {
                return;
              }
              const plugin = item.sortable(settings);
              item.disableSelection();
              MyAMS.core.executeFunctionByName(data.amsSortableAfterInitCallback || data.amsAfterInit, document, item, plugin, settings);
              item.trigger('after-init.ams.sortable', [item, plugin]);
            }
            // resizable components
            if (item.hasClass('resizable')) {
              const resizeOptions = {
                autoHide: data.amsResizableAutohide === false ? true : data.amsResizableAutohide,
                containment: data.amsResizableContainment,
                grid: data.amsResizableGrid,
                handles: data.amsResizableHandles,
                start: MyAMS.core.getFunctionByName(data.amsResizableStart),
                resize: MyAMS.core.getFunctionByName(data.amsResizableResize),
                stop: MyAMS.core.getFunctionByName(data.amsResizableStop)
              };
              let settings = $.extend({}, resizeOptions, data.amsResizableOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsResizableInitCallback || data.amsInit, document, item, settings) || settings;
              const veto = {
                veto: false
              };
              item.trigger('before-init.ams.resizable', [item, settings, veto]);
              if (veto.veto) {
                return;
              }
              const plugin = item.resizable(settings);
              item.disableSelection();
              MyAMS.core.executeFunctionByName(data.amsResizableAfterInitCallback || data.amsAfterInit, document, item, plugin, settings);
              item.trigger('after-init.ams.resizable', [item, plugin]);
            }
          });
          resolve(dragitems);
        });
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * ACE text editor
 */

function editor(element) {
  return new Promise((resolve, reject) => {
    const editors = $('.editor textarea', element);
    if (editors.length > 0) {
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.check(window.ace, `${MyAMS.env.baseURL}../ext/ace/ace${MyAMS.env.extext}.js`).then(firstLoad => {
          const ace = window.ace,
            deferred = [];
          if (firstLoad) {
            ace.config.set('basePath', `${MyAMS.env.baseURL}../ext/ace`);
            deferred.push(MyAMS.core.getScript(`${MyAMS.env.baseURL}../ext/ace/ext-modelist${MyAMS.env.extext}.js`));
          }
          $.when.apply($, deferred).then(() => {
            editors.each((idx, elt) => {
              const textarea = $(elt),
                widget = textarea.parents('.editor'),
                data = textarea.data(),
                modeList = ace.require('ace/ext/modelist'),
                mode = data.amsEditorMode || data.amsMode || modeList.getModeForPath(data.amsEditorFilename || data.amsFilename || 'text.txt').mode;
              setTimeout(() => {
                // create editor DIV
                const textEditor = $('<div>', {
                  position: 'absolute',
                  width: textarea.width(),
                  height: textarea.height(),
                  'class': textarea.attr('class')
                }).insertBefore(textarea);
                textarea.css('display', 'none');
                // initialize editor
                const defaultOptions = {
                  mode: mode,
                  fontSize: 12,
                  tabSize: 4,
                  useSoftTabs: false,
                  showGutter: true,
                  showLineNumbers: true,
                  printMargin: 132,
                  showInvisibles: true
                };
                let settings = $.extend({}, defaultOptions, data.amsEditorOptions || data.amsOptions);
                settings = MyAMS.core.executeFunctionByName(data.amsEditorInitCallback || data.amsInit, document, textarea, settings) || settings;
                const veto = {
                  veto: false
                };
                textarea.trigger('before-init.ams.editor', [textarea, settings, veto]);
                if (veto.veto) {
                  return;
                }
                const editor = ace.edit(textEditor[0]);
                editor.setOptions(settings);
                if (MyAMS.theme === 'darkmode') {
                  editor.setTheme('ace/theme/dracula');
                } else {
                  editor.setTheme('ace/theme/textmate');
                }
                editor.session.setValue(textarea.val());
                if (textarea.attr('disabled')) {
                  editor.setReadOnly(true);
                }
                editor.session.on('change', () => {
                  textarea.val(editor.session.getValue());
                });
                widget.data('editor', editor);
                MyAMS.core.executeFunctionByName(data.amsEditorAfterEditCallback || data.amsAfterInit, document, textarea, editor, settings);
                textarea.trigger('after-init.ams.editor', [textarea, editor]);
              }, 200);
            });
            resolve(editors);
          });
        });
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * Bootstrap custom file input manager
 */

function fileInput(element) {
  return new Promise((resolve, reject) => {
    const inputs = $('.custom-file-input', element);
    if (inputs.length > 0) {
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.check(window.bsCustomFileInput, `${MyAMS.env.baseURL}../ext/bs-custom-file-input${MyAMS.env.extext}.js`).then(() => {
          setTimeout(() => {
            // use timeout to handle file inputs in modals!
            inputs.each((idx, elt) => {
              const input = $(elt),
                inputId = input.attr('id'),
                inputSelector = inputId ? `#${inputId}` : input.attr('name'),
                form = $(elt.form),
                formId = form.attr('id'),
                formSelector = formId ? `#${formId}` : form.attr('name'),
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
            resolve(inputs);
          }, 250);
        }, reject);
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * Image area select plug-in integration
 */

function imgAreaSelect(element) {
  return new Promise((resolve, reject) => {
    const images = $('.imgareaselect', element);
    if (images.length > 0) {
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.check($.fn.imgAreaSelect, `${MyAMS.env.baseURL}../ext/jquery-imgareaselect${MyAMS.env.extext}.js`).then(firstLoad => {
          const required = [];
          if (firstLoad) {
            required.push(MyAMS.core.getCSS(`${MyAMS.env.baseURL}../../css/ext/imgareaselect-animated${MyAMS.env.extext}.css`, 'imgareaselect'));
          }
          $.when.apply($, required).then(() => {
            images.each((idx, elt) => {
              const image = $(elt);
              if (image.data('imgAreaSelect')) {
                return; // already initialized
              }

              const data = image.data(),
                parentSelector = data.amsImgareaselectParent || data.amsParent,
                parent = parentSelector ? image.parents(parentSelector) : 'body',
                defaultOptions = {
                  instance: true,
                  handles: true,
                  parent: parent,
                  x1: data.amsImgareaselectX1 || data.amsX1 || 0,
                  y1: data.amsImgareaselectY1 || data.amsY1 || 0,
                  x2: data.amsImgareaselectX2 || data.amsX2 || data.amsImgareaselectImageWidth || data.amsImageWidth,
                  y2: data.amsImgareaselectY2 || data.amsY2 || data.amsImgareaselectImageHeight || data.amsImageHeight,
                  imageWidth: data.amsImgareaselectImageWidth || data.amsImageWidth,
                  imageHeight: data.amsImgareaselectImageHeight || data.amsImageHeight,
                  imgWidth: data.amsImgareaselectThumbWidth || data.amsThumbWidth,
                  imgHeight: data.amsImgareaselectThumbHeight || data.amsThumbHeight,
                  minWidth: 128,
                  minHeight: 128,
                  aspectRatio: data.amsImgareaselectAspectRatio || data.amsAspectRatio,
                  onSelectEnd: MyAMS.core.getFunctionByName(data.amsImgareaselectSelectEnd || data.amsSelectedEnd) || function (img, selection) {
                    const target = data.amsImgareaselectTargetField || data.amsTargetField || 'image_';
                    $(`input[name="${target}x1"]`, parent).val(selection.x1);
                    $(`input[name="${target}y1"]`, parent).val(selection.y1);
                    $(`input[name="${target}x2"]`, parent).val(selection.x2);
                    $(`input[name="${target}y2"]`, parent).val(selection.y2);
                  }
                };
              let settings = $.extend({}, defaultOptions, data.amsImgareaselectOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsImgareaselectInitCallback || data.amsInit, document, image, settings) || settings;
              const veto = {
                veto: false
              };
              image.trigger('before-init.ams.imgareaselect', [image, settings, veto]);
              if (veto.veto) {
                return;
              }
              // add timeout to update plug-in if displayed into a modal dialog
              setTimeout(() => {
                const plugin = image.imgAreaSelect(settings);
                image.trigger('after-init.ams.imgareaselect', [image, plugin]);
              }, 200);
            });
            resolve(images);
          }, reject);
        }, reject);
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * Select2 plug-in integration
 */

const _select2Helpers = {
  select2UpdateHiddenField: input => {
    const values = [];
    input.parent().find('ul.select2-selection__rendered').children('li[title]').each((idx, elt) => {
      values.push(input.children(`option[data-content="${elt.title}"]`).attr('value'));
    });
    input.data('select2-target').val(values.join(input.data('ams-select2-separator') || ','));
  },
  select2AjaxParamsHelper: (params, data) => {
    return Object.assign({}, params, data);
  }
};
function select2(element) {
  return new Promise((resolve, reject) => {
    const selects = $('.select2', element);
    if (selects.length > 0) {
      MyAMS.require('ajax', 'helpers').then(() => {
        MyAMS.ajax.check($.fn.select2, `${MyAMS.env.baseURL}../ext/select2/select2${MyAMS.env.extext}.js`).then(firstLoad => {
          const required = [];
          if (firstLoad) {
            required.push(MyAMS.core.getScript(`${MyAMS.env.baseURL}../ext/select2/i18n/${MyAMS.i18n.language}.js`));
          }
          $.when.apply($, required).then(() => {
            selects.each((idx, elt) => {
              const select = $(elt),
                data = select.data();
              if (data.select2) {
                return; // already initialized
              }

              const defaultOptions = {
                theme: data.amsSelect2Theme || data.amsTheme || 'bootstrap4',
                language: data.amsSelect2Language || data.amsLanguage || MyAMS.i18n.language,
                escapeMarkup: MyAMS.core.getFunctionByName(data.amsSelect2EscapeMarkup || data.amsEscapeMarkup),
                matcher: MyAMS.core.getFunctionByName(data.amsSelect2Matcher || data.amsMatcher),
                sorter: MyAMS.core.getFunctionByName(data.amsSelect2Sorter || data.amsSorter),
                templateResult: MyAMS.core.getFunctionByName(data.amsSelect2TemplateResult || data.amsTemplateResult),
                templateSelection: MyAMS.core.getFunctionByName(data.amsSelect2TemplateSelection || data.amsTemplateSelection),
                tokenizer: MyAMS.core.getFunctionByName(data.amsSelect2Tokenizer || data.amsTokenizer)
              };
              const ajaxUrl = data.amsSelect2AjaxUrl || data.amsAjaxUrl || data['ajax-Url'];
              if (ajaxUrl) {
                // check AJAX data helper function
                let ajaxParamsHelper;
                const ajaxParams = MyAMS.core.getFunctionByName(data.amsSelect2AjaxParams || data.amsAjaxParams || data['ajax-Params']) || data.amsSelect2AjaxParams || data.amsAjaxParams || data['ajax-Params'];
                if (typeof ajaxParams === 'function') {
                  ajaxParamsHelper = ajaxParams;
                } else if (ajaxParams) {
                  ajaxParamsHelper = params => {
                    return _select2Helpers.select2AjaxParamsHelper(params, ajaxParams);
                  };
                }
                defaultOptions.ajax = {
                  url: MyAMS.core.getFunctionByName(data.amsSelect2AjaxUrl || data.amsAjaxUrl) || data.amsSelect2AjaxUrl || data.amsAjaxUrl,
                  data: ajaxParamsHelper || MyAMS.core.getFunctionByName(data.amsSelect2AjaxData || data.amsAjaxData) || data.amsSelect2AjaxData || data.amsAjaxData,
                  processResults: MyAMS.core.getFunctionByName(data.amsSelect2AjaxProcessResults || data.amsAjaxProcessResults) || data.amsSelect2AjaxProcessResults || data.amsAjaxProcessResults,
                  transport: MyAMS.core.getFunctionByName(data.amsSelect2AjaxTransport || data.amsAjaxTransport) || data.amsSelect2AjaxTransport || data.amsAjaxTransport
                };
                defaultOptions.minimumInputLength = data.amsSelect2MinimumInputLength || data.amsMinimumInputLength || data.minimumInputLength || 1;
              }
              if (select.hasClass('sortable')) {
                // create hidden input for sortable selections
                const hidden = $(`<input type="hidden" name="${select.attr('name')}">`).insertAfter(select);
                hidden.val($('option:selected', select).listattr('value').join(data.amsSelect2Separator || ','));
                select.data('select2-target', hidden).removeAttr('name');
                defaultOptions.templateSelection = data => {
                  const elt = $(data.element);
                  elt.attr('data-content', elt.html());
                  return data.text;
                };
              }
              let settings = $.extend({}, defaultOptions, data.amsSelect2Options || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsSelect2InitCallback || data.amsInit, document, select, settings) || settings;
              const veto = {
                veto: false
              };
              select.trigger('before-init.ams.select2', [select, settings, veto]);
              if (veto.veto) {
                return;
              }
              const plugin = select.select2(settings);
              select.on('select2:opening select2:selecting select2:unselecting select2:clearing', evt => {
                // handle disabled selects
                if ($(evt.target).is(':disabled')) {
                  return false;
                }
              });
              select.on('select2:opening', evt => {
                // handle z-index in modals
                const modal = $(evt.currentTarget).parents('.modal').first();
                if (modal.exists()) {
                  const zIndex = parseInt(modal.css('z-index'));
                  plugin.data('select2').$dropdown.css('z-index', zIndex + 1);
                }
              });
              select.on('select2:open', () => {
                // handle dropdown automatic focus
                setTimeout(() => {
                  const dropdown = $('.select2-search__field', plugin.data('select2').$dropdown);
                  if (dropdown.exists()) {
                    dropdown.get(0).focus();
                  }
                }, 50);
              });
              if (select.hasClass('sortable')) {
                MyAMS.ajax.check($.fn.sortable, `${MyAMS.env.baseURL}../ext/jquery-ui${MyAMS.env.extext}.js`).then(() => {
                  select.parent().find('ul.select2-selection__rendered').sortable({
                    containment: 'parent',
                    update: () => {
                      _select2Helpers.select2UpdateHiddenField(select);
                    }
                  });
                  select.on('select2:select select2:unselect', evt => {
                    const id = evt.params.data.id,
                      target = $(evt.currentTarget),
                      option = target.children(`option[value="${id}"]`);
                    MyAMS.helpers.moveElementToParentEnd(option);
                    target.trigger('change');
                    _select2Helpers.select2UpdateHiddenField(target);
                  });
                });
              }
              MyAMS.core.executeFunctionByName(data.amsSelect2AfterInitCallback || data.amsAfterInit, document, select, plugin, settings);
              select.trigger('after-init.ams.select2', [select, plugin]);
            });
            resolve(selects);
          }, reject);
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
  return new Promise(resolve => {
    const svgs = $('.svg-container', element);
    if (svgs.length > 0) {
      svgs.each((idx, elt) => {
        const container = $(elt),
          svg = $('svg', container),
          width = svg.attr('width'),
          height = svg.attr('height');
        if (width && height) {
          elt.setAttribute('viewBox', `0 0 ${Math.round(parseFloat(width))} ${Math.round(parseFloat(height))}`);
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
 *
 * A switcher is a simple fieldset with a "switch" icon in it's legend, which can
 * be used to hide or show fieldset content.
 */

function switcher(element) {
  return new Promise(resolve => {
    const switchers = $('legend.switcher', element);
    if (switchers.length > 0) {
      switchers.each((idx, elt) => {
        const legend = $(elt),
          fieldset = legend.parent('fieldset'),
          data = legend.data(),
          state = data.amsSwitcherState || data.amsState,
          minusClass = data.amsSwitcherMinusClass || data.amsMinusClass || 'minus',
          plusClass = data.amsSwitcherPlusClass || data.amsPlusClass || 'plus';
        if (!data.amsSwitcher) {
          const veto = {
            veto: false
          };
          legend.trigger('before-init.ams.switcher', [legend, data, veto]);
          if (veto.veto) {
            return;
          }
          $(`<i class="fa fa-${state === 'open' ? minusClass : plusClass} mr-2"></i>`).prependTo(legend);
          legend.on('click', evt => {
            evt.preventDefault();
            const veto = {};
            legend.trigger('before-switch.ams.switcher', [legend, veto]);
            if (veto.veto) {
              return;
            }
            if (fieldset.hasClass('switched')) {
              fieldset.removeClass('switched');
              MyAMS.core.switchIcon($('i', legend), plusClass, minusClass);
              legend.trigger('opened.ams.switcher', [legend]);
              const id = legend.attr('id');
              if (id) {
                $(`legend.switcher[data-ams-switcher-sync="${id}"]`, fieldset).each((idx, elt) => {
                  const switcher = $(elt);
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
          if (state !== 'open') {
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
 * TinyMCE HTML editor plug-in
 */

function tinymce(element) {
  return new Promise((resolve, reject) => {
    const editors = $('.tinymce', element);
    if (editors.length > 0) {
      MyAMS.require('ajax', 'i18n').then(() => {
        const baseURL = `${MyAMS.env.baseURL}../ext/tinymce${MyAMS.env.devmode ? '/dev' : ''}`;
        MyAMS.ajax.check(window.tinymce, `${baseURL}/tinymce${MyAMS.env.extext}.js`).then(firstLoad => {
          const deferred = [];
          if (firstLoad) {
            tinymce.baseURL = baseURL;
            tinymce.suffix = MyAMS.env.extext;
            deferred.push(MyAMS.core.getScript(`${baseURL}/jquery.tinymce.min.js`));
            deferred.push(MyAMS.core.getScript(`${baseURL}/themes/silver/theme${MyAMS.env.extext}.js`));
            // Prevent Bootstrap dialog from blocking focusin
            $(document).on('focusin', evt => {
              if ($(evt.target).closest(".tox-tinymce, .tox-tinymce-aux, " + ".moxman-window, .tam-assetmanager-root").length) {
                evt.stopImmediatePropagation();
              }
            });
            // Remove editor before cleaning content
            $(document).on('clear.ams.content', (evt, veto, element) => {
              $('.tinymce', element).each((idx, elt) => {
                const editorId = $(elt).attr('id'),
                  editor = window.tinymce.get(editorId);
                if (editor !== null) {
                  editor.remove();
                }
              });
            });
          }
          $.when.apply($, deferred).then(() => {
            editors.each((idx, elt) => {
              const editor = $(elt),
                data = editor.data(),
                defaultOptions = {
                  selector: `textarea#${editor.attr('id')}`,
                  base_url: baseURL,
                  theme: data.amsTinymceTheme || data.amsTheme || 'silver',
                  language: MyAMS.i18n.language,
                  menubar: data.amsTinymceMenubar !== false && data.amsMenubar !== false,
                  statusbar: data.amsTinymceStatusbar !== false && data.amsStatusbar !== false,
                  plugins: data.amsTinymcePlugins || data.amsPlugins || ["advlist autosave autolink lists link charmap print preview hr anchor pagebreak", "searchreplace wordcount visualblocks visualchars code fullscreen", "insertdatetime nonbreaking save table contextmenu directionality", "emoticons paste textcolor colorpicker textpattern autoresize"],
                  toolbar: data.amsTinymceToolbar || data.amsToolbar,
                  toolbar1: data.amsTinymceToolbar1 === false || data.amsToolbar1 === false ? false : data.amsTinymceToolbar1 || data.amsToolbar1 || "undo redo | pastetext | styleselect | bold italic | " + "alignleft aligncenter alignright alignjustify | " + "bullist numlist outdent indent",
                  toolbar2: data.amsTinymceToolbar2 === false || data.amsToolbar2 === false ? false : data.amsTinymceToolbar2 || data.amsToolbar2 || "forecolor backcolor emoticons | charmap link image media | " + "fullscreen preview print | code",
                  content_css: data.amsTinymceContentCss || data.amsContentCss,
                  formats: data.amsTinymceFormats || data.amsFormats,
                  style_formats: data.amsTinymceStyleFormats || data.amsStyleFormats,
                  block_formats: data.amsTinymceBlockFormats || data.amsBlockFormats,
                  valid_classes: data.amsTinymceValidClasses || data.amsValidClasses,
                  image_advtab: true,
                  image_list: MyAMS.core.getFunctionByName(data.amsTinymceImageList || data.amsImageList) || data.amsTinymceImageList || data.amsImageList,
                  image_class_list: data.amsTinymceImageClassList || data.amsImageClassList,
                  link_list: MyAMS.core.getFunctionByName(data.amsTinymceLinkList || data.amsLinkList) || data.amsTinymceLinkList || data.amsLinkList,
                  link_class_list: data.amsTinymceLinkClassList || data.amsLinkClassList,
                  paste_as_text: data.amsTinymcePasteAsText === undefined && data.amsPasteAsText === undefined ? true : data.amsTinymcePasteAsText || data.amsPasteAsText,
                  paste_auto_cleanup_on_paste: data.amsTinymcePasteAutoCleanup === undefined && data.amsPasteAutoCleanup === undefined ? true : data.amsTinymcePasteAutoCleanup || data.amsPasteAutoCleanup,
                  paste_strip_class_attributes: data.amsTinymcePasteStripClassAttributes || data.amsPasteStripClassAttributes || 'all',
                  paste_remove_spans: data.amsTinymcePasteRemoveSpans === undefined && data.amsPasteRemoveSpans === undefined ? true : data.amsTinymcePasteRemoveSpans || data.amsPasteRemoveSpans,
                  paste_remove_styles: data.amsTinymcePasteRemoveStyles === undefined || data.amsPasteRemoveStyles === undefined ? true : data.amsTinymcePasteRemoveStyles || data.amsPasteRemoveStyles,
                  height: data.amsTinymceHeight || data.amsHeight || 50,
                  min_height: 50,
                  resize: true,
                  autoresize_min_height: 50,
                  autoresize_max_height: 500
                };
              const plugins = data.amsTinymceExternalPlugins || data.amsExternalPlugins;
              if (plugins) {
                const names = plugins.split(/\s+/);
                for (const name of names) {
                  const src = editor.data(`ams-tinymce-plugin-${name}`) || editor.data(`ams-plugin-${name}`);
                  window.tinymce.PluginManager.load(name, MyAMS.core.getSource(src));
                }
              }
              let settings = $.extend({}, defaultOptions, data.amsTinymceOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsTinymceInitCallback || data.amsInit, document, editor, settings) || settings;
              const veto = {
                veto: false
              };
              editor.trigger('before-init.ams.tinymce', [editor, settings, veto]);
              if (veto.veto) {
                return;
              }
              setTimeout(() => {
                const plugin = editor.tinymce(settings);
                MyAMS.core.executeFunctionByName(data.amsTinymceAfterInitCallback || data.amsAfterInit, document, editor, plugin, settings);
                editor.trigger('after-init.ams.tinymce', [editor, settings]);
              }, 250);
            });
            resolve(editors);
          }, reject);
        }, reject);
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * Bootstrap treeview plug-in
 */

function treeview(element) {
  return new Promise((resolve, reject) => {
    const trees = $('.treeview', element);
    if (trees.length > 0) {
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.check($.fn.treview, `${MyAMS.env.baseURL}../ext/bootstrap-treeview${MyAMS.env.extext}.js`).then(firstLoad => {
          const required = [];
          if (firstLoad) {
            required.push(MyAMS.core.getCSS(`${MyAMS.env.baseURL}../../css/ext/bootstrap-treeview${MyAMS.env.extext}.css`, 'treeview'));
          }
          $.when.apply($, required).then(() => {
            trees.each((idx, elt) => {
              const treeview = $(elt),
                data = treeview.data(),
                dataOptions = {
                  data: data.amsTreeviewData,
                  levels: data.amsTreeviewLevels,
                  injectStyle: data.amsTreeviewInjectStyle,
                  expandIcon: data.amsTreeviewExpandIcon || 'far fa-fw fa-plus-square',
                  collapseIcon: data.amsTreeviewCollaspeIcon || 'far fa-fw fa-minus-square',
                  emptyIcon: data.amsTreeviewEmptyIcon,
                  nodeIcon: data.amsTreeviewNodeIcon,
                  selectedIcon: data.amsTreeviewSelectedIcon,
                  checkedIcon: data.amsTreeviewCheckedIcon || 'far fa-fw fa-check-square',
                  uncheckedIcon: data.amsTreeviewUncheckedIcon || 'far fa-fw fa-square',
                  color: data.amsTreeviewColor,
                  backColor: data.amsTreeviewBackColor,
                  borderColor: data.amsTreeviewBorderColor,
                  onHoverColor: data.amsTreeviewHoverColor,
                  selectedColor: data.amsTreeviewSelectedColor,
                  selectedBackColor: data.amsTreeviewSelectedBackColor,
                  unselectableColor: data.amsTreeviewUnselectableColor || 'rgba(1,1,1,0.25)',
                  unselectableBackColor: data.amsTreeviewUnselectableBackColor || 'rgba(1,1,1,0.25)',
                  enableLinks: data.amsTreeviewEnableLinks,
                  highlightSelected: data.amsTreeviewHighlightSelected,
                  highlightSearchResults: data.amsTreeviewhighlightSearchResults,
                  showBorder: data.amsTreeviewShowBorder,
                  showIcon: data.amsTreeviewShowIcon,
                  showCheckbox: data.amsTreeviewShowCheckbox,
                  showTags: data.amsTreeviewShowTags,
                  toggleUnselectable: data.amsTreeviewToggleUnselectable,
                  multiSelect: data.amsTreeviewMultiSelect,
                  onNodeChecked: MyAMS.core.getFunctionByName(data.amsTreeviewNodeChecked),
                  onNodeCollapsed: MyAMS.core.getFunctionByName(data.amsTreeviewNodeCollapsed),
                  onNodeDisabled: MyAMS.core.getFunctionByName(data.amsTreeviewNodeDisabled),
                  onNodeEnabled: MyAMS.core.getFunctionByName(data.amsTreeviewNodeEnabled),
                  onNodeExpanded: MyAMS.core.getFunctionByName(data.amsTreeviewNodeExpanded),
                  onNodeSelected: MyAMS.core.getFunctionByName(data.amsTreeviewNodeSelected),
                  onNodeUnchecked: MyAMS.core.getFunctionByName(data.amsTreeviewNodeUnchecked),
                  onNodeUnselected: MyAMS.core.getFunctionByName(data.amsTreeviewNodeUnselected),
                  onSearchComplete: MyAMS.core.getFunctionByName(data.amsTreeviewSearchComplete),
                  onSearchCleared: MyAMS.core.getFunctionByName(data.amsTreeviewSearchCleared)
                };
              let settings = $.extend({}, dataOptions, data.amsTreeviewOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsTreeviewInitcallback || data.amsInit, document, treeview, settings) || settings;
              const veto = {
                veto: false
              };
              treeview.trigger('before-init.ams.treeview', [treeview, settings, veto]);
              if (veto.veto) {
                return;
              }
              const plugin = treeview.treeview(settings);
              MyAMS.core.executeFunctionByName(data.amsTreeviewAfterInitCallback || data.amsAfterInit, document, treeview, plugin, settings);
              treeview.trigger('after-init.ams.treeview', [treeview, plugin]);
            });
            resolve(trees);
          }, reject);
        }, reject);
      }, reject);
    } else {
      resolve(null);
    }
  });
}

/**
 * Form validation plug-in
 */

function validate(element) {
  return new Promise((resolve, reject) => {
    const forms = $('form:not([novalidate])', element);
    if (forms.length > 0) {
      MyAMS.require('ajax', 'i18n').then(() => {
        MyAMS.ajax.check($.fn.validate, `${MyAMS.env.baseURL}../ext/validate/jquery-validate${MyAMS.env.extext}.js`).then(firstLoad => {
          if (firstLoad && MyAMS.i18n.language !== 'en') {
            MyAMS.core.getScript(`${MyAMS.env.baseURL}../ext/validate/i18n/messages_${MyAMS.i18n.language}${MyAMS.env.extext}.js`).then(() => {});
          }
          forms.each((idx, elt) => {
            const form = $(elt),
              data = form.data(),
              dataOptions = {
                ignore: null,
                invalidHandler: MyAMS.core.getFunctionByName(data.amsValidateInvalidHandler) || ((evt, validator) => {
                  // automatically display hidden fields with errors!
                  $('span.is-invalid', form).remove();
                  $('.is-invalid', form).removeClass('is-invalid');
                  for (const error of validator.errorList) {
                    const element = $(error.element),
                      panels = element.parents('.tab-pane'),
                      fieldsets = element.parents('fieldset.switched');
                    fieldsets.each((idx, elt) => {
                      $('legend.switcher', elt).click();
                    });
                    panels.each((idx, elt) => {
                      const panel = $(elt),
                        tabs = panel.parents('.tab-content').siblings('.nav-tabs');
                      $(`li:nth-child(${panel.index() + 1})`, tabs).addClass('is-invalid');
                      $('li.is-invalid:first a', tabs).click();
                    });
                  }
                }),
                errorElement: data.amsValidateErrorElement || 'span',
                errorClass: data.amsValidateErrorClass || 'is-invalid',
                errorPlacement: MyAMS.core.getFunctionByName(data.amsValidateErrorPlacement) || ((error, element) => {
                  error.addClass('invalid-feedback');
                  element.closest('.form-widget').append(error);
                }),
                submitHandler: MyAMS.core.getFunctionByName(data.amsValidateSubmitHandler) || (form.attr('data-async') !== undefined ? () => {
                  MyAMS.require('form').then(() => {
                    MyAMS.form.submit(form);
                  });
                } : () => {
                  form.get(0).submit();
                })
              };
            $('[data-ams-validate-rules]', form).each((idx, elt) => {
              if (idx === 0) {
                dataOptions.rules = {};
              }
              dataOptions.rules[$(elt).attr('name')] = $(elt).data('ams-validate-rules');
            });
            $('[data-ams-validate-messages]', form).each((idx, elt) => {
              if (idx === 0) {
                dataOptions.messages = {};
              }
              dataOptions.messages[$(elt).attr('name')] = $(elt).data('ams-validate-messages');
            });
            let settings = $.extend({}, dataOptions, data.amsValidateOptions || data.amsOptions);
            settings = MyAMS.core.executeFunctionByName(data.amsValidateInitCallback || data.amsInit, document, form, settings) || settings;
            const veto = {
              veto: false
            };
            form.trigger('before-init.ams.validate', [form, settings, veto]);
            if (veto.veto) {
              return;
            }
            const plugin = form.validate(settings);
            MyAMS.core.executeFunctionByName(data.amsValidateAfterInitCallback || data.amsAfterInit, document, form, plugin, settings);
            form.trigger('after-init.ams.validate', [form, plugin]);
          });
          resolve(forms);
        }, reject);
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
  MyAMS.registry.register(datetime, 'datetime');
  MyAMS.registry.register(dragdrop, 'dragdrop');
  MyAMS.registry.register(editor, 'editor');
  MyAMS.registry.register(fileInput, 'fileInput');
  MyAMS.registry.register(imgAreaSelect, 'imgAreaSelect');
  MyAMS.registry.register(select2, 'select2');
  MyAMS.registry.register(svgPlugin, 'svg');
  MyAMS.registry.register(switcher, 'switcher');
  MyAMS.registry.register(tinymce, 'tinymce');
  MyAMS.registry.register(treeview, 'treeview');
  MyAMS.registry.register(validate, 'validate');

  // register module
  MyAMS.config.modules.push('plugins');
  if (!MyAMS.env.bundle) {
    console.debug("MyAMS: plugins module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-skin.js":
/*!****************************!*\
  !*** ./src/js/mod-skin.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "skin": function() { return /* binding */ skin; }
/* harmony export */ });
var _this = undefined;
/* global MyAMS */
/**
 * MyAMS generic skin features
 */

const $ = MyAMS.$;
let _initialized = false;
const skin = {
  /**
   * Main *skin* module initialization
   */
  init: () => {
    if (_initialized) {
      return;
    }
    _initialized = true;

    // handle tooltips
    if (MyAMS.config.enableTooltips) {
      MyAMS.dom.root.tooltip({
        selector: '.hint',
        html: MyAMS.config.enableHtmlTooltips
      });
    }
    $('.hint').mousedown(evt => {
      $(evt.currentTarget).tooltip('hide');
    });
    $(document).on('clear.ams.content', () => {
      $('.tooltip').remove();
    });

    // check URL when hash is changed
    skin.checkURL();
    $(window).on('hashchange', skin.checkURL);
  },
  /**
   * Specific content initialization
   *
   * @param element: the element to initialize
   */
  initElement: element => {
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
  checkURL: () => {
    return new Promise((resolve, reject) => {
      const nav = MyAMS.dom.nav;
      let hash = location.hash,
        url = hash.replace(/^#/, ''),
        tag = null;
      const tagPosition = url.indexOf('!');
      if (tagPosition > 0) {
        hash = hash.substring(0, tagPosition + 1);
        tag = url.substring(tagPosition + 1);
        url = url.substring(0, tagPosition);
      }
      let menu;
      if (url) {
        // new hash
        let container = $('#content');
        if (!container.exists()) {
          container = MyAMS.dom.root;
        }
        menu = $(`a[href="${hash}"]`, nav);
        // load specified URL into '#content'
        MyAMS.skin.loadURL(url, container).then(() => {
          const prefix = $('html head title').data('ams-title-prefix'),
            fullPrefix = prefix ? `${prefix} > ` : '';
          document.title = `${fullPrefix}${$('[data-ams-page-title]:first', container).data('ams-page-title') || menu.attr('title') || menu.text().trim() || document.title}`;
          if (tag) {
            const anchor = $(`#${tag}`);
            if (anchor.exists()) {
              MyAMS.require('helpers').then(() => {
                MyAMS.helpers.scrollTo('#main', anchor, {
                  offset: -15
                });
              });
            }
          }
          // try to activate matching navigation menu
          if (menu.exists()) {
            MyAMS.require('nav').then(() => {
              MyAMS.nav.setActiveMenu(menu);
              MyAMS.nav.drawBreadcrumbs();
            }).then(resolve);
          } else {
            resolve();
          }
        }, reject);
      } else {
        // empty hash! We try to check if a specific menu was activated with a custom
        // data attribute, otherwise we go to the first navigation menu!
        const activeUrl = $('[data-ams-active-menu]').data('ams-active-menu');
        if (activeUrl) {
          menu = $(`a[href="${activeUrl}"]`, nav);
        } else {
          menu = $('ul li a[href!="#"]', nav).first();
        }
        if (menu.length > 0) {
          MyAMS.require('nav').then(() => {
            MyAMS.nav.setActiveMenu(menu);
            if (activeUrl) {
              MyAMS.nav.drawBreadcrumbs();
            } else {
              // we use location.replace to avoid storing intermediate URL
              // into browser's history
              window.location.replace(window.location.href + menu.attr('href'));
            }
          }).then(resolve, reject);
        } else {
          resolve();
        }
      }
    });
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
  loadURL: function (url, target) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return new Promise((resolve, reject) => {
      if (url.startsWith('#')) {
        url = url.substr(1);
      }
      target = $(target);
      MyAMS.core.executeFunctionByName(MyAMS.config.clearContent, document, target).then(status => {
        if (!status) {
          // applied veto!
          return;
        }
        const defaults = {
          type: 'GET',
          url: url,
          dataType: 'html',
          cache: false,
          beforeSend: () => {
            target.html(`<h1 class="loading"><i class="fa fa-cog fa-spin"></i> ${MyAMS.i18n.LOADING}</h1>`);
            if (options && options.preLoadCallback) {
              MyAMS.core.executeFunctionByName(options.preLoadCallback, _this, options.preLoadCallbackOptions);
            }
            if (target.attr('id') === 'content') {
              MyAMS.require('nav').then(() => {
                const prefix = $('html head title').data('ams-title-prefix'),
                  fullPrefix = prefix ? `${prefix} > ` : '';
                document.title = `${fullPrefix}${$('.breadcrumb li:last-child').text()}`;
                MyAMS.dom.root.animate({
                  scrollTop: 0
                }, 'fast');
              });
            }
          }
        };
        const settings = $.extend({}, defaults, options),
          veto = {
            veto: false
          };
        target.trigger('before-load.ams.content', [settings, veto]);
        if (veto.veto) {
          return;
        }
        $.ajax(settings).then((result, status, xhr) => {
          if ($.isArray(result)) {
            [result, status, xhr] = result;
          }
          MyAMS.require('ajax').then(() => {
            const response = MyAMS.ajax.getResponse(xhr);
            if (response) {
              const dataType = response.contentType,
                result = response.data;
              $('.loading', target).remove();
              switch (dataType) {
                case 'json':
                  MyAMS.ajax.handleJSON(result, target);
                  resolve(result, status, xhr);
                  break;
                case 'script':
                case 'xml':
                  resolve(result, status, xhr);
                  break;
                case 'html':
                case 'text':
                default:
                  target.parents('.hidden').removeClass('hidden');
                  MyAMS.core.executeFunctionByName(target.data('ams-clear-content') || MyAMS.config.clearContent, document, target).then(() => {
                    target.css({
                      opacity: '0.0'
                    }).html(result).removeClass('hidden').delay(30).animate({
                      opacity: '1.0'
                    }, 300);
                    MyAMS.core.executeFunctionByName(target.data('ams-init-content') || MyAMS.config.initContent, window, target).then(() => {
                      MyAMS.form && MyAMS.form.setFocus(target);
                      if (options && options.afterLoadCallback) {
                        MyAMS.core.executeFunctionByName(options.afterLoadCallback, _this, options.afterLoadCallbackOptions).then(() => {
                          target.trigger('after-load.ams.content');
                          resolve(result, status, xhr);
                        }, reject);
                      } else {
                        target.trigger('after-load.ams.content');
                        resolve(result, status, xhr);
                      }
                    }, reject);
                  }, reject);
              }
              MyAMS.stats && MyAMS.stats.logPageview();
            }
          });
        }, (xhr, status, error) => {
          target.html(`<h3 class="error"><i class="fa fa-exclamation-triangle text-danger"></i> 
								${MyAMS.i18n.ERROR} ${error}</h3>${xhr.responseText}`);
          reject(error);
        });
      });
    });
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('skin');
  } else {
    MyAMS.skin = skin;
    console.debug("MyAMS: skin module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-stats.js":
/*!*****************************!*\
  !*** ./src/js/mod-stats.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stats": function() { return /* binding */ stats; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS stats management
 */

const $ = MyAMS.$;
const stats = {
  logPageview: function () {},
  logEvent: function () {}
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('stats');
  } else {
    MyAMS.stats = stats;
    console.debug("MyAMS: stats module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-tree.js":
/*!****************************!*\
  !*** ./src/js/mod-tree.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tree": function() { return /* binding */ tree; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS tree management
 */

const $ = MyAMS.$;
const tree = {
  /**
   * Open/close tree node inside a table
   */
  switchTreeNode: evt => {
    const removeChildNodes = nodeId => {
      $(`tr[data-ams-tree-node-parent-id="${nodeId}"]`).each((idx, elt) => {
        const row = $(elt);
        removeChildNodes(row.data('ams-tree-node-id'));
        dtTable.row(row).remove().draw();
      });
    };
    const node = $(evt.currentTarget),
      switcher = $('.switcher', node),
      tr = node.parents('tr').first(),
      table = tr.parents('table').first(),
      dtTable = table.DataTable();
    node.tooltip('hide');
    if (switcher.hasClass('expanded')) {
      removeChildNodes(tr.data('ams-tree-node-id'));
      switcher.html('<i class="far fa-plus-square"></i>').removeClass('expanded');
    } else {
      const location = tr.data('ams-location') || table.data('ams-location') || '',
        treeNodesTarget = tr.data('ams-tree-nodes-target') || table.data('ams-tree-nodes-target') || 'get-tree-nodes.json',
        sourceName = tr.data('ams-element-name');
      switcher.html('<i class="fas fa-spinner fa-spin"></i>');
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.post(`${location}/${sourceName}/${treeNodesTarget}`, {
          can_sort: !$('td.sorter', tr).is(':empty')
        }).then(result => {
          if (result.length > 0) {
            let newRow;
            for (const row of result) {
              newRow = $(row);
              dtTable.row.add(newRow).draw();
              MyAMS.core.initContent(newRow).then();
            }
          }
          switcher.html('<i class="far fa-minus-square"></i>').addClass('expanded');
        });
      });
    }
  },
  /**
   * Open close all tree nodes
   */
  switchTree: evt => {
    const node = $(evt.currentTarget),
      switcher = $('.switcher', node),
      th = node.parents('th'),
      table = th.parents('table').first(),
      tableID = table.data('ams-tree-node-id'),
      dtTable = table.DataTable();
    node.tooltip('hide');
    if (switcher.hasClass('expanded')) {
      $('tr[data-ams-tree-node-parent-id]').filter(`tr[data-ams-tree-node-parent-id!="${tableID}"]`).each((idx, elt) => {
        dtTable.row(elt).remove().draw();
      });
      $('.switcher', table).each((idx, elt) => {
        $(elt).html('<i class="far fa-plus-square"></i>').removeClass('expanded');
      });
    } else {
      const location = table.data('ams-location') || '',
        target = table.data('ams-tree-nodes-target') || 'get-tree.json',
        tr = $('tbody tr', table.first());
      switcher.html('<i class="fas fa-spinner fa-spin"></i>');
      MyAMS.require('ajax').then(() => {
        MyAMS.ajax.post(`${location}/${target}`, {
          can_sort: !$('td.sorter', tr).is(':empty')
        }).then(result => {
          $(`tr[data-ams-tree-node-id]`, table).each((idx, elt) => {
            dtTable.row(elt).remove().draw();
          });
          $(result).each((idx, elt) => {
            const newRow = $(elt);
            dtTable.row.add(newRow).draw();
          });
          MyAMS.core.initContent(table).then();
          switcher.html('<i class="far fa-minus-square"></i>').addClass('expanded');
        });
      });
    }
  },
  /**
   * Custom tree element delete callback
   *
   * @param form: source form, which can be null if callback wasn't triggered from a form
   * @param options: callback options
   */
  deleteElement: (form, options) => {
    console.debug(options);
    const nodeId = options.node_id;
    if (nodeId) {
      $(`tr[data-ams-tree-node-parent-id="${nodeId}"]`).each((idx, elt) => {
        const table = $(elt).parents('table'),
          dtTable = table.DataTable();
        dtTable.row(elt).remove().draw();
      });
    }
  },
  /**
   * Sort and re-parent tree elements
   */
  sortTree: (evt, details) => {
    const table = $(evt.target),
      dtTable = table.DataTable(),
      data = $(table).data();
    let target = data.amsReorderUrl;
    if (target) {
      // Disable row click handler
      const row = $(data.amsReorderSource.node);
      row.data('ams-disabled-handlers', 'click');
      try {
        // Get root ID
        const tableID = row.parents('table').first().data('ams-tree-node-id');
        // Get moved row ID
        const rowID = row.data('ams-tree-node-id');
        const rowParentID = row.data('ams-tree-node-parent-id');
        // Get new parent ID
        const parent = row.prev('tr');
        let parentID, switcher, action;
        if (parent.exists()) {
          // Move below an existing row
          parentID = parent.data('ams-tree-node-id');
          // Check switcher state
          switcher = $('.switch', parent);
          if (switcher.hasClass('minus')) {
            // Opened folder: move as child
            if (rowParentID === parentID) {
              // Don't change parent
              action = 'reorder';
            } else {
              // Change parent
              action = 'reparent';
            }
          } else {
            // Closed folder or simple item: move as sibling
            parentID = parent.data('ams-tree-node-parent-id');
            if (rowParentID === parentID) {
              // Don't change parent
              action = 'reorder';
            } else {
              // Change parent
              action = 'reparent';
            }
          }
        } else {
          // Move to site root
          parentID = tableID;
          switcher = null;
          if (rowParentID === parentID) {
            // Already child of site root
            action = 'reorder';
          } else {
            // Move from inner folder to site root
            action = 'reparent';
          }
        }
        // Call ordering target
        const localTarget = MyAMS.core.getFunctionByName(target);
        const postData = {
          action: action,
          child: rowID,
          parent: parentID,
          order: JSON.stringify($('tr[data-ams-tree-node-id]').listattr('data-ams-tree-node-id')),
          can_sort: !$('td.sorter', row).is(':empty')
        };
        if (typeof localTarget === 'function') {
          localTarget.call(table, dtTable, postData);
        } else {
          if (!target.startsWith(window.location.protocol)) {
            const location = data.amsLocation;
            if (location) {
              target = `${location}/${target}`;
            }
          }
          MyAMS.require('ajax').then(() => {
            MyAMS.ajax.post(target, postData).then(result => {
              const removeRow = rowID => {
                const row = $(`tr[data-ams-tree-node-id="${rowID}"]`);
                dtTable.row(row).remove().draw();
              };
              const removeChildRows = rowID => {
                const childs = $(`tr[data-ams-tree-node-parent-id="${rowID}"]`);
                childs.each((idx, elt) => {
                  const childRow = $(elt),
                    childID = childRow.attr('data-ams-tree-node-id');
                  removeChildRows(childID);
                  dtTable.row(childRow).remove().draw();
                });
              };
              if (result.status) {
                MyAMS.ajax.handleJSON(result);
              } else {
                // Remove parent row if changed parent
                if (postData.action === 'reparent') {
                  removeRow(parentID);
                }
                // Remove moved row children
                removeChildRows(parentID);
                removeChildRows(rowID);
                dtTable.row(row).remove().draw();
                let newRow, oldRow;
                for (const resultRow of result) {
                  newRow = $(resultRow);
                  oldRow = $(`tr[id="${newRow.attr('id')}"]`);
                  dtTable.row(oldRow).remove().draw();
                  dtTable.row.add(newRow).draw();
                  MyAMS.core.initContent(newRow).then();
                }
              }
            });
          });
        }
      } finally {
        // Restore row click handler
        setTimeout(function () {
          $(row).removeData('ams-disabled-handlers');
        }, 50);
      }
    }
    return false;
  }
};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('tree');
  } else {
    MyAMS.tree = tree;
    console.debug("MyAMS: tree module loaded...");
  }
}

/***/ }),

/***/ "./src/js/mod-xmlrpc.js":
/*!******************************!*\
  !*** ./src/js/mod-xmlrpc.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "xmlrpc": function() { return /* binding */ xmlrpc; }
/* harmony export */ });
/* global MyAMS */
/**
 * MyAMS XML-RPC protocol support
 */

const $ = MyAMS.$;
const xmlrpc = {};

/**
 * Global module initialization
 */
if (window.MyAMS) {
  if (MyAMS.env.bundle) {
    MyAMS.config.modules.push('xmlrpc');
  } else {
    MyAMS.xmlrpc = xmlrpc;
    console.debug("MyAMS: xmlrpc module loaded...");
  }
}

/***/ }),

/***/ "./node_modules/jsrender/jsrender.js":
/*!*******************************************!*\
  !*** ./node_modules/jsrender/jsrender.js ***!
  \*******************************************/
/***/ (function(module) {

/*! JsRender v1.0.12: http://jsviews.com/#jsrender */
/*! **VERSION FOR WEB** (For NODE.JS see http://jsviews.com/download/jsrender-node.js) */
/*
 * Best-of-breed templating in browser or on Node.js.
 * Does not require jQuery, or HTML DOM
 * Integrates with JsViews (http://jsviews.com/#jsviews)
 *
 * Copyright 2021, Boris Moore
 * Released under the MIT License.
 */

//jshint -W018, -W041, -W120

(function(factory, global) {
	// global var is the this object, which is window when running in the usual browser environment
	var $ = global.jQuery;

	if (true) { // CommonJS e.g. Browserify
		module.exports = $
			? factory(global, $)
			: function($) { // If no global jQuery, take optional jQuery passed as parameter: require('jsrender')(jQuery)
				if ($ && !$.fn) {
					throw "Provide jQuery or null";
				}
				return factory(global, $);
			};
	} else {}
} (

// factory (for jsrender.js)
function(global, $) {
"use strict";

//========================== Top-level vars ==========================

// global var is the this object, which is window when running in the usual browser environment
var setGlobals = $ === false; // Only set globals if script block in browser (not AMD and not CommonJS)

$ = $ && $.fn ? $ : global.jQuery; // $ is jQuery passed in by CommonJS loader (Browserify), or global jQuery.

var versionNumber = "v1.0.12",
	jsvStoreName, rTag, rTmplString, topView, $views, $expando,
	_ocp = "_ocp",      // Observable contextual parameter

	$isFunction, $isArray, $templates, $converters, $helpers, $tags, $sub, $subSettings, $subSettingsAdvanced, $viewsSettings,
	delimOpenChar0, delimOpenChar1, delimCloseChar0, delimCloseChar1, linkChar, setting, baseOnError,

	isRenderCall,
	rNewLine = /[ \t]*(\r\n|\n|\r)/g,
	rUnescapeQuotes = /\\(['"\\])/g, // Unescape quotes and trim
	rEscapeQuotes = /['"\\]/g, // Escape quotes and \ character
	rBuildHash = /(?:\x08|^)(onerror:)?(?:(~?)(([\w$.]+):)?([^\x08]+))\x08(,)?([^\x08]+)/gi,
	rTestElseIf = /^if\s/,
	rFirstElem = /<(\w+)[>\s]/,
	rAttrEncode = /[\x00`><"'&=]/g, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
	rIsHtml = /[\x00`><\"'&=]/,
	rHasHandlers = /^on[A-Z]|^convert(Back)?$/,
	rWrappedInViewMarker = /^\#\d+_`[\s\S]*\/\d+_`$/,
	rHtmlEncode = rAttrEncode,
	rDataEncode = /[&<>]/g,
	rDataUnencode = /&(amp|gt|lt);/g,
	rBracketQuote = /\[['"]?|['"]?\]/g,
	viewId = 0,
	charEntities = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\x00": "&#0;",
		"'": "&#39;",
		'"': "&#34;",
		"`": "&#96;",
		"=": "&#61;"
	},
	charsFromEntities = {
		amp: "&",
		gt: ">",
		lt: "<"
	},
	HTML = "html",
	STRING = "string",
	OBJECT = "object",
	tmplAttr = "data-jsv-tmpl",
	jsvTmpl = "jsvTmpl",
	indexStr = "For #index in nested block use #getIndex().",
	cpFnStore = {},     // Compiled furnctions for computed values in template expressions (properties, methods, helpers)
	$render = {},

	jsr = global.jsrender,
	jsrToJq = jsr && $ && !$.render, // JsRender already loaded, without jQuery. but we will re-load it now to attach to jQuery

	jsvStores = {
		template: {
			compile: compileTmpl
		},
		tag: {
			compile: compileTag
		},
		viewModel: {
			compile: compileViewModel
		},
		helper: {},
		converter: {}
	};

	// views object ($.views if jQuery is loaded, jsrender.views if no jQuery, e.g. in Node.js)
	$views = {
		jsviews: versionNumber,
		sub: {
			// subscription, e.g. JsViews integration
			rPath: /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
			//        not                               object     helper    view  viewProperty pathTokens      leafToken

			rPrm: /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(?:(\()\s*)?\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
			//   lftPrn0           lftPrn         bound     path               operator     err                                          eq      path2 late            prn      comma  lftPrn2          apos quot        rtPrn  rtPrnDot                  prn2     space

			View: View,
			Err: JsViewsError,
			tmplFn: tmplFn,
			parse: parseParams,
			extend: $extend,
			extendCtx: extendCtx,
			syntaxErr: syntaxError,
			onStore: {
				template: function(name, item) {
					if (item === null) {
						delete $render[name];
					} else if (name) {
						$render[name] = item;
					}
				}
			},
			addSetting: addSetting,
			settings: {
				allowCode: false
			},
			advSet: noop, // Update advanced settings
			_thp: tagHandlersFromProps,
			_gm: getMethod,
			_tg: function() {}, // Constructor for tagDef
			_cnvt: convertVal,
			_tag: renderTag,
			_er: error,
			_err: onRenderError,
			_cp: retVal, // Get observable contextual parameters (or properties) ~foo=expr. In JsRender, simply returns val.
			_sq: function(token) {
				if (token === "constructor") {
					syntaxError("");
				}
				return token;
			}
		},
		settings: {
			delimiters: $viewsDelimiters,
			advanced: function(value) {
				return value
					? (
							$extend($subSettingsAdvanced, value),
							$sub.advSet(),
							$viewsSettings
						)
						: $subSettingsAdvanced;
				}
		},
		map: dataMap // If jsObservable loaded first, use that definition of dataMap
	};

function getDerivedMethod(baseMethod, method) {
	return function() {
		var ret,
			tag = this,
			prevBase = tag.base;

		tag.base = baseMethod; // Within method call, calling this.base will call the base method
		ret = method.apply(tag, arguments); // Call the method
		tag.base = prevBase; // Replace this.base to be the base method of the previous call, for chained calls
		return ret;
	};
}

function getMethod(baseMethod, method) {
	// For derived methods (or handlers declared declaratively as in {{:foo onChange=~fooChanged}} replace by a derived method, to allow using this.base(...)
	// or this.baseApply(arguments) to call the base implementation. (Equivalent to this._super(...) and this._superApply(arguments) in jQuery UI)
	if ($isFunction(method)) {
		method = getDerivedMethod(
				!baseMethod
					? noop // no base method implementation, so use noop as base method
					: baseMethod._d
						? baseMethod // baseMethod is a derived method, so use it
						: getDerivedMethod(noop, baseMethod), // baseMethod is not derived so make its base method be the noop method
				method
			);
		method._d = (baseMethod && baseMethod._d || 0) + 1; // Add flag for derived method (incremented for derived of derived...)
	}
	return method;
}

function tagHandlersFromProps(tag, tagCtx) {
	var prop,
		props = tagCtx.props;
	for (prop in props) {
		if (rHasHandlers.test(prop) && !(tag[prop] && tag[prop].fix)) { // Don't override handlers with fix expando (used in datepicker and spinner)
			tag[prop] = prop !== "convert" ? getMethod(tag.constructor.prototype[prop], props[prop]) : props[prop];
			// Copy over the onFoo props, convert and convertBack from tagCtx.props to tag (overrides values in tagDef).
			// Note: unsupported scenario: if handlers are dynamically added ^onFoo=expression this will work, but dynamically removing will not work.
		}
	}
}

function retVal(val) {
	return val;
}

function noop() {
	return "";
}

function dbgBreak(val) {
	// Usage examples: {{dbg:...}}, {{:~dbg(...)}}, {{dbg .../}}, {^{for ... onAfterLink=~dbg}} etc.
	try {
		console.log("JsRender dbg breakpoint: " + val);
		throw "dbg breakpoint"; // To break here, stop on caught exceptions.
	}
	catch (e) {}
	return this.base ? this.baseApply(arguments) : val;
}

function JsViewsError(message) {
	// Error exception type for JsViews/JsRender
	// Override of $.views.sub.Error is possible
	this.name = ($.link ? "JsViews" : "JsRender") + " Error";
	this.message = message || this.name;
}

function $extend(target, source) {
	if (target) {
		for (var name in source) {
			target[name] = source[name];
		}
		return target;
	}
}

(JsViewsError.prototype = new Error()).constructor = JsViewsError;

//========================== Top-level functions ==========================

//===================
// views.delimiters
//===================

	/**
	* Set the tag opening and closing delimiters and 'link' character. Default is "{{", "}}" and "^"
	* openChars, closeChars: opening and closing strings, each with two characters
	* $.views.settings.delimiters(...)
	*
	* @param {string}   openChars
	* @param {string}   [closeChars]
	* @param {string}   [link]
	* @returns {Settings}
	*
	* Get delimiters
	* delimsArray = $.views.settings.delimiters()
	*
	* @returns {string[]}
	*/
function $viewsDelimiters(openChars, closeChars, link) {
	if (!openChars) {
		return $subSettings.delimiters;
	}
	if ($isArray(openChars)) {
		return $viewsDelimiters.apply($views, openChars);
	}
	linkChar = link ? link[0] : linkChar;
	if (!/^(\W|_){5}$/.test(openChars + closeChars + linkChar)) {
		error("Invalid delimiters"); // Must be non-word characters, and openChars and closeChars must each be length 2
	}
	delimOpenChar0 = openChars[0];
	delimOpenChar1 = openChars[1];
	delimCloseChar0 = closeChars[0];
	delimCloseChar1 = closeChars[1];

	$subSettings.delimiters = [delimOpenChar0 + delimOpenChar1, delimCloseChar0 + delimCloseChar1, linkChar];

	// Escape the characters - since they could be regex special characters
	openChars = "\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1; // Default is "{^{"
	closeChars = "\\" + delimCloseChar0 + "\\" + delimCloseChar1;                   // Default is "}}"
	// Build regex with new delimiters
	//          [tag    (followed by / space or })  or cvtr+colon or html or code] followed by space+params then convertBack?
	rTag = "(?:(\\w+(?=[\\/\\s\\" + delimCloseChar0 + "]))|(\\w+)?(:)|(>)|(\\*))\\s*((?:[^\\"
		+ delimCloseChar0 + "]|\\" + delimCloseChar0 + "(?!\\" + delimCloseChar1 + "))*?)";

	// Make rTag available to JsViews (or other components) for parsing binding expressions
	$sub.rTag = "(?:" + rTag + ")";
	//                        { ^? {   tag+params slash?  or closingTag                                                   or comment
	rTag = new RegExp("(?:" + openChars + rTag + "(\\/)?|\\" + delimOpenChar0 + "(\\" + linkChar + ")?\\" + delimOpenChar1 + "(?:(?:\\/(\\w+))\\s*|!--[\\s\\S]*?--))" + closeChars, "g");

	// Default:  bind     tagName         cvt   cln html code    params            slash   bind2         closeBlk  comment
	//      /(?:{(\^)?{(?:(\w+(?=[\/\s}]))|(\w+)?(:)|(>)|(\*))\s*((?:[^}]|}(?!}))*?)(\/)?|{(\^)?{(?:(?:\/(\w+))\s*|!--[\s\S]*?--))}}

	$sub.rTmpl = new RegExp("^\\s|\\s$|<.*>|([^\\\\]|^)[{}]|" + openChars + ".*" + closeChars);
	// $sub.rTmpl looks for initial or final white space, html tags or { or } char not preceded by \\, or JsRender tags {{xxx}}.
	// Each of these strings are considered NOT to be jQuery selectors
	return $viewsSettings;
}

//=========
// View.get
//=========

function getView(inner, type) { //view.get(inner, type)
	if (!type && inner !== true) {
		// view.get(type)
		type = inner;
		inner = undefined;
	}

	var views, i, l, found,
		view = this,
		root = type === "root";
		// view.get("root") returns view.root, view.get() returns view.parent, view.get(true) returns view.views[0].

	if (inner) {
		// Go through views - this one, and all nested ones, depth-first - and return first one with given type.
		// If type is undefined, i.e. view.get(true), return first child view.
		found = type && view.type === type && view;
		if (!found) {
			views = view.views;
			if (view._.useKey) {
				for (i in views) {
					if (found = type ? views[i].get(inner, type) : views[i]) {
						break;
					}
				}
			} else {
				for (i = 0, l = views.length; !found && i < l; i++) {
					found = type ? views[i].get(inner, type) : views[i];
				}
			}
		}
	} else if (root) {
		// Find root view. (view whose parent is top view)
		found = view.root;
	} else if (type) {
		while (view && !found) {
			// Go through views - this one, and all parent ones - and return first one with given type.
			found = view.type === type ? view : undefined;
			view = view.parent;
		}
	} else {
		found = view.parent;
	}
	return found || undefined;
}

function getNestedIndex() {
	var view = this.get("item");
	return view ? view.index : undefined;
}

getNestedIndex.depends = function() {
	return [this.get("item"), "index"];
};

function getIndex() {
	return this.index;
}

getIndex.depends = "index";

//==================
// View.ctxPrm, etc.
//==================

/* Internal private: view._getOb() */
function getPathObject(ob, path, ltOb, fn) {
	// Iterate through path to late paths: @a.b.c paths
	// Return "" (or noop if leaf is a function @a.b.c(...) ) if intermediate object not yet available
	var prevOb, tokens, l,
		i = 0;
	if (ltOb === 1) {
		fn = 1;
		ltOb = undefined;
	}
	// Paths like ^a^b^c or ~^a^b^c will not throw if an object in path is undefined.
	if (path) {
		tokens = path.split(".");
		l = tokens.length;

		for (; ob && i < l; i++) {
			prevOb = ob;
			ob = tokens[i] ? ob[tokens[i]] : ob;
		}
	}
	if (ltOb) {
		ltOb.lt = ltOb.lt || i<l; // If i < l there was an object in the path not yet available
	}
	return ob === undefined
		? fn ? noop : ""
		: fn ? function() {
			return ob.apply(prevOb, arguments);
		} : ob;
}

function contextParameter(key, value, get) {
	// Helper method called as view.ctxPrm(key) for helpers or template parameters ~foo - from compiled template or from context callback
	var wrapped, deps, res, obsCtxPrm, tagElse, callView, newRes,
		storeView = this,
		isUpdate = !isRenderCall && arguments.length > 1,
		store = storeView.ctx;
	if (key) {
		if (!storeView._) { // tagCtx.ctxPrm() call
			tagElse = storeView.index;
			storeView = storeView.tag;
		}
		callView = storeView;
		if (store && store.hasOwnProperty(key) || (store = $helpers).hasOwnProperty(key)) {
			res = store[key];
			if (key === "tag" || key === "tagCtx" || key === "root" || key === "parentTags") {
				return res;
			}
		} else {
			store = undefined;
		}
		if (!isRenderCall && storeView.tagCtx || storeView.linked) { // Data-linked view, or tag instance
			if (!res || !res._cxp) {
				// Not a contextual parameter
				// Set storeView to tag (if this is a tag.ctxPrm() call) or to root view ("data" view of linked template)
				storeView = storeView.tagCtx || $isFunction(res)
					? storeView // Is a tag, not a view, or is a computed contextual parameter, so scope to the callView, no the 'scope view'
					: (storeView = storeView.scope || storeView,
						!storeView.isTop && storeView.ctx.tag // If this view is in a tag, set storeView to the tag
							|| storeView);
				if (res !== undefined && storeView.tagCtx) {
					// If storeView is a tag, but the contextual parameter has been set at at higher level (e.g. helpers)...
					storeView = storeView.tagCtx.view.scope; // then move storeView to the outer level (scope of tag container view)
				}
				store = storeView._ocps;
				res = store && store.hasOwnProperty(key) && store[key] || res;
				if (!(res && res._cxp) && (get || isUpdate)) {
					// Create observable contextual parameter
					(store || (storeView._ocps = storeView._ocps || {}))[key]
						= res
						= [{
							_ocp: res, // The observable contextual parameter value
							_vw: callView,
							_key: key
						}];
					res._cxp = {
						path: _ocp,
						ind: 0,
						updateValue: function(val, path) {
							$.observable(res[0]).setProperty(_ocp, val); // Set the value (res[0]._ocp)
							return this;
						}
					};
				}
			}
			if (obsCtxPrm = res && res._cxp) {
				// If this helper resource is an observable contextual parameter
				if (arguments.length > 2) {
					deps = res[1] ? $sub._ceo(res[1].deps) : [_ocp]; // fn deps (with any exprObs cloned using $sub._ceo)
					deps.unshift(res[0]); // view
					deps._cxp = obsCtxPrm;
					// In a context callback for a contextual param, we set get = true, to get ctxPrm [view, dependencies...] array - needed for observe call
					return deps;
				}
				tagElse = obsCtxPrm.tagElse;
				newRes = res[1] // linkFn for compiled expression
					? obsCtxPrm.tag && obsCtxPrm.tag.cvtArgs
						? obsCtxPrm.tag.cvtArgs(tagElse, 1)[obsCtxPrm.ind] // = tag.bndArgs() - for tag contextual parameter
						: res[1](res[0].data, res[0], $sub) // = fn(data, view, $sub) for compiled binding expression
					: res[0]._ocp; // Observable contextual parameter (uninitialized, or initialized as static expression, so no path dependencies)
				if (isUpdate) {
					$sub._ucp(key, value, storeView, obsCtxPrm); // Update observable contextual parameter
					return storeView;
				}
				res = newRes;
			}
		}
		if (res && $isFunction(res)) {
			// If a helper is of type function we will wrap it, so if called with no this pointer it will be called with the
			// view as 'this' context. If the helper ~foo() was in a data-link expression, the view will have a 'temporary' linkCtx property too.
			// Note that helper functions on deeper paths will have specific this pointers, from the preceding path.
			// For example, ~util.foo() will have the ~util object as 'this' pointer
			wrapped = function() {
				return res.apply((!this || this === global) ? callView : this, arguments);
			};
			$extend(wrapped, res); // Attach same expandos (if any) to the wrapped function
		}
		return wrapped || res;
	}
}

/* Internal private: view._getTmpl() */
function getTemplate(tmpl) {
	return tmpl && (tmpl.fn
		? tmpl
		: this.getRsc("templates", tmpl) || $templates(tmpl)); // not yet compiled
}

//==============
// views._cnvt
//==============

function convertVal(converter, view, tagCtx, onError) {
	// Called from compiled template code for {{:}}
	// self is template object or linkCtx object
	var tag, linkCtx, value, argsLen, bindTo,
		// If tagCtx is an integer, then it is the key for the compiled function to return the boundTag tagCtx
		boundTag = typeof tagCtx === "number" && view.tmpl.bnds[tagCtx-1];

	if (onError === undefined && boundTag && boundTag._lr) { // lateRender
		onError = "";
	}
	if (onError !== undefined) {
		tagCtx = onError = {props: {}, args: [onError]};
	} else if (boundTag) {
		tagCtx = boundTag(view.data, view, $sub);
	}
	boundTag = boundTag._bd && boundTag;
	if (converter || boundTag) {
		linkCtx = view._lc; // For data-link="{cvt:...}"... See onDataLinkedTagChange
		tag = linkCtx && linkCtx.tag;
		tagCtx.view = view;
		if (!tag) {
			tag = $extend(new $sub._tg(), {
				_: {
					bnd: boundTag,
					unlinked: true,
					lt: tagCtx.lt // If a late path @some.path has not returned @some object, mark tag as late
				},
				inline: !linkCtx,
				tagName: ":",
				convert: converter,
				onArrayChange: true,
				flow: true,
				tagCtx: tagCtx,
				tagCtxs: [tagCtx],
				_is: "tag"
			});
			argsLen = tagCtx.args.length;
			if (argsLen>1) {
				bindTo = tag.bindTo = [];
				while (argsLen--) {
					bindTo.unshift(argsLen); // Bind to all the arguments - generate bindTo array: [0,1,2...]
				}
			}
			if (linkCtx) {
				linkCtx.tag = tag;
				tag.linkCtx = linkCtx;
			}
			tagCtx.ctx = extendCtx(tagCtx.ctx, (linkCtx ? linkCtx.view : view).ctx);
			tagHandlersFromProps(tag, tagCtx);
		}
		tag._er = onError && value;
		tag.ctx = tagCtx.ctx || tag.ctx || {};
		tagCtx.ctx = undefined;
		value = tag.cvtArgs()[0]; // If there is a convertBack but no convert, converter will be "true"
		tag._er = onError && value;
	} else {
		value = tagCtx.args[0];
	}

	// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
	value = boundTag && view._.onRender
		? view._.onRender(value, view, tag)
		: value;
	return value != undefined ? value : "";
}

function convertArgs(tagElse, bound) { // tag.cvtArgs() or tag.cvtArgs(tagElse?, true?)
	var l, key, boundArgs, args, bindFrom, tag, converter,
		tagCtx = this;

	if (tagCtx.tagName) {
		tag = tagCtx;
		tagCtx = (tag.tagCtxs || [tagCtx])[tagElse||0];
		if (!tagCtx) {
			return;
		}
	} else {
		tag = tagCtx.tag;
	}

	bindFrom = tag.bindFrom;
	args = tagCtx.args;

	if ((converter = tag.convert) && typeof converter === STRING) {
		converter = converter === "true"
			? undefined
			: (tagCtx.view.getRsc("converters", converter) || error("Unknown converter: '" + converter + "'"));
	}

	if (converter && !bound) { // If there is a converter, use a copy of the tagCtx.args array for rendering, and replace the args[0] in
		args = args.slice(); // the copied array with the converted value. But we do not modify the value of tag.tagCtx.args[0] (the original args array)
	}
	if (bindFrom) { // Get the values of the boundArgs
		boundArgs = [];
		l = bindFrom.length;
		while (l--) {
			key = bindFrom[l];
			boundArgs.unshift(argOrProp(tagCtx, key));
		}
		if (bound) {
			args = boundArgs; // Call to bndArgs() - returns the boundArgs
		}
	}
	if (converter) {
		converter = converter.apply(tag, boundArgs || args);
		if (converter === undefined) {
			return args; // Returning undefined from a converter is equivalent to not having a converter.
		}
		bindFrom = bindFrom || [0];
		l = bindFrom.length;
		if (!$isArray(converter) || (converter.arg0 !== false && (l === 1 || converter.length !== l || converter.arg0))) {
			converter = [converter]; // Returning converter as first arg, even if converter value is an array
			bindFrom = [0];
			l = 1;
		}
		if (bound) {        // Call to bndArgs() - so apply converter to all boundArgs
			args = converter; // The array of values returned from the converter
		} else {            // Call to cvtArgs()
			while (l--) {
				key = bindFrom[l];
				if (+key === key) {
					args[key] = converter[l];
				}
			}
		}
	}
	return args;
}

function argOrProp(context, key) {
	context = context[+key === key ? "args" : "props"];
	return context && context[key];
}

function convertBoundArgs(tagElse) { // tag.bndArgs()
	return this.cvtArgs(tagElse, 1);
}

//=============
// views.tag
//=============

/* view.getRsc() */
function getResource(resourceType, itemName) {
	var res, store,
		view = this;
	if (typeof itemName === STRING) {
		while ((res === undefined) && view) {
			store = view.tmpl && view.tmpl[resourceType];
			res = store && store[itemName];
			view = view.parent;
		}
		return res || $views[resourceType][itemName];
	}
}

function renderTag(tagName, parentView, tmpl, tagCtxs, isUpdate, onError) {
	function bindToOrBindFrom(type) {
		var bindArray = tag[type];

		if (bindArray !== undefined) {
			bindArray = $isArray(bindArray) ? bindArray : [bindArray];
			m = bindArray.length;
			while (m--) {
				key = bindArray[m];
				if (!isNaN(parseInt(key))) {
					bindArray[m] = parseInt(key); // Convert "0" to 0, etc.
				}
			}
		}

		return bindArray || [0];
	}

	parentView = parentView || topView;
	var tag, tagDef, template, tags, attr, parentTag, l, m, n, itemRet, tagCtx, tagCtxCtx, ctxPrm, bindTo, bindFrom, initVal,
		content, callInit, mapDef, thisMap, args, bdArgs, props, tagDataMap, contentCtx, key, bindFromLength, bindToLength, linkedElement, defaultCtx,
		i = 0,
		ret = "",
		linkCtx = parentView._lc || false, // For data-link="{myTag...}"... See onDataLinkedTagChange
		ctx = parentView.ctx,
		parentTmpl = tmpl || parentView.tmpl,
		// If tagCtxs is an integer, then it is the key for the compiled function to return the boundTag tagCtxs
		boundTag = typeof tagCtxs === "number" && parentView.tmpl.bnds[tagCtxs-1];

	if (tagName._is === "tag") {
		tag = tagName;
		tagName = tag.tagName;
		tagCtxs = tag.tagCtxs;
		template = tag.template;
	} else {
		tagDef = parentView.getRsc("tags", tagName) || error("Unknown tag: {{" + tagName + "}} ");
		template = tagDef.template;
	}
	if (onError === undefined && boundTag && (boundTag._lr = (tagDef.lateRender && boundTag._lr!== false || boundTag._lr))) {
		onError = ""; // If lateRender, set temporary onError, to skip initial rendering (and render just "")
	}
	if (onError !== undefined) {
		ret += onError;
		tagCtxs = onError = [{props: {}, args: [], params: {props:{}}}];
	} else if (boundTag) {
		tagCtxs = boundTag(parentView.data, parentView, $sub);
	}

	l = tagCtxs.length;
	for (; i < l; i++) {
		tagCtx = tagCtxs[i];
		content = tagCtx.tmpl;
		if (!linkCtx || !linkCtx.tag || i && !linkCtx.tag.inline || tag._er || content && +content===content) {
			// Initialize tagCtx
			// For block tags, tagCtx.tmpl is an integer > 0
			if (content && parentTmpl.tmpls) {
				tagCtx.tmpl = tagCtx.content = parentTmpl.tmpls[content - 1]; // Set the tmpl property to the content of the block tag
			}
			tagCtx.index = i;
			tagCtx.ctxPrm = contextParameter;
			tagCtx.render = renderContent;
			tagCtx.cvtArgs = convertArgs;
			tagCtx.bndArgs = convertBoundArgs;
			tagCtx.view = parentView;
			tagCtx.ctx = extendCtx(extendCtx(tagCtx.ctx, tagDef && tagDef.ctx), ctx); // Clone and extend parentView.ctx
		}
		if (tmpl = tagCtx.props.tmpl) {
			// If the tmpl property is overridden, set the value (when initializing, or, in case of binding: ^tmpl=..., when updating)
			tagCtx.tmpl = parentView._getTmpl(tmpl);
			tagCtx.content = tagCtx.content || tagCtx.tmpl;
		}

		if (!tag) {
			// This will only be hit for initial tagCtx (not for {{else}}) - if the tag instance does not exist yet
			// If the tag has not already been instantiated, we will create a new instance.
			// ~tag will access the tag, even within the rendering of the template content of this tag.
			// From child/descendant tags, can access using ~tag.parent, or ~parentTags.tagName
			tag = new tagDef._ctr();
			callInit = !!tag.init;

			tag.parent = parentTag = ctx && ctx.tag;
			tag.tagCtxs = tagCtxs;

			if (linkCtx) {
				tag.inline = false;
				linkCtx.tag = tag;
			}
			tag.linkCtx = linkCtx;
			if (tag._.bnd = boundTag || linkCtx.fn) {
				// Bound if {^{tag...}} or data-link="{tag...}"
				tag._.ths = tagCtx.params.props["this"]; // Tag has a this=expr binding, to get javascript reference to tag instance
				tag._.lt = tagCtxs.lt; // If a late path @some.path has not returned @some object, mark tag as late
				tag._.arrVws = {};
			} else if (tag.dataBoundOnly) {
				error(tagName + " must be data-bound:\n{^{" + tagName + "}}");
			}
			//TODO better perf for childTags() - keep child tag.tags array, (and remove child, when disposed)
			// tag.tags = [];
		} else if (linkCtx && linkCtx.fn._lr) {
			callInit = !!tag.init;
		}
		tagDataMap = tag.dataMap;

		tagCtx.tag = tag;
		if (tagDataMap && tagCtxs) {
			tagCtx.map = tagCtxs[i].map; // Copy over the compiled map instance from the previous tagCtxs to the refreshed ones
		}
		if (!tag.flow) {
			tagCtxCtx = tagCtx.ctx = tagCtx.ctx || {};

			// tags hash: tag.ctx.tags, merged with parentView.ctx.tags,
			tags = tag.parents = tagCtxCtx.parentTags = ctx && extendCtx(tagCtxCtx.parentTags, ctx.parentTags) || {};
			if (parentTag) {
				tags[parentTag.tagName] = parentTag;
				//TODO better perf for childTags: parentTag.tags.push(tag);
			}
			tags[tag.tagName] = tagCtxCtx.tag = tag;
			tagCtxCtx.tagCtx = tagCtx;
		}
	}
	if (!(tag._er = onError)) {
		tagHandlersFromProps(tag, tagCtxs[0]);
		tag.rendering = {rndr: tag.rendering}; // Provide object for state during render calls to tag and elses. (Used by {{if}} and {{for}}...)
		for (i = 0; i < l; i++) { // Iterate tagCtx for each {{else}} block
			tagCtx = tag.tagCtx = tagCtxs[i];
			props = tagCtx.props;
			tag.ctx = tagCtx.ctx;

			if (!i) {
				if (callInit) {
					tag.init(tagCtx, linkCtx, tag.ctx);
					callInit = undefined;
				}
				if (!tagCtx.args.length && tagCtx.argDefault !== false && tag.argDefault !== false) {
					tagCtx.args = args = [tagCtx.view.data]; // Missing first arg defaults to the current data context
					tagCtx.params.args = ["#data"];
				}

				bindTo = bindToOrBindFrom("bindTo");

				if (tag.bindTo !== undefined) {
					tag.bindTo = bindTo;
				}

				if (tag.bindFrom !== undefined) {
					tag.bindFrom = bindToOrBindFrom("bindFrom");
				} else if (tag.bindTo) {
					tag.bindFrom = tag.bindTo = bindTo;
				}
				bindFrom = tag.bindFrom || bindTo;

				bindToLength = bindTo.length;
				bindFromLength = bindFrom.length;

				if (tag._.bnd && (linkedElement = tag.linkedElement)) {
					tag.linkedElement = linkedElement = $isArray(linkedElement) ? linkedElement: [linkedElement];

					if (bindToLength !== linkedElement.length) {
						error("linkedElement not same length as bindTo");
					}
				}
				if (linkedElement = tag.linkedCtxParam) {
					tag.linkedCtxParam = linkedElement = $isArray(linkedElement) ? linkedElement: [linkedElement];

					if (bindFromLength !== linkedElement.length) {
						error("linkedCtxParam not same length as bindFrom/bindTo");
					}
				}

				if (bindFrom) {
					tag._.fromIndex = {}; // Hash of bindFrom index which has same path value as bindTo index. fromIndex = tag._.fromIndex[toIndex]
					tag._.toIndex = {}; // Hash of bindFrom index which has same path value as bindTo index. fromIndex = tag._.fromIndex[toIndex]
					n = bindFromLength;
					while (n--) {
						key = bindFrom[n];
						m = bindToLength;
						while (m--) {
							if (key === bindTo[m]) {
								tag._.fromIndex[m] = n;
								tag._.toIndex[n] = m;
							}
						}
					}
				}

				if (linkCtx) {
					// Set attr on linkCtx to ensure outputting to the correct target attribute.
					// Setting either linkCtx.attr or this.attr in the init() allows per-instance choice of target attrib.
					linkCtx.attr = tag.attr = linkCtx.attr || tag.attr || linkCtx._dfAt;
				}
				attr = tag.attr;
				tag._.noVws = attr && attr !== HTML;
			}
			args = tag.cvtArgs(i);
			if (tag.linkedCtxParam) {
				bdArgs = tag.cvtArgs(i, 1);
				m = bindFromLength;
				defaultCtx = tag.constructor.prototype.ctx;
				while (m--) {
					if (ctxPrm = tag.linkedCtxParam[m]) {
						key = bindFrom[m];
						initVal = bdArgs[m];
						// Create tag contextual parameter
						tagCtx.ctx[ctxPrm] = $sub._cp(
							defaultCtx && initVal === undefined ? defaultCtx[ctxPrm]: initVal,
							initVal !== undefined && argOrProp(tagCtx.params, key),
							tagCtx.view,
							tag._.bnd && {tag: tag, cvt: tag.convert, ind: m, tagElse: i}
						);
					}
				}
			}
			if ((mapDef = props.dataMap || tagDataMap) && (args.length || props.dataMap)) {
				thisMap = tagCtx.map;
				if (!thisMap || thisMap.src !== args[0] || isUpdate) {
					if (thisMap && thisMap.src) {
						thisMap.unmap(); // only called if observable map - not when only used in JsRender, e.g. by {{props}}
					}
					mapDef.map(args[0], tagCtx, thisMap, !tag._.bnd);
					thisMap = tagCtx.map;
				}
				args = [thisMap.tgt];
			}

			itemRet = undefined;
			if (tag.render) {
				itemRet = tag.render.apply(tag, args);
				if (parentView.linked && itemRet && !rWrappedInViewMarker.test(itemRet)) {
					// When a tag renders content from the render method, with data linking then we need to wrap with view markers, if absent,
					// to provide a contentView for the tag, which will correctly dispose bindings if deleted. The 'tmpl' for this view will
					// be a dumbed-down template which will always return the itemRet string (no matter what the data is). The itemRet string
					// is not compiled as template markup, so can include "{{" or "}}" without triggering syntax errors
					tmpl = { // 'Dumbed-down' template which always renders 'static' itemRet string
						links: []
					};
					tmpl.render = tmpl.fn = function() {
						return itemRet;
					};
					itemRet = renderWithViews(tmpl, parentView.data, undefined, true, parentView, undefined, undefined, tag);
				}
			}
			if (!args.length) {
				args = [parentView]; // no arguments - (e.g. {{else}}) get data context from view.
			}
			if (itemRet === undefined) {
				contentCtx = args[0]; // Default data context for wrapped block content is the first argument
				if (tag.contentCtx) { // Set tag.contentCtx to true, to inherit parent context, or to a function to provide alternate context.
					contentCtx = tag.contentCtx === true ? parentView : tag.contentCtx(contentCtx);
				}
				itemRet = tagCtx.render(contentCtx, true) || (isUpdate ? undefined : "");
			}
			ret = ret
				? ret + (itemRet || "")
				: itemRet !== undefined
					? "" + itemRet
					: undefined; // If no return value from render, and no template/content tagCtx.render(...), return undefined
		}
		tag.rendering = tag.rendering.rndr; // Remove tag.rendering object (if this is outermost render call. (In case of nested calls)
	}
	tag.tagCtx = tagCtxs[0];
	tag.ctx = tag.tagCtx.ctx;

	if (tag._.noVws && tag.inline) {
		// inline tag with attr set to "text" will insert HTML-encoded content - as if it was element-based innerText
		ret = attr === "text"
			? $converters.html(ret)
			: "";
	}
	return boundTag && parentView._.onRender
		// Call onRender (used by JsViews if present, to add binding annotations around rendered content)
		? parentView._.onRender(ret, parentView, tag)
		: ret;
}

//=================
// View constructor
//=================

function View(context, type, parentView, data, template, key, onRender, contentTmpl) {
	// Constructor for view object in view hierarchy. (Augmented by JsViews if JsViews is loaded)
	var views, parentView_, tag, self_,
		self = this,
		isArray = type === "array";
		// If the data is an array, this is an 'array view' with a views array for each child 'item view'
		// If the data is not an array, this is an 'item view' with a views 'hash' object for any child nested views

	self.content = contentTmpl;
	self.views = isArray ? [] : {};
	self.data = data;
	self.tmpl = template;
	self_ = self._ = {
		key: 0,
		// ._.useKey is non zero if is not an 'array view' (owning a data array). Use this as next key for adding to child views hash
		useKey: isArray ? 0 : 1,
		id: "" + viewId++,
		onRender: onRender,
		bnds: {}
	};
	self.linked = !!onRender;
	self.type = type || "top";
	if (type) {
		self.cache = {_ct: $subSettings._cchCt}; // Used for caching results of computed properties and helpers (view.getCache)
	}

	if (!parentView || parentView.type === "top") {
		(self.ctx = context || {}).root = self.data;
	}

	if (self.parent = parentView) {
		self.root = parentView.root || self; // view whose parent is top view
		views = parentView.views;
		parentView_ = parentView._;
		self.isTop = parentView_.scp; // Is top content view of a link("#container", ...) call
		self.scope = (!context.tag || context.tag === parentView.ctx.tag) && !self.isTop && parentView.scope || self;
		// Scope for contextParams - closest non flow tag ancestor or root view
		if (parentView_.useKey) {
			// Parent is not an 'array view'. Add this view to its views object
			// self._key = is the key in the parent view hash
			views[self_.key = "_" + parentView_.useKey++] = self;
			self.index = indexStr;
			self.getIndex = getNestedIndex;
		} else if (views.length === (self_.key = self.index = key)) { // Parent is an 'array view'. Add this view to its views array
			views.push(self); // Adding to end of views array. (Using push when possible - better perf than splice)
		} else {
			views.splice(key, 0, self); // Inserting in views array
		}
		// If no context was passed in, use parent context
		// If context was passed in, it should have been merged already with parent context
		self.ctx = context || parentView.ctx;
	} else if (type) {
		self.root = self; // view whose parent is top view
	}
}

View.prototype = {
	get: getView,
	getIndex: getIndex,
	ctxPrm: contextParameter,
	getRsc: getResource,
	_getTmpl: getTemplate,
	_getOb: getPathObject,
	getCache: function(key) { // Get cached value of computed value
		if ($subSettings._cchCt > this.cache._ct) {
			this.cache = {_ct: $subSettings._cchCt};
		}
		return this.cache[key] !== undefined ? this.cache[key] : (this.cache[key] = cpFnStore[key](this.data, this, $sub));
	},
	_is: "view"
};

//====================================================
// Registration
//====================================================

function compileChildResources(parentTmpl) {
	var storeName, storeNames, resources;
	for (storeName in jsvStores) {
		storeNames = storeName + "s";
		if (parentTmpl[storeNames]) {
			resources = parentTmpl[storeNames];        // Resources not yet compiled
			parentTmpl[storeNames] = {};               // Remove uncompiled resources
			$views[storeNames](resources, parentTmpl); // Add back in the compiled resources
		}
	}
}

//===============
// compileTag
//===============

function compileTag(name, tagDef, parentTmpl) {
	var tmpl, baseTag, prop,
		compiledDef = new $sub._tg();

	function Tag() {
		var tag = this;
		tag._ = {
			unlinked: true
		};
		tag.inline = true;
		tag.tagName = name;
	}

	if ($isFunction(tagDef)) {
		// Simple tag declared as function. No presenter instantation.
		tagDef = {
			depends: tagDef.depends,
			render: tagDef
		};
	} else if (typeof tagDef === STRING) {
		tagDef = {template: tagDef};
	}

	if (baseTag = tagDef.baseTag) {
		tagDef.flow = !!tagDef.flow; // Set flow property, so defaults to false even if baseTag has flow=true
		baseTag = typeof baseTag === STRING
			? (parentTmpl && parentTmpl.tags[baseTag] || $tags[baseTag])
			: baseTag;
		if (!baseTag) {
			error('baseTag: "' + tagDef.baseTag + '" not found');
		}
		compiledDef = $extend(compiledDef, baseTag);

		for (prop in tagDef) {
			compiledDef[prop] = getMethod(baseTag[prop], tagDef[prop]);
		}
	} else {
		compiledDef = $extend(compiledDef, tagDef);
	}

	// Tag declared as object, used as the prototype for tag instantiation (control/presenter)
	if ((tmpl = compiledDef.template) !== undefined) {
		compiledDef.template = typeof tmpl === STRING ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
	}
	(Tag.prototype = compiledDef).constructor = compiledDef._ctr = Tag;

	if (parentTmpl) {
		compiledDef._parentTmpl = parentTmpl;
	}
	return compiledDef;
}

function baseApply(args) {
	// In derived method (or handler declared declaratively as in {{:foo onChange=~fooChanged}} can call base method,
	// using this.baseApply(arguments) (Equivalent to this._superApply(arguments) in jQuery UI)
	return this.base.apply(this, args);
}

//===============
// compileTmpl
//===============

function compileTmpl(name, tmpl, parentTmpl, options) {
	// tmpl is either a template object, a selector for a template script block, or the name of a compiled template

	//==== nested functions ====
	function lookupTemplate(value) {
		// If value is of type string - treat as selector, or name of compiled template
		// Return the template object, if already compiled, or the markup string
		var currentName, tmpl;
		if ((typeof value === STRING) || value.nodeType > 0 && (elem = value)) {
			if (!elem) {
				if (/^\.?\/[^\\:*?"<>]*$/.test(value)) {
					// value="./some/file.html" (or "/some/file.html")
					// If the template is not named, use "./some/file.html" as name.
					if (tmpl = $templates[name = name || value]) {
						value = tmpl;
					} else {
						// BROWSER-SPECIFIC CODE (not on Node.js):
						// Look for server-generated script block with id "./some/file.html"
						elem = document.getElementById(value);
					}
				} else if (value.charAt(0) === "#") {
					elem = document.getElementById(value.slice(1));
				} else if ($.fn && !$sub.rTmpl.test(value)) {
					try {
						elem = $(value, document)[0]; // if jQuery is loaded, test for selector returning elements, and get first element
					} catch (e) {}
				}// END BROWSER-SPECIFIC CODE
			} //BROWSER-SPECIFIC CODE
			if (elem) {
				if (elem.tagName !== "SCRIPT") {
					error(value + ": Use script block, not " + elem.tagName);
				}
				if (options) {
					// We will compile a new template using the markup in the script element
					value = elem.innerHTML;
				} else {
					// We will cache a single copy of the compiled template, and associate it with the name
					// (renaming from a previous name if there was one).
					currentName = elem.getAttribute(tmplAttr);
					if (currentName) {
						if (currentName !== jsvTmpl) {
							value = $templates[currentName];
							delete $templates[currentName];
						} else if ($.fn) {
							value = $.data(elem)[jsvTmpl]; // Get cached compiled template
						}
					}
					if (!currentName || !value) { // Not yet compiled, or cached version lost
						name = name || ($.fn ? jsvTmpl : value);
						value = compileTmpl(name, elem.innerHTML, parentTmpl, options);
					}
					value.tmplName = name = name || currentName;
					if (name !== jsvTmpl) {
						$templates[name] = value;
					}
					elem.setAttribute(tmplAttr, name);
					if ($.fn) {
						$.data(elem, jsvTmpl, value);
					}
				}
			} // END BROWSER-SPECIFIC CODE
			elem = undefined;
		} else if (!value.fn) {
			value = undefined;
			// If value is not a string. HTML element, or compiled template, return undefined
		}
		return value;
	}

	var elem, compiledTmpl,
		tmplOrMarkup = tmpl = tmpl || "";
	$sub._html = $converters.html;

	//==== Compile the template ====
	if (options === 0) {
		options = undefined;
		tmplOrMarkup = lookupTemplate(tmplOrMarkup); // Top-level compile so do a template lookup
	}

	// If options, then this was already compiled from a (script) element template declaration.
	// If not, then if tmpl is a template object, use it for options
	options = options || (tmpl.markup
		? tmpl.bnds
			? $extend({}, tmpl)
			: tmpl
		: {}
	);

	options.tmplName = options.tmplName || name || "unnamed";
	if (parentTmpl) {
		options._parentTmpl = parentTmpl;
	}
	// If tmpl is not a markup string or a selector string, then it must be a template object
	// In that case, get it from the markup property of the object
	if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = lookupTemplate(tmpl.markup)) && tmplOrMarkup.fn) {
		// If the string references a compiled template object, need to recompile to merge any modified options
		tmplOrMarkup = tmplOrMarkup.markup;
	}
	if (tmplOrMarkup !== undefined) {
		if (tmplOrMarkup.render || tmpl.render) {
			// tmpl is already compiled, so use it
			if (tmplOrMarkup.tmpls) {
				compiledTmpl = tmplOrMarkup;
			}
		} else {
			// tmplOrMarkup is a markup string, not a compiled template
			// Create template object
			tmpl = tmplObject(tmplOrMarkup, options);
			// Compile to AST and then to compiled function
			tmplFn(tmplOrMarkup.replace(rEscapeQuotes, "\\$&"), tmpl);
		}
		if (!compiledTmpl) {
			compiledTmpl = $extend(function() {
				return compiledTmpl.render.apply(compiledTmpl, arguments);
			}, tmpl);

			compileChildResources(compiledTmpl);
		}
		return compiledTmpl;
	}
}

//==== /end of function compileTmpl ====

//=================
// compileViewModel
//=================

function getDefaultVal(defaultVal, data) {
	return $isFunction(defaultVal)
		? defaultVal.call(data)
		: defaultVal;
}

function addParentRef(ob, ref, parent) {
	Object.defineProperty(ob, ref, {
		value: parent,
		configurable: true
	});
}

function compileViewModel(name, type) {
	var i, constructor, parent,
		viewModels = this,
		getters = type.getters,
		extend = type.extend,
		id = type.id,
		proto = $.extend({
			_is: name || "unnamed",
			unmap: unmap,
			merge: merge
		}, extend),
		args = "",
		cnstr = "",
		getterCount = getters ? getters.length : 0,
		$observable = $.observable,
		getterNames = {};

	function JsvVm(args) {
		constructor.apply(this, args);
	}

	function vm() {
		return new JsvVm(arguments);
	}

	function iterate(data, action) {
		var getterType, defaultVal, prop, ob, parentRef,
			j = 0;
		for (; j < getterCount; j++) {
			prop = getters[j];
			getterType = undefined;
			if (typeof prop !== STRING) {
				getterType = prop;
				prop = getterType.getter;
				parentRef = getterType.parentRef;
			}
			if ((ob = data[prop]) === undefined && getterType && (defaultVal = getterType.defaultVal) !== undefined) {
				ob = getDefaultVal(defaultVal, data);
			}
			action(ob, getterType && viewModels[getterType.type], prop, parentRef);
		}
	}

	function map(data) {
		data = typeof data === STRING
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array
		var l, prop, childOb, parentRef,
			j = 0,
			ob = data,
			arr = [];

		if ($isArray(data)) {
			data = data || [];
			l = data.length;
			for (; j<l; j++) {
				arr.push(this.map(data[j]));
			}
			arr._is = name;
			arr.unmap = unmap;
			arr.merge = merge;
			return arr;
		}

		if (data) {
			iterate(data, function(ob, viewModel) {
				if (viewModel) { // Iterate to build getters arg array (value, or mapped value)
					ob = viewModel.map(ob);
				}
				arr.push(ob);
			});
			ob = this.apply(this, arr); // Instantiate this View Model, passing getters args array to constructor
			j = getterCount;
			while (j--) {
				childOb = arr[j];
				parentRef = getters[j].parentRef;
				if (parentRef && childOb && childOb.unmap) {
					if ($isArray(childOb)) {
						l = childOb.length;
						while (l--) {
							addParentRef(childOb[l], parentRef, ob);
						}
					} else {
						addParentRef(childOb, parentRef, ob);
					}
				}
			}
			for (prop in data) { // Copy over any other properties. that are not get/set properties
				if (prop !== $expando && !getterNames[prop]) {
					ob[prop] = data[prop];
				}
			}
		}
		return ob;
	}

	function merge(data, parent, parentRef) {
		data = typeof data === STRING
			? JSON.parse(data) // Accept JSON string
			: data;            // or object/array

		var j, l, m, prop, mod, found, assigned, ob, newModArr, childOb,
			k = 0,
			model = this;

		if ($isArray(model)) {
			assigned = {};
			newModArr = [];
			l = data.length;
			m = model.length;
			for (; k<l; k++) {
				ob = data[k];
				found = false;
				for (j=0; j<m && !found; j++) {
					if (assigned[j]) {
						continue;
					}
					mod = model[j];

					if (id) {
						assigned[j] = found = typeof id === STRING
						? (ob[id] && (getterNames[id] ? mod[id]() : mod[id]) === ob[id])
						: id(mod, ob);
					}
				}
				if (found) {
					mod.merge(ob);
					newModArr.push(mod);
				} else {
					newModArr.push(childOb = vm.map(ob));
					if (parentRef) {
						addParentRef(childOb, parentRef, parent);
					}
				}
			}
			if ($observable) {
				$observable(model).refresh(newModArr, true);
			} else {
				model.splice.apply(model, [0, model.length].concat(newModArr));
			}
			return;
		}
		iterate(data, function(ob, viewModel, getter, parentRef) {
			if (viewModel) {
				model[getter]().merge(ob, model, parentRef); // Update typed property
			} else if (model[getter]() !== ob) {
				model[getter](ob); // Update non-typed property
			}
		});
		for (prop in data) {
			if (prop !== $expando && !getterNames[prop]) {
				model[prop] = data[prop];
			}
		}
	}

	function unmap() {
		var ob, prop, getterType, arr, value,
			k = 0,
			model = this;

		function unmapArray(modelArr) {
			var arr = [],
				i = 0,
				l = modelArr.length;
			for (; i<l; i++) {
				arr.push(modelArr[i].unmap());
			}
			return arr;
		}

		if ($isArray(model)) {
			return unmapArray(model);
		}
		ob = {};
		for (; k < getterCount; k++) {
			prop = getters[k];
			getterType = undefined;
			if (typeof prop !== STRING) {
				getterType = prop;
				prop = getterType.getter;
			}
			value = model[prop]();
			ob[prop] = getterType && value && viewModels[getterType.type]
				? $isArray(value)
					? unmapArray(value)
					: value.unmap()
				: value;
		}
		for (prop in model) {
			if (model.hasOwnProperty(prop) && (prop.charAt(0) !== "_" || !getterNames[prop.slice(1)]) && prop !== $expando && !$isFunction(model[prop])) {
				ob[prop] = model[prop];
			}
		}
		return ob;
	}

	JsvVm.prototype = proto;

	for (i=0; i < getterCount; i++) {
		(function(getter) {
			getter = getter.getter || getter;
			getterNames[getter] = i+1;
			var privField = "_" + getter;

			args += (args ? "," : "") + getter;
			cnstr += "this." + privField + " = " + getter + ";\n";
			proto[getter] = proto[getter] || function(val) {
				if (!arguments.length) {
					return this[privField]; // If there is no argument, use as a getter
				}
				if ($observable) {
					$observable(this).setProperty(getter, val);
				} else {
					this[privField] = val;
				}
			};

			if ($observable) {
				proto[getter].set = proto[getter].set || function(val) {
					this[privField] = val; // Setter called by observable property change
				};
			}
		})(getters[i]);
	}

	// Constructor for new viewModel instance.
	cnstr = new Function(args, cnstr);

	constructor = function() {
		cnstr.apply(this, arguments);
		// Pass additional parentRef str and parent obj to have a parentRef pointer on instance
		if (parent = arguments[getterCount + 1]) {
			addParentRef(this, arguments[getterCount], parent);
		}
	};

	constructor.prototype = proto;
	proto.constructor = constructor;

	vm.map = map;
	vm.getters = getters;
	vm.extend = extend;
	vm.id = id;
	return vm;
}

function tmplObject(markup, options) {
	// Template object constructor
	var htmlTag,
		wrapMap = $subSettingsAdvanced._wm || {}, // Only used in JsViews. Otherwise empty: {}
		tmpl = {
			tmpls: [],
			links: {}, // Compiled functions for link expressions
			bnds: [],
			_is: "template",
			render: renderContent
		};

	if (options) {
		tmpl = $extend(tmpl, options);
	}

	tmpl.markup = markup;
	if (!tmpl.htmlTag) {
		// Set tmpl.tag to the top-level HTML tag used in the template, if any...
		htmlTag = rFirstElem.exec(markup);
		tmpl.htmlTag = htmlTag ? htmlTag[1].toLowerCase() : "";
	}
	htmlTag = wrapMap[tmpl.htmlTag];
	if (htmlTag && htmlTag !== wrapMap.div) {
		// When using JsViews, we trim templates which are inserted into HTML contexts where text nodes are not rendered (i.e. not 'Phrasing Content').
		// Currently not trimmed for <li> tag. (Not worth adding perf cost)
		tmpl.markup = $.trim(tmpl.markup);
	}

	return tmpl;
}

//==============
// registerStore
//==============

/**
* Internal. Register a store type (used for template, tags, helpers, converters)
*/
function registerStore(storeName, storeSettings) {

/**
* Generic store() function to register item, named item, or hash of items
* Also used as hash to store the registered items
* Used as implementation of $.templates(), $.views.templates(), $.views.tags(), $.views.helpers() and $.views.converters()
*
* @param {string|hash} name         name - or selector, in case of $.templates(). Or hash of items
* @param {any}         [item]       (e.g. markup for named template)
* @param {template}    [parentTmpl] For item being registered as private resource of template
* @returns {any|$.views} item, e.g. compiled template - or $.views in case of registering hash of items
*/
	function theStore(name, item, parentTmpl) {
		// The store is also the function used to add items to the store. e.g. $.templates, or $.views.tags

		// For store of name 'thing', Call as:
		//    $.views.things(items[, parentTmpl]),
		// or $.views.things(name[, item, parentTmpl])

		var compile, itemName, thisStore, cnt,
			onStore = $sub.onStore[storeName];

		if (name && typeof name === OBJECT && !name.nodeType && !name.markup && !name.getTgt && !(storeName === "viewModel" && name.getters || name.extend)) {
			// Call to $.views.things(items[, parentTmpl]),

			// Adding items to the store
			// If name is a hash, then item is parentTmpl. Iterate over hash and call store for key.
			for (itemName in name) {
				theStore(itemName, name[itemName], item);
			}
			return item || $views;
		}
		// Adding a single unnamed item to the store
		if (name &&  typeof name !== STRING) { // name must be a string
			parentTmpl = item;
			item = name;
			name = undefined;
		}
		thisStore = parentTmpl
			? storeName === "viewModel"
				? parentTmpl
				: (parentTmpl[storeNames] = parentTmpl[storeNames] || {})
			: theStore;
		compile = storeSettings.compile;

		if (item === undefined) {
			item = compile ? name : thisStore[name];
			name = undefined;
		}
		if (item === null) {
			// If item is null, delete this entry
			if (name) {
				delete thisStore[name];
			}
		} else {
			if (compile) {
				item = compile.call(thisStore, name, item, parentTmpl, 0) || {};
				item._is = storeName; // Only do this for compiled objects (tags, templates...)
			}
			if (name) {
				thisStore[name] = item;
			}
		}
		if (onStore) {
			// e.g. JsViews integration
			onStore(name, item, parentTmpl, compile);
		}
		return item;
	}

	var storeNames = storeName + "s";
	$views[storeNames] = theStore;
}

/**
* Add settings such as:
* $.views.settings.allowCode(true)
* @param {boolean} value
* @returns {Settings}
*
* allowCode = $.views.settings.allowCode()
* @returns {boolean}
*/
function addSetting(st) {
	$viewsSettings[st] = $viewsSettings[st] || function(value) {
		return arguments.length
			? ($subSettings[st] = value, $viewsSettings)
			: $subSettings[st];
	};
}

//========================
// dataMap for render only
//========================

function dataMap(mapDef) {
	function Map(source, options) {
		this.tgt = mapDef.getTgt(source, options);
		options.map = this;
	}

	if ($isFunction(mapDef)) {
		// Simple map declared as function
		mapDef = {
			getTgt: mapDef
		};
	}

	if (mapDef.baseMap) {
		mapDef = $extend($extend({}, mapDef.baseMap), mapDef);
	}

	mapDef.map = function(source, options) {
		return new Map(source, options);
	};
	return mapDef;
}

//==============
// renderContent
//==============

/** Render the template as a string, using the specified data and helpers/context
* $("#tmpl").render(), tmpl.render(), tagCtx.render(), $.render.namedTmpl()
*
* @param {any}        data
* @param {hash}       [context]           helpers or context
* @param {boolean}    [noIteration]
* @param {View}       [parentView]        internal
* @param {string}     [key]               internal
* @param {function}   [onRender]          internal
* @returns {string}   rendered template   internal
*/
function renderContent(data, context, noIteration, parentView, key, onRender) {
	var i, l, tag, tmpl, tagCtx, isTopRenderCall, prevData, prevIndex,
		view = parentView,
		result = "";

	if (context === true) {
		noIteration = context; // passing boolean as second param - noIteration
		context = undefined;
	} else if (typeof context !== OBJECT) {
		context = undefined; // context must be a boolean (noIteration) or a plain object
	}

	if (tag = this.tag) {
		// This is a call from renderTag or tagCtx.render(...)
		tagCtx = this;
		view = view || tagCtx.view;
		tmpl = view._getTmpl(tag.template || tagCtx.tmpl);
		if (!arguments.length) {
			data = tag.contentCtx && $isFunction(tag.contentCtx)
				? data = tag.contentCtx(data)
				: view; // Default data context for wrapped block content is the first argument
		}
	} else {
		// This is a template.render(...) call
		tmpl = this;
	}

	if (tmpl) {
		if (!parentView && data && data._is === "view") {
			view = data; // When passing in a view to render or link (and not passing in a parent view) use the passed-in view as parentView
		}

		if (view && data === view) {
			// Inherit the data from the parent view.
			data = view.data;
		}

		isTopRenderCall = !view;
		isRenderCall = isRenderCall || isTopRenderCall;
		if (isTopRenderCall) {
			(context = context || {}).root = data; // Provide ~root as shortcut to top-level data.
		}
		if (!isRenderCall || $subSettingsAdvanced.useViews || tmpl.useViews || view && view !== topView) {
			result = renderWithViews(tmpl, data, context, noIteration, view, key, onRender, tag);
		} else {
			if (view) { // In a block
				prevData = view.data;
				prevIndex = view.index;
				view.index = indexStr;
			} else {
				view = topView;
				prevData = view.data;
				view.data = data;
				view.ctx = context;
			}
			if ($isArray(data) && !noIteration) {
				// Create a view for the array, whose child views correspond to each data item. (Note: if key and parentView are passed in
				// along with parent view, treat as insert -e.g. from view.addViews - so parentView is already the view item for array)
				for (i = 0, l = data.length; i < l; i++) {
					view.index = i;
					view.data = data[i];
					result += tmpl.fn(data[i], view, $sub);
				}
			} else {
				view.data = data;
				result += tmpl.fn(data, view, $sub);
			}
			view.data = prevData;
			view.index = prevIndex;
		}
		if (isTopRenderCall) {
			isRenderCall = undefined;
		}
	}
	return result;
}

function renderWithViews(tmpl, data, context, noIteration, view, key, onRender, tag) {
	// Render template against data as a tree of subviews (nested rendered template instances), or as a string (top-level template).
	// If the data is the parent view, treat as noIteration, re-render with the same data context.
	// tmpl can be a string (e.g. rendered by a tag.render() method), or a compiled template.
	var i, l, newView, childView, itemResult, swapContent, contentTmpl, outerOnRender, tmplName, itemVar, newCtx, tagCtx, noLinking,
		result = "";

	if (tag) {
		// This is a call from renderTag or tagCtx.render(...)
		tmplName = tag.tagName;
		tagCtx = tag.tagCtx;
		context = context ? extendCtx(context, tag.ctx) : tag.ctx;

		if (tmpl === view.content) { // {{xxx tmpl=#content}}
			contentTmpl = tmpl !== view.ctx._wrp // We are rendering the #content
				? view.ctx._wrp // #content was the tagCtx.props.tmpl wrapper of the block content - so within this view, #content will now be the view.ctx._wrp block content
				: undefined; // #content was the view.ctx._wrp block content - so within this view, there is no longer any #content to wrap.
		} else if (tmpl !== tagCtx.content) {
			if (tmpl === tag.template) { // Rendering {{tag}} tag.template, replacing block content.
				contentTmpl = tagCtx.tmpl; // Set #content to block content (or wrapped block content if tagCtx.props.tmpl is set)
				context._wrp = tagCtx.content; // Pass wrapped block content to nested views
			} else { // Rendering tagCtx.props.tmpl wrapper
				contentTmpl = tagCtx.content || view.content; // Set #content to wrapped block content
			}
		} else {
			contentTmpl = view.content; // Nested views inherit same wrapped #content property
		}

		if (tagCtx.props.link === false) {
			// link=false setting on block tag
			// We will override inherited value of link by the explicit setting link=false taken from props
			// The child views of an unlinked view are also unlinked. So setting child back to true will not have any effect.
			context = context || {};
			context.link = false;
		}
	}

	if (view) {
		onRender = onRender || view._.onRender;
		noLinking = context && context.link === false;

		if (noLinking && view._.nl) {
			onRender = undefined;
		}

		context = extendCtx(context, view.ctx);
		tagCtx = !tag && view.tag
			? view.tag.tagCtxs[view.tagElse]
			: tagCtx;
	}

	if (itemVar = tagCtx && tagCtx.props.itemVar) {
		if (itemVar[0] !== "~") {
			syntaxError("Use itemVar='~myItem'");
		}
		itemVar = itemVar.slice(1);
	}

	if (key === true) {
		swapContent = true;
		key = 0;
	}

	// If link===false, do not call onRender, so no data-linking marker nodes
	if (onRender && tag && tag._.noVws) {
		onRender = undefined;
	}
	outerOnRender = onRender;
	if (onRender === true) {
		// Used by view.refresh(). Don't create a new wrapper view.
		outerOnRender = undefined;
		onRender = view._.onRender;
	}
	// Set additional context on views created here, (as modified context inherited from the parent, and to be inherited by child views)
	context = tmpl.helpers
		? extendCtx(tmpl.helpers, context)
		: context;

	newCtx = context;
	if ($isArray(data) && !noIteration) {
		// Create a view for the array, whose child views correspond to each data item. (Note: if key and view are passed in
		// along with parent view, treat as insert -e.g. from view.addViews - so view is already the view item for array)
		newView = swapContent
			? view
			: (key !== undefined && view)
				|| new View(context, "array", view, data, tmpl, key, onRender, contentTmpl);
		newView._.nl= noLinking;
		if (view && view._.useKey) {
			// Parent is not an 'array view'
			newView._.bnd = !tag || tag._.bnd && tag; // For array views that are data bound for collection change events, set the
			// view._.bnd property to true for top-level link() or data-link="{for}", or to the tag instance for a data-bound tag, e.g. {^{for ...}}
			newView.tag = tag;
		}
		for (i = 0, l = data.length; i < l; i++) {
			// Create a view for each data item.
			childView = new View(newCtx, "item", newView, data[i], tmpl, (key || 0) + i, onRender, newView.content);
			if (itemVar) {
				(childView.ctx = $extend({}, newCtx))[itemVar] = $sub._cp(data[i], "#data", childView);
			}
			itemResult = tmpl.fn(data[i], childView, $sub);
			result += newView._.onRender ? newView._.onRender(itemResult, childView) : itemResult;
		}
	} else {
		// Create a view for singleton data object. The type of the view will be the tag name, e.g. "if" or "mytag" except for
		// "item", "array" and "data" views. A "data" view is from programmatic render(object) against a 'singleton'.
		newView = swapContent ? view : new View(newCtx, tmplName || "data", view, data, tmpl, key, onRender, contentTmpl);

		if (itemVar) {
			(newView.ctx = $extend({}, newCtx))[itemVar] = $sub._cp(data, "#data", newView);
		}

		newView.tag = tag;
		newView._.nl = noLinking;
		result += tmpl.fn(data, newView, $sub);
	}
	if (tag) {
		newView.tagElse = tagCtx.index;
		tagCtx.contentView = newView;
	}
	return outerOnRender ? outerOnRender(result, newView) : result;
}

//===========================
// Build and compile template
//===========================

// Generate a reusable function that will serve to render a template against data
// (Compile AST then build template function)

function onRenderError(e, view, fallback) {
	var message = fallback !== undefined
		? $isFunction(fallback)
			? fallback.call(view.data, e, view)
			: fallback || ""
		: "{Error: " + (e.message||e) + "}";

	if ($subSettings.onError && (fallback = $subSettings.onError.call(view.data, e, fallback && message, view)) !== undefined) {
		message = fallback; // There is a settings.debugMode(handler) onError override. Call it, and use return value (if any) to replace message
	}
	return view && !view._lc ? $converters.html(message) : message; // For data-link=\"{... onError=...}"... See onDataLinkedTagChange
}

function error(message) {
	throw new $sub.Err(message);
}

function syntaxError(message) {
	error("Syntax error\n" + message);
}

function tmplFn(markup, tmpl, isLinkExpr, convertBack, hasElse) {
	// Compile markup to AST (abtract syntax tree) then build the template function code from the AST nodes
	// Used for compiling templates, and also by JsViews to build functions for data link expressions

	//==== nested functions ====
	function pushprecedingContent(shift) {
		shift -= loc;
		if (shift) {
			content.push(markup.substr(loc, shift).replace(rNewLine, "\\n"));
		}
	}

	function blockTagCheck(tagName, block) {
		if (tagName) {
			tagName += '}}';
			//			'{{include}} block has {{/for}} with no open {{for}}'
			syntaxError((
				block
					? '{{' + block + '}} block has {{/' + tagName + ' without {{' + tagName
					: 'Unmatched or missing {{/' + tagName) + ', in template:\n' + markup);
		}
	}

	function parseTag(all, bind, tagName, converter, colon, html, codeTag, params, slash, bind2, closeBlock, index) {
/*

     bind     tagName         cvt   cln html code    params            slash   bind2         closeBlk  comment
/(?:{(\^)?{(?:(\w+(?=[\/\s}]))|(\w+)?(:)|(>)|(\*))\s*((?:[^}]|}(?!}))*?)(\/)?|{(\^)?{(?:(?:\/(\w+))\s*|!--[\s\S]*?--))}}/g

(?:
  {(\^)?{            bind
  (?:
    (\w+             tagName
      (?=[\/\s}])
    )
    |
    (\w+)?(:)        converter colon
    |
    (>)              html
    |
    (\*)             codeTag
  )
  \s*
  (                  params
    (?:[^}]|}(?!}))*?
  )
  (\/)?              slash
  |
  {(\^)?{            bind2
  (?:
    (?:\/(\w+))\s*   closeBlock
    |
    !--[\s\S]*?--    comment
  )
)
}}/g

*/
		if (codeTag && bind || slash && !tagName || params && params.slice(-1) === ":" || bind2) {
			syntaxError(all);
		}

		// Build abstract syntax tree (AST): [tagName, converter, params, content, hash, bindings, contentMarkup]
		if (html) {
			colon = ":";
			converter = HTML;
		}
		slash = slash || isLinkExpr && !hasElse;

		var late, openTagName, isLateOb,
			pathBindings = (bind || isLinkExpr) && [[]], // pathBindings is an array of arrays for arg bindings and a hash of arrays for prop bindings
			props = "",
			args = "",
			ctxProps = "",
			paramsArgs = "",
			paramsProps = "",
			paramsCtxProps = "",
			onError = "",
			useTrigger = "",
			// Block tag if not self-closing and not {{:}} or {{>}} (special case) and not a data-link expression
			block = !slash && !colon;

		//==== nested helper function ====
		tagName = tagName || (params = params || "#data", colon); // {{:}} is equivalent to {{:#data}}
		pushprecedingContent(index);
		loc = index + all.length; // location marker - parsed up to here
		if (codeTag) {
			if (allowCode) {
				content.push(["*", "\n" + params.replace(/^:/, "ret+= ").replace(rUnescapeQuotes, "$1") + ";\n"]);
			}
		} else if (tagName) {
			if (tagName === "else") {
				if (rTestElseIf.test(params)) {
					syntaxError('For "{{else if expr}}" use "{{else expr}}"');
				}
				pathBindings = current[9] && [[]];
				current[10] = markup.substring(current[10], index); // contentMarkup for block tag
				openTagName = current[11] || current[0] || syntaxError("Mismatched: " + all);
				// current[0] is tagName, but for {{else}} nodes, current[11] is tagName of preceding open tag
				current = stack.pop();
				content = current[2];
				block = true;
			}
			if (params) {
				// remove newlines from the params string, to avoid compiled code errors for unterminated strings
				parseParams(params.replace(rNewLine, " "), pathBindings, tmpl, isLinkExpr)
					.replace(rBuildHash, function(all, onerror, isCtxPrm, key, keyToken, keyValue, arg, param) {
						if (key === "this:") {
							keyValue = "undefined"; // this=some.path is always a to parameter (one-way), so don't need to compile/evaluate some.path initialization
						}
						if (param) {
							isLateOb = isLateOb || param[0] === "@";
						}
						key = "'" + keyToken + "':";
						if (arg) {
							args += isCtxPrm + keyValue + ",";
							paramsArgs += "'" + param + "',";
						} else if (isCtxPrm) { // Contextual parameter, ~foo=expr
							ctxProps += key + 'j._cp(' + keyValue + ',"' + param + '",view),';
							// Compiled code for evaluating tagCtx on a tag will have: ctx:{'foo':j._cp(compiledExpr, "expr", view)}
							paramsCtxProps += key + "'" + param + "',";
						} else if (onerror) {
							onError += keyValue;
						} else {
							if (keyToken === "trigger") {
								useTrigger += keyValue;
							}
							if (keyToken === "lateRender") {
								late = param !== "false"; // Render after first pass
							}
							props += key + keyValue + ",";
							paramsProps += key + "'" + param + "',";
							hasHandlers = hasHandlers || rHasHandlers.test(keyToken);
						}
						return "";
					}).slice(0, -1);
			}

			if (pathBindings && pathBindings[0]) {
				pathBindings.pop(); // Remove the binding that was prepared for next arg. (There is always an extra one ready).
			}

			newNode = [
					tagName,
					converter || !!convertBack || hasHandlers || "",
					block && [],
					parsedParam(paramsArgs || (tagName === ":" ? "'#data'," : ""), paramsProps, paramsCtxProps), // {{:}} equivalent to {{:#data}}
					parsedParam(args || (tagName === ":" ? "data," : ""), props, ctxProps),
					onError,
					useTrigger,
					late,
					isLateOb,
					pathBindings || 0
				];
			content.push(newNode);
			if (block) {
				stack.push(current);
				current = newNode;
				current[10] = loc; // Store current location of open tag, to be able to add contentMarkup when we reach closing tag
				current[11] = openTagName; // Used for checking syntax (matching close tag)
			}
		} else if (closeBlock) {
			blockTagCheck(closeBlock !== current[0] && closeBlock !== current[11] && closeBlock, current[0]); // Check matching close tag name
			current[10] = markup.substring(current[10], index); // contentMarkup for block tag
			current = stack.pop();
		}
		blockTagCheck(!current && closeBlock);
		content = current[2];
	}
	//==== /end of nested functions ====

	var i, result, newNode, hasHandlers, bindings,
		allowCode = $subSettings.allowCode || tmpl && tmpl.allowCode
			|| $viewsSettings.allowCode === true, // include direct setting of settings.allowCode true for backward compat only
		astTop = [],
		loc = 0,
		stack = [],
		content = astTop,
		current = [,,astTop];

	if (allowCode && tmpl._is) {
		tmpl.allowCode = allowCode;
	}

//TODO	result = tmplFnsCache[markup]; // Only cache if template is not named and markup length < ...,
//and there are no bindings or subtemplates?? Consider standard optimization for data-link="a.b.c"
//		if (result) {
//			tmpl.fn = result;
//		} else {

//		result = markup;
	if (isLinkExpr) {
		if (convertBack !== undefined) {
			markup = markup.slice(0, -convertBack.length - 2) + delimCloseChar0;
		}
		markup = delimOpenChar0 + markup + delimCloseChar1;
	}

	blockTagCheck(stack[0] && stack[0][2].pop()[0]);
	// Build the AST (abstract syntax tree) under astTop
	markup.replace(rTag, parseTag);

	pushprecedingContent(markup.length);

	if (loc = astTop[astTop.length - 1]) {
		blockTagCheck(typeof loc !== STRING && (+loc[10] === loc[10]) && loc[0]);
	}
//			result = tmplFnsCache[markup] = buildCode(astTop, tmpl);
//		}

	if (isLinkExpr) {
		result = buildCode(astTop, markup, isLinkExpr);
		bindings = [];
		i = astTop.length;
		while (i--) {
			bindings.unshift(astTop[i][9]); // With data-link expressions, pathBindings array for tagCtx[i] is astTop[i][9]
		}
		setPaths(result, bindings);
	} else {
		result = buildCode(astTop, tmpl);
	}
	return result;
}

function setPaths(fn, pathsArr) {
	var key, paths,
		i = 0,
		l = pathsArr.length;
	fn.deps = [];
	fn.paths = []; // The array of path binding (array/dictionary)s for each tag/else block's args and props
	for (; i < l; i++) {
		fn.paths.push(paths = pathsArr[i]);
		for (key in paths) {
			if (key !== "_jsvto" && paths.hasOwnProperty(key) && paths[key].length && !paths[key].skp) {
				fn.deps = fn.deps.concat(paths[key]); // deps is the concatenation of the paths arrays for the different bindings
			}
		}
	}
}

function parsedParam(args, props, ctx) {
	return [args.slice(0, -1), props.slice(0, -1), ctx.slice(0, -1)];
}

function paramStructure(paramCode, paramVals) {
	return '\n\tparams:{args:[' + paramCode[0] + '],\n\tprops:{' + paramCode[1] + '}'
		+ (paramCode[2] ? ',\n\tctx:{' + paramCode[2] + '}' : "")
		+ '},\n\targs:[' + paramVals[0] + '],\n\tprops:{' + paramVals[1] + '}'
		+ (paramVals[2] ? ',\n\tctx:{' + paramVals[2] + '}' : "");
}

function parseParams(params, pathBindings, tmpl, isLinkExpr) {

	function parseTokens(all, lftPrn0, lftPrn, bound, path, operator, err, eq, path2, late, prn,
												comma, lftPrn2, apos, quot, rtPrn, rtPrnDot, prn2, space, index, full) {
	// /(\()(?=\s*\()|(?:([([])\s*)?(?:(\^?)(~?[\w$.^]+)?\s*((\+\+|--)|\+|-|~(?![\w$])|&&|\|\||===|!==|==|!=|<=|>=|[<>%*:?\/]|(=))\s*|(!*?(@)?[#~]?[\w$.^]+)([([])?)|(,\s*)|(?:(\()\s*)?\\?(?:(')|("))|(?:\s*(([)\]])(?=[.^]|\s*$|[^([])|[)\]])([([]?))|(\s+)/g,
	//lftPrn0           lftPrn         bound     path               operator     err                                          eq      path2 late            prn      comma  lftPrn2          apos quot        rtPrn  rtPrnDot                  prn2     space
	// (left paren? followed by (path? followed by operator) or (path followed by paren?)) or comma or apos or quot or right paren or space

		function parsePath(allPath, not, object, helper, view, viewProperty, pathTokens, leafToken) {
			// /^(!*?)(?:null|true|false|\d[\d.]*|([\w$]+|\.|~([\w$]+)|#(view|([\w$]+))?)([\w$.^]*?)(?:[.[^]([\w$]+)\]?)?)$/g,
			//    not                               object     helper    view  viewProperty pathTokens      leafToken
			subPath = object === ".";
			if (object) {
				path = path.slice(not.length);
				if (/^\.?constructor$/.test(leafToken||path)) {
					syntaxError(allPath);
				}
				if (!subPath) {
					allPath = (late // late path @a.b.c: not throw on 'property of undefined' if a undefined, and will use _getOb() after linking to resolve late.
							? (isLinkExpr ? '' : '(ltOb.lt=ltOb.lt||') + '(ob='
							: ""
						)
						+ (helper
							? 'view.ctxPrm("' + helper + '")'
							: view
								? "view"
								: "data")
						+ (late
							? ')===undefined' + (isLinkExpr ? '' : ')') + '?"":view._getOb(ob,"'
							: ""
						)
						+ (leafToken
							? (viewProperty
								? "." + viewProperty
								: helper
									? ""
									: (view ? "" : "." + object)
								) + (pathTokens || "")
							: (leafToken = helper ? "" : view ? viewProperty || "" : object, ""));
					allPath = allPath + (leafToken ? "." + leafToken : "");

					allPath = not + (allPath.slice(0, 9) === "view.data"
						? allPath.slice(5) // convert #view.data... to data...
						: allPath)
					+ (late
							? (isLinkExpr ? '"': '",ltOb') + (prn ? ',1)':')')
							: ""
						);
				}
				if (bindings) {
					binds = named === "_linkTo" ? (bindto = pathBindings._jsvto = pathBindings._jsvto || []) : bndCtx.bd;
					if (theOb = subPath && binds[binds.length-1]) {
						if (theOb._cpfn) { // Computed property exprOb
							while (theOb.sb) {
								theOb = theOb.sb;
							}
							if (theOb.prm) {
								if (theOb.bnd) {
									path = "^" + path.slice(1);
								}
								theOb.sb = path;
								theOb.bnd = theOb.bnd || path[0] === "^";
							}
						}
					} else {
						binds.push(path);
					}
					if (prn && !subPath) {
						pathStart[fnDp] = ind;
						compiledPathStart[fnDp] = compiledPath[fnDp].length;
					}
				}
			}
			return allPath;
		}

		//bound = bindings && bound;
		if (bound && !eq) {
			path = bound + path; // e.g. some.fn(...)^some.path - so here path is "^some.path"
		}
		operator = operator || "";
		lftPrn2 = lftPrn2 || "";
		lftPrn = lftPrn || lftPrn0 || lftPrn2;
		path = path || path2;

		if (late && (late = !/\)|]/.test(full[index-1]))) {
			path = path.slice(1).split(".").join("^"); // Late path @z.b.c. Use "^" rather than "." to ensure that deep binding will be used
		}
		// Could do this - but not worth perf cost?? :-
		// if (!path.lastIndexOf("#data.", 0)) { path = path.slice(6); } // If path starts with "#data.", remove that.
		prn = prn || prn2 || "";
		var expr, binds, theOb, newOb, subPath, lftPrnFCall, ret,
			ind = index;

		if (!aposed && !quoted) {
			if (err) {
				syntaxError(params);
			}
			if (rtPrnDot && bindings) {
				// This is a binding to a path in which an object is returned by a helper/data function/expression, e.g. foo()^x.y or (a?b:c)^x.y
				// We create a compiled function to get the object instance (which will be called when the dependent data of the subexpression changes,
				// to return the new object, and trigger re-binding of the subsequent path)
				expr = pathStart[fnDp-1];
				if (full.length - 1 > ind - (expr || 0)) { // We need to compile a subexpression
					expr = $.trim(full.slice(expr, ind + all.length));
					binds = bindto || bndStack[fnDp-1].bd;
					// Insert exprOb object, to be used during binding to return the computed object
					theOb = binds[binds.length-1];
					if (theOb && theOb.prm) {
						while (theOb.sb && theOb.sb.prm) {
							theOb = theOb.sb;
						}
						newOb = theOb.sb = {path: theOb.sb, bnd: theOb.bnd};
					} else {
						binds.push(newOb = {path: binds.pop()}); // Insert exprOb object, to be used during binding to return the computed object
					}
					if (theOb && theOb.sb === newOb) {
						compiledPath[fnDp] = compiledPath[fnDp-1].slice(theOb._cpPthSt) + compiledPath[fnDp];
						compiledPath[fnDp-1] = compiledPath[fnDp-1].slice(0, theOb._cpPthSt);
					}
					newOb._cpPthSt = compiledPathStart[fnDp-1];
					newOb._cpKey = expr;

					compiledPath[fnDp] += full.slice(prevIndex, index);
					prevIndex = index;

					newOb._cpfn = cpFnStore[expr] = cpFnStore[expr] || // Compiled function for computed value: get from store, or compile and store
						new Function("data,view,j", // Compiled function for computed value in template
					"//" + expr + "\nvar v;\nreturn ((v=" + compiledPath[fnDp] + (rtPrn === "]" ? ")]" : rtPrn) + ")!=null?v:null);");

					compiledPath[fnDp-1] += (fnCall[prnDp] && $subSettingsAdvanced.cache ? "view.getCache(\"" + expr.replace(rEscapeQuotes, "\\$&") + "\"" : compiledPath[fnDp]);

					newOb.prm = bndCtx.bd;
					newOb.bnd = newOb.bnd || newOb.path && newOb.path.indexOf("^") >= 0;
				}
				compiledPath[fnDp] = "";
			}
			if (prn === "[") {
				prn = "[j._sq(";
			}
			if (lftPrn === "[") {
				lftPrn = "[j._sq(";
			}
		}
		ret = (aposed
			// within single-quoted string
			? (aposed = !apos, (aposed ? all : lftPrn2 + '"'))
			: quoted
			// within double-quoted string
				? (quoted = !quot, (quoted ? all : lftPrn2 + '"'))
				:
			(
				(lftPrn
					? (
						prnStack[++prnDp] = true,
						prnInd[prnDp] = 0,
						bindings && (
							pathStart[fnDp++] = ind++,
							bndCtx = bndStack[fnDp] = {bd: []},
							compiledPath[fnDp] = "",
							compiledPathStart[fnDp] = 1
						),
						lftPrn) // Left paren, (not a function call paren)
					: "")
				+ (space
					? (prnDp
						? "" // A space within parens or within function call parens, so not a separator for tag args
			// New arg or prop - so insert backspace \b (\x08) as separator for named params, used subsequently by rBuildHash, and prepare new bindings array
						: (paramIndex = full.slice(paramIndex, ind), named
							? (named = boundName = bindto = false, "\b")
							: "\b,") + paramIndex + (paramIndex = ind + all.length, bindings && pathBindings.push(bndCtx.bd = []), "\b")
					)
					: eq
			// named param. Remove bindings for arg and create instead bindings array for prop
						? (fnDp && syntaxError(params), bindings && pathBindings.pop(), named = "_" + path, boundName = bound, paramIndex = ind + all.length,
								bindings && ((bindings = bndCtx.bd = pathBindings[named] = []), bindings.skp = !bound), path + ':')
						: path
			// path
							? (path.split("^").join(".").replace($sub.rPath, parsePath)
								+ (prn || operator)
							)
							: operator
			// operator
								? operator
								: rtPrn
			// function
									? rtPrn === "]" ? ")]" : ")"
									: comma
										? (fnCall[prnDp] || syntaxError(params), ",") // We don't allow top-level literal arrays or objects
										: lftPrn0
											? ""
											: (aposed = apos, quoted = quot, '"')
			))
		);

		if (!aposed && !quoted) {
			if (rtPrn) {
				fnCall[prnDp] = false;
				prnDp--;
			}
		}

		if (bindings) {
			if (!aposed && !quoted) {
				if (rtPrn) {
					if (prnStack[prnDp+1]) {
						bndCtx = bndStack[--fnDp];
						prnStack[prnDp+1] = false;
					}
					prnStart = prnInd[prnDp+1];
				}
				if (prn) {
					prnInd[prnDp+1] = compiledPath[fnDp].length + (lftPrn ? 1 : 0);
					if (path || rtPrn) {
						bndCtx = bndStack[++fnDp] = {bd: []};
						prnStack[prnDp+1] = true;
					}
				}
			}

			compiledPath[fnDp] = (compiledPath[fnDp]||"") + full.slice(prevIndex, index);
			prevIndex = index+all.length;

			if (!aposed && !quoted) {
				if (lftPrnFCall = lftPrn && prnStack[prnDp+1]) {
					compiledPath[fnDp-1] += lftPrn;
					compiledPathStart[fnDp-1]++;
				}
				if (prn === "(" && subPath && !newOb) {
					compiledPath[fnDp] = compiledPath[fnDp-1].slice(prnStart) + compiledPath[fnDp];
					compiledPath[fnDp-1] = compiledPath[fnDp-1].slice(0, prnStart);
				}
			}
			compiledPath[fnDp] += lftPrnFCall ? ret.slice(1) : ret;
		}

		if (!aposed && !quoted && prn) {
			prnDp++;
			if (path && prn === "(") {
				fnCall[prnDp] = true;
			}
		}

		if (!aposed && !quoted && prn2) {
			if (bindings) {
				compiledPath[fnDp] += prn;
			}
			ret += prn;
		}
		return ret;
	}

	var named, bindto, boundName, result,
		quoted, // boolean for string content in double quotes
		aposed, // or in single quotes
		bindings = pathBindings && pathBindings[0], // bindings array for the first arg
		bndCtx = {bd: bindings},
		bndStack = {0: bndCtx},
		paramIndex = 0, // list,
		// The following are used for tracking path parsing including nested paths, such as "a.b(c^d + (e))^f", and chained computed paths such as
		// "a.b().c^d().e.f().g" - which has four chained paths, "a.b()", "^c.d()", ".e.f()" and ".g"
		prnDp = 0,     // For tracking paren depth (not function call parens)
		fnDp = 0,      // For tracking depth of function call parens
		prnInd = {},   // We are in a function call
		prnStart = 0,  // tracks the start of the current path such as c^d() in the above example
		prnStack = {}, // tracks parens which are not function calls, and so are associated with new bndStack contexts
		fnCall = {},   // We are in a function call
		pathStart = {},// tracks the start of the current path such as c^d() in the above example
		compiledPathStart = {0: 0},
		compiledPath = {0:""},
		prevIndex = 0;

	if (params[0] === "@") {
		params = params.replace(rBracketQuote, ".");
	}
	result = (params + (tmpl ? " " : "")).replace($sub.rPrm, parseTokens);

	if (bindings) {
		result = compiledPath[0];
	}

	return !prnDp && result || syntaxError(params); // Syntax error if unbalanced parens in params expression
}

function buildCode(ast, tmpl, isLinkExpr) {
	// Build the template function code from the AST nodes, and set as property on the passed-in template object
	// Used for compiling templates, and also by JsViews to build functions for data link expressions
	var i, node, tagName, converter, tagCtx, hasTag, hasEncoder, getsVal, hasCnvt, useCnvt, tmplBindings, pathBindings, params, boundOnErrStart,
		boundOnErrEnd, tagRender, nestedTmpls, tmplName, nestedTmpl, tagAndElses, content, markup, nextIsElse, oldCode, isElse, isGetVal, tagCtxFn,
		onError, tagStart, trigger, lateRender, retStrOpen, retStrClose,
		tmplBindingKey = 0,
		useViews = $subSettingsAdvanced.useViews || tmpl.useViews || tmpl.tags || tmpl.templates || tmpl.helpers || tmpl.converters,
		code = "",
		tmplOptions = {},
		l = ast.length;

	if (typeof tmpl === STRING) {
		tmplName = isLinkExpr ? 'data-link="' + tmpl.replace(rNewLine, " ").slice(1, -1) + '"' : tmpl;
		tmpl = 0;
	} else {
		tmplName = tmpl.tmplName || "unnamed";
		if (tmpl.allowCode) {
			tmplOptions.allowCode = true;
		}
		if (tmpl.debug) {
			tmplOptions.debug = true;
		}
		tmplBindings = tmpl.bnds;
		nestedTmpls = tmpl.tmpls;
	}
	for (i = 0; i < l; i++) {
		// AST nodes: [0: tagName, 1: converter, 2: content, 3: params, 4: code, 5: onError, 6: trigger, 7:pathBindings, 8: contentMarkup]
		node = ast[i];

		// Add newline for each callout to t() c() etc. and each markup string
		if (typeof node === STRING) {
			// a markup string to be inserted
			code += '+"' + node + '"';
		} else {
			// a compiled tag expression to be inserted
			tagName = node[0];
			if (tagName === "*") {
				// Code tag: {{* }}
				code += ";\n" + node[1] + "\nret=ret";
			} else {
				converter = node[1];
				content = !isLinkExpr && node[2];
				tagCtx = paramStructure(node[3], params = node[4]);
				trigger = node[6];
				lateRender = node[7];
				if (node[8]) { // latePath @a.b.c or @~a.b.c
					retStrOpen = "\nvar ob,ltOb={},ctxs=";
					retStrClose = ";\nctxs.lt=ltOb.lt;\nreturn ctxs;";
				} else {
					retStrOpen = "\nreturn ";
					retStrClose = "";
				}
				markup = node[10] && node[10].replace(rUnescapeQuotes, "$1");
				if (isElse = tagName === "else") {
					if (pathBindings) {
						pathBindings.push(node[9]);
					}
				} else {
					onError = node[5] || $subSettings.debugMode !== false && "undefined"; // If debugMode not false, set default onError handler on tag to "undefined" (see onRenderError)
					if (tmplBindings && (pathBindings = node[9])) { // Array of paths, or false if not data-bound
						pathBindings = [pathBindings];
						tmplBindingKey = tmplBindings.push(1); // Add placeholder in tmplBindings for compiled function
					}
				}
				useViews = useViews || params[1] || params[2] || pathBindings || /view.(?!index)/.test(params[0]);
				// useViews is for perf optimization. For render() we only use views if necessary - for the more advanced scenarios.
				// We use views if there are props, contextual properties or args with #... (other than #index) - but you can force
				// using the full view infrastructure, (and pay a perf price) by opting in: Set useViews: true on the template, manually...
				if (isGetVal = tagName === ":") {
					if (converter) {
						tagName = converter === HTML ? ">" : converter + tagName;
					}
				} else {
					if (content) { // TODO optimize - if content.length === 0 or if there is a tmpl="..." specified - set content to null / don't run this compilation code - since content won't get used!!
						// Create template object for nested template
						nestedTmpl = tmplObject(markup, tmplOptions);
						nestedTmpl.tmplName = tmplName + "/" + tagName;
						// Compile to AST and then to compiled function
						nestedTmpl.useViews = nestedTmpl.useViews || useViews;
						buildCode(content, nestedTmpl);
						useViews = nestedTmpl.useViews;
						nestedTmpls.push(nestedTmpl);
					}

					if (!isElse) {
						// This is not an else tag.
						tagAndElses = tagName;
						useViews = useViews || tagName && (!$tags[tagName] || !$tags[tagName].flow);
						// Switch to a new code string for this bound tag (and its elses, if it has any) - for returning the tagCtxs array
						oldCode = code;
						code = "";
					}
					nextIsElse = ast[i + 1];
					nextIsElse = nextIsElse && nextIsElse[0] === "else";
				}
				tagStart = onError ? ";\ntry{\nret+=" : "\n+";
				boundOnErrStart = "";
				boundOnErrEnd = "";

				if (isGetVal && (pathBindings || trigger || converter && converter !== HTML || lateRender)) {
					// For convertVal we need a compiled function to return the new tagCtx(s)
					tagCtxFn = new Function("data,view,j", "// " + tmplName + " " + (++tmplBindingKey) + " " + tagName
						+ retStrOpen + "{" + tagCtx + "};" + retStrClose);
					tagCtxFn._er = onError;
					tagCtxFn._tag = tagName;
					tagCtxFn._bd = !!pathBindings; // data-linked tag {^{.../}}
					tagCtxFn._lr = lateRender;

					if (isLinkExpr) {
						return tagCtxFn;
					}

					setPaths(tagCtxFn, pathBindings);
					tagRender = 'c("' + converter + '",view,';
					useCnvt = true;
					boundOnErrStart = tagRender + tmplBindingKey + ",";
					boundOnErrEnd = ")";
				}
				code += (isGetVal
					? (isLinkExpr ? (onError ? "try{\n" : "") + "return " : tagStart) + (useCnvt // Call _cnvt if there is a converter: {{cnvt: ... }} or {^{cnvt: ... }}
						? (useCnvt = undefined, useViews = hasCnvt = true, tagRender + (tagCtxFn
							? ((tmplBindings[tmplBindingKey - 1] = tagCtxFn), tmplBindingKey) // Store the compiled tagCtxFn in tmpl.bnds, and pass the key to convertVal()
							: "{" + tagCtx + "}") + ")")
						: tagName === ">"
							? (hasEncoder = true, "h(" + params[0] + ")")
							: (getsVal = true, "((v=" + params[0] + ')!=null?v:' + (isLinkExpr ? 'null)' : '"")'))
							// Non strict equality so data-link="title{:expr}" with expr=null/undefined removes title attribute
					)
					: (hasTag = true, "\n{view:view,content:false,tmpl:" // Add this tagCtx to the compiled code for the tagCtxs to be passed to renderTag()
						+ (content ? nestedTmpls.length : "false") + "," // For block tags, pass in the key (nestedTmpls.length) to the nested content template
						+ tagCtx + "},"));

				if (tagAndElses && !nextIsElse) {
					// This is a data-link expression or an inline tag without any elses, or the last {{else}} of an inline tag
					// We complete the code for returning the tagCtxs array
					code = "[" + code.slice(0, -1) + "]";
					tagRender = 't("' + tagAndElses + '",view,this,';
					if (isLinkExpr || pathBindings) {
						// This is a bound tag (data-link expression or inline bound tag {^{tag ...}}) so we store a compiled tagCtxs function in tmp.bnds
						code = new Function("data,view,j", " // " + tmplName + " " + tmplBindingKey + " " + tagAndElses + retStrOpen + code
							+ retStrClose);
						code._er = onError;
						code._tag = tagAndElses;
						if (pathBindings) {
							setPaths(tmplBindings[tmplBindingKey - 1] = code, pathBindings);
						}
						code._lr = lateRender;
						if (isLinkExpr) {
							return code; // For a data-link expression we return the compiled tagCtxs function
						}
						boundOnErrStart = tagRender + tmplBindingKey + ",undefined,";
						boundOnErrEnd = ")";
					}

					// This is the last {{else}} for an inline tag.
					// For a bound tag, pass the tagCtxs fn lookup key to renderTag.
					// For an unbound tag, include the code directly for evaluating tagCtxs array
					code = oldCode + tagStart + tagRender + (pathBindings && tmplBindingKey || code) + ")";
					pathBindings = 0;
					tagAndElses = 0;
				}
				if (onError && !nextIsElse) {
					useViews = true;
					code += ';\n}catch(e){ret' + (isLinkExpr ? "urn " : "+=") + boundOnErrStart + 'j._err(e,view,' + onError + ')' + boundOnErrEnd + ';}' + (isLinkExpr ? "" : '\nret=ret');
				}
			}
		}
	}
	// Include only the var references that are needed in the code
	code = "// " + tmplName
		+ (tmplOptions.debug ? "\ndebugger;" : "")
		+ "\nvar v"
		+ (hasTag ? ",t=j._tag" : "")                // has tag
		+ (hasCnvt ? ",c=j._cnvt" : "")              // converter
		+ (hasEncoder ? ",h=j._html" : "")           // html converter
		+ (isLinkExpr
				? (node[8] // late @... path?
						? ", ob"
						: ""
					) + ";\n"
				: ',ret=""')
		+ code
		+ (isLinkExpr ? "\n" : ";\nreturn ret;");

	try {
		code = new Function("data,view,j", code);
	} catch (e) {
		syntaxError("Compiled template code:\n\n" + code + '\n: "' + (e.message||e) + '"');
	}
	if (tmpl) {
		tmpl.fn = code;
		tmpl.useViews = !!useViews;
	}
	return code;
}

//==========
// Utilities
//==========

// Merge objects, in particular contexts which inherit from parent contexts
function extendCtx(context, parentContext) {
	// Return copy of parentContext, unless context is defined and is different, in which case return a new merged context
	// If neither context nor parentContext are defined, return undefined
	return context && context !== parentContext
		? (parentContext
			? $extend($extend({}, parentContext), context)
			: context)
		: parentContext && $extend({}, parentContext);
}

function getTargetProps(source, tagCtx) {
	// this pointer is theMap - which has tagCtx.props too
	// arguments: tagCtx.args.
	var key, prop,
		map = tagCtx.map,
		propsArr = map && map.propsArr;

	if (!propsArr) { // map.propsArr is the full array of {key:..., prop:...} objects
		propsArr = [];
		if (typeof source === OBJECT || $isFunction(source)) {
			for (key in source) {
				prop = source[key];
				if (key !== $expando && source.hasOwnProperty(key) && (!tagCtx.props.noFunctions || !$.isFunction(prop))) {
					propsArr.push({key: key, prop: prop});
				}
			}
		}
		if (map) {
			map.propsArr = map.options && propsArr; // If bound {^{props}} and not isRenderCall, store propsArr on map (map.options is defined only for bound, && !isRenderCall)
		}
	}
	return getTargetSorted(propsArr, tagCtx); // Obtains map.tgt, by filtering, sorting and splicing the full propsArr
}

function getTargetSorted(value, tagCtx) {
	// getTgt
	var mapped, start, end,
		tag = tagCtx.tag,
		props = tagCtx.props,
		propParams = tagCtx.params.props,
		filter = props.filter,
		sort = props.sort,
		directSort = sort === true,
		step = parseInt(props.step),
		reverse = props.reverse ? -1 : 1;

	if (!$isArray(value)) {
		return value;
	}
	if (directSort || sort && typeof sort === STRING) {
		// Temporary mapped array holds objects with index and sort-value
		mapped = value.map(function(item, i) {
			item = directSort ? item : getPathObject(item, sort);
			return {i: i, v: typeof item === STRING ? item.toLowerCase() : item};
		});
		// Sort mapped array
		mapped.sort(function(a, b) {
			return a.v > b.v ? reverse : a.v < b.v ? -reverse : 0;
		});
		// Map to new array with resulting order
		value = mapped.map(function(item){
			return value[item.i];
		});
	} else if ((sort || reverse < 0) && !tag.dataMap) {
		value = value.slice(); // Clone array first if not already a new array
	}
	if ($isFunction(sort)) {
		value = value.sort(function() { // Wrap the sort function to provide tagCtx as 'this' pointer
			return sort.apply(tagCtx, arguments);
		});
	}
	if (reverse < 0 && (!sort || $isFunction(sort))) { // Reverse result if not already reversed in sort
		value = value.reverse();
	}

	if (value.filter && filter) { // IE8 does not support filter
		value = value.filter(filter, tagCtx);
		if (tagCtx.tag.onFilter) {
			tagCtx.tag.onFilter(tagCtx);
		}
	}

	if (propParams.sorted) {
		mapped = (sort || reverse < 0) ? value : value.slice();
		if (tag.sorted) {
			$.observable(tag.sorted).refresh(mapped); // Note that this might cause the start and end props to be modified - e.g. by pager tag control
		} else {
			tagCtx.map.sorted = mapped;
		}
	}

	start = props.start; // Get current value - after possible changes triggered by tag.sorted refresh() above
	end = props.end;
	if (propParams.start && start === undefined || propParams.end && end === undefined) {
		start = end = 0;
	}
	if (!isNaN(start) || !isNaN(end)) { // start or end specified, but not the auto-create Number array scenario of {{for start=xxx end=yyy}}
		start = +start || 0;
		end = end === undefined || end > value.length ? value.length : +end;
		value = value.slice(start, end);
	}
	if (step > 1) {
		start = 0;
		end = value.length;
		mapped = [];
		for (; start<end; start+=step) {
			mapped.push(value[start]);
		}
		value = mapped;
	}
	if (propParams.paged && tag.paged) {
		$observable(tag.paged).refresh(value);
	}

	return value;
}

/** Render the template as a string, using the specified data and helpers/context
* $("#tmpl").render()
*
* @param {any}        data
* @param {hash}       [helpersOrContext]
* @param {boolean}    [noIteration]
* @returns {string}   rendered template
*/
function $fnRender(data, context, noIteration) {
	var tmplElem = this.jquery && (this[0] || error('Unknown template')), // Targeted element not found for jQuery template selector such as "#myTmpl"
		tmpl = tmplElem.getAttribute(tmplAttr);

	return renderContent.call(tmpl && $.data(tmplElem)[jsvTmpl] || $templates(tmplElem),
		data, context, noIteration);
}

//========================== Register converters ==========================

function getCharEntity(ch) {
	// Get character entity for HTML, Attribute and optional data encoding
	return charEntities[ch] || (charEntities[ch] = "&#" + ch.charCodeAt(0) + ";");
}

function getCharFromEntity(match, token) {
	// Get character from HTML entity, for optional data unencoding
	return charsFromEntities[token] || "";
}

function htmlEncode(text) {
	// HTML encode: Replace < > & ' " ` etc. by corresponding entities.
	return text != undefined ? rIsHtml.test(text) && ("" + text).replace(rHtmlEncode, getCharEntity) || text : "";
}

function dataEncode(text) {
	// Encode just < > and & - intended for 'safe data' along with {{:}} rather than {{>}}
  return typeof text === STRING ? text.replace(rDataEncode, getCharEntity) : text;
}

function dataUnencode(text) {
  // Unencode just < > and & - intended for 'safe data' along with {{:}} rather than {{>}}
  return  typeof text === STRING ? text.replace(rDataUnencode, getCharFromEntity) : text;
}

//========================== Initialize ==========================

$sub = $views.sub;
$viewsSettings = $views.settings;

if (!(jsr || $ && $.render)) {
	// JsRender/JsViews not already loaded (or loaded without jQuery, and we are now moving from jsrender namespace to jQuery namepace)
	for (jsvStoreName in jsvStores) {
		registerStore(jsvStoreName, jsvStores[jsvStoreName]);
	}

	$converters = $views.converters;
	$helpers = $views.helpers;
	$tags = $views.tags;

	$sub._tg.prototype = {
		baseApply: baseApply,
		cvtArgs: convertArgs,
		bndArgs: convertBoundArgs,
		ctxPrm: contextParameter
	};

	topView = $sub.topView = new View();

	//BROWSER-SPECIFIC CODE
	if ($) {

		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery (= $) is loaded

		$.fn.render = $fnRender;
		$expando = $.expando;
		if ($.observable) {
			if (versionNumber !== (versionNumber = $.views.jsviews)) {
				// Different version of jsRender was loaded
				throw "jquery.observable.js requires jsrender.js " + versionNumber;
			}
			$extend($sub, $.views.sub); // jquery.observable.js was loaded before jsrender.js
			$views.map = $.views.map;
		}

	} else {
		////////////////////////////////////////////////////////////////////////////////////////////////
		// jQuery is not loaded.

		$ = {};

		if (setGlobals) {
			global.jsrender = $; // We are loading jsrender.js from a script element, not AMD or CommonJS, so set global
		}

		// Error warning if jsrender.js is used as template engine on Node.js (e.g. Express or Hapi...)
		// Use jsrender-node.js instead...
		$.renderFile = $.__express = $.compile = function() { throw "Node.js: use npm jsrender, or jsrender-node.js"; };

		//END BROWSER-SPECIFIC CODE
		$.isFunction = function(ob) {
			return typeof ob === "function";
		};

		$.isArray = Array.isArray || function(obj) {
			return ({}.toString).call(obj) === "[object Array]";
		};

		$sub._jq = function(jq) { // private method to move from JsRender APIs from jsrender namespace to jQuery namespace
			if (jq !== $) {
				$extend(jq, $); // map over from jsrender namespace to jQuery namespace
				$ = jq;
				$.fn.render = $fnRender;
				delete $.jsrender;
				$expando = $.expando;
			}
		};

		$.jsrender = versionNumber;
	}
	$subSettings = $sub.settings;
	$subSettings.allowCode = false;
	$isFunction = $.isFunction;
	$.render = $render;
	$.views = $views;
	$.templates = $templates = $views.templates;

	for (setting in $subSettings) {
		addSetting(setting);
	}

	/**
	* $.views.settings.debugMode(true)
	* @param {boolean} debugMode
	* @returns {Settings}
	*
	* debugMode = $.views.settings.debugMode()
	* @returns {boolean}
	*/
	($viewsSettings.debugMode = function(debugMode) {
		return debugMode === undefined
			? $subSettings.debugMode
			: (
				$subSettings._clFns && $subSettings._clFns(), // Clear linkExprStore (cached compiled expressions), since debugMode setting affects compilation for expressions
				$subSettings.debugMode = debugMode,
				$subSettings.onError = typeof debugMode === STRING
					? function() { return debugMode; }
					: $isFunction(debugMode)
						? debugMode
						: undefined,
				$viewsSettings);
	})(false); // jshint ignore:line

	$subSettingsAdvanced = $subSettings.advanced = {
		cache: true, // By default use cached values of computed values (Otherwise, set advanced cache setting to false)
		useViews: false,
		_jsv: false // For global access to JsViews store
	};

	//========================== Register tags ==========================

	$tags({
		"if": {
			render: function(val) {
				// This function is called once for {{if}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				// If not done (a previous block has not been rendered), look at expression for this block and render the block if expression is truthy
				// Otherwise return ""
				var self = this,
					tagCtx = self.tagCtx,
					ret = (self.rendering.done || !val && (tagCtx.args.length || !tagCtx.index))
						? ""
						: (self.rendering.done = true,
							self.selected = tagCtx.index,
							undefined); // Test is satisfied, so render content on current context
				return ret;
			},
			contentCtx: true, // Inherit parent view data context
			flow: true
		},
		"for": {
			sortDataMap: dataMap(getTargetSorted),
			init: function(val, cloned) {
				this.setDataMap(this.tagCtxs);
			},
			render: function(val) {
				// This function is called once for {{for}} and once for each {{else}}.
				// We will use the tag.rendering object for carrying rendering state across the calls.
				var value, filter, srtField, isArray, i, sorted, end, step,
					self = this,
					tagCtx = self.tagCtx,
					range = tagCtx.argDefault === false,
					props = tagCtx.props,
					iterate = range || tagCtx.args.length, // Not final else and not auto-create range
					result = "",
					done = 0;

				if (!self.rendering.done) {
					value = iterate ? val : tagCtx.view.data; // For the final else, defaults to current data without iteration.

					if (range) {
						range = props.reverse ? "unshift" : "push";
						end = +props.end;
						step = +props.step || 1;
						value = []; // auto-create integer array scenario of {{for start=xxx end=yyy}}
						for (i = +props.start || 0; (end - i) * step > 0; i += step) {
							value[range](i);
						}
					}
					if (value !== undefined) {
						isArray = $isArray(value);
						result += tagCtx.render(value, !iterate || props.noIteration);
						// Iterates if data is an array, except on final else - or if noIteration property
						// set to true. (Use {{include}} to compose templates without array iteration)
						done += isArray ? value.length : 1;
					}
					if (self.rendering.done = done) {
						self.selected = tagCtx.index;
					}
					// If nothing was rendered we will look at the next {{else}}. Otherwise, we are done.
				}
				return result;
			},
			setDataMap: function(tagCtxs) {
				var tagCtx, props, paramsProps,
					self = this,
					l = tagCtxs.length;
				while (l--) {
					tagCtx = tagCtxs[l];
					props = tagCtx.props;
					paramsProps = tagCtx.params.props;
					tagCtx.argDefault = props.end === undefined || tagCtx.args.length > 0; // Default to #data except for auto-create range scenario {{for start=xxx end=yyy step=zzz}}
					props.dataMap = (tagCtx.argDefault !== false && $isArray(tagCtx.args[0]) &&
						(paramsProps.sort || paramsProps.start || paramsProps.end || paramsProps.step || paramsProps.filter || paramsProps.reverse
						|| props.sort || props.start || props.end || props.step || props.filter || props.reverse))
						&& self.sortDataMap;
				}
			},
			flow: true
		},
		props: {
			baseTag: "for",
			dataMap: dataMap(getTargetProps),
			init: noop, // Don't execute the base init() of the "for" tag
			flow: true
		},
		include: {
			flow: true
		},
		"*": {
			// {{* code... }} - Ignored if template.allowCode and $.views.settings.allowCode are false. Otherwise include code in compiled template
			render: retVal,
			flow: true
		},
		":*": {
			// {{:* returnedExpression }} - Ignored if template.allowCode and $.views.settings.allowCode are false. Otherwise include code in compiled template
			render: retVal,
			flow: true
		},
		dbg: $helpers.dbg = $converters.dbg = dbgBreak // Register {{dbg/}}, {{dbg:...}} and ~dbg() to throw and catch, as breakpoints for debugging.
	});

	$converters({
		html: htmlEncode,
		attr: htmlEncode, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		encode: dataEncode,
		unencode: dataUnencode, // Includes > encoding since rConvertMarkers in JsViews does not skip > characters in attribute strings
		url: function(text) {
			// URL encoding helper.
			return text != undefined ? encodeURI("" + text) : text === null ? text : ""; // null returns null, e.g. to remove attribute. undefined returns ""
		}
	});
}
//========================== Define default delimiters ==========================
$subSettings = $sub.settings;
$isArray = ($||jsr).isArray;
$viewsSettings.delimiters("{{", "}}", "^");

if (jsrToJq) { // Moving from jsrender namespace to jQuery namepace - copy over the stored items (templates, converters, helpers...)
	jsr.views.sub._jq($);
}
return $ || jsr;
}, window));


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/***/ (function(module) {

"use strict";
module.exports = jquery;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************************!*\
  !*** ./src/js/myams-mini.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ext_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ext-base */ "./src/js/ext-base.js");
/* harmony import */ var _ext_require__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ext-require */ "./src/js/ext-require.js");
/* harmony import */ var _mod_error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mod-error */ "./src/js/mod-error.js");
/* harmony import */ var _mod_ajax__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mod-ajax */ "./src/js/mod-ajax.js");
/* harmony import */ var _mod_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mod-i18n */ "./src/js/mod-i18n.js");
/* harmony import */ var _mod_nav__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mod-nav */ "./src/js/mod-nav.js");
/* harmony import */ var _mod_skin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mod-skin */ "./src/js/mod-skin.js");
/* harmony import */ var _mod_alert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mod-alert */ "./src/js/mod-alert.js");
/* harmony import */ var _mod_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mod-modal */ "./src/js/mod-modal.js");
/* harmony import */ var _mod_form__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mod-form */ "./src/js/mod-form.js");
/* harmony import */ var _mod_events__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mod-events */ "./src/js/mod-events.js");
/* harmony import */ var _mod_callbacks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mod-callbacks */ "./src/js/mod-callbacks.js");
/* harmony import */ var _mod_clipboard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./mod-clipboard */ "./src/js/mod-clipboard.js");
/* harmony import */ var _mod_container__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./mod-container */ "./src/js/mod-container.js");
/* harmony import */ var _mod_datatable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./mod-datatable */ "./src/js/mod-datatable.js");
/* harmony import */ var _mod_graph__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./mod-graph */ "./src/js/mod-graph.js");
/* harmony import */ var _mod_helpers__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mod-helpers */ "./src/js/mod-helpers.js");
/* harmony import */ var _mod_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mod-menu */ "./src/js/mod-menu.js");
/* harmony import */ var _mod_notifications__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./mod-notifications */ "./src/js/mod-notifications.js");
/* harmony import */ var _mod_tree__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./mod-tree */ "./src/js/mod-tree.js");
/* harmony import */ var _mod_jsonrpc__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./mod-jsonrpc */ "./src/js/mod-jsonrpc.js");
/* harmony import */ var _mod_xmlrpc__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./mod-xmlrpc */ "./src/js/mod-xmlrpc.js");
/* harmony import */ var _mod_stats__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./mod-stats */ "./src/js/mod-stats.js");
/* harmony import */ var _mod_plugins__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./mod-plugins */ "./src/js/mod-plugins.js");
/**
 * MyAMS mini features
 *
 * This script is used to build MyAMS mini-package.
 *
 * This package includes all MyAMS modules, but without JQuery, Bootstrap or FontAwesome
 * external resources; MyAMS CSS are excluded.
 */

























_ext_base__WEBPACK_IMPORTED_MODULE_0__["default"].$.extend(_ext_base__WEBPACK_IMPORTED_MODULE_0__["default"], {
  require: _ext_require__WEBPACK_IMPORTED_MODULE_1__["default"],
  ajax: _mod_ajax__WEBPACK_IMPORTED_MODULE_3__.ajax,
  alert: _mod_alert__WEBPACK_IMPORTED_MODULE_7__.alert,
  callbacks: _mod_callbacks__WEBPACK_IMPORTED_MODULE_11__.callbacks,
  clipboard: _mod_clipboard__WEBPACK_IMPORTED_MODULE_12__.clipboard,
  container: _mod_container__WEBPACK_IMPORTED_MODULE_13__.container,
  datatable: _mod_datatable__WEBPACK_IMPORTED_MODULE_14__.datatable,
  error: _mod_error__WEBPACK_IMPORTED_MODULE_2__.error,
  events: _mod_events__WEBPACK_IMPORTED_MODULE_10__.events,
  form: _mod_form__WEBPACK_IMPORTED_MODULE_9__.form,
  graph: _mod_graph__WEBPACK_IMPORTED_MODULE_15__.graph,
  helpers: _mod_helpers__WEBPACK_IMPORTED_MODULE_16__.helpers,
  i18n: _mod_i18n__WEBPACK_IMPORTED_MODULE_4__.i18n,
  jsonrpc: _mod_jsonrpc__WEBPACK_IMPORTED_MODULE_20__.jsonrpc,
  menu: _mod_menu__WEBPACK_IMPORTED_MODULE_17__.menu,
  modal: _mod_modal__WEBPACK_IMPORTED_MODULE_8__.modal,
  nav: _mod_nav__WEBPACK_IMPORTED_MODULE_5__.nav,
  notifications: _mod_notifications__WEBPACK_IMPORTED_MODULE_18__.notifications,
  skin: _mod_skin__WEBPACK_IMPORTED_MODULE_6__.skin,
  stats: _mod_stats__WEBPACK_IMPORTED_MODULE_22__.stats,
  tree: _mod_tree__WEBPACK_IMPORTED_MODULE_19__.tree,
  xmlrpc: _mod_xmlrpc__WEBPACK_IMPORTED_MODULE_21__.xmlrpc
});
const html = _ext_base__WEBPACK_IMPORTED_MODULE_0__["default"].$('html');
if (html.data('ams-init') !== false) {
  (0,_ext_base__WEBPACK_IMPORTED_MODULE_0__.init)(_ext_base__WEBPACK_IMPORTED_MODULE_0__["default"].$);
}

/** Version: 1.15.6  */
}();
/******/ })()
;
//# sourceMappingURL=myams-mini-dev.js.map