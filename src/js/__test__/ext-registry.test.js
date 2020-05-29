/**
 * MyAMS plugins tests
 */

import $ from "jquery";
import MyAMS, {init} from "../ext-base";

import { registry } from "../ext-registry";


init($);

// Test MyAMS.plugins.initData
test("Test MyAMS.plugins.initData function", () => {

	const tag = $(`<div class="parent"><p data-ams-data='{"ams-field1": "value1"}'>Data block</p></div>`);

	const element = $(tag);
	registry.initData(element);

	const p = $('p', element);
	expect(p.attr('data-ams-field1')).toBe('value1');

});
