/* global MyAMS */
/**
 * MyAMS container management
 */

const $ = MyAMS.$;


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
