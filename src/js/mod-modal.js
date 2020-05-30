/**
 * MyAMS modal dialogs support
 */

const $ = MyAMS.$;

let _initialized = false;


export const modal = {

	init: () => {

		if (_initialized) {
			return;
		}
		_initialized = true;

		if (MyAMS.config.ajaxNav) {
			// Initialize modal dialogs links
			$(document).on('click', '[data-toggle="modal"]', (evt) => {
				const source = $(evt.currentTarget),
					  handlers = source.data('ams-disabled-handlers');
				if ((handlers === true) ||
					(handlers === 'click') ||
					(handlers === 'all')) {
					return;
				}
				if (source.data('ams-context-menu') === true) {
					return;
				}
				if (source.data('ams-stop-propagation') === true) {
					evt.stopPropagation();
				}
				evt.preventDefault();
				MyAMS.require('modal').then(() => {
					MyAMS.modal.open(source);
				});
			});
		}

		/**
		 * Handle modal events to allow modals stacking
		 */
		const zIndexModal = 1100;

		$(document).on('shown.bs.modal', '.modal', (evt) => {
			// Enable modals stacking
			const
				dialog = $(evt.target),
				visibleModalsCount = $('.modal:visible').length,
				zIndex = zIndexModal + (100 * visibleModalsCount);
			dialog.css('z-index', zIndex);
			setTimeout(() => {
				$('.modal-backdrop').not('.modal-stack')
									.first()
									.css('z-index', zIndex - 10)
									.addClass('modal-stack');
			}, 0);
			// Check form contents before closing modals
			$(dialog).off('click', '[data-dismiss="modal"]')
					 .on('click', '[data-dismiss="modal"]', (evt) => {
				const source = $(evt.currentTarget),
					  dialog = source.parents('.modal').first();
				dialog.data('modal-result', $(evt.currentTarget).data('modal-dismiss-value'));
				if (MyAMS.form) {
					MyAMS.form.confirmChangedForm(dialog).then((status) => {
						if (status === 'success') {
							dialog.modal('hide');
						}
					});
				} else {
					dialog.modal('hide');
				}
			});
		});

		$(document).on('hidden.bs.modal', '.modal', () => {
			if ($('.modal:visible').length > 0) {
				$.fn.modal.Constructor.prototype._checkScrollbar();
				$.fn.modal.Constructor.prototype._setScrollbar();
				$('body').addClass('modal-open');
			}
		});
	},

	initElement: (element) => {
	},

	open: (source, options) => {
		return new Promise((resolve, reject) => {
			let sourceData = {},
				url = source;
			if (typeof source !== 'string') {
				sourceData = source.data();
				url = source.attr('href') || sourceData.amsUrl;
				const urlGetter = MyAMS.core.getFunctionByName(url);
				if (typeof urlGetter === 'function') {
					url = urlGetter.call(source);
				}
			}
			if (!url) {
				reject("No provided URL!");
			}
			if (url.startsWith('#')) {  // Open inner modal
				$(url).modal('show');
				resolve();
			} else {
				$.ajax({
					type: 'get',
					url: url,
					cache: sourceData.amsAllowCache === undefined ? false : sourceData.amsAllowCache,
					data: options
				}).then((data, status, request) => {
					MyAMS.require('ajax').then(() => {
						const response = MyAMS.ajax.getResponse(request),
							  dataType = response.contentType,
							  result = response.data;
						switch (dataType) {
							case 'json':
								MyAMS.ajax.handleJSON(result,
									$($(source).data('ams-json-target') || '#content'));
								break;
							case 'script':
							case 'xml':
								break;
							case 'html':
							case 'text':
							default:
								const content = $(result),
									dialog = $('.modal-dialog', content.wrap('<div></div>').parent()),
									dialogData = dialog.data() || {},
									dialogOptions = {
										backdrop: dialogData.backdrop === undefined ? 'static' : dialogData.backdrop
									};
								let settings = $.extend({}, dialogOptions, dialogData.amsOptions);
								settings = MyAMS.core.executeFunctionByName(dialogData.amsInit, dialog, settings) || settings;
								$('<div>').addClass('modal fade')
										  .data('dynamic', true)
										  .append(content)
										  .on('show.bs.modal', modal.show)
										  .on('hidden.bs.modal', modal.hidden)
										  .modal(settings);
								if (MyAMS.stats &&
									!((sourceData.amsLogEvent === false) ||
									  (dialogData.amsLogEvent === false))) {
									MyAMS.stats.logPageview(url);
								}
						}
					}).then(() => {
						resolve();
					});
				});
			}
		});
	},

	/**
	 * Dynamic modal 'shown' callback
	 * This callback is used to initialize modal's viewport size
	 *
	 * @param evt: source event
	 */
	show: (evt) => {
		const dialog = $(evt.target);
		MyAMS.core.initContent(dialog);
	},

	/**
	 * Close modal associated with given element
	 *
	 * @param element: the element contained into closed modal
	 */
	close: (element) => {
		if (typeof element === 'string') {
			element = $(element);
		} else if (typeof element === 'undefined') {
			element = $('.modal-dialog:last');
		}
		const dialog = element.objectOrParentWithClass('modal');
		if (dialog.length > 0) {
			dialog.modal('hide');
		}
	},

	/**
	 * Dynamic modal 'hidden' callback
	 * This callback is used to remove dynamic modals
	 *
	 * @param evt: source event
	 */
	hidden: (evt) => {
		const dialog = $(evt.target);
		MyAMS.core.clearContent(dialog);
		if (dialog.data('dynamic') === true) {
			dialog.remove();
		}
	}
};


/**
 * Global module initialization
 */
if (MyAMS.env.bundle) {
	MyAMS.config.modules.push('modal');
} else {
	MyAMS.modal = modal;
	console.debug("MyAMS: modal module loaded...");
}
