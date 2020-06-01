/**
 * MyAMS events module tests
 */

import $ from "jquery";
import MyAMS, { init } from "../ext-base";
import { events } from "../mod-events";

import myams_require from "../ext-require";


init($);

if (!MyAMS.events) {
	MyAMS.events = events;
	MyAMS.config.modules.push('events');
}
MyAMS.require = myams_require;


// Test MyAMS.events
test("Test MyAMS.events for simple event", () => {

	MyAMS.testHandler = (evt) => {
		$(evt.target).addClass('modified');
	};

	document.body.innerHTML = `<div>
		<div class="inner"
			 data-ams-events-handlers='{
			 	"test.myams.event": "MyAMS.testHandler"
			 }'></div>
	</div>`;

	const body = $(document.body);
	MyAMS.events.init();
	MyAMS.events.initElement(body);
	$('.inner', body).trigger('test.myams.event');
	expect($('.inner', body).hasClass('modified')).toBe(true);
	delete MyAMS.testHandler;

});

test("Test MyAMS.events for event with options", () => {

	MyAMS.testHandler = (evt, options) => {
		$(evt.target).addClass(options.klass);
	};

	document.body.innerHTML = `<div>
		<div class="inner"
			 data-ams-events-handlers='{
			 	"test.myams.event": "MyAMS.testHandler"
			 }'
			 data-ams-events-options='{"klass": "modified"}'></div>
	</div>`;

	const body = $(document.body);
	MyAMS.events.init();
	MyAMS.events.initElement(body);
	$('.inner', body).trigger('test.myams.event');
	expect($('.inner', body).hasClass('modified')).toBe(true);
	delete MyAMS.testHandler;

});
