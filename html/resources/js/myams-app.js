/* global MyAMS */


const $ = MyAMS.$;


const app = {

	/**
	 * Internal module initialization
	 *
	 * @param element: parent element
	 */
	initElement: (element) => {
		console.debug("MyAMS: app module initialized...");
	},

	/**
	 * Custom validators
	 */
	validators: {

		checkMinMax: (form) => {
			return new Promise((resolve, reject) => {
				const
					min = parseInt($('input[name="form.widgets.minimum"]', form).val()),
					max = parseInt($('input[name="form.widgets.maximum"]', form).val());
				if ((typeof min === 'number') && (typeof max === 'number')) {
					if (max < min) {
						MyAMS.form.setInvalid(form, "form.widgets.maximum",
							"Maximum value must be higher than minimum value!")
						resolve("Maximum value must be higher than minimum value!");
					} else {
						resolve(true);
					}
				} else {
					resolve(true);
				}
			});
		}
	},

	/**
	 * Callback example
	 */
	callbacks: {

		test1: (element) => {
			$(element).css('border-color', 'red');
		}
	},

	/**
	 * Events handlers
	 */
	handlers: {

		click: (event) => {
			MyAMS.require('alert').then(() => {
				MyAMS.alert.smallBox({
					status: 'info',
					icon: 'fa-info-circle',
					message: `You clicked on a link with text « ${$(event.target).text()} »!`
				});
			});
		},

		clickWithSimpleOption: (event, value) => {
			MyAMS.require('alert').then(() => {
				MyAMS.alert.smallBox({
					status: value || 'info',
					icon: 'fa-info-circle',
					message: `You clicked on a link with text « ${$(event.target).text()} »!`
				});
			});
		},

		clickWithObjectOptions: (event, options) => {
			MyAMS.require('alert').then(() => {
				MyAMS.alert.smallBox({
					status: options.status || 'info',
					icon: options.icon || 'fa-info-circle',
					message: `You clicked on a link with text « ${$(event.target).text()} »!`
				});
			});
		}
	},

	datatables: {

		initCallback: (table, settings) => {
			settings.dom = `B${settings.dom}`;
			settings.buttons = ['copy', 'print'];
		},

		initHandler: (evt, table, settings, veto) => {
			settings.lengthMenu = [1, 3, 5, 10];
		},

		reorderDataGetter: (row) => {
			return $(row).data('ams-row-value');
		},

		reorderPostDataGetter: (table, ids) => {
			return {order: ids};
		},

		reorderCallback: (table, result, status, xhr) => {
			return new Promise((resolve, reject) => {
				MyAMS.require('ajax').then(() => {
					MyAMS.ajax
						.handleJSON(result, table.parents('.dataTables_wrapper'))
						.then(() => {
							resolve(result);
						}, reject);
				}, reject);
			});
		}
	}
}


if (window.MyAMS) {
	MyAMS.config.modules.push('app');
	MyAMS.app = app;
	console.debug("MyAMS: app module loaded...");
}
