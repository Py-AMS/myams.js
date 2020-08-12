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
	}
}


if (window.MyAMS) {
	MyAMS.config.modules.push('app');
	MyAMS.app = app;
	console.debug("MyAMS: app module loaded...");
}
