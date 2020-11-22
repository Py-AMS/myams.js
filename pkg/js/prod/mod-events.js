!function(e,n){"function"==typeof define&&define.amd?define(["exports"],n):"undefined"!=typeof exports?n(exports):(n(n={}),e.modEvents=n)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function i(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=l(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var a=0,n=function(){};return{s:n,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o=!0,i=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return o=e.done,e},e:function(e){i=!0,r=e},f:function(){try{o||null==t.return||t.return()}finally{if(i)throw r}}}}function r(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],a=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(t.push(i.value),!n||t.length!==n);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}return t}(e,n)||l(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,n){if(e){if("string"==typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(e,n):void 0}}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.events=void 0;var c=MyAMS.$,n=!1,t={init:function(){n||(n=!0,c(document).on("click","[data-ams-click-handler]",MyAMS.events.clickHandler),c(document).on("change","[data-ams-change-handler]",MyAMS.events.changeHandler),c(document).on("click","[data-ams-click-event]",MyAMS.events.triggerEvent))},initElement:function(e){c("[data-ams-events-handlers]",e).each(function(e,n){var i=c(n),n=i.data("ams-events-handlers");if(n)for(var t=0,a=Object.entries(n);t<a.length;t++)!function(){var e=r(a[t],2),n=e[0],o=e[1];i.on(n,function(e){for(var n,t=arguments.length,a=new Array(1<t?t-1:0),r=1;r<t;r++)a[r-1]=arguments[r];0<a.length?(n=MyAMS.core).executeFunctionByName.apply(n,[o,document,e].concat(a)):MyAMS.core.executeFunctionByName(o,document,e,i.data("ams-events-options")||{})})}()})},getHandlers:function(e,a){var r=[],n=e.data("ams-events-handlers");return n&&n[a]&&r.push(e),c("[data-ams-events-handlers]",e).each(function(e,n){var t=c(n),n=t.data("ams-events-handlers");n&&n[a]&&r.push(t)}),r},clickHandler:function(e){var n=c(e.currentTarget),t=n.data("ams-disabled-handlers");if(!0!==t&&"click"!==t&&"all"!==t){var a=n.data();if(a.amsClickHandler){!1!==a.amsPreventDefault&&!1!==a.amsClickPreventDefault&&e.preventDefault(),!1!==a.amsStopPropagation&&!1!==a.amsClickStopPropagation&&e.stopPropagation();var r=i(a.amsClickHandler.split(/[\s,;]+/));try{for(r.s();!(o=r.n()).done;){var o=o.value,o=MyAMS.core.getFunctionByName(o);void 0!==o&&o.call(document,e,a.amsClickHandlerOptions)}}catch(e){r.e(e)}finally{r.f()}}}},changeHandler:function(e){var n=c(e.currentTarget);if(!n.prop("readonly")){var t=n.data("ams-disabled-handlers");if(!0!==t&&"change"!==t&&"all"!==t){var a=n.data();if(a.amsChangeHandler){!1!==a.amsKeepDefault&&!1!==a.amsChangeKeepDefault&&e.preventDefault(),!1!==a.amsStopPropagation&&!1!==a.amsChangeStopPropagation&&e.stopPropagation();var r=i(a.amsChangeHandler.split(/[\s,;]+/));try{for(r.s();!(o=r.n()).done;){var o=o.value,o=MyAMS.core.getFunctionByName(o);void 0!==o&&o.call(document,e,a.amsChangeHandlerOptions)}}catch(e){r.e(e)}finally{r.f()}}}}},triggerEvent:function(e){var n=c(e.currentTarget);c(e.target).trigger(n.data("ams-click-event"),n.data("ams-click-event-options"))}};e.events=t,MyAMS.env.bundle?MyAMS.config.modules.push("events"):(MyAMS.events=t,console.debug("MyAMS: events module loaded..."))});