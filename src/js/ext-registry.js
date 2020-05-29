/**
 * MyAMS dynamic plug-ins loading management
 */


/**
 * Plug-ins loading order
 *  - initialize registry
 *  - initialize DOM data attributes
 *  - register all plug-ins from given DOM element
 *  - load all plug-ins from given DOM element
 *  - get list of disabled plug-ins into given DOM element
 *  - call callbacks for all enabled plug-ins
 *  - call callbacks for enabled "async" plug-ins
 */

/**
 * Base plug-in class
 */
class Plugin {

	constructor(name, props={}, loaded=false) {
		if (typeof name === 'object') {
			props = name;
			loaded = props;
			if (props.hasOwnProperty('name')) {
				name = props.name;
			} else {
				throw "Missing plug-in name!";
			}
		}
		// plug-in name
		this.name = name;
		// plug-in source URL
		this.src = props.src;
		// plug-in associated CSS
		this.css = props.css;
		// plug-in callbacks
		this.callbacks = [];
		if (props.callback) {
			this.callbacks.push({
				callback: props.callback,
				context: props.context || 'body'
			});
		}
		// async plug-ins are loaded simultaneously; sync ones are loaded and called after...
		this.async = props.async === undefined ? true : props.async;
		// loaded flag
		this.loaded = loaded;
	}

	/**
	 * Extend properties of already registered plug-in
 	 */
	extend(props) {
		return $.extend(this, props);
	}

	/**
	 * Load plug-in from remote script
	 *
	 * @returns {Promise<void>|*}
	 */
	load() {
		return new Promise((resolve, reject) => {
			if (!this.loaded) {
				let result = MyAMS.core.getScript(this.src);
				if (this.css) {
					result = result.then(() => {
						MyAMS.core.getCSS(this.css, `${this.name}_css`);
					})
				}
				result.then(() => {
					this.loaded = true;
					resolve();
				});
			} else {
				resolve();
			}
		});
	}

	/**
	 * Run plug-in
	 *
	 * @param element: plug-in execution context
	 */
	run(element) {
		for (const callback of this.callbacks) {
			if (typeof callback.callback === 'string') {
				console.debug(`Resolving callback ${callback.callback}`);
				callback.callback = MyAMS.core.getFunctionByName(callback.callback) || callback.callback;
			}
			callback.callback(element, callback.context);
		}
	}
}


/**
 * Plug-ins registry class
 */
class PluginsRegistry {

	constructor() {
		this.plugins = new Map();
	}

	/**
	 * Register new plug-in
	 *
	 * @param plugin: plugin function caller, or object containing plug-in properties
	 * @param name: plug-in unique name
	 * @param callback: callback function which can be called after plug-in registration
	 */
	register(plugin, name) {
		// check arguments
		if (!name && plugin.hasOwnProperty('name')) {
			name = plugin.name;
		}
		// check for already registered plug-in
		const plugins = this.plugins;
		if (plugins.has(name)) {
			if (window.console) {
				console.debug && console.debug(`Plug-in ${name} is already registered!`);
			}
			return plugins.get(name);
		}
		// register new plug-in
		if (typeof plugin === 'function') {  // callable object
			plugins.set(name, new Plugin(name, {
				callback: plugin
			}, true));
		} else if (typeof plugin === 'object') {  // plug-in properties object
			plugins.set(name, new Plugin(name, plugin, !Boolean(plugin.src)));
		}
		// check callback
		return plugins.get(name);
	}

	/**
	 * Load plug-ins declared into DOM element
	 *
	 * @param element
	 */
	load(element) {
		// scan element for new plug-ins
		const asyncPlugins = [],
			  syncPlugins = [];
		$('[data-ams-plugins]', element).each((idx, elt) => {
			const source = $(elt),
				  names = source.data('ams-plugins');
			let plugin,
				props;
			if (typeof names === 'string') {
				for (const name of names.split(/[\s,;]+/)) {
					props = {
						src: source.data(`ams-plugin-${name}-src`),
						css: source.data(`ams-plugin-${name}-css`),
						callback: source.data(`ams-plugin-${name}-callback`),
						context: source,
						async: source.data(`ams-plugin-${name}-async`)
					};
					plugin = this.register(props, name);
					if (!plugin.loaded) {
						if (props.async === false) {
							syncPlugins.push(plugin.load());
						} else {
							asyncPlugins.push(plugin.load());
						}
					}
				}
			} else {  // JSON plug-in declaration
				for (props of names) {
					$.extend(props, {
						context: source
					});
					plugin = this.register(props);
					if (!plugin.loaded) {
						if (plugin.async === false) {
							syncPlugins.push(plugin.load());
						} else {
							asyncPlugins.push(plugin.load());
						}
					}
				}
			}
		});
		// load plug-ins
		let result = $.when.apply($, asyncPlugins);
		for (const plugin of syncPlugins) {
			result = result.done(() => {});
		}
		return result;
	}

	/**
	 * Run registered plug-ins on given element
	 *
	 * @param element: source element
	 * @param names: array list of plug-ins to activate, or all registered plug-ins if null
	 */
	run(element, names=null) {

		// check for disabled plug-ins
		const disabled = new Set();
		$('[data-ams-plugins-disabled]', element).each((idx, elt) => {
			const names = $(elt).data('ams-plugins-disabled').split(/[\s,;]+/);
			for (const name of names) {
				disabled.add(name);
			}
		});

		const plugins = this.plugins;
		if (names) {  // only run given plug-ins, EVEN DISABLED ONES
			for (const name of names) {
				if (plugins.has(name)) {
					plugins.get(name).run(element);
				}
			}
		} else {  // run all plug-ins, except disabled ones
			for (const [name, plugin] of plugins.entries()) {
				if (disabled.has(name)) {
					continue;
				}
				plugin.run(element);
			}
		}
	}
}

const plugins = new PluginsRegistry();


export const registry = {

	/**
	 * Plug-ins registry
	 */
	plugins: plugins,

	/**
	 * Initialize plug-ins registry from DOM
	 *
	 * @param element: source element to initialize from
	 */
	initElement: function(element='#content') {
		// populate data attributes
		MyAMS.registry.initData(element);
		// load plug-ins from given DOM element
		return plugins.load(element);
	},

	/**
	 * Register a new plug-in through Javascript instead of HTML data attributes
	 *
	 * @param plugin: callable object, or object containing plug-in properties
	 * @param name: plug-in name, used if @plugin is a function
	 * @param callback: callback function which can be called after plug-in registration
	 */
	register: function(plugin, name, callback) {
		plugins.register(plugin, name, callback);
	},

	/**
	 * Data attributes initializer
	 *
	 * This function converts a single "data-ams-data" attribute into a set of several "data-*"
	 * attributes.
	 * This can be used into HTML templates engines which don't allow to create dynamic attributes
	 * easilly.
	 *
	 * @param element: parent element
	 */
	initData: function(element) {
		$('[data-ams-data]', element).each((idx, elt) => {
			const $elt = $(elt),
				  data = $elt.data('ams-data');
			if (data) {
				for (const name in data) {
					if (!data.hasOwnProperty(name)) {
						continue;
					}
					let elementData = data[name];
					if (typeof elementData !== 'string') {
						elementData = JSON.stringify(elementData);
					}
					$elt.attr(`data-${name}`, elementData);
				}
			}
		});
	},

	/**
	 * Run registered plug-ins on given element
	 *
	 * @param element: DOM element
	 * @param names: names of plug-in to run on given element; all if null
	 */
	run: function(element, names=null) {
		plugins.run(element, names);
	}
};
