!function(e,o){if("function"==typeof define&&define.amd)define(["exports"],o);else if("undefined"!=typeof exports)o(exports);else{var t={};o(t),e.modStats=t}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.stats=void 0,window.jQuery||(window.$=window.jQuery=require("jquery"));var o={logPageview:function(){},logEvent:function(){}};e.stats=o,window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("stats"):(MyAMS.stats=o,console.debug("MyAMS: stats module loaded...")))});