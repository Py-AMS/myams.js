/**
 * MyAMS XML-RPC protocol support
 */

if (!window.jQuery) {
	window.$ = window.jQuery = require('jquery');
}


export const xmlrpc = {

};


/**
 * Global module initialization
 */
if (window.MyAMS) {
	if (MyAMS.env.bundle) {
		MyAMS.config.modules.push('xmlrpc');
	} else {
		MyAMS.xmlrpc = xmlrpc;
		console.debug("MyAMS: xmlrpc module loaded...");
	}
}
