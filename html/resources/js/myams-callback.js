
(function($) {

	MyAMS.demo = MyAMS.demo || {};
	MyAMS.demo.callbacks = $.extend({}, MyAMS.demo.callbacks, {

		test2: (element) => {
			$(element).css('border-color', 'blue');
		}
	});

})(jQuery);