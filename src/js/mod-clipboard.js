/**
 * MyAMS i18n translations
 */

if (!window.jQuery) {
	window.$ = window.jQuery = require('jquery');
}


export const clipboard = {

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
