
(function($) {

	MyAMS.demo = MyAMS.demo || {};
	MyAMS.demo.callbacks = $.extend({}, MyAMS.demo.callbacks, {

		test2: function() {
			$(this).css('border-color', 'blue');
		}
	});

})(jQuery);