/**
 * MyAMS callbacks management
 */

const $ = MyAMS.$;

let _initialized = false;


export const callbacks = {

	init: () => {
		if (_initialized) {
			return;
		}
		_initialized = true;
	},

	initElement: (element) => {
		$('[data-ams-callback]', element).each((idx, elt) => {
			const data = $(elt).data();
			let callbacks;
			try {
				callbacks = JSON.parse(data.amsCallback);
				if (!$.isArray(callbacks)) {
					callbacks = [callbacks];
				}
			} catch (e) {
				callbacks = data.amsCallback.split(/[\s,;]+/);
			}
			for (const callback of callbacks) {
				let callable, source, options;
				if (typeof callback === 'string') {
					callable = MyAMS.core.getFunctionByName(callback);
					source = data.amsCallbackOptions;
					options = data.amsCallbackOptions;
					if (typeof options === 'string') {
						options = options.unserialize();
					}
				} else {  // JSON object
					callable = MyAMS.core.getFunctionByName(callback.callback);
					source = callback.source;
					options = callable.options;
				}
				if (typeof callable === 'undefined') {
					if (source) {
						MyAMS.core.getScript(source).then(() => {
							callable = MyAMS.core.getFunctionByName(callback);
							if (typeof callable === 'undefined') {
								console.warn(`Missing callback ${callback}!`);
							} else {
								callable.call(elt, options);
							}
						});
					} else {
						console.warn(`Missing source for undefined callback ${callback}!`)
					}
				} else {
					Promise.resolve().then(() => {
						callable.call(elt, options);
					});
				}
			}
		});
	}
};


/**
 * Global module initialization
 */
if (window.MyAMS) {
	if (MyAMS.env.bundle) {
		MyAMS.config.modules.push('callbacks');
	} else {
		MyAMS.callbacks = callbacks;
		console.debug("MyAMS: callbacks module loaded...");
	}
}
