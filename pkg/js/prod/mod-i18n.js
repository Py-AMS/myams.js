!function(e,o){var n;"function"==typeof define&&define.amd?define(["exports"],o):"undefined"!=typeof exports?o(exports):(o(n={}),e.modI18n=n)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.i18n=void 0;var a=MyAMS.$,r=!1,o={language:"en",INFO:"Information",WARNING:"!! WARNING !!",ERROR:"ERROR: ",LOADING:"Loading...",PROGRESS:"Processing",WAIT:"Please wait!",FORM_SUBMITTED:"This form was already submitted...",NO_SERVER_RESPONSE:"No response from server!",ERROR_OCCURED:"An error occured!",ERRORS_OCCURED:"Some errors occured!",BAD_LOGIN_TITLE:"Bad login!",BAD_LOGIN_MESSAGE:"Your anthentication credentials didn't allow you to open a session; please check your credentials or contact administrator.",CONFIRM:"Confirm",CONFIRM_REMOVE:"Removing this content can't be undone. Do you confirm?",BTN_OK:"OK",BTN_CANCEL:"Cancel",BTN_YES:"Yes",BTN_NO:"No",BTN_CLOSE:"Close",CLIPBOARD_COPY:"Copy to clipboard with Ctrl+C, and Enter",CLIPBOARD_CHARACTER_COPY_OK:"Character copied to clipboard.",CLIPBOARD_TEXT_COPY_OK:"Text copied to clipboard.",FORM_CHANGED_WARNING:"Some changes were not saved. These updates will be lost if you leave this page.",DELETE_WARNING:"This change can't be undone. Are you sure that you want to delete this element?",NO_UPDATE:"No changes were applied.",DATA_UPDATED:"Data successfully updated.",HOME:"Home",LOGOUT:"Logout?",LOGOUT_COMMENT:"You can improve your security further after logging out by closing this opened browser",LAST_UPDATE:"Last update: ",DT_COLUMNS:"Columns",init:function(e){var i=0<arguments.length&&void 0!==e&&e;return new Promise(function(e,o){var n,t;!r||i?(r=!0,(t=(n=a("html")).attr("lang")||n.attr("xml:lang"))&&!t.startsWith("en")?MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"i18n/myams-").concat(t.substr(0,2),".js")).then(e,o):e()):e()})}};e.i18n=o,MyAMS.env.bundle?MyAMS.config.modules.push("i18n"):(MyAMS.i18n=o,console.debug("MyAMS: I18n module loaded..."))});