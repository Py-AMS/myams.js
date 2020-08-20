/* global describe, jest, test, beforeAll, afterAll, expect */
/**
 * MyAMS.plugins "draggable/droppable" plug-ins tests
 */

import $ from "jquery";
window.$ = window.jQuery = $;
global.$ = global.jQuery = $;

require("jquery-ui");
require("jquery-ui/ui/version");
require("jquery-ui/ui/disable-selection");
require("jquery-ui/ui/plugin");
require("jquery-ui/ui/widgets/mouse");
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");
require("jquery-ui/ui/widgets/sortable");

import MyAMS, { init } from "../ext-base";
import { ajax } from "../mod-ajax";
import { i18n } from "../mod-i18n";

import { dragdrop } from "../mod-plugins";

import myams_require from "../ext-require";


if (!MyAMS.ajax) {
	MyAMS.ajax = ajax;
	MyAMS.config.modules.push('ajax');
}
if (!MyAMS.i18n) {
	MyAMS.i18n = i18n;
	MyAMS.config.modules.push('i18n');
}
if (!MyAMS.plugins) {
	MyAMS.config.modules.push('plugins');
}
MyAMS.require = myams_require;


init($);


describe("MyAMS.plugins.dragdrop unit tests", () => {

	let oldOpen = null,
		oldAlert = null,
		oldLocation = null;

	beforeAll(() => {
		oldOpen = window.open;
		window.open = jest.fn();

		oldAlert = window.alert;
		window.alert = jest.fn();

		oldLocation = window.location;
		delete window.location;
		window.location = {
			protocol: oldLocation.protocol,
			href: oldLocation.href,
			hash: oldLocation.hash,
			reload: jest.fn()
		}
	});

	afterAll(() => {
		window.open = oldOpen;
		window.alert = oldAlert;
		window.location = oldLocation;
	});

	// Test MyAMS.plugins draggables
	test("Test MyAMS.plugins draggable plug-in", () => {

		document.body.innerHTML = `<div>
			<div class="draggable"></div>
		</div>`;

		const
			body = $(document.body),
			dragitem = $('.draggable', body);

		dragitem.on('after-init.ams.draggable', (evt, legend) => {
			dragitem.data('after-init', true);
		});

		return dragdrop(body).then(() => {
			expect(dragitem.data('after-init')).toBe(true);
		});

	});


	// Test MyAMS.plugins droppables
	test("Test MyAMS.plugins droppable plug-in", () => {

		document.body.innerHTML = `<div>
			<div class="droppable"></div>
		</div>`;

		const
			body = $(document.body),
			dropitem = $('.droppable', body);

		dropitem.on('after-init.ams.droppable', (evt, legend) => {
			dropitem.data('after-init', true);
		});

		return dragdrop(body).then(() => {
			expect(dropitem.data('after-init')).toBe(true);
		});

	});


	// Test MyAMS.plugins sortables
	test("Test MyAMS.plugins sortable plug-in", () => {

		document.body.innerHTML = `<div>
			<div class="sortable"></div>
		</div>`;

		const
			body = $(document.body),
			sortitem = $('.sortable', body);

		sortitem.on('after-init.ams.sortable', (evt, legend) => {
			sortitem.data('after-init', true);
		});

		return dragdrop(body).then(() => {
			expect(sortitem.data('after-init')).toBe(true);
		});

	});

});
