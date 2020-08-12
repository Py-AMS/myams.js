/* global jQuery */

(function($) {

	const MyAMS = window.MyAMS;

	MyAMS.app = {

		init: function(element, context) {
			console.log("Test 3");
			$(context).css('border', '1px solid blue');
		}
	}

})(jQuery);
