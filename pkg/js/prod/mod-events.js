!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.modEvents=n.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.events=void 0;const t=MyAMS.$;let n=!1;const a={init:()=>{n||(n=!0,t(document).on("click","[data-ams-click-handler]",MyAMS.events.clickHandler),t(document).on("change","[data-ams-change-handler]",MyAMS.events.changeHandler),t(document).on("click","[data-ams-click-event]",MyAMS.events.triggerEvent))},initElement:e=>{t("[data-ams-events-handlers]",e).each(((e,n)=>{const a=t(n),s=a.data("ams-events-handlers");if(s)for(const[e,t]of Object.entries(s))a.on(e,(function(e){for(var n=arguments.length,s=new Array(n>1?n-1:0),o=1;o<n;o++)s[o-1]=arguments[o];s.length>0?MyAMS.core.executeFunctionByName(t,document,e,...s):MyAMS.core.executeFunctionByName(t,document,e,a.data("ams-events-options")||{})}))}))},getHandlers:(e,n)=>{const a=[],s=e.data("ams-events-handlers");return s&&s[n]&&a.push(e),t("[data-ams-events-handlers]",e).each(((e,s)=>{const o=t(s),r=o.data("ams-events-handlers");r&&r[n]&&a.push(o)})),a},clickHandler:e=>{const n=t(e.currentTarget),a=n.data("ams-disabled-handlers");if(!0===a||"click"===a||"all"===a)return;const s=n.data();if(s.amsClickHandler){!1!==s.amsPreventDefault&&!1!==s.amsClickPreventDefault&&e.preventDefault(),!1!==s.amsStopPropagation&&!1!==s.amsClickStopPropagation&&e.stopPropagation();for(const t of s.amsClickHandler.split(/[\s,;]+/)){const n=MyAMS.core.getFunctionByName(t);void 0!==n&&n.call(document,e,s.amsClickHandlerOptions)}}},changeHandler:e=>{const n=t(e.currentTarget);if(n.prop("readonly"))return;const a=n.data("ams-disabled-handlers");if(!0===a||"change"===a||"all"===a)return;const s=n.data();if(s.amsChangeHandler){!1!==s.amsKeepDefault&&!1!==s.amsChangeKeepDefault&&e.preventDefault(),!1!==s.amsStopPropagation&&!1!==s.amsChangeStopPropagation&&e.stopPropagation();for(const t of s.amsChangeHandler.split(/[\s,;]+/)){const n=MyAMS.core.getFunctionByName(t);void 0!==n&&n.call(document,e,s.amsChangeHandlerOptions)}}},triggerEvent:e=>{const n=t(e.currentTarget);t(e.target).trigger(n.data("ams-click-event"),n.data("ams-click-event-options"))}};e.events=a,MyAMS.env.bundle?MyAMS.config.modules.push("events"):(MyAMS.events=a,console.debug("MyAMS: events module loaded..."))}));