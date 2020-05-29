/**
 * MyAMS JSON-RPC protocol support
 */

if (!window.jQuery) {
	window.$ = window.jQuery = require('jquery');
}


export const jsonrpc = {

};


/**
 * Global module initialization
 */
if (window.MyAMS) {
	if (MyAMS.env.bundle) {
		MyAMS.config.modules.push('jsonrpc');
	} else {
		MyAMS.jsonrpc = jsonrpc;
		console.debug("MyAMS: jsonrpc module loaded...");
	}
}
