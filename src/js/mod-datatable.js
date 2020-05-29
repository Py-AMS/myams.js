/**
 * MyAMS datatables management
 */

if (!window.jQuery) {
	window.$ = window.jQuery = require('jquery');
}


export const datatable = {

};


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
