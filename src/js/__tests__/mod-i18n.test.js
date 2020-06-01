/**
 * MyAMS I18n module tests
 */

import $ from 'jquery';
import MyAMS, { init } from "../ext-base";
import { i18n } from "../mod-i18n";


init($);

MyAMS.i18n = i18n;
MyAMS.config.modules.push('i18n');


// Test MyAMS.i18n exists
test("Test MyAMS.i18n may exist", () => {

	expect(i18n).toBeInstanceOf(Object);
	expect(i18n.language).toBe('en');

});


// Test MyAMS.i18n.init
test("Test MyAMS.i18n.init function", () => {

	return i18n.init().then(() => {
		expect(i18n.language).toBe('en');
	}).then(() => {
		// try to init module a second time
		i18n.init();
	});
});

test("Test MyAMS.i18n custom language", () => {

	const oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		i18n.language = 'fr';
		return Promise.resolve();
	});
	$(document.body.parentElement).attr('lang', 'fr');

	return i18n.init(true).then(() => {
		expect(i18n.language).toBe('fr');
		$.ajax  = oldAjax;
	});
});
