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
			const
				context = $(elt),
				handlers = context.data('ams-events-handlers');
			if (handlers) {
				for (const [event, handler] of Object.entries(handlers)) {
					context.on(event, (event, options) => {
						MyAMS.core.executeFunctionByName(handler, document, event,
							options || context.data('ams-events-options') || {});
					});
				}
			}
		});
	},

	/**
	 * Get events handlers on given element for a specific event
	 *
	 * @param element: the checked element
	 * @param event: event for which handlers lookup is made
	 * @returns: an array of elements for which the event handler is defined
	 */
	getHandlers: (element, event) => {

		const
			result = [],
			handlers = element.data('ams-events-handlers');
		if (handlers && handlers[event]) {
			result.push(element);
		}
		$('[data-ams-events-handlers]', element).each((idx, elt) => {
			const
				context = $(elt),
				handlers = context.data('ams-events-handlers');
			if (handlers && handlers[event]) {
				result.push(context);
			}
		});
		return result;
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
