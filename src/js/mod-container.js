/**
 * MyAMS container management
 */

if (!window.jQuery) {
	window.$ = window.jQuery = require('jquery');
}


export const container = {

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
