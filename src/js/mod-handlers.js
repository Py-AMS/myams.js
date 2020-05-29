/**
 * MyAMS events handlers
 */

const $ = MyAMS.$;

let _initialized = false;


export const handlers = {

	init: () => {

		if (_initialized) {
			return;
		}
		_initialized = true;

		// Initialize custom click handlers
		$(document).on('click', '[data-ams-click-handler]', (evt) => {
			const source = $(evt.currentTarget),
				  handlers = source.data('ams-disabled-handlers');
			if ((handlers === true) || (handlers === 'click') || (handlers === 'all')) {
				return;
			}
			const data = source.data();
			if (data.amsClickHandler) {
				if ((data.amsPreventDefault !== false) && (data.amsClickPreventDefault !== false)) {
					evt.preventDefault();
				}
				if ((data.amsStopPropagation !== false) && (data.amsClickStopPropagation !== false)) {
					evt.stopPropagation();
				}
				for (const handler of data.amsClickHandler.split(/[\s,;]+/)) {
					const callback = MyAMS.core.getFunctionByName(handler);
					if (callback !== undefined) {
						callback.call(source, evt, data.amsClickHandlerOptions);
					}
				}
			}
		});

		// Initialize custom change handlers
		$(document).on('change', '[data-ams-change-handler]', (evt) => {
			const source = $(evt.currentTarget);
			// Disable change handlers for readonly inputs
			// These change handlers are activated by IE!!!
			if (source.prop('readonly')) {
				return;
			}
			const handlers = source.data('ams-disabled-handlers');
			if ((handlers === true) || (handlers === 'change') || (handlers === 'all')) {
				return;
			}
			const data = source.data();
			if (data.amsChangeHandler) {
				if ((data.amsKeepDefault !== false) && (data.amsChangeKeepDefault !== false)) {
					evt.preventDefault();
				}
				if ((data.amsStopPropagation !== false) && (data.amsChangeStopPropagation !== false)) {
					evt.stopPropagation();
				}
				for (const handler of data.amsChangeHandler.split(/[\s,;]+/)) {
					const callback = MyAMS.core.getFunctionByName(handler);
					if (callback !== undefined) {
						callback.call(source, evt, data.amsChangeHandlerOptions);
					}
				}
			}
		});

		// Notify reset to update Select2 widgets
		$(document).on('reset', 'form', (evt) => {
			const form = $(evt.currentTarget);
			setTimeout(function() {
				$('.alert-danger, SPAN.state-error', form).not('.persistent').remove();
				$('LABEL.state-error', form).removeClass('state-error');
				form.find('.select2').trigger('change');
				$('[data-ams-reset-callback]', form).each((idx, elt) => {
					const element = $(elt),
						  data = element.data(),
						  callback = MyAMS.core.getFunctionByName(data.amsResetCallback);
					if (callback !== undefined) {
						callback.call(form, element, data.amsResetCallbackOptions);
					}
				});
			}, 10);
			MyAMS.form && MyAMS.form.setFocus(form);
		});

		// Initialize custom reset handlers
		$(document).on('reset', '[data-ams-reset-handler]', (evt) => {
			const form = $(evt.currentTarget),
				  data = form.data();
			if (data.amsResetHandler) {
				if ((data.amsKeepDefault !== true) && (data.amsResetKeepDefault !== true)) {
					evt.preventDefault();
				}
				const callback = MyAMS.core.getFunctionByName(data.amsResetHandler);
				if (callback !== undefined) {
					callback.call(form, data.amsResetHandlerOptions);
				}
			}
		});

		// Initialize custom event on click
		$(document).on('click', '[data-ams-click-event]', (evt) => {
			const source = $(evt.currentTarget);
			$(evt.target).trigger(source.data('ams-click-event'),
								  source.data('ams-click-event-options'));
		});

		// Cancel clicks on readonly checkbox
		$(document).on('click', 'input[type="checkbox"][readonly]', function() {
			return false;
		});
	},

	initElement: (element) => {
	}
};


/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
	MyAMS.config.modules.push('handlers');
} else {
	MyAMS.handlers = handlers;
	console.debug("MyAMS: handlers module loaded...");
}
