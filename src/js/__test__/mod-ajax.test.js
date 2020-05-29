/**
 * MyAMS AJAX module package tests
 */

import $ from 'jquery';
import {init} from '../ext-base';
import {ajax} from '../mod-ajax';


init($);


// Test MyAMS.ajax exists
test("Test MyAMS.ajax may exist", () => {

	expect(ajax).toBeInstanceOf(Object);

});


// Test MyAMS.ajax.check
test("Test MyAMS.ajax.check function", done => {

	function callback(firstLoad, options={}) {
		expect(firstLoad).toBe(false);
		expect(options).toBeInstanceOf(Object);
		done();
	}

	ajax.check(window.jQuery, '').then(callback);
	ajax.check([window.jQuery], ['']).then(callback);
	ajax.check([window.jQuery], '').then(callback);
	ajax.check(window.missing, '').then(callback);
	ajax.check(window.missing, ['']).then(callback);

});


// Test MyAMS.ajax.getAddr
test("Test MyAMS.ajax.getAddr function", () => {

	expect(ajax.getAddr()).toBe('http://localhost/');
	expect(ajax.getAddr('http://example.com/index.html')).toBe('http://example.com/');
	expect(ajax.getAddr('http://example.com/path/index.html')).toBe('http://example.com/path/');

});
