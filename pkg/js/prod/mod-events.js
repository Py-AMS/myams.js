!function(e,n){var t;"function"==typeof define&&define.amd?define(["exports"],n):"undefined"!=typeof exports?n(exports):(n(t={}),e.modEvents=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function c(e,n){var t;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(t=s(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,l=!1;return{s:function(){t=e[Symbol.iterator]()},n:function(){var e=t.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==t.return||t.return()}finally{if(l)throw o}}}}function i(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],a=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(t.push(i.value),!n||t.length!==n);a=!0);}catch(e){r=!0,o=e}finally{try{a||null==l.return||l.return()}finally{if(r)throw o}}return t}(e,n)||s(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,n){if(e){if("string"==typeof e)return a(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?a(e,n):void 0}}function a(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,a=new Array(n);t<n;t++)a[t]=e[t];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.events=void 0;var u=MyAMS.$,n=!1,t={init:function(){n||(n=!0,u(document).on("click","[data-ams-click-handler]",MyAMS.events.clickHandler),u(document).on("change","[data-ams-change-handler]",MyAMS.events.changeHandler),u(document).on("click","[data-ams-click-event]",MyAMS.events.triggerEvent))},initElement:function(e){u("[data-ams-events-handlers]",e).each(function(e,n){var a=u(n),t=a.data("ams-events-handlers");if(t)for(var r=0,o=Object.entries(t);r<o.length;r++)!function(){var e=i(o[r],2),n=e[0],t=e[1];a.on(n,function(e,n){MyAMS.core.executeFunctionByName(t,document,e,n||a.data("ams-events-options")||{})})}()})},getHandlers:function(e,r){var o=[],n=e.data("ams-events-handlers");return n&&n[r]&&o.push(e),u("[data-ams-events-handlers]",e).each(function(e,n){var t=u(n),a=t.data("ams-events-handlers");a&&a[r]&&o.push(t)}),o},clickHandler:function(e){var n=u(e.currentTarget),t=n.data("ams-disabled-handlers");if(!0!==t&&"click"!==t&&"all"!==t){var a=n.data();if(a.amsClickHandler){!1!==a.amsPreventDefault&&!1!==a.amsClickPreventDefault&&e.preventDefault(),!1!==a.amsStopPropagation&&!1!==a.amsClickStopPropagation&&e.stopPropagation();var r,o=c(a.amsClickHandler.split(/[\s,;]+/));try{for(o.s();!(r=o.n()).done;){var i=r.value,l=MyAMS.core.getFunctionByName(i);void 0!==l&&l.call(document,e,n,a.amsClickHandlerOptions)}}catch(e){o.e(e)}finally{o.f()}}}},changeHandler:function(e){var n=u(e.currentTarget);if(!n.prop("readonly")){var t=n.data("ams-disabled-handlers");if(!0!==t&&"change"!==t&&"all"!==t){var a=n.data();if(a.amsChangeHandler){!1!==a.amsKeepDefault&&!1!==a.amsChangeKeepDefault&&e.preventDefault(),!1!==a.amsStopPropagation&&!1!==a.amsChangeStopPropagation&&e.stopPropagation();var r,o=c(a.amsChangeHandler.split(/[\s,;]+/));try{for(o.s();!(r=o.n()).done;){var i=r.value,l=MyAMS.core.getFunctionByName(i);void 0!==l&&l.call(document,e,n,a.amsChangeHandlerOptions)}}catch(e){o.e(e)}finally{o.f()}}}}},triggerEvent:function(e){var n=u(e.currentTarget);u(e.target).trigger(n.data("ams-click-event"),n.data("ams-click-event-options"))}};e.events=t,MyAMS.env.bundle?MyAMS.config.modules.push("events"):(MyAMS.events=t,console.debug("MyAMS: events module loaded..."))});