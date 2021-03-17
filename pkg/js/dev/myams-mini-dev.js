/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/myams-mini.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/jsrender/jsrender.js":
/*!*******************************************!*\
  !*** ./node_modules/jsrender/jsrender.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! JsRender v1.0.10: http://jsviews.com/#jsrender */
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

var versionNumber = "v1.0.10",
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

	if ((converter = tag.convert) && "" + converter === converter) {
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
	if ("" + itemName === itemName) {
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
				tag._.ths = tagCtx.params.props.this; // Tag has a this=expr binding, to get javascript reference to tag instance
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
	} else if ("" + tagDef === tagDef) {
		tagDef = {template: tagDef};
	}

	if (baseTag = tagDef.baseTag) {
		tagDef.flow = !!tagDef.flow; // Set flow property, so defaults to false even if baseTag has flow=true
		baseTag = "" + baseTag === baseTag
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
		compiledDef.template = "" + tmpl === tmpl ? ($templates[tmpl] || $templates(tmpl)) : tmpl;
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
		if (("" + value === value) || value.nodeType > 0 && (elem = value)) {
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
			if (prop + "" !== prop) {
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
		data = data + "" === data
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
		data = data + "" === data
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
						assigned[j] = found = id + "" === id
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
			if (prop + "" !== prop) {
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
		if (name && "" + name !== name) { // name must be a string
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
		blockTagCheck("" + loc !== loc && (+loc[10] === loc[10]) && loc[0]);
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

	if ("" + tmpl === tmpl) {
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
		if ("" + node === node) {
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
	if (directSort || sort && "" + sort === sort) {
		// Temporary mapped array holds objects with index and sort-value
		mapped = value.map(function(item, i) {
			item = directSort ? item : getPathObject(item, sort);
			return {i: i, v: "" + item === item ? item.toLowerCase() : item};
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
  return "" + text === text ? text.replace(rDataEncode, getCharEntity) : text;
}

function dataUnencode(text) {
  // Unencode just < > and & - intended for 'safe data' along with {{:}} rather than {{>}}
  return "" + text === text ? text.replace(rDataUnencode, getCharFromEntity) : text;
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
				$subSettings.onError = debugMode + "" === debugMode
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

/***/ "./src/js/ext-base.js":
/*!****************************!*\
  !*** ./src/js/ext-base.js ***!
  \****************************/
/*! exports provided: init, getModules, initPage, initContent, clearContent, getObject, getFunctionByName, executeFunctionByName, getSource, getScript, getCSS, getQueryVar, generateId, generateUUID, switchIcon, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getModules", function() { return getModules; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initPage", function() { return initPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initContent", function() { return initContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearContent", function() { return clearContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObject", function() { return getObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFunctionByName", function() { return getFunctionByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "executeFunctionByName", function() { return executeFunctionByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSource", function() { return getSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScript", function() { return getScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCSS", function() { return getCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQueryVar", function() { return getQueryVar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateId", function() { return generateId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUUID", function() { return generateUUID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchIcon", function() { return switchIcon; });
/* harmony import */ var _ext_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ext-registry */ "./src/js/ext-registry.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
    camelCase: function camelCase() {
      if (!this) {
        return this;
      }

      return this.replace(/-(.)/g, function (dash, rest) {
        return rest.toUpperCase();
      });
    },

    /**
     * Replace camelCase string with dashed name
     */
    deCase: function deCase() {
      if (!this) {
        return this;
      }

      return this.replace(/[A-Z]/g, function (cap) {
        return "-".concat(cap.toLowerCase());
      });
    },

    /**
     * Convert first letter only to lowercase
     */
    initLowerCase: function initLowerCase() {
      if (!this) {
        return this;
      }

      return this.charAt(0).toLowerCase() + this.slice(1);
    },

    /**
     * Convert URL params to object
     */
    unserialize: function unserialize() {
      if (!this) {
        return this;
      }

      var str = decodeURIComponent(this),
          chunks = str.split('&'),
          obj = {};

      var _iterator = _createForOfIteratorHelper(chunks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var chunk = _step.value;

          var _chunk$split = chunk.split('=', 2),
              _chunk$split2 = _slicedToArray(_chunk$split, 2),
              key = _chunk$split2[0],
              val = _chunk$split2[1];

          obj[key] = val;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return obj;
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
    extendPrefix: function extendPrefix(source, prefix, getter) {
      for (var _len = arguments.length, extensions = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        extensions[_key - 3] = arguments[_key];
      }

      for (var _i2 = 0, _extensions = extensions; _i2 < _extensions.length; _i2++) {
        var extension = _extensions[_i2];

        for (var _i3 = 0, _Object$entries = Object.entries(extension); _i3 < _Object$entries.length; _i3++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
              key = _Object$entries$_i[0],
              value = _Object$entries$_i[1];

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
    extendOnly: function extendOnly(source, getter) {
      for (var _len2 = arguments.length, extensions = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        extensions[_key2 - 2] = arguments[_key2];
      }

      for (var _i4 = 0, _extensions2 = extensions; _i4 < _extensions2.length; _i4++) {
        var extension = _extensions2[_i4];

        for (var _i5 = 0, _Object$entries2 = Object.entries(extension); _i5 < _Object$entries2.length; _i5++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i5], 2),
              key = _Object$entries2$_i[0],
              value = _Object$entries2$_i[1];

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
    exists: function exists() {
      return $(this).length > 0;
    },

    /**
     * Get object if it supports given CSS class,
     * otherwise look for parents
     */
    objectOrParentWithClass: function objectOrParentWithClass(klass) {
      if (this.hasClass(klass)) {
        return this;
      }

      return this.parents(".".concat(klass));
    },

    /**
     * Build an array of attributes of the given selection
     */
    listattr: function listattr(attr) {
      var result = [];
      this.each(function (index, element) {
        result.push($(element).attr(attr));
      });
      return result;
    },

    /**
     * CSS style function - get or set object style attribute
     * Code from Aram Kocharyan on stackoverflow.com
     */
    style: function style(styleName, value, priority) {
      var result = this;
      this.each(function (idx, node) {
        // Ensure we have a DOM node
        if (typeof node === 'undefined') {
          return false;
        } // CSSStyleDeclaration


        var style = node.style; // Getter/Setter

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
    removeClassPrefix: function removeClassPrefix(prefix) {
      this.each(function (i, it) {
        var classes = it.className.split(/\s+/).map(function (item) {
          return item.startsWith(prefix) ? "" : item;
        });
        it.className = $.trim(classes.join(" "));
      });
      return this;
    }
  });
  $(document).ready(function () {
    var html = $('html');
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
  var modules = [];
  var mods = element.data('ams-modules');

  if (typeof mods === 'string') {
    modules = modules.concat(mods.trim().split(/[\s,;]+/));
  } else if (mods) {
    for (var _i6 = 0, _Object$entries3 = Object.entries(mods); _i6 < _Object$entries3.length; _i6++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i6], 2),
          name = _Object$entries3$_i[0],
          path = _Object$entries3$_i[1];

      var entry = {};
      entry[name] = path;
      modules.push(entry);
    }
  }

  $('[data-ams-modules]', element).each(function (idx, elt) {
    var mods = $(elt).data('ams-modules');

    if (typeof mods === 'string') {
      modules = modules.concat(mods.trim().split(/[\s,;]+/));
    } else if (mods) {
      for (var _i7 = 0, _Object$entries4 = Object.entries(mods); _i7 < _Object$entries4.length; _i7++) {
        var _Object$entries4$_i = _slicedToArray(_Object$entries4[_i7], 2),
            _name = _Object$entries4$_i[0],
            _path = _Object$entries4$_i[1];

        var _entry = {};
        _entry[_name] = _path;
        modules.push(_entry);
      }
    }
  });
  return _toConsumableArray(new Set(modules));
}
/**
 * Main page initialization
 */

function initPage() {
  return MyAMS.require('i18n').then(function () {
    MyAMS.dom = getDOM();
    var modules = getModules(MyAMS.dom.root);

    MyAMS.require.apply(MyAMS, _toConsumableArray(modules)).then(function () {
      var _iterator2 = _createForOfIteratorHelper(MyAMS.config.modules),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var moduleName = _step2.value;
          executeFunctionByName("MyAMS.".concat(moduleName, ".init"));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      MyAMS.core.executeFunctionByName(MyAMS.dom.page.data('ams-init-content') || MyAMS.config.initContent);
    });
  });
}
/**
 * Main content initialization; this function will initialize all plug-ins, callbacks and
 * events listeners in the selected element
 *
 * @param element: source element to initialize
 */

function initContent() {
  var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  if (element === null) {
    element = $('body');
  }

  element = $(element);

  function initElementModules() {
    var _iterator3 = _createForOfIteratorHelper(MyAMS.config.modules),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var moduleName = _step3.value;
        executeFunctionByName("MyAMS.".concat(moduleName, ".initElement"), document, element);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  return new Promise(function (resolve, reject) {
    var modules = getModules(element);
    return MyAMS.require.apply(MyAMS, _toConsumableArray(modules)).then(function () {
      element.trigger('before-init.ams.content');

      if (MyAMS.config.useRegistry && !element.data('ams-disable-registry')) {
        MyAMS.registry.initElement(element).then(function () {
          initElementModules();
        }).then(function () {
          MyAMS.registry.run(element);
          element.trigger('after-init.ams.content');
        }).then(resolve);
      } else {
        initElementModules();
        resolve();
      }
    }, function () {
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

  return new Promise(function (resolve, reject) {
    var veto = {
      veto: false
    };
    $(document).trigger('clear.ams.content', [veto, element]);

    if (!veto.veto) {
      MyAMS.require('events').then(function () {
        $(MyAMS.events.getHandlers(element, 'clear.ams.content')).each(function (idx, elt) {
          $(elt).trigger('clear.ams.content', [veto]);

          if (veto.veto) {
            return false;
          }
        });

        if (!veto.veto) {
          $(MyAMS.events.getHandlers(element, 'cleared.ams.content')).each(function (idx, elt) {
            $(elt).trigger('cleared.ams.content');
          });
          $(document).trigger('cleared.ams.content', [element]);
        }

        resolve(!veto.veto);
      }, function () {
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

  var namespaces = objectName.split('.');
  context = context === undefined || context === null ? window : context;

  var _iterator4 = _createForOfIteratorHelper(namespaces),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var name = _step4.value;

      try {
        context = context[name];
      } catch (exc) {
        return undefined;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
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

  var namespaces = functionName.split("."),
      func = namespaces.pop();
  context = context === undefined || context === null ? window : context;

  var _iterator5 = _createForOfIteratorHelper(namespaces),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var name = _step5.value;

      try {
        context = context[name];
      } catch (e) {
        return undefined;
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
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

function executeFunctionByName(functionName, context
/*, args */
) {
  var func = getFunctionByName(functionName, window);

  if (typeof func === 'function') {
    var args = Array.prototype.slice.call(arguments, 2);
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
  return url.replace(/{[^{}]*}/g, function (match) {
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
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    var defaults = {
      dataType: 'script',
      url: getSource(url),
      cache: MyAMS.env.devmode,
      async: true
    };
    var settings = $.extend({}, defaults, options);
    $.ajax(settings).then(function () {
      resolve(url);
    }, function (xhr, status, error) {
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
  return new Promise(function (resolve
  /*, reject */
  ) {
    var head = $('HEAD');
    var style = $("style[data-ams-id=\"".concat(name, "\"]"), head);

    if (style.length === 0) {
      style = $('<style>').attr('data-ams-id', name).text("@import \"".concat(getSource(url), "\";")).appendTo(head);
      var styleInterval = setInterval(function () {
        try {
          // eslint-disable-next-line no-unused-vars
          var _check = style[0].sheet.cssRules; // Is only populated when file is loaded

          clearInterval(styleInterval);
          resolve(true);
        } catch (e) {// CSS is not loaded yet, just wait...
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
  } // Dynamic replacement RegExp


  var regex = new RegExp(".*?[&\\?]".concat(varName, "=(.*?)&.*")); // Apply RegExp to the query string

  var val = src.replace(regex, "$1"); // If the string is the same, we didn't find a match - return null

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
  var d = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
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
 */

function switchIcon(element, fromClass, toClass) {
  if (typeof element === 'string') {
    element = $(element);
  }

  if (MyAMS.config.useSVGIcons) {
    var iconDef = FontAwesome.findIconDefinition({
      iconName: toClass
    });
    element.html(FontAwesome.icon(iconDef).html);
  } else {
    element.removeClass("fa-".concat(fromClass)).addClass("fa-".concat(toClass));
  }
}
/**
 * MyAMS base functions
 *
 * @type {{devmode: boolean, baseURL: string, devext: string}}
 */

function getEnv($) {
  var script = $('script[src*="/myams.js"], script[src*="/myams-dev.js"], ' + 'script[src*="/myams-core.js"], script[src*="/myams-core-dev.js"], ' + 'script[src*="/myams-mini.js"], script[src*="/myams-mini-dev.js"]'),
      src = script.attr('src'),
      devmode = src ? src.indexOf('-dev.js') >= 0 : true; // testing mode

  return {
    bundle: src ? src.indexOf('-core') < 0 : true,
    // testing mode
    devmode: devmode,
    devext: devmode ? '-dev' : '',
    extext: devmode ? '' : '.min',
    baseURL: src ? src.substring(0, src.lastIndexOf('/') + 1) : '/'
  };
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
 * @type {Object}:
 *      modules: array of loaded extension modules
 * 		ajaxNav: true if AJAX navigation is enabled
 * 	    enableFastclick: true is "smart-click" extension is to be activated on mobile devices
 * 		menuSpeed: menu speed, in miliseconds
 * 	    initPage: dotted name of MyAMS global init function
 * 	    initContent: dotted name of MyAMS content init function
 * 	    alertContainerCLass: class of MyAMS alerts container
 * 		safeMethods: HTTP methods which can be used without CSRF cookie verification
 * 		csrfCookieName: CSRF cookie name
 * 		csrfHeaderName: CSRF header name
 *      enableTooltips: global tooltips enable flag
 *      enableHtmlTooltips: allow HTML code in tooltips
 * 		warnOnFormChange: flag to specify if form changes should be warned
 * 		formChangeCallback: global form change callback
 * 		isMobile: boolean, true if device is detected as mobile
 * 	    device: string: 'mobile' or 'desktop'
 */


var isMobile = /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()),
    config = {
  modules: [],
  ajaxNav: true,
  enableFastclick: true,
  useSVGIcons: window.FontAwesome !== undefined && FontAwesome.config.autoReplaceSvg === 'nest',
  menuSpeed: 235,
  initPage: 'MyAMS.core.initPage',
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
  initContent: initContent,
  clearContent: clearContent
};
var MyAMS = {
  $: $,
  env: getEnv($),
  config: config,
  core: core,
  registry: _ext_registry__WEBPACK_IMPORTED_MODULE_0__["registry"]
};
window.MyAMS = MyAMS;
/* harmony default export */ __webpack_exports__["default"] = (MyAMS);

/***/ }),

/***/ "./src/js/ext-registry.js":
/*!********************************!*\
  !*** ./src/js/ext-registry.js ***!
  \********************************/
/*! exports provided: registry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registry", function() { return registry; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
var Plugin = /*#__PURE__*/function () {
  function Plugin(name) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var loaded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Plugin);

    // plug-in name
    this.name = name; // plug-in source URL

    this.src = props.src; // plug-in associated CSS

    this.css = props.css; // plug-in callbacks

    this.callbacks = [];

    if (props.callback) {
      this.callbacks.push({
        callback: props.callback,
        context: props.context || 'body'
      });
    } // async plug-ins are loaded simultaneously; sync ones are loaded and called after...


    this.async = props.async === undefined ? true : props.async; // loaded flag

    this.loaded = loaded;
  }
  /**
   * Load plug-in from remote script
   *
   * @returns {Promise<void>|*}
   */


  _createClass(Plugin, [{
    key: "load",
    value: function load() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.loaded) {
          var result = MyAMS.core.getScript(_this.src);

          if (_this.css) {
            result = result.then(function () {
              MyAMS.core.getCSS(_this.css, "".concat(_this.name, "_css"));
            });
          }

          result.then(function () {
            _this.loaded = true;
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

  }, {
    key: "run",
    value: function run(element) {
      var _iterator = _createForOfIteratorHelper(this.callbacks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var callback = _step.value;

          if (typeof callback.callback === 'string') {
            console.debug("Resolving callback ".concat(callback.callback));
            callback.callback = MyAMS.core.getFunctionByName(callback.callback) || callback.callback;
          }

          callback.callback(element, callback.context);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Plugin;
}();
/**
 * Plug-ins registry class
 */


var PluginsRegistry = /*#__PURE__*/function () {
  function PluginsRegistry() {
    _classCallCheck(this, PluginsRegistry);

    this.plugins = new Map();
  }
  /**
   * Register new plug-in
   *
   * @param props: plugin function caller, or object containing plug-in properties
   * @param name: plug-in unique name
   */


  _createClass(PluginsRegistry, [{
    key: "register",
    value: function register(props, name) {
      // check arguments
      if (!name && Object.prototype.hasOwnProperty.call(props, 'name')) {
        name = props.name;
      } // check for already registered plug-in


      var plugins = this.plugins;

      if (plugins.has(name)) {
        if (window.console) {
          console.debug && console.debug("Plug-in ".concat(name, " is already registered!"));
        }

        var plugin = plugins.get(name);
        var addContext = true;

        var _iterator2 = _createForOfIteratorHelper(plugin.callbacks),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var callback = _step2.value;

            if (callback.callback === props.callback && callback.context === props.context) {
              addContext = false;
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        if (addContext) {
          plugin.callbacks.push({
            callback: props.callback,
            context: props.context || 'body'
          });
        }

        return plugin;
      } // register new plug-in


      if (typeof props === 'string') {
        // callable name
        props = MyAMS.core.getFunctionByName(props);
      }

      if (typeof props === 'function') {
        // callable object
        plugins.set(name, new Plugin(name, {
          callback: props
        }, true));
      } else if (_typeof(props) === 'object') {
        // plug-in properties object
        plugins.set(name, new Plugin(name, props, !props.src));
      } // check callback


      return plugins.get(name);
    }
    /**
     * Load plug-ins declared into DOM element
     *
     * @param element
     */

  }, {
    key: "load",
    value: function load(element) {
      var _this2 = this;

      // scan element for new plug-ins
      var asyncPlugins = [],
          syncPlugins = [];
      $('[data-ams-plugins]', element).each(function (idx, elt) {
        var source = $(elt),
            names = source.data('ams-plugins');
        var plugin, props;

        if (typeof names === 'string') {
          var _iterator3 = _createForOfIteratorHelper(names.split(/[\s,;]+/)),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var name = _step3.value;
              var lowerName = name.toLowerCase();
              props = {
                src: source.data("ams-plugin-".concat(lowerName, "-src")),
                css: source.data("ams-plugin-".concat(lowerName, "-css")),
                callback: source.data("ams-plugin-".concat(lowerName, "-callback")),
                context: source,
                async: source.data("ams-plugin-".concat(lowerName, "-async"))
              };
              plugin = _this2.register(props, name);

              if (!plugin.loaded) {
                if (props.async === false) {
                  syncPlugins.push(plugin.load());
                } else {
                  asyncPlugins.push(plugin.load());
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          // JSON plug-in declaration
          var _iterator4 = _createForOfIteratorHelper($.isArray(names) ? names : [names]),
              _step4;

          try {
            for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
              props = _step4.value;
              $.extend(props, {
                context: source
              });
              plugin = _this2.register(props);

              if (!plugin.loaded) {
                if (plugin.async === false) {
                  syncPlugins.push(plugin.load());
                } else {
                  asyncPlugins.push(plugin.load());
                }
              }
            }
          } catch (err) {
            _iterator4.e(err);
          } finally {
            _iterator4.f();
          }
        }
      }); // load plug-ins

      var result = $.when.apply($, asyncPlugins); // eslint-disable-next-line no-unused-vars

      for (var _i = 0, _syncPlugins = syncPlugins; _i < _syncPlugins.length; _i++) {
        var plugin = _syncPlugins[_i];
        result = result.done(function () {});
      }

      return result;
    }
    /**
     * Run registered plug-ins on given element
     *
     * @param element: source element
     * @param names: array list of plug-ins to activate, or all registered plug-ins if null
     */

  }, {
    key: "run",
    value: function run(element) {
      var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      // check for disabled plug-ins
      var disabled = new Set();
      $('[data-ams-plugins-disabled]', element).each(function (idx, elt) {
        var names = $(elt).data('ams-plugins-disabled').split(/[\s,;]+/);

        var _iterator5 = _createForOfIteratorHelper(names),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var name = _step5.value;
            disabled.add(name);
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      });
      var plugins = this.plugins;

      if (names) {
        // only run given plug-ins, EVEN DISABLED ONES
        var _iterator6 = _createForOfIteratorHelper(names),
            _step6;

        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var name = _step6.value;

            if (plugins.has(name)) {
              plugins.get(name).run(element);
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      } else {
        // run all plug-ins, except disabled ones
        var _iterator7 = _createForOfIteratorHelper(plugins.entries()),
            _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var _step7$value = _slicedToArray(_step7.value, 2),
                _name = _step7$value[0],
                plugin = _step7$value[1];

            if (disabled.has(_name)) {
              continue;
            }

            plugin.run(element);
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
    }
  }]);

  return PluginsRegistry;
}();

var plugins = new PluginsRegistry();
var registry = {
  /**
   * Plug-ins registry
   */
  plugins: plugins,

  /**
   * Initialize plug-ins registry from DOM
   *
   * @param element: source element to initialize from
   */
  initElement: function initElement() {
    var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#content';
    // populate data attributes
    MyAMS.registry.initData(element); // load plug-ins from given DOM element

    return plugins.load(element);
  },

  /**
   * Register a new plug-in through Javascript instead of HTML data attributes
   *
   * @param plugin: callable object, or object containing plug-in properties
   * @param name: plug-in name, used if @plugin is a function
   * @param callback: callback function which can be called after plug-in registration
   */
  register: function register(plugin, name, callback) {
    return plugins.register(plugin, name, callback);
  },

  /**
   * Data attributes initializer
   *
   * This function converts a single "data-ams-data" attribute into a set of several "data-*"
   * attributes.
   * This can be used into HTML templates engines which don't allow to create dynamic attributes
   * easilly.
   *
   * @param element: parent element
   */
  initData: function initData(element) {
    $('[data-ams-data]', element).each(function (idx, elt) {
      var $elt = $(elt),
          data = $elt.data('ams-data');

      if (data) {
        for (var name in data) {
          if (!Object.prototype.hasOwnProperty.call(data, name)) {
            continue;
          }

          var elementData = data[name];

          if (typeof elementData !== 'string') {
            elementData = JSON.stringify(elementData);
          }

          $elt.attr("data-".concat(name), elementData);
        }
      }
    });
  },

  /**
   * Run registered plug-ins on given element
   *
   * @param element: DOM element
   * @param names: names of plug-in to run on given element; all if null
   */
  run: function run(element) {
    var names = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    return plugins.run(element, names);
  }
};

/***/ }),

/***/ "./src/js/ext-require.js":
/*!*******************************!*\
  !*** ./src/js/ext-require.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return myams_require; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* global MyAMS */

/**
 * MyAMS dynamic module loader
 */
var $ = MyAMS.$;

function getModule(module) {
  var moduleSrc;

  if (module.startsWith('http://') || module.startsWith('https://')) {
    moduleSrc = module;
  } else if (module.endsWith('.js')) {
    // custom module with relative path
    moduleSrc = module;
  } else {
    // standard MyAMS module
    moduleSrc = "".concat(MyAMS.env.baseURL, "mod-").concat(module).concat(MyAMS.env.devext, ".js");
  }

  return MyAMS.core.getScript(moduleSrc, {
    async: true
  }, console.error);
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

  return new Promise(function (resolve, reject) {
    var names = [],
        deferred = [],
        loaded = MyAMS.config.modules;

    var _iterator = _createForOfIteratorHelper(modules),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var module = _step.value;

        if (typeof module === 'string') {
          if (loaded.indexOf(module) < 0) {
            names.push(module);
            deferred.push(getModule(module));
          }
        } else if ($.isArray(module)) {
          // strings array
          var _iterator3 = _createForOfIteratorHelper(module),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var name = _step3.value;

              if (loaded.indexOf(name) < 0) {
                names.push(name);
                deferred.push(getModule(name));
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          // object
          for (var _i = 0, _Object$entries = Object.entries(module); _i < _Object$entries.length; _i++) {
            var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                _name = _Object$entries$_i[0],
                src = _Object$entries$_i[1];

            if (loaded.indexOf(_name) < 0) {
              names.push(_name);
              deferred.push(getModule(src));
            }
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    $.when.apply($, deferred).then(function () {
      var _iterator2 = _createForOfIteratorHelper(names),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var moduleName = _step2.value;

          if (loaded.indexOf(moduleName) < 0) {
            loaded.push(moduleName);
            MyAMS.core.executeFunctionByName("MyAMS.".concat(moduleName, ".init"));
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      resolve();
    }, function () {
      reject("Can't load requested modules (".concat(names, ")!"));
    });
  });
}

/***/ }),

/***/ "./src/js/mod-ajax.js":
/*!****************************!*\
  !*** ./src/js/mod-ajax.js ***!
  \****************************/
/*! exports provided: ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ajax", function() { return ajax; });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* global jQuery, MyAMS, Cookies */

/**
 * MyAMS AJAX features
 */
var $ = MyAMS.$;
/**
 * CSRF cookie checker
 *
 * Automatically set CSRF request header when CSRF cookie was specified.
 *
 * @param request: outgoing request
 */

function checkCsrfHeader(request
/*, options */
) {
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

        var _iterator = _createForOfIteratorHelper(source),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var src = _step.value;
            deferred.push(MyAMS.core.getScript(src));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
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
        data: $.param(params || null),
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
        data: $.param(data || null),
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
    return function (source, options) {
      var url = options.url;
      delete options.url;
      return MyAMS.ajax.post(url, options).then(MyAMS.ajax.handleJSON);
    };
  },

  /**
   * Extract datatype and result from response object
   */
  getResponse: function getResponse(request) {
    var dataType = 'unknown',
        result;

    if (request) {
      var contentType = request.getResponseHeader('content-type');

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
  handleJSON: function handleJSON(result, form, target) {
    function closeForm() {
      return new Promise(function (resolve, reject) {
        if (form !== undefined) {
          MyAMS.require('form').then(function () {
            MyAMS.form.resetChanged(form);
          }).then(function () {
            if (result.closeForm !== false) {
              MyAMS.require('modal').then(function () {
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

    var url = null,
        loadTarget = null;
    var status = result.status,
        promises = [];

    if (target instanceof jQuery && !target.length) {
      target = null;
    }

    switch (status) {
      case 'alert':
        if (window.alert) {
          var alert = result.alert;
          window.alert("".concat(alert.title, "\n\n").concat(alert.content));
        }

        break;

      case 'error':
        promises.push(MyAMS.require('error').then(function () {
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
        promises.push(MyAMS.require('modal').then(function () {
          MyAMS.modal.open(result.location);
        }));
        break;

      case 'reload':
        closeForm();
        url = result.location || window.location.hash;

        if (url.startsWith('#')) {
          url = url.substr(1);
        }

        loadTarget = $(result.target || target || '#content');
        promises.push(MyAMS.require('skin').then(function () {
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
          if (window.location.href === url) {
            window.location.reload();
          } else {
            window.location.href = url;
          }
        }

        break;

      default:
        if (result.code) {
          // Standard HTTP error?
          promises.push(MyAMS.require('error').then(function () {
            MyAMS.error.showHTTPError(result);
          }));
        } else {
          if (window.console) {
            console.warn && console.warn("Unhandled JSON response status: ".concat(status));
          }
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

        promises.push(MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, container).then(function () {
          if (!content.keepHidden) {
            container.removeClass('hidden');
          }
        }));
      }
    } // Multiple contents response


    if (result.contents) {
      var _iterator2 = _createForOfIteratorHelper(result.contents),
          _step2;

      try {
        var _loop = function _loop() {
          var content = _step2.value;
          var container = $(content.target);

          if (content.text) {
            container.text(content.text);
          } else {
            container.html(content.html);
          }

          promises.push(MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, container).then(function () {
            if (!content.keepHidden) {
              container.removeClass('hidden');
            }
          }));
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } // Response with message


    if (result.message && !result.code) {
      promises.push(MyAMS.require('alert').then(function () {
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
      }));
    } // Response with message box


    if (result.messagebox) {
      promises.push(MyAMS.require('alert').then(function () {
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
      }));
    } // Response with small box


    if (result.smallbox) {
      promises.push(MyAMS.require('alert').then(function () {
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
      }));
    } // Response with single event


    if (result.event) {
      form.trigger(result.event, result.eventOptions);
    } // Response with multiple events


    if (result.events) {
      var _iterator3 = _createForOfIteratorHelper(result.events),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var event = _step3.value;

          if (typeof event === 'string') {
            form.trigger(event, result.eventOptions);
          } else {
            form.trigger(event.event, event.options);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    } // Response with single callback


    if (result.callback) {
      promises.push(MyAMS.core.executeFunctionByName(result.callback, document, form, result.options));
    } // Response with multiple callbacks


    if (result.callbacks) {
      var _iterator4 = _createForOfIteratorHelper(result.callbacks),
          _step4;

      try {
        var _loop2 = function _loop2() {
          var callback = _step4.value;

          if (typeof callback === 'string') {
            promises.push(MyAMS.core.executeFunctionByName(callback, document, form, result.options));
          } else {
            promises.push(MyAMS.require(callback.module || []).then(function () {
              MyAMS.core.executeFunctionByName(callback.callback, document, form, callback.options);
            }));
          }
        };

        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _loop2();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }

    return Promise.all(promises);
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

if (typeof jest === 'undefined') {
  // don't check cookies extension in test mode!
  ajax.check(window.Cookies, "".concat(MyAMS.env.baseURL, "../ext/js-cookie").concat(MyAMS.env.extext, ".js")).then(function () {
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
/*! exports provided: alert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alert", function() { return alert; });
/* global MyAMS */

/**
 * MyAMS alerts management
 */
var $ = MyAMS.$;

if (!$.templates) {
  var jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");

  $.templates = jsrender.templates;
}
/**
 * Alert template
 */


var ALERT_TEMPLATE_STRING = "\n\t<div class=\"alert alert-{{:status}}\" role=\"alert\">\n\t\t<button type=\"button\" class=\"close\" data-dismiss=\"alert\" \n\t\t\t\taria-label=\"{{*: MyAMS.i18n.BTN_CLODE }}\">\n\t\t\t<i class=\"fa fa-times\" aria-hidden=\"true\"></i>\t\n\t\t</button>\n\t\t{{if header}}\n\t\t<h5 class=\"alert-heading\">{{:header}}</h5>\n\t\t{{/if}}\n\t\t{{* if (typeof message === 'string') { }}\n\t\t<ul>\n\t\t\t<li>{{:message}}</li>\n\t\t</ul>\n\t\t{{* } else { }}\n\t\t<ul>\n\t\t{{for message}}\n\t\t\t<li>{{:}}</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{* } }}\n\t</div>";
var ALERT_TEMPLATE = $.templates({
  markup: ALERT_TEMPLATE_STRING,
  allowCode: true
});
/**
 * Standard message template
 */

var MESSAGE_TEMPLATE_STRING = "\n\t<div role=\"alert\" class=\"toast toast-{{:status}} fade hide\"\n\t\t data-autohide=\"{{*: Boolean(data.timeout !== 0).toString() }}\"\n\t\t data-delay=\"{{: timeout || 5000}}\">\n\t\t<div class=\"toast-header\">\n\t\t{{if icon}}\n\t\t\t<i class=\"fa {{:icon}} mr-2\"></i>\n\t\t{{/if}}\n\t\t\t<strong class=\"mr-auto\">{{:title}}</strong>\n\t\t{{if !hideTimestamp}}\n\t\t\t<small>{{*: new Date().toLocaleTimeString() }}</small>\n\t\t{{/if}}\n\t\t\t<button type=\"button\" class=\"ml-2 mb-1 close\" data-dismiss=\"toast\">\n\t\t\t\t<i class=\"fa fa-times text-white\"></i>\n\t\t\t</button>\n\t\t</div>\n\t\t<div class=\"toast-body\">\n\t\t\t<div>\n\t\t\t{{if content}}\n\t\t\t\t{{:content}}\n\t\t\t{{else}}\n\t\t\t\t<p>{{:message}}</p>\n\t\t\t{{/if}}\n\t\t\t</div>\n\t\t</div>\n\t</div>";
var MESSAGE_TEMPLATE = $.templates({
  markup: MESSAGE_TEMPLATE_STRING,
  allowCode: true
});
/**
 * Small box message template
 */

var SMALLBOX_TEMPLATE_STRING = "\n\t<div role=\"alert\" class=\"toast toast-{{:status}} fade hide\"\n\t\t data-autohide=\"true\"\n\t\t data-delay=\"{{: timeout || 5000}}\">\n\t\t<div class=\"toast-body\">\n\t\t\t<div>\n\t\t\t{{if content}}\n\t\t\t\t{{:content}}\n\t\t\t{{else}}\n\t\t\t\t<span>\n\t\t\t\t\t{{if icon}}\n\t\t\t\t\t<i class=\"fa {{:icon}} mr-2\"></i>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t{{:message}}\n\t\t\t\t</span>\n\t\t\t{{/if}}\n\t\t\t</div>\n\t\t</div>\n\t</div>";
var SMALLBOX_TEMPLATE = $.templates({
  markup: SMALLBOX_TEMPLATE_STRING,
  allowCode: true
});
/**
 * Big box message template
 */

var BIGBOX_TEMPLATE_STRING = "\n\t<div class=\"modal fade\" data-backdrop=\"static\" role=\"dialog\">\n\t\t<div class=\"modal-dialog\">\n\t\t\t<div class=\"modal-content\">\n\t\t\t\t<div class=\"modal-header alert-{{:status}}\">\n\t\t\t\t\t<h5 class=\"modal-title\">\n\t\t\t\t\t{{if icon}}\n\t\t\t\t\t\t<i class=\"fa {{:icon}} mr-2\"></i>\n\t\t\t\t\t{{/if}}\n\t\t\t\t\t{{:title}}\n\t\t\t\t\t</h5>\n\t\t\t\t\t<button type=\"button\" class=\"close\" \n\t\t\t\t\t\t\tdata-dismiss=\"modal\" data-modal-dismiss-value=\"cancel\">\n\t\t\t\t\t\t<i class=\"fa fa-times\"></i>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t<p>{{:message}}</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"modal-footer\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" \n\t\t\t\t\t\t\tdata-dismiss=\"modal\" data-modal-dismiss-value=\"success\">\n\t\t\t\t\t\t{{*: data.successLabel || MyAMS.i18n.BTN_OK }}\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-secondary\" \n\t\t\t\t\t\t\tdata-dismiss=\"modal\" data-modal-dismiss-value=\"cancel\">\n\t\t\t\t\t\t{{*: data.cancelLabel || MyAMS.i18n.BTN_CANCEL }}\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>";
var BIGBOX_TEMPLATE = $.templates({
  markup: BIGBOX_TEMPLATE_STRING,
  allowCode: true
});
/**
 * Main alert object
 */

var alert = {
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
  alert: function alert() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var status = props.status || 'info';

    if (status === 'error') {
      status = 'danger';
    }

    props.status = status;
    $(".alert-".concat(status), props.parent).not('.persistent').remove();
    $(ALERT_TEMPLATE.render(props)).prependTo(props.parent);

    MyAMS.require('ajax').then(function () {
      MyAMS.ajax.check($.fn.scrollTo, "".concat(MyAMS.env.baseURL, "../ext/jquery-scrollto").concat(MyAMS.env.extext, ".js")).then(function () {
        $('#content').scrollTo(props.parent, {
          offset: -15
        });
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
  messageBox: function messageBox() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var status = props.status || 'info';

    if (status === 'error') {
      status = 'danger';
    }

    props.status = status;
    var wrapper = $(".".concat(MyAMS.config.alertsContainerClass));

    if (wrapper.length === 0) {
      wrapper = $('<div></div>').addClass(MyAMS.config.alertsContainerClass).appendTo(MyAMS.dom.root);
    }

    $(MESSAGE_TEMPLATE.render(props)).appendTo(wrapper).toast('show').on('hidden.bs.toast', function (evt) {
      $(evt.currentTarget).remove();
    });
  },

  /**
   * Display small notification message on top right
   *
   * @param props
   */
  smallBox: function smallBox() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var status = props.status || 'info';

    if (status === 'error') {
      status = 'danger';
    }

    props.status = status;
    var wrapper = $(".".concat(MyAMS.config.alertsContainerClass));

    if (wrapper.length === 0) {
      wrapper = $('<div></div>').addClass(MyAMS.config.alertsContainerClass).appendTo(MyAMS.dom.root);
    }

    $(SMALLBOX_TEMPLATE.render(props)).appendTo(wrapper).toast('show').on('hidden.bs.toast', function (evt) {
      $(evt.currentTarget).remove();
    });
  },

  /**
   * Modal message box
   *
   * @param props
   * @returns {Promise<unknown>}
   */
  bigBox: function bigBox() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return new Promise(function (resolve, reject) {
      var status = props.status || 'info';

      if (status === 'error') {
        status = 'danger';
      }

      props.status = status;

      MyAMS.require('modal').then(function () {
        var alert = $(BIGBOX_TEMPLATE.render(props)).appendTo(MyAMS.dom.root);
        alert.on('hidden.bs.modal', function () {
          resolve(alert.data('modal-result'));
          alert.remove();
        });
        alert.modal('show');
      }, function () {
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
/*! exports provided: callbacks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callbacks", function() { return callbacks; });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* global MyAMS */

/**
 * MyAMS callbacks management
 */
var $ = MyAMS.$;
var _initialized = false;
var callbacks = {
  init: function init() {
    if (_initialized) {
      return;
    }

    _initialized = true;
  },
  initElement: function initElement(element) {
    return new Promise(function (resolve, reject) {
      var deferred = [];
      $('[data-ams-callback]', element).each(function (idx, elt) {
        var data = $(elt).data();
        var callbacks = data.amsCallback;

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

        var _iterator = _createForOfIteratorHelper(callbacks),
            _step;

        try {
          var _loop = function _loop() {
            var callback = _step.value;
            var callname = void 0,
                callable = void 0,
                source = void 0,
                options = void 0;

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
                deferred.push(MyAMS.core.getScript(source).then(function () {
                  callable = MyAMS.core.getFunctionByName(callname);

                  if (typeof callable === 'undefined') {
                    console.warn("Missing callback ".concat(callname, "!"));
                  } else {
                    callable.call(document, elt, options);
                  }
                }));
              } else {
                console.warn("Missing source for undefined callback ".concat(callback, "!"));
              }
            } else {
              deferred.push(Promise.resolve(callable.call(document, elt, options)));
            }
          };

          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            _loop();
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
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
/*! exports provided: clipboard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clipboard", function() { return clipboard; });
/* global MyAMS, clipboardData */

/**
 * MyAMS i18n translations
 */
var $ = MyAMS.$;
/**
 * Internal function used to copy text to clipboard
 *
 * @param text: text to be copied
 */

function doCopy(text) {
  var copied = false;

  if (window.clipboardData && window.clipboardData.setData) {
    // IE specific code
    copied = clipboardData.setData("Text", text);
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var textarea = $('<textarea>');
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
    MyAMS.require('i18n', 'alert').then(function () {
      MyAMS.alert.smallBox({
        status: 'success',
        message: text.length > 1 ? MyAMS.i18n.CLIPBOARD_TEXT_COPY_OK : MyAMS.i18n.CLIPBOARD_CHARACTER_COPY_OK,
        icon: 'fa-info-circle',
        timeout: 3000
      });
    });
  } else {
    MyAMS.require('i18n').then(function () {
      prompt(MyAMS.i18n.CLIPBOARD_COPY, text);
    });
  }
}

var clipboard = {
  /**
   * Copy given text to system's clipboard
   *
   * @param text: text to be copied
   */
  copy: function copy(text) {
    if (typeof text === 'undefined') {
      return function () {
        var source = $(this),
            text = source.text();
        source.parents('.btn-group').removeClass('open');
        doCopy(text);
      };
    } else {
      doCopy(text);
    }
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
/*! exports provided: container */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "container", function() { return container; });
/* global MyAMS */

/**
 * MyAMS container management
 */
var $ = MyAMS.$;
var container = {
  deleteElement: function deleteElement(action) {
    return function (link, params) {
      MyAMS.require('ajax', 'alert', 'i18n').then(function () {
        MyAMS.alert.bigBox({
          status: 'danger',
          icon: 'fas fa-bell',
          title: MyAMS.i18n.WARNING,
          message: MyAMS.i18n.CONFIRM_REMOVE,
          successLabel: MyAMS.i18n.CONFIRM,
          cancelLabel: MyAMS.i18n.BTN_CANCEL
        }).then(function (status) {
          if (status !== 'success') {
            return;
          }

          var row = link.parents('tr'),
              table = row.parents('table');
          var location = link.data('ams-location') || row.data('ams-location') || table.data('ams-location') || '';

          if (location) {
            location += '/';
          }

          var deleteTarget = link.data('ams-delete-target') || row.data('ams-delete-target') || table.data('ams-delete-target') || 'delete-element.json',
              objectName = row.data('ams-element-name');
          MyAMS.ajax.post(location + deleteTarget, {
            'object_name': objectName
          }).then(function (result, status, xhr) {
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
/*! exports provided: datatable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datatable", function() { return datatable; });
/* global MyAMS */

/**
 * MyAMS datatables management
 */
var $ = MyAMS.$;
var datatable = {};
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
/*! exports provided: error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony import */ var jsrender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");
/* harmony import */ var jsrender__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsrender__WEBPACK_IMPORTED_MODULE_0__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
        MyAMS.require('i18n', 'ajax', 'alert', 'form').then(function () {
          // clear previous alerts
          MyAMS.form.clearAlerts(parent); // create new alert

          var messages = [];

          var _iterator = _createForOfIteratorHelper(errors.messages || []),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
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
            _iterator.e(err);
          } finally {
            _iterator.f();
          }

          var _iterator2 = _createForOfIteratorHelper(errors.widgets || []),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var widget = _step2.value;
              messages.push({
                header: widget.label,
                message: widget.message
              });
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          var header = errors.header || (messages.length > 1 ? MyAMS.i18n.ERRORS_OCCURED : MyAMS.i18n.ERROR_OCCURED),
              props = {
            status: 'danger',
            header: header,
            message: errors.error || null,
            messages: messages
          };
          $(ERROR_TEMPLATE.render(props)).prependTo(parent); // update status of invalid widgets

          var _iterator3 = _createForOfIteratorHelper(errors.widgets || []),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
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
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }

          MyAMS.ajax.check($.fn.scrollTo, "".concat(MyAMS.env.baseURL, "../ext/jquery-scrollto").concat(MyAMS.env.extext, ".js")).then(function () {
            var scrollBox = parent.parents('.modal-body');

            if (!scrollBox.exists()) {
              scrollBox = $('#main');
            }

            scrollBox.scrollTo(parent, {
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
  showHTTPError: function showHTTPError(error) {
    return new Promise(function (resolve, reject) {
      MyAMS.require('alert').then(function () {
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
/*! exports provided: events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "events", function() { return events; });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global MyAMS */

/**
 * MyAMS events management
 */
var $ = MyAMS.$;
var _initialized = false;
var events = {
  init: function init() {
    if (_initialized) {
      return;
    }

    _initialized = true; // Initialize custom click handlers

    $(document).on('click', '[data-ams-click-handler]', MyAMS.events.clickHandler); // Initialize custom change handlers

    $(document).on('change', '[data-ams-change-handler]', MyAMS.events.changeHandler); // Initialize custom event on click

    $(document).on('click', '[data-ams-click-event]', MyAMS.events.triggerEvent);
  },
  initElement: function initElement(element) {
    $('[data-ams-events-handlers]', element).each(function (idx, elt) {
      var context = $(elt),
          handlers = context.data('ams-events-handlers');

      if (handlers) {
        var _loop = function _loop() {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              event = _Object$entries$_i[0],
              handler = _Object$entries$_i[1];

          context.on(event, function (event) {
            for (var _len = arguments.length, options = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              options[_key - 1] = arguments[_key];
            }

            if (options.length > 0) {
              var _MyAMS$core;

              (_MyAMS$core = MyAMS.core).executeFunctionByName.apply(_MyAMS$core, [handler, document, event].concat(options));
            } else {
              MyAMS.core.executeFunctionByName(handler, document, event, context.data('ams-events-options') || {});
            }
          });
        };

        for (var _i = 0, _Object$entries = Object.entries(handlers); _i < _Object$entries.length; _i++) {
          _loop();
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
  getHandlers: function getHandlers(element, event) {
    var result = [],
        handlers = element.data('ams-events-handlers');

    if (handlers && handlers[event]) {
      result.push(element);
    }

    $('[data-ams-events-handlers]', element).each(function (idx, elt) {
      var context = $(elt),
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
  clickHandler: function clickHandler(event) {
    var source = $(event.currentTarget),
        handlers = source.data('ams-disabled-handlers');

    if (handlers === true || handlers === 'click' || handlers === 'all') {
      return;
    }

    var data = source.data();

    if (data.amsClickHandler) {
      if (data.amsPreventDefault !== false && data.amsClickPreventDefault !== false) {
        event.preventDefault();
      }

      if (data.amsStopPropagation !== false && data.amsClickStopPropagation !== false) {
        event.stopPropagation();
      }

      var _iterator = _createForOfIteratorHelper(data.amsClickHandler.split(/[\s,;]+/)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var handler = _step.value;
          var callback = MyAMS.core.getFunctionByName(handler);

          if (callback !== undefined) {
            callback.call(document, event, data.amsClickHandlerOptions);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  },

  /**
   * Generic change event handler
   */
  changeHandler: function changeHandler(event) {
    var source = $(event.currentTarget); // Disable change handlers for readonly inputs
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
        event.preventDefault();
      }

      if (data.amsStopPropagation !== false && data.amsChangeStopPropagation !== false) {
        event.stopPropagation();
      }

      var _iterator2 = _createForOfIteratorHelper(data.amsChangeHandler.split(/[\s,;]+/)),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var handler = _step2.value;
          var callback = MyAMS.core.getFunctionByName(handler);

          if (callback !== undefined) {
            callback.call(document, event, data.amsChangeHandlerOptions);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  },

  /**
   * Genenric click event trigger
   */
  triggerEvent: function triggerEvent(event) {
    var source = $(event.currentTarget);
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
/*! exports provided: form, showFormSubmitWarning, getFormValidators, checkFormValidators, initFormSubmitButton, resetFormSubmitButton, getFormData, initFormData, getFormTarget, initFormTarget, getFormAction, getFormAjaxSettings, getFormProgressSettings, getFormProgressState, submitForm, formSubmitCallback, resetFormAfterSubmit, resetFormAfterError, getFormDownloadTarget, initFormDownloadTarget, resetFormDownloadTarget */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "form", function() { return form; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showFormSubmitWarning", function() { return showFormSubmitWarning; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormValidators", function() { return getFormValidators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkFormValidators", function() { return checkFormValidators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFormSubmitButton", function() { return initFormSubmitButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFormSubmitButton", function() { return resetFormSubmitButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormData", function() { return getFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFormData", function() { return initFormData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormTarget", function() { return getFormTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFormTarget", function() { return initFormTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormAction", function() { return getFormAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormAjaxSettings", function() { return getFormAjaxSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormProgressSettings", function() { return getFormProgressSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormProgressState", function() { return getFormProgressState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "submitForm", function() { return submitForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formSubmitCallback", function() { return formSubmitCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFormAfterSubmit", function() { return resetFormAfterSubmit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFormAfterError", function() { return resetFormAfterError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFormDownloadTarget", function() { return getFormDownloadTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initFormDownloadTarget", function() { return initFormDownloadTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFormDownloadTarget", function() { return resetFormDownloadTarget; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* global MyAMS, tinyMCE */

/**
 * MyAMS forms support
 */
var $ = MyAMS.$;

if (!$.templates) {
  var jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");

  $.templates = jsrender.templates;
}

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
    }); // Cancel clicks on readonly checkbox

    $(document).on('click', 'input[type="checkbox"][readonly]', function () {
      return false;
    }); // Initialize generic and custom reset handlers

    $(document).on('reset', MyAMS.form.resetHandler);
    $(document).on('reset', '[data-ams-reset-handler]', MyAMS.form.customResetHandler); // Add unload event listener to check for modified forms

    $(window).on('beforeunload', MyAMS.form.checkBeforeUnload);
  },
  initElement: function initElement(element) {
    if (typeof element === 'string') {
      element = $(element);
    } // Submit form when CTRL+Enter key is pressed in textarea


    element.on('keydown', 'textarea', function (evt) {
      if ((evt.keyCode === 10 || evt.keyCode === 13) && (evt.ctrlKey || evt.metaKey)) {
        $(evt.currentTarget).closest('form').submit();
      }
    }); // Always blur readonly inputs

    element.on('focus', 'input[readonly]', function (evt) {
      $(evt.currentTarget).blur();
    }); // Prevent bootstrap dialog from blocking TinyMCE focus

    element.on('focusin', function (evt) {
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
      $('input, select, textarea, [data-ams-changed-event]', form).each(function (idx, elt) {
        var input = $(elt),
            inputData = input.data();

        if (inputData.amsIgnoreChange !== true) {
          var event = inputData.amsChangedEvent || 'change';
          input.on(event, function () {
            MyAMS.form.setChanged(form);
            MyAMS.core.executeFunctionByName(inputData.amsChangedCallback || callback, document, form, input);
          });
        }
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
              MyAMS.form.resetChanged(forms);
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
   * Default form reset handler
   *
   * @param event: the original reset event
   */
  resetHandler: function resetHandler(event) {
    var form = $(event.target);
    MyAMS.form.clearAlerts(form);
    MyAMS.form.handleDefaultReset(form);
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
   * Call reset callbacks defined on a form
   */
  handleDefaultReset: function handleDefaultReset(form) {
    setTimeout(function () {
      form.find('.select2').trigger('change');
      $('[data-ams-reset-callback]', form).each(function (idx, elt) {
        var element = $(elt),
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
  resetChanged: function resetChanged(form) {
    if (form !== undefined) {
      $(form).removeAttr('data-ams-form-changed');
    }
  },

  /**
   * Custom reset handler
   */
  customResetHandler: function customResetHandler(event) {
    var form = $(event.target),
        data = form.data();

    if (data.amsResetHandler) {
      if (data.amsKeepDefault !== true && data.amsResetKeepDefault !== true) {
        event.preventDefault();
      }

      var callback = MyAMS.core.getFunctionByName(data.amsResetHandler);

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
   * Get all settings for given form
   *
   * @param form: submitted form
   * @param formData: form data
   * @param button: submit button
   * @param buttonData: submit button data
   * @param options: submit options
   */
  getSettings: function getSettings(form, formData, button, buttonData, options) {
    var defaults = {
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
        settings = $.extend({}, defaults); // extend default values with form, button and options properties

    $.extendPrefix(settings, 'amsForm', function (value) {
      return MyAMS.core.getFunctionByName(value) || value;
    }, formData, buttonData);
    $.extendOnly(settings, function (value) {
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
        settings = MyAMS.form.getSettings(form, formData, button, buttonData, options); // prevent multiple submits

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


          ajaxSettings.progress = settings.getProgressSettings(form, settings, button, postData); // YESSSS!!!!
          // submit form!!

          settings.submit(form, settings, button, postData, ajaxSettings, target);

          if (downloadTarget) {
            settings.resetDownloadTarget(form, settings, button, downloadTarget, ajaxSettings);
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

function showFormSubmitWarning(form
/*, settings */
) {
  return new Promise(function (resolve, reject) {
    if (!form.data('ams-form-hide-submitted')) {
      MyAMS.require('i18n', 'alert').then(function () {
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

function getFormValidators(form
/*, settings */
) {
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

    var _iterator = _createForOfIteratorHelper(validators.entries()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
            context = _step$value[0],
            contextValidators = _step$value[1];

        var _iterator2 = _createForOfIteratorHelper(contextValidators),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var validator = _step2.value;
            checks.push(MyAMS.core.executeFunctionByName(validator, document, form, context));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
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
          resolve(status);
        });
      } else {
        resolve(status);
      }
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

function getFormTarget(form, settings
/*, formData, buttonData */
) {
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
    beforeSerialize: function beforeSerialize(form
    /*, options */
    ) {
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
    beforeSubmit: function beforeSubmit(data, form
    /*, options */
    ) {
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

      if (result && result.status !== 'error' && result.closeForm !== false) {
        var modal = form.closest('.modal-dialog');

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

function getFormProgressSettings(form, settings, button, postData) {
  var handler = settings.progressHandler;

  if (handler) {
    // check fieldname
    var fieldname = settings.progressFieldName;
    postData[fieldname] = MyAMS.core.generateUUID(); // check progress target

    var progressTarget = button;

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
} // get form submit progress state

function getFormProgressState(form, settings, postData, progress, target) {
  var timeout = setTimeout(_getProgressState, progress.interval);

  function _getProgressState() {
    var data = {};
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
  var dataType = settings.datatype;

  if (!dataType) {
    var response = MyAMS.ajax.getResponse(request);

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
      MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, target).then(function () {
        MyAMS.require('ajax').then(function () {
          MyAMS.ajax.check($.fn.scrollTo, "".concat(MyAMS.env.baseURL, "../ext/jquery-scrollto").concat(MyAMS.env.extext, ".js")).then(function () {
            $('#main').scrollTo(target, {
              offset: -15
            });
          });
        });
      });
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
    iframe = $('<iframe>').attr('name', target).hide().appendTo(MyAMS.dom.root);
  }

  $.extend(ajaxSettings, {
    iframe: true,
    iframeTarget: iframe
  });
} // reset if download target

function resetFormDownloadTarget(form, settings, button, target, ajaxSettings) {
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
/*! exports provided: graph */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graph", function() { return graph; });
/* global MyAMS */

/**
 * MyAMS graphs management
 */
var $ = MyAMS.$;
var graph = {};
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
/*! exports provided: helpers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "helpers", function() { return helpers; });
/* global MyAMS */

/**
 * MyAMS generic helpers
 */
var $ = MyAMS.$;
var helpers = {
  /**
   * Click handler used to clear input
   */
  clearValue: function clearValue(evt) {
    var target = $(evt.currentTarget).data('target');

    if (target) {
      $(target).val(null);
    }
  },

  /**
   * Click handler used to clear datetime input
   */
  clearDatetimeValue: function clearDatetimeValue(evt) {
    var target = $(evt.currentTarget).data('target'),
        picker = $(target).data('datetimepicker');

    if (picker) {
      picker.date(null);
    }
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
  refreshElement: function refreshElement(form, options) {
    return new Promise(function (resolve, reject) {
      var element = $("[id=\"".concat(options.object_id, "\"]"));
      MyAMS.core.executeFunctionByName(MyAMS.config.clearContent, document, element).then(function () {
        element.replaceWith($(options.content));
        element = $("[id=\"".concat(options.object_id, "\"]"));
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, element).then(function () {
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
  refreshWidget: function refreshWidget(form, options) {
    return new Promise(function (resolve, reject) {
      var widget = $("[id=\"".concat(options.widget_id, "\"]")),
          group = widget.parents('.widget-group');
      MyAMS.core.executeFunctionByName(MyAMS.config.clearContent, document, group).then(function () {
        group.replaceWith($(options.content));
        widget = $("[id=\"".concat(options.widget_id, "\"]"));
        group = widget.parents('.widget-group');
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, group).then(function () {
          resolve(widget);
        }, reject);
      }, reject);
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
  refreshTableRow: function refreshTableRow(form, options) {
    return new Promise(function (resolve, reject) {
      var selector = "tr[id=\"".concat(options.row_id, "\"]"),
          row = $(selector),
          table = row.parents('table').first(),
          dtTable = table.DataTable();

      if (options.data) {
        dtTable.row(selector).data(options.data);
        resolve(row);
      } else {
        var newRow = $(options.content);
        row.replaceWith(newRow);
        MyAMS.core.executeFunctionByName(MyAMS.config.initContent, document, newRow).then(function () {
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
  refreshImage: function refreshImage(form, options) {
    var image = $("[id=\"".concat(options.image_id, "\"]"));
    image.attr('src', options.src);
  },

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
/*! exports provided: i18n */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18n", function() { return i18n; });
/* global MyAMS */

/**
 * MyAMS i18n translations
 */
var $ = MyAMS.$;
var _initialized = false;
var i18n = {
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
  init: function init() {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return new Promise(function (resolve, reject) {
      if (_initialized && !force) {
        resolve();
        return;
      }

      _initialized = true;
      var html = $('html'),
          lang = html.attr('lang') || html.attr('xml:lang');

      if (lang && !lang.startsWith('en')) {
        MyAMS.core.getScript("".concat(MyAMS.env.baseURL, "i18n/myams-").concat(lang.substr(0, 2), ".js")).then(resolve, reject);
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
/*! exports provided: jsonrpc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsonrpc", function() { return jsonrpc; });
/* global MyAMS */

/**
 * MyAMS JSON-RPC protocol support
 */
var $ = MyAMS.$;
var jsonrpc = {};
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
/*! exports provided: menu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "menu", function() { return menu; });
/* global MyAMS */

/**
 * MyAMS menus management
 */
var $ = MyAMS.$;
/**
 * Context menu handler
 */

function _contextMenuHandler(menu) {
  if (menu.get(0).tagName !== 'A') {
    menu = menu.parents('a').first();
  }

  var menuData = menu.data();

  if (menuData.toggle === 'modal') {
    MyAMS.require('modal').then(function () {
      MyAMS.modal.open(menu);
    });
  } else {
    var href = menu.attr('href') || menuData.amsUrl;

    if (!href || href.startsWith('javascript:') || menu.attr('target')) {
      return;
    }

    var hrefGetter = MyAMS.core.getFunctionByName(href);

    if (typeof hrefGetter === 'function') {
      href = hrefGetter(menu);
    }

    if (typeof href === 'undefined') {
      return;
    }

    if (typeof href === 'function') {
      href(menu);
    } else {
      MyAMS.require('form', 'skin').then(function () {
        href = href.replace(/%23/, '#');
        var target = menu.data('ams-target');

        if (target) {
          MyAMS.form.confirmChangedForm(target).then(function (status) {
            if (status !== 'success') {
              return;
            }

            MyAMS.skin.loadURL(href, target, menu.data('ams-link-options'), menu.data('ams-link-callback'));
          });
        } else {
          MyAMS.form.confirmChangedForm().then(function (status) {
            if (status !== 'success') {
              return;
            }

            if (href.startsWith('#')) {
              if (href !== location.hash) {
                if (MyAMS.dom.root.hasClass('mobile-view-activated')) {
                  MyAMS.dom.root.removeClass('hidden-menu');
                  setTimeout(function () {
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

var _initialized = false;
/**
 * MyAMS "menu" module
 */

var menu = {
  /**
   * Global module initialization.
   * This function extends jQuery with a "contextMenu()" function, which
   * allows to create a new context menu.
   */
  init: function init() {
    if (_initialized) {
      return;
    }

    _initialized = true;
    $.fn.extend({
      /**
       * JQuery context menu constructor
       */
      contextMenu: function contextMenu(settings) {
        function getMenuPosition(mouse, direction) {
          var win = $(window)[direction](),
              menu = $(settings.menuSelector)[direction]();
          var position = mouse; // opening menu would pass the side of the page

          if (mouse + menu > win && menu < mouse) {
            position -= menu;
          }

          return position;
        }

        return this.each(function (idx, elt) {
          var source = $(elt),
              menu = $(settings.menuSelector); // Set flag on menu items

          $('a', menu).each(function (idx, elt) {
            $(elt).data('ams-context-menu', true);
          });
          source.on("contextmenu", function (evt) {
            // return native menu if pressing CTRL key
            if (evt.ctrlKey) {
              return;
            } // open menu


            menu.dropdown('show').css({
              position: 'fixed',
              left: getMenuPosition(evt.clientX, 'width') - 10,
              top: getMenuPosition(evt.clientY, 'height') - 10
            }).off('click').on('click', function (clickEvt) {
              clickEvt.stopPropagation();
              clickEvt.preventDefault();
              menu.dropdown('hide');

              _contextMenuHandler($(clickEvt.target));
            });
            return false;
          }); // make sure menu closes on any click

          $(document).click(function () {
            menu.dropdown('hide');
          });
        });
      }
    }); // Automatically set orientation of dropdown menus

    $(document).on('show.bs.dropdown', '.btn-group', function (evt) {
      // check menu height
      var menu = $(evt.currentTarget),
          ul = menu.children('.dropdown-menu'),
          menuRect = menu.get(0).getBoundingClientRect(),
          position = menuRect.top,
          buttonHeight = menuRect.height,
          menuHeight = ul.outerHeight();

      if (position > menuHeight && $(window).height() - position < buttonHeight + menuHeight) {
        menu.addClass("dropup");
      } // activate first input


      $('input, select, textarea', ul).first().focus();
    }).on('hidden.bs.dropdown', '.btn-group', function (evt) {
      // always reset after close
      $(evt.currentTarget).removeClass('dropup');
    });
    $(document).on('hide.bs.dropdown', function (evt) {
      if (evt.clickEvent) {
        var dropdown = $(evt.clickEvent.target).parents('.dropdown-menu');

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
/*! exports provided: modalToggleEventHandler, modalShownEventHandler, dynamicModalShownEventHandler, modalDismissEventHandler, modalHiddenEventHandler, dynamicModalHiddenEventHandler, modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalToggleEventHandler", function() { return modalToggleEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalShownEventHandler", function() { return modalShownEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dynamicModalShownEventHandler", function() { return dynamicModalShownEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalDismissEventHandler", function() { return modalDismissEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modalHiddenEventHandler", function() { return modalHiddenEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dynamicModalHiddenEventHandler", function() { return dynamicModalHiddenEventHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modal", function() { return modal; });
/* global MyAMS */

/**
 * MyAMS modal dialogs support
 */
var $ = MyAMS.$;
var _initialized = false;
/*
 * Standard data-toggle="modal" handler
 */

function modalToggleEventHandler(evt) {
  return new Promise(function (resolve, reject) {
    var source = $(evt.currentTarget),
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
    MyAMS.modal.open(source).then(function () {
      resolve(true);
    }, reject);
  });
}
/**
 * Standard modal shown event handler
 * This handler is used to allow modals stacking
 */

function modalShownEventHandler(evt) {
  var zIndexModal = 1100; // Enable modals stacking

  var dialog = $(evt.target),
      visibleModalsCount = $('.modal:visible').length,
      zIndex = zIndexModal + 100 * visibleModalsCount;
  dialog.css('z-index', zIndex);
  setTimeout(function () {
    $('.modal-backdrop').not('.modal-stack').first().css('z-index', zIndex - 10).addClass('modal-stack');
  }, 0); // Check form contents before closing modals

  $(dialog).off('click', '[data-dismiss="modal"]').on('click', '[data-dismiss="modal"]', function (evt) {
    var handler = $(evt.currentTarget).data('ams-dismiss-handler') || modalDismissEventHandler;
    return MyAMS.core.executeFunctionByName(handler, document, evt);
  });
}
/**
 * Dynamic modal 'shown' callback
 * This callback is used to initialize modal's viewport size
 *
 * @param evt: source event
 */

function dynamicModalShownEventHandler(evt) {
  var dialog = $(evt.target);
  return MyAMS.core.executeFunctionByName(dialog.data('ams-init-content') || MyAMS.config.initContent, document, dialog);
}
/**
 * Modal dismiss handler
 */

function modalDismissEventHandler(evt) {
  return new Promise(function (resolve, reject) {
    var source = $(evt.currentTarget),
        dialog = source.parents('.modal').first();
    dialog.data('modal-result', $(evt.currentTarget).data('modal-dismiss-value'));

    if (MyAMS.form) {
      MyAMS.form.confirmChangedForm(dialog).then(function (status) {
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
  var dialog = $(evt.target);
  MyAMS.core.executeFunctionByName(dialog.data('ams-clear-content') || MyAMS.config.clearContent, document, dialog).then(function () {
    if (dialog.data('dynamic') === true) {
      dialog.remove();
    }
  });
}
/**
 * Main modal module definition
 */

var modal = {
  init: function init() {
    if (_initialized) {
      return;
    }

    _initialized = true;

    if (MyAMS.config.ajaxNav) {
      // Initialize modal dialogs links
      // Standard Bootstrap handlers are removed!!
      $(document).off('click', '[data-toggle="modal"]').on('click', '[data-toggle="modal"]', function (evt) {
        var handler = $(evt.currentTarget).data('ams-modal-handler') || modalToggleEventHandler;
        MyAMS.core.executeFunctionByName(handler, document, evt);
      });
    } // Handle modal shown event to allow modals stacking


    $(document).on('shown.bs.modal', '.modal', function (evt) {
      var handler = $(evt.currentTarget).data('ams-shown-handler') || modalShownEventHandler;
      MyAMS.core.executeFunctionByName(handler, document, evt);
    }); // Handle modal hidden event to check remaining modals

    $(document).on('hidden.bs.modal', '.modal', function (evt) {
      var handler = $(evt.currentTarget).data('ams-hidden-handler') || modalHiddenEventHandler;
      MyAMS.core.executeFunctionByName(handler, document, evt);
    });
  },
  open: function open(source, options) {
    return new Promise(function (resolve, reject) {
      var sourceData = {},
          url = source;

      if (typeof source !== 'string') {
        sourceData = source.data();
        url = source.attr('href') || sourceData.amsUrl;
      }

      var urlGetter = MyAMS.core.getFunctionByName(url);

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
        }).then(function (data, status, request) {
          MyAMS.require('ajax').then(function () {
            var response = MyAMS.ajax.getResponse(request),
                dataType = response.contentType,
                result = response.data;
            var content, dialog, dialogData, dialogOptions, settings;

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
                  backdrop: dialogData.backdrop === undefined ? 'static' : dialogData.backdrop
                };
                settings = $.extend({}, dialogOptions, dialogData.amsOptions);
                settings = MyAMS.core.executeFunctionByName(dialogData.amsInit, dialog, settings) || settings;
                $('<div>').addClass('modal fade').data('dynamic', true).append(content).on('show.bs.modal', dynamicModalShownEventHandler).on('hidden.bs.modal', dynamicModalHiddenEventHandler).modal(settings);

                if (MyAMS.stats && !(sourceData.amsLogEvent === false || dialogData.amsLogEvent === false)) {
                  MyAMS.stats.logPageview(url);
                }

            }
          }).then(resolve);
        });
      }
    });
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
/*! exports provided: NavigationMenu, linkClickHandler, nav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationMenu", function() { return NavigationMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkClickHandler", function() { return linkClickHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nav", function() { return nav; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global MyAMS, FontAwesome, Hammer */

/**
 * MyAMS navigation module
 */
var $ = MyAMS.$;
/**
 * Dynamic navigation menu class
 */

var MenuHeader = /*#__PURE__*/function () {
  function MenuHeader(props) {
    _classCallCheck(this, MenuHeader);

    this.props = props;
  }

  _createClass(MenuHeader, [{
    key: "render",
    value: function render() {
      return $('<li class="header"></li>').text(this.props.header || '');
    }
  }]);

  return MenuHeader;
}();

var MenuDivider = /*#__PURE__*/function () {
  function MenuDivider() {
    _classCallCheck(this, MenuDivider);
  }

  _createClass(MenuDivider, [{
    key: "render",
    value: function render() {
      return $('<li class="divider"></li>');
    }
  }]);

  return MenuDivider;
}();

var Menu = /*#__PURE__*/function () {
  function Menu(items) {
    _classCallCheck(this, Menu);

    this.items = items;
  }

  _createClass(Menu, [{
    key: "render",
    value: function render() {
      var menu = $('<div></div>');

      var _iterator = _createForOfIteratorHelper(this.items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;

          if (item.label) {
            var props = $('<li></li>'),
                link = $('<a></a>').attr('href', item.href || '#').attr('title', item.label);

            for (var _i = 0, _Object$entries = Object.entries(item.attrs || {}); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                  key = _Object$entries$_i[0],
                  val = _Object$entries$_i[1];

              link.attr(key, val);
            }

            if (item.icon) {
              $('<i class="fa-lg fa-fw mr-1"></i>').addClass(item.icon).appendTo(link);
            }

            $('<span class="menu-item-parent"></span>').text(item.label).appendTo(link);

            if (item.badge) {
              $('<span class="badge ml-1 mr-3 float-right"></span>').addClass("bg-".concat(item.badge.status)).text(item.badge.value).appendTo(link);
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
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return menu.children();
    }
  }]);

  return Menu;
}();

var NavigationMenu = /*#__PURE__*/function () {
  function NavigationMenu(menus, parent, settings) {
    _classCallCheck(this, NavigationMenu);

    this.menus = menus;
    this.parent = parent;
    this.settings = settings;
  }

  _createClass(NavigationMenu, [{
    key: "getMenus",
    value: function getMenus() {
      var nav = $('<ul></ul>');

      var _iterator2 = _createForOfIteratorHelper(this.menus),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var props = _step2.value;

          if (props.header !== undefined) {
            nav.append(new MenuHeader(props).render());
          }

          nav.append(new Menu(props.items).render());
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return nav;
    }
  }, {
    key: "render",
    value: function render() {
      var menus = this.getMenus();
      this.init(menus);
      this.parent.append(menus);
    }
  }, {
    key: "init",
    value: function init(menus) {
      var settings = this.settings; // add mark to menus with childrens

      menus.find('li').each(function (idx, elt) {
        var menuItem = $(elt);

        if (menuItem.find('ul').length > 0) {
          var firstLink = menuItem.find('a:first'); // add multi-level sign next to link

          firstLink.append("<b class=\"collapse-sign\">".concat(settings.closedSign, "</b>")); // avoid jumping to top of page when href is a #

          if (firstLink.attr('href') === '#') {
            firstLink.click(function () {
              return false;
            });
          }
        }
      }); // open active level

      menus.find('li.active').each(function (idx, elt) {
        var activeParent = $(elt).parents('ul'),
            activeItem = activeParent.parent('li');
        activeParent.slideDown(settings.speed);
        activeItem.find('b:first').html(settings.openedSign);
        activeItem.addClass('open');
      }); // handle click event

      menus.find("li a").on('click', function (evt) {
        var link = $(evt.currentTarget);

        if (link.hasClass('active')) {
          return;
        }

        link.parents('li').removeClass('active');
        var href = link.attr('href').replace(/^#/, ''),
            parentUL = link.parent().find("ul");

        if (settings.accordion) {
          var parents = link.parent().parents("ul"),
              visibleMenus = menus.find("ul:visible");
          visibleMenus.each(function (visibleIndex, visibleElt) {
            var close = true;
            parents.each(function (parentIndex, parentElt) {
              if (parentElt === visibleElt) {
                close = false;
                return false;
              }
            });

            if (close && parentUL !== visibleElt) {
              var visibleItem = $(visibleElt);

              if (href || !visibleItem.hasClass('active')) {
                visibleItem.slideUp(settings.speed, function () {
                  visibleItem.parent("li").removeClass('open').find("b:first").delay(settings.speed).html(settings.closedSign);
                });
              }
            }
          });
        }

        var firstUL = link.parent().find("ul:first");

        if (!href && firstUL.is(":visible") && !firstUL.hasClass("active")) {
          firstUL.slideUp(settings.speed, function () {
            link.parent("li").removeClass("open").find("b:first").delay(settings.speed).html(settings.closedSign);
          });
        } else {
          firstUL.slideDown(settings.speed, function () {
            link.parent("li").addClass("open").find("b:first").delay(settings.speed).html(settings.openedSign);
          });
        }
      });
    }
  }]);

  return NavigationMenu;
}();
var _initialized = false,
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
  return new Promise(function (resolve, reject) {
    var link = $(evt.currentTarget),
        handlers = link.data('ams-disabled-handlers');

    if (handlers === true || handlers === 'click' || handlers === 'all') {
      return;
    }

    var href = link.attr('href') || link.data('ams-url');

    if (!href || href.startsWith('javascript:') || link.attr('target') || link.data('ams-context-menu') === true) {
      return;
    }

    evt.preventDefault();
    evt.stopPropagation();
    var url, target, params;

    if (href.indexOf('?') >= 0) {
      url = href.split('?');
      target = url[0];
      params = url[1].unserialize();
    } else {
      target = href;
      params = undefined;
    }

    var hrefGetter = MyAMS.core.getFunctionByName(target);

    if (typeof hrefGetter === 'function') {
      href = hrefGetter(link, params);
    }

    if (typeof href === 'function') {
      resolve(href(link, params));
    } else {
      // Standard AJAX or browser URL call
      // Convert %23 characters to #
      href = href.replace(/%23/, '#');

      if (evt.ctrlKey) {
        window.open && window.open(href);
        resolve();
      } else {
        var linkTarget = link.data('ams-target') || link.attr('target');

        if (linkTarget) {
          if (linkTarget === '_blank') {
            window.open && window.open(href);
            resolve();
          } else {
            if (MyAMS.form) {
              MyAMS.form.confirmChangedForm().then(function (result) {
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
            MyAMS.form.confirmChangedForm().then(function (result) {
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
var nav = {
  /**
   * initialize navigation through data attributes
   */
  init: function init() {
    if (_initialized) {
      return;
    }

    _initialized = true;
    $.fn.extend({
      navigationMenu: function navigationMenu(options) {
        var _this = this;

        if (this.length === 0) {
          return;
        }

        var data = this.data();
        var defaults = {
          accordion: data.amsMenuAccordion !== false,
          speed: 200
        };

        if (MyAMS.config.useSVGIcons) {
          var downIcon = FontAwesome.findIconDefinition({
            iconName: 'angle-down'
          }),
              upIcon = FontAwesome.findIconDefinition({
            iconName: 'angle-up'
          });
          $.extend(defaults, {
            closedSign: "<em data-fa-i2svg>".concat(FontAwesome.icon(downIcon).html, "</em>"),
            openedSign: "<em data-fa-i2svg>".concat(FontAwesome.icon(upIcon).html, "</em>")
          });
        } else {
          $.extend(defaults, {
            closedSign: '<em class="fa fa-angle-down"></em>',
            openedSign: '<em class="fa fa-angle-up"></em>'
          });
        }

        var settings = $.extend({}, defaults, options);

        if (data.amsMenuConfig) {
          MyAMS.require('ajax', 'skin').then(function () {
            MyAMS.ajax.get(data.amsMenuConfig).then(function (result) {
              var menuFactory = MyAMS.core.getObject(data.amsMenuFactory) || NavigationMenu;
              new menuFactory(result, $(_this), settings).render();
              MyAMS.skin.checkURL();
            });
          });
        } else {
          // static menus
          var menus = $('ul', this);
          new NavigationMenu(null, $(this), settings).init(menus);
        }
      }
    });

    if (MyAMS.config.ajaxNav) {
      // Disable clicks on # hrefs
      $(document).on('click', 'a[href="#"]', function (evt) {
        evt.preventDefault();
      }); // Activate clicks

      $(document).on('click', 'a[href!="#"]:not([data-toggle]), [data-ams-url]:not([data-toggle])', function (evt) {
        // check for specific click handler
        var handler = $(evt).data('ams-click-handler');

        if (handler) {
          return;
        }

        return linkClickHandler(evt);
      }); // Blank target clicks

      $(document).on('click', 'a[target="_blank"]', function (evt) {
        evt.preventDefault();
        var target = $(evt.currentTarget);
        window.open && window.open(target.attr('href'));
        MyAMS.stats && MyAMS.stats.logEvent(target.data('ams-stats-category') || 'Navigation', target.data('ams-stats-action') || 'External', target.data('ams-stats-label') || target.attr('href'));
      }); // Top target clicks

      $(document).on('click', 'a[target="_top"]', function (evt) {
        evt.preventDefault();
        MyAMS.form && MyAMS.form.confirmChangedForm().then(function (result) {
          if (result !== 'success') {
            return;
          }

          window.location = $(evt.currentTarget).attr('href');
        });
      }); // Disable clicks on disabled tabs

      $(document).on("click", '.nav-tabs a[data-toggle=tab]', function (evt) {
        if ($(evt.currentTarget).parent('li').hasClass("disabled")) {
          evt.stopPropagation();
          evt.preventDefault();
          return false;
        }
      }); // Enable tabs dynamic loading

      $(document).on('show.bs.tab', function (evt) {
        var link = $(evt.target);

        if (link.exists() && link.get(0).tagName !== 'A') {
          link = $('a[href]', link);
        }

        var data = link.data();

        if (data && data.amsUrl) {
          if (data.amsTabLoaded) {
            return;
          }

          link.append('<i class="fa fa-spin fa-cog ml-1"></i>');

          MyAMS.require('skin').then(function () {
            MyAMS.skin.loadURL(data.amsUrl, link.attr('href')).then(function () {
              if (data.amsTabLoadOnce) {
                data.amsTabLoaded = true;
              }

              $('i', link).remove();
            }, function () {
              $('i', link).remove();
            });
          });
        }
      });

      if (!MyAMS.config.isMobile) {
        MyAMS.dom.root.addClass('desktop-detected');
      } else {
        MyAMS.dom.root.addClass('mobile-detected');

        MyAMS.require('ajax').then(function () {
          if (MyAMS.config.enableFastclick) {
            MyAMS.ajax.check($.fn.noClickDelay, "".concat(MyAMS.env.baseURL, "../ext/js-smartclick").concat(MyAMS.env.extext, ".js")).then(function () {
              $('a', MyAMS.dom.nav).noClickDelay();
              $('a', '#hide-menu').noClickDelay();
            });
          }

          if (MyAMS.dom.root.exists()) {
            MyAMS.ajax.check(window.Hammer, "".concat(MyAMS.env.baseURL, "../ext/hammer").concat(MyAMS.env.extext, ".js")).then(function () {
              _hammer = new Hammer.Manager(MyAMS.dom.root.get(0));

              _hammer.add(new Hammer.Pan({
                direction: Hammer.DIRECTION_HORIZONTAL,
                threshold: 200
              }));

              _hammer.on('panright', function () {
                if (!MyAMS.dom.root.hasClass('hidden-menu')) {
                  MyAMS.nav.switchMenu();
                }
              });

              _hammer.on('panleft', function () {
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
  initElement: function initElement(element) {
    $('nav', element).navigationMenu({
      speed: MyAMS.config.menuSpeed
    });
  },

  /**
   * Display current active menu
   *
  	 * @param menu: current active menu
   */
  setActiveMenu: function setActiveMenu(menu) {
    var nav = MyAMS.dom.nav;
    $('.active', nav).removeClass('active');
    menu.addClass('open').addClass('active');
    menu.parents('li').addClass('open active').children('ul').addClass('active').show();
    menu.parents('li:first').removeClass('open');
    menu.parents('ul').addClass(menu.attr('href').replace(/^#/, '') ? 'active' : '').show();

    if (menu.exists()) {
      // MyAMS.require('ajax').then(() => {
      // 	MyAMS.ajax.check($.fn.scrollTo,
      // 		`${MyAMS.env.baseURL}../ext/jquery-scrollto${MyAMS.env.extext}.js`).then(() => {
      // 		nav.scrollTo(menu);
      // 	});
      // })
      var scroll = nav.scrollTop(),
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
  drawBreadcrumbs: function drawBreadcrumbs() {
    var crumb = $('ol.breadcrumb', '#ribbon');
    $('li', crumb).not('.persistent').remove();

    if (!$('li', crumb).exists()) {
      var template = "<li class=\"breadcrumb-item\">\n\t\t\t\t\t<a class=\"p-r-1\" href=\"".concat($('a[href!="#"]:first', MyAMS.dom.nav).attr('href'), "\">\n\t\t\t\t\t\t").concat(MyAMS.i18n.HOME, "\n\t\t\t\t\t</a>\n\t\t\t\t</li>");
      crumb.append($(template));
    }

    $('li.active >a', MyAMS.dom.nav).each(function (idx, elt) {
      var menu = $(elt),
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
  minifyMenu: function minifyMenu(evt) {
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
  switchMenu: function switchMenu(evt) {
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
  restoreState: function restoreState() {
    // restore window state
    if (window.localStorage) {
      var state = localStorage.getItem('window-state');

      if (state === 'minified') {
        MyAMS.nav.minifyMenu({
          currentTarget: $('#minifyme'),
          preventDefault: function preventDefault() {}
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
/*! exports provided: notifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notifications", function() { return notifications; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global MyAMS */

/**
 * MyAMS notifications handlers
 */
var $ = MyAMS.$;

if (!$.templates) {
  var jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");

  $.templates = jsrender.templates;
}
/**
 * Notifications list template string
 */


var ITEM_TEMPLATE_STRING = "\n\t<li class=\"p-1\">\n\t\t<a class=\"d-flex flex-row\"{{if url}} href=\"{{:url}}\"{{/if}}>\n\t\t\t{{if source.avatar}}\n\t\t\t<img class=\"avatar mx-1 mt-1\" src=\"{{:source.avatar}}\" />\n\t\t\t{{else}}\n\t\t\t<i class=\"avatar fa fa-fw fa-2x fa-user mx-1 mt-1\"></i>\n\t\t\t{{/if}}\n\t\t\t<div class=\"flex-grow-1 ml-2\">\n\t\t\t\t<small class=\"timestamp float-right text-muted\">\n\t\t\t\t\t{{*: new Date(data.timestamp).toLocaleString()}}\n\t\t\t\t</small>\n\t\t\t\t<strong class=\"title d-block\">\n\t\t\t\t\t{{:source.title}}\n\t\t\t\t</strong>\n\t\t\t\t<p class=\"text-muted mb-2\">{{:message}}</p>\n\t\t\t</div>\n\t\t</a>\n\t</li>";
var ITEM_TEMPLATE = $.templates({
  markup: ITEM_TEMPLATE_STRING,
  allowCode: true
});
var LIST_TEMPLATE_STRING = "\n\t<ul class=\"list-style-none flex-grow-1 overflow-auto m-0 p-0\">\n\t\t{{for notifications tmpl=~itemTemplate /}}\n\t</ul>\n\t{{if !~options.hideTimestamp}}\n\t<div class=\"timestamp border-top pt-1\">\n\t\t<span>{{*: MyAMS.i18n.LAST_UPDATE }}{{: ~timestamp.toLocaleString() }}</span>\n\t\t<i class=\"fa fa-fw fa-sync float-right\"\n\t\t   data-ams-click-handler=\"MyAMS.notifications.getNotifications\"\n\t\t   data-ams-click-handler-options='{\"localTimestamp\": \"{{: ~useLocalTime }}\"}'></i>\n\t</div>\n\t{{/if}}";
var LIST_TEMPLATE = $.templates({
  markup: LIST_TEMPLATE_STRING,
  allowCode: true
});

var NotificationsList = /*#__PURE__*/function () {
  /**
   * List constructor
   *
   * @param values: notifications data (may be loaded from JSON)
   * @param options: list rendering options
   */
  function NotificationsList(values) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, NotificationsList);

    this.values = values;
    this.options = options;
  }
  /**
   * Render list into given parent
   *
   * @param parent: JQUery parent object into which the list must be rendered
   */


  _createClass(NotificationsList, [{
    key: "render",
    value: function render(parent) {
      $(parent).html(LIST_TEMPLATE.render(this.values, {
        itemTemplate: ITEM_TEMPLATE,
        timestamp: this.options.localTimestamp ? new Date() : new Date(this.values.timestamp),
        useLocalTime: this.options.localTimestamp ? 'true' : 'false',
        options: this.options
      }));
    }
  }]);

  return NotificationsList;
}();

var notifications = {
  /**
   * Load user notifications
   *
   * @param evt: source event
   * @param options: notifications options (which can also be extracted from event data)
   */
  getNotifications: function getNotifications(evt, options) {
    var data = $.extend({}, options, evt.data),
        target = $(evt.target),
        current = $(evt.currentTarget),
        remote = current.data('ams-notifications-source') || current.parents('[data-ams-notifications-source]').data('ams-notifications-source');
    return new Promise(function (resolve, reject) {
      MyAMS.require('ajax').then(function () {
        MyAMS.ajax.get(remote, current.data('ams-notifications-params') || '', current.data('ams-notifications-options') || {}).then(function (result) {
          var tab = $(target.data('ams-notifications-target') || target.parents('[data-ams-notifications-target]').data('ams-notifications-target') || current.attr('href'));
          new NotificationsList(result, data).render(tab);
          resolve();
        }, reject);
      }, reject);
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
/*! exports provided: checker, contextMenu, datatables, datetime, dragdrop, editor, fileInput, imgAreaSelect, select2, svgPlugin, switcher, tinymce, validate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checker", function() { return checker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contextMenu", function() { return contextMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datatables", function() { return datatables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "datetime", function() { return datetime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dragdrop", function() { return dragdrop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editor", function() { return editor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fileInput", function() { return fileInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imgAreaSelect", function() { return imgAreaSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select2", function() { return select2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "svgPlugin", function() { return svgPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switcher", function() { return switcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tinymce", function() { return tinymce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate", function() { return validate; });
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
  var jsrender = __webpack_require__(/*! jsrender */ "./node_modules/jsrender/jsrender.js");

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


var CHECKER_TEMPLATE_STRING = "\n\t<span class=\"custom-control custom-switch\">\n\t\t<input type=\"checkbox\"\n\t\t\t   id=\"{{: fieldId }}\" name=\"{{: fieldName }}\"\n\t\t\t   class=\"custom-control-input checker\"\n\t\t\t   {{if checked}}checked{{/if}}\n\t\t\t   {{if readonly}}disabled{{/if}}\n\t\t\t   value=\"{{: value }}\" />\n\t\t{{if prefix}}\n\t\t<input type=\"hidden\" class=\"prefix\"\n\t\t\t   id=\"{{: prefix}}{{: fieldName}}_prefix\"\n\t\t\t   name=\"{{: prefix}}{{: fieldName}}\"\n\t\t\t   value=\"{{if state==='on'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}\" />\n\t\t{{else marker}}\n\t\t<input type=\"hidden\" class=\"marker\"\n\t\t\t   name=\"{{: fieldName}}{{: marker}}\"\n\t\t\t   value=\"1\" />\n\t\t{{/if}}\n\t\t<label for=\"{{: fieldId }}\"\n\t\t\t   class=\"custom-control-label\">\n\t\t\t{{: legend }}\n\t\t</label>\n\t</span>\n";
var CHECKER_TEMPLATE = $.templates({
  markup: CHECKER_TEMPLATE_STRING
});
function checker(element) {
  return new Promise(function (resolve) {
    var checkers = $('legend.checker', element);

    if (checkers.length > 0) {
      checkers.each(function (idx, elt) {
        var legend = $(elt),
            data = legend.data();

        if (!data.amsChecker) {
          var fieldset = legend.parent('fieldset'),
              state = data.amsCheckerState || data.amsState,
              checked = fieldset.hasClass('switched') || state === 'on',
              fieldName = data.amsCheckerFieldname || data.amsFieldname || "checker_".concat(MyAMS.core.generateId()),
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

            MyAMS.core.executeFunctionByName(data.amsCheckerChangeHandler || data.amsChangeHandler, document, legend, checked);

            if (!data.amsCheckerCancelDefault && !data.amsCancelDefault) {
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
    var types = $.fn.dataTable.ext.type;
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
  },

  /**
   * Handle table rows reordering
   *
   * @param evt: original event
   */
  reorderRows: function reorderRows(evt) {
    return new Promise(function (resolve, reject) {
      var table = $(evt.target),
          data = table.data(); // extract target and URL

      var target = data.amsReorderInputTarget,
          url = data.amsReorderUrl,
          ids;

      if (!(target || url)) {
        resolve();
      } // extract reordered rows IDs


      var rows = $('tbody tr', table),
          getter = MyAMS.core.getFunctionByName(data.amsReorderData) || 'data-ams-row-value';

      if (typeof getter === 'function') {
        ids = $.makeArray(rows).map(getter);
      } else {
        ids = rows.listattr(getter);
      } // set target input value (if any)


      if (target) {
        target = $(target);

        if (target.exists()) {
          var separator = data.amsReorderSeparator || ';';
          target.val(ids.join(separator));
        }
      } // call target URL (if any)


      if (url) {
        url = MyAMS.core.executeFunctionByName(url, document, table) || url;

        if (ids.length > 0) {
          var postData;

          if (data.amsReorderPostData) {
            postData = MyAMS.core.executeFunctionByName(data.amsReorderPostData, document, table, ids);
          } else {
            var attr = data.amsReorderPostAttr || 'order';
            postData = {};
            postData[attr] = ids;
          }

          MyAMS.require('ajax').then(function () {
            MyAMS.ajax.post(url, postData).then(function (result, status, xhr) {
              var callback = data.amsReorderCallback;

              if (callback) {
                MyAMS.core.executeFunctionByName(callback, document, table, result, status, xhr).then(function () {
                  for (var _len = arguments.length, results = new Array(_len), _key = 0; _key < _len; _key++) {
                    results[_key] = arguments[_key];
                  }

                  resolve.apply.apply(resolve, [table].concat(results));
                });
              } else {
                MyAMS.ajax.handleJSON(result, table.parents('.dataTables_wrapper')).then(function () {
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

                  var data = table.data(); // initialize dom property

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

                  if (!data.buttons && !data.searchBuilder && !data.searchPanes && data.searching === false || data.lengthChange === false) {
                    table.siblings('h3').addClass('mb-0');
                  } // initialize default options


                  var defaultOptions = {
                    language: data.amsDatatableLanguage || data.amsLanguage || MyAMS.i18n.plugins.datatables,
                    responsive: true,
                    dom: dom
                  }; // initialize sorting

                  var order = data.amsDatatableOrder || data.amsOrder;

                  if (typeof order === 'string') {
                    var orders = order.split(';');
                    order = [];

                    var _iterator = _createForOfIteratorHelper(orders),
                        _step;

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        var col = _step.value;
                        var colOrder = col.split(',');
                        colOrder[0] = parseInt(colOrder[0]);
                        order.push(colOrder);
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }
                  }

                  if (order) {
                    defaultOptions.order = order;
                  } // initialize columns definition based on header settings


                  var heads = $('thead th', table),
                      columns = [];
                  heads.each(function (idx, th) {
                    columns[idx] = $(th).data('ams-column') || {};
                  });
                  var sortables = heads.listattr('data-ams-sortable');

                  var _iterator2 = _createForOfIteratorHelper(sortables.entries()),
                      _step2;

                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      var iterator = _step2.value;

                      var _iterator4 = _slicedToArray(iterator, 2),
                          _idx = _iterator4[0],
                          sortable = _iterator4[1];

                      if (sortable !== undefined) {
                        columns[_idx].sortable = typeof sortable === 'string' ? JSON.parse(sortable) : sortable;
                      }
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }

                  var types = heads.listattr('data-ams-type');

                  var _iterator3 = _createForOfIteratorHelper(types.entries()),
                      _step3;

                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      var _iterator5 = _step3.value;

                      var _iterator6 = _slicedToArray(_iterator5, 2),
                          _idx2 = _iterator6[0],
                          stype = _iterator6[1];

                      if (stype !== undefined) {
                        columns[_idx2].type = stype;
                      }
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }

                  defaultOptions.columns = columns; // initialize final settings and initialize plug-in

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
                  table.trigger('after-init.ams.datatable', [table, plugin]); // set reorder events

                  if (settings.rowReorder) {
                    plugin.on('row-reorder', MyAMS.core.getFunctionByName(data.amsDatatableReordered || data.amsReordered) || _datatablesHelpers.reorderRows);
                  }
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
  return new Promise(function (resolve, reject) {
    var inputs = $('.datetime', element);

    if (inputs.length > 0) {
      MyAMS.ajax.check(window.moment, "".concat(MyAMS.env.baseURL, "../ext/moment").concat(MyAMS.env.extext, ".js")).then(function () {
        MyAMS.ajax.check($.fn.datetimepicker, "".concat(MyAMS.env.baseURL, "../ext/tempusdominus-bootstrap4").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          var required = [];

          if (firstLoad) {
            required.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL, "../../css/ext/tempusdominus-bootstrap4").concat(MyAMS.env.extext, ".css"), 'tempusdominus'));
          }

          $.when.apply($, required).then(function () {
            inputs.each(function (idx, elt) {
              var input = $(elt),
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
              var settings = $.extend({}, defaultOptions, data.datetimeOptions || data.options);
              settings = MyAMS.core.executeFunctionByName(data.amsDatetimeInitCallback || data.amsInit, document, input, settings) || settings;
              var veto = {
                veto: false
              };
              input.trigger('before-init.ams.datetime', [input, settings, veto]);

              if (veto.veto) {
                return;
              }

              input.datetimepicker(settings);
              var plugin = input.data('datetimepicker');

              if (data.amsDatetimeIsoTarget || data.amsIsoTarget) {
                input.on('change.datetimepicker', function (evt) {
                  var source = $(evt.currentTarget),
                      data = source.data(),
                      target = $(data.amsDatetimeIsoTarget || data.amsIsoTarget);
                  target.val(evt.date ? evt.date.toISOString(true) : null);
                });
              }

              input.trigger('after-init.ams.datetime', [input, plugin]);
            });
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
 * ACE text editor
 */

function editor(element) {
  return new Promise(function (resolve, reject) {
    var editors = $('.editor textarea', element);

    if (editors.length > 0) {
      MyAMS.require('ajax').then(function () {
        MyAMS.ajax.check(window.ace, "".concat(MyAMS.env.baseURL, "../ext/ace/ace").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          var ace = window.ace,
              deferred = [];

          if (firstLoad) {
            ace.config.set('basePath', "".concat(MyAMS.env.baseURL, "../ext/ace"));
            deferred.push(MyAMS.core.getScript("".concat(MyAMS.env.baseURL, "../ext/ace/ext-modelist").concat(MyAMS.env.extext, ".js")));
          }

          $.when.apply($, deferred).then(function () {
            editors.each(function (idx, elt) {
              var textarea = $(elt),
                  widget = textarea.parents('.editor'),
                  data = textarea.data(),
                  modeList = ace.require('ace/ext/modelist'),
                  mode = data.amsEditorMode || data.amsMode || modeList.getModeForPath(data.amsEditorFilename || data.amsFilename || 'text.txt').mode;

              setTimeout(function () {
                // create editor DIV
                var textEditor = $('<div>', {
                  position: 'absolute',
                  width: textarea.width(),
                  height: textarea.height(),
                  'class': textarea.attr('class')
                }).insertBefore(textarea);
                textarea.css('display', 'none'); // initialize editor

                var defaultOptions = {
                  mode: mode,
                  fontSize: 11,
                  tabSize: 4,
                  useSoftTabs: false,
                  showGutter: true,
                  showLineNumbers: true,
                  printMargin: 132,
                  showInvisibles: true
                };
                var settings = $.extend({}, defaultOptions, data.amsEditorOptions || data.amsOptions);
                settings = MyAMS.core.executeFunctionByName(data.amsEditorInitCallback || data.amsInit, document, textarea, settings) || settings;
                var veto = {
                  veto: false
                };
                textarea.trigger('before-init.ams.editor', [textarea, settings, veto]);

                if (veto.veto) {
                  return;
                }

                var editor = ace.edit(textEditor[0]);
                editor.setOptions(settings);
                editor.session.setValue(textarea.val());
                editor.session.on('change', function () {
                  textarea.val(editor.session.getValue());
                });
                widget.data('editor', editor);
                MyAMS.core.executeFunctionByName(data.amsEditorAfterEditCallback || data.amsAfterInit, document, textarea, editor, settings);
                textarea.trigger('after-init.ams.editor', [textarea, editor]);
              }, 200);
            });
          });
        });
      }, reject).then(function () {
        resolve(editors);
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
 * Image area select plug-in integration
 */

function imgAreaSelect(element) {
  return new Promise(function (resolve, reject) {
    var images = $('.imgareaselect', element);

    if (images.length > 0) {
      MyAMS.require('ajax').then(function () {
        MyAMS.ajax.check($.fn.imgAreaSelect, "".concat(MyAMS.env.baseURL, "../ext/jquery-imgareaselect").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          var required = [];

          if (firstLoad) {
            required.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL, "../../css/ext/imgareaselect-animated").concat(MyAMS.env.extext, ".css"), 'imgareaselect'));
          }

          $.when.apply($, required).then(function () {
            images.each(function (idx, elt) {
              var image = $(elt);

              if (image.data('imgAreaSelect')) {
                return; // already initialized
              }

              var data = image.data(),
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
                  var target = data.amsImgareaselectTargetField || data.amsTargetField || 'image_';
                  $("input[name=\"".concat(target, "x1\"]"), parent).val(selection.x1);
                  $("input[name=\"".concat(target, "y1\"]"), parent).val(selection.y1);
                  $("input[name=\"".concat(target, "x2\"]"), parent).val(selection.x2);
                  $("input[name=\"".concat(target, "y2\"]"), parent).val(selection.y2);
                }
              };
              var settings = $.extend({}, defaultOptions, data.amsImgareaselectOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsImgareaselectInitCallback || data.amsInit, document, image, settings) || settings;
              var veto = {
                veto: false
              };
              image.trigger('before-init.ams.imgareaselect', [image, settings, veto]);

              if (veto.veto) {
                return;
              } // add timeout to update plug-in if displayed into a modal dialog


              setTimeout(function () {
                var plugin = image.imgAreaSelect(settings);
                image.trigger('after-init.ams.imgareaselect', [image, plugin]);
              }, 200);
            });
          }, reject).then(function () {
            resolve(images);
          });
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
  return new Promise(function (resolve) {
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
 *
 * A switcher is a simple fieldset with a "switch" icon in it's legend, which can
 * be used to hide or show fieldset content.
 */

function switcher(element) {
  return new Promise(function (resolve) {
    var switchers = $('legend.switcher', element);

    if (switchers.length > 0) {
      switchers.each(function (idx, elt) {
        var legend = $(elt),
            fieldset = legend.parent('fieldset'),
            data = legend.data(),
            state = data.amsSwitcherState || data.amsState,
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

          $("<i class=\"fa fa-".concat(state === 'open' ? minusClass : plusClass, " mr-2\"></i>")).prependTo(legend);
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
  return new Promise(function (resolve, reject) {
    var editors = $('.tinymce', element);

    if (editors.length > 0) {
      MyAMS.require('ajax', 'i18n').then(function () {
        var baseURL = "".concat(MyAMS.env.baseURL, "../ext/tinymce").concat(MyAMS.env.devmode ? '/dev' : '');
        MyAMS.ajax.check(window.tinymce, "".concat(baseURL, "/tinymce").concat(MyAMS.env.extext, ".js")).then(function (firstLoad) {
          var deferred = [];

          if (firstLoad) {
            tinymce.baseURL = baseURL;
            tinymce.suffix = MyAMS.env.extext;
            deferred.push(MyAMS.core.getScript("".concat(baseURL, "/jquery.tinymce.min.js")));
            deferred.push(MyAMS.core.getScript("".concat(baseURL, "/themes/silver/theme").concat(MyAMS.env.extext, ".js"))); // Prevent Bootstrap dialog from blocking focusin

            $(document).on('focusin', function (evt) {
              if ($(evt.target).closest(".tox-tinymce, .tox-tinymce-aux, " + ".moxman-window, .tam-assetmanager-root").length) {
                evt.stopImmediatePropagation();
              }
            });
          }

          $.when.apply($, deferred).then(function () {
            editors.each(function (idx, elt) {
              var editor = $(elt),
                  data = editor.data(),
                  defaultOptions = {
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
                autoresize_max_height: 500,
                init_instance_callback: function init_instance_callback(instance) {
                  var handler = function handler() {
                    instance.remove("#".concat(instance.id));
                    $(document).off('cleared.ams.content', handler);
                  };

                  $(document).on('cleared.ams.content', handler);
                }
              };
              var plugins = data.amsTinymceExternalPlugins || data.amsExternalPlugins;

              if (plugins) {
                var names = plugins.split(/\s+/);

                var _iterator7 = _createForOfIteratorHelper(names),
                    _step4;

                try {
                  for (_iterator7.s(); !(_step4 = _iterator7.n()).done;) {
                    var name = _step4.value;
                    var src = editor.data("ams-tinymce-plugin-".concat(name)) || editor.data("ams-plugin-".concat(name));
                    tinymce.PluginManager.load(name, MyAMS.core.getSource(src));
                  }
                } catch (err) {
                  _iterator7.e(err);
                } finally {
                  _iterator7.f();
                }
              }

              var settings = $.extend({}, defaultOptions, data.amsTinymceOptions || data.amsOptions);
              settings = MyAMS.core.executeFunctionByName(data.amsTinymceInitCallback || data.amsInit, document, editor, settings) || settings;
              var veto = {
                veto: false
              };
              editor.trigger('before-init.ams.tinymce', [editor, settings, veto]);

              if (veto.veto) {
                return;
              }

              var plugin = editor.tinymce(settings);
              MyAMS.core.executeFunctionByName(data.amsTinymceAfterInitCallback || data.amsAfterInit, document, editor, plugin, settings);
              editor.trigger('after-init.ams.tinymce', [editor, settings]);
            });
          }, reject).then(function () {
            resolve(editors);
          });
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

                var _iterator8 = _createForOfIteratorHelper(validator.errorList),
                    _step5;

                try {
                  for (_iterator8.s(); !(_step5 = _iterator8.n()).done;) {
                    var error = _step5.value;

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
                  _iterator8.e(err);
                } finally {
                  _iterator8.f();
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
  MyAMS.registry.register(datetime, 'datetime');
  MyAMS.registry.register(dragdrop, 'dragdrop');
  MyAMS.registry.register(editor, 'editor');
  MyAMS.registry.register(fileInput, 'fileInput');
  MyAMS.registry.register(imgAreaSelect, 'imgAreaSelect');
  MyAMS.registry.register(select2, 'select2');
  MyAMS.registry.register(svgPlugin, 'svg');
  MyAMS.registry.register(switcher, 'switcher');
  MyAMS.registry.register(tinymce, 'tinymce');
  MyAMS.registry.register(validate, 'validate'); // register module

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
/*! exports provided: skin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "skin", function() { return skin; });
var _this = undefined;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* global MyAMS */

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
    });
    $(document).on('clear.ams.content', function () {
      $('.tooltip').remove();
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
  checkURL: function checkURL() {
    return new Promise(function (resolve, reject) {
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
        }

        menu = $("a[href=\"".concat(hash, "\"]"), nav); // load specified URL into '#content'

        MyAMS.skin.loadURL(url, container).then(function () {
          var prefix = $('html head title').data('ams-title-prefix'),
              fullPrefix = prefix ? "".concat(prefix, " > ") : '';
          document.title = "".concat(fullPrefix).concat($('[data-ams-page-title]:first', container).data('ams-page-title') || menu.attr('title') || menu.text().trim() || document.title);

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
          } // try to activate matching navigation menu


          if (menu.exists()) {
            MyAMS.require('nav').then(function () {
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
  loadURL: function loadURL(url, target) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return new Promise(function (resolve, reject) {
      if (url.startsWith('#')) {
        url = url.substr(1);
      }

      target = $(target);
      MyAMS.core.executeFunctionByName(MyAMS.config.clearContent, document, target).then(function (status) {
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

            if (target.attr('id') === 'content') {
              MyAMS.require('nav').then(function () {
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
        target.trigger('before-load.ams.content', [settings, veto]);

        if (veto.veto) {
          return;
        }

        $.ajax(settings).then(function (result, status, xhr) {
          if ($.isArray(result)) {
            var _result = result;

            var _result2 = _slicedToArray(_result, 3);

            result = _result2[0];
            status = _result2[1];
            xhr = _result2[2];
          }

          MyAMS.require('ajax').then(function () {
            var response = MyAMS.ajax.getResponse(xhr);

            if (response) {
              var dataType = response.contentType,
                  _result3 = response.data;
              $('.loading', target).remove();

              switch (dataType) {
                case 'json':
                  MyAMS.ajax.handleJSON(_result3, target);
                  resolve(_result3, status, xhr);
                  break;

                case 'script':
                case 'xml':
                  resolve(_result3, status, xhr);
                  break;

                case 'html':
                case 'text':
                default:
                  target.parents('.hidden').removeClass('hidden');
                  MyAMS.core.executeFunctionByName(target.data('ams-clear-content') || MyAMS.config.clearContent, document, target).then(function () {
                    target.css({
                      opacity: '0.0'
                    }).html(_result3).removeClass('hidden').delay(30).animate({
                      opacity: '1.0'
                    }, 300);
                    MyAMS.core.executeFunctionByName(target.data('ams-init-content') || MyAMS.config.initContent, window, target).then(function () {
                      MyAMS.form && MyAMS.form.setFocus(target);
                      target.trigger('after-load.ams.content');
                      resolve(_result3, status, xhr);
                    });
                  }, reject);
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
/*! exports provided: stats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stats", function() { return stats; });
/* global MyAMS */

/**
 * MyAMS stats management
 */
var $ = MyAMS.$;
var stats = {
  logPageview: function logPageview() {},
  logEvent: function logEvent() {}
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
/*! exports provided: tree */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tree", function() { return tree; });
/* global MyAMS */

/**
 * MyAMS tree management
 */
var $ = MyAMS.$;
var tree = {};
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
/*! exports provided: xmlrpc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xmlrpc", function() { return xmlrpc; });
/* global MyAMS */

/**
 * MyAMS XML-RPC protocol support
 */
var $ = MyAMS.$;
var xmlrpc = {};
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

/***/ "./src/js/myams-mini.js":
/*!******************************!*\
  !*** ./src/js/myams-mini.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
  ajax: _mod_ajax__WEBPACK_IMPORTED_MODULE_3__["ajax"],
  alert: _mod_alert__WEBPACK_IMPORTED_MODULE_7__["alert"],
  callbacks: _mod_callbacks__WEBPACK_IMPORTED_MODULE_11__["callbacks"],
  clipboard: _mod_clipboard__WEBPACK_IMPORTED_MODULE_12__["clipboard"],
  container: _mod_container__WEBPACK_IMPORTED_MODULE_13__["container"],
  datatable: _mod_datatable__WEBPACK_IMPORTED_MODULE_14__["datatable"],
  error: _mod_error__WEBPACK_IMPORTED_MODULE_2__["error"],
  events: _mod_events__WEBPACK_IMPORTED_MODULE_10__["events"],
  form: _mod_form__WEBPACK_IMPORTED_MODULE_9__["form"],
  graph: _mod_graph__WEBPACK_IMPORTED_MODULE_15__["graph"],
  helpers: _mod_helpers__WEBPACK_IMPORTED_MODULE_16__["helpers"],
  i18n: _mod_i18n__WEBPACK_IMPORTED_MODULE_4__["i18n"],
  jsonrpc: _mod_jsonrpc__WEBPACK_IMPORTED_MODULE_20__["jsonrpc"],
  menu: _mod_menu__WEBPACK_IMPORTED_MODULE_17__["menu"],
  modal: _mod_modal__WEBPACK_IMPORTED_MODULE_8__["modal"],
  nav: _mod_nav__WEBPACK_IMPORTED_MODULE_5__["nav"],
  notifications: _mod_notifications__WEBPACK_IMPORTED_MODULE_18__["notifications"],
  skin: _mod_skin__WEBPACK_IMPORTED_MODULE_6__["skin"],
  stats: _mod_stats__WEBPACK_IMPORTED_MODULE_22__["stats"],
  tree: _mod_tree__WEBPACK_IMPORTED_MODULE_19__["tree"],
  xmlrpc: _mod_xmlrpc__WEBPACK_IMPORTED_MODULE_21__["xmlrpc"]
});
var html = _ext_base__WEBPACK_IMPORTED_MODULE_0__["default"].$('html');

if (html.data('ams-init') !== false) {
  Object(_ext_base__WEBPACK_IMPORTED_MODULE_0__["init"])(_ext_base__WEBPACK_IMPORTED_MODULE_0__["default"].$);
}
/** Version: 1.3.3  */

/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jquery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jquery;

/***/ })

/******/ });
//# sourceMappingURL=myams-mini-dev.js.map