
(function($) {

	const MyAMS = window.MyAMS;

	MyAMS.test1 = function(element) {
		console.log("Test 1");
		element.css('border', '1px solid red');
	};

	MyAMS.test2 = function(element) {
		console.log("Test 2");
	};

	MyAMS.registry.register(MyAMS.test1, 'test1');

})(jQuery);
