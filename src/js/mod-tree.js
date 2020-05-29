/**
 * MyAMS tree management
 */

if (!window.jQuery) {
	window.$ = window.jQuery = require('jquery');
}


export const tree = {

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
