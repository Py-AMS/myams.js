/**
 * MyAMS events management
 */

const $ = MyAMS.$;

let _initialized = false;


export const events = {

	init: () => {
		if (_initialized) {
			return;
		}
		_initialized = true;
	},

	initElement: (element) => {
		$('[data-ams-events-handlers]', element).each((idx, elt) => {
			const element = $(elt),
				  handlers = element.data('ams-events-handlers');
			if (handlers) {
				for (const [event, handler] of Object.entries(handlers)) {
					element.on(event,
						element.data('ams-events-options') || {},
						MyAMS.core.getFunctionByName(handler));
				}
			}
		});
	}
};


/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
	MyAMS.config.modules.push('events');
} else {
	MyAMS.events = events;
	console.debug("MyAMS: events module loaded...");
}
