/* global MyAMS */

/**
 * Custom MyAMS plug-in example
 */

(function($) {

	MyAMS.app = MyAMS.app || {};

	$.extend(MyAMS.app, {

		examplePlugin: (element) => {
			return new Promise((resolve, reject) => {
				try {
					const examples = $('.example', element);
					examples.addClass('bg-warning');
					resolve(examples);
				} catch {
					reject();
				}
			});
		}
	});

})(MyAMS.$);
