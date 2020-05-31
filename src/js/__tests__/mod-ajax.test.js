/**
 * MyAMS AJAX module package tests
 */

import $ from 'jquery';
import { init } from '../ext-base';
import { ajax } from '../mod-ajax';


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


// Test MyAMS.ajax.start
test("Test MyAMS.ajax.start/stop functions", () => {

	document.body.innerHTML = `<div>
		<div id="ajax-gear"></div>
	</div>`;

	const gear = $('#ajax-gear');
	ajax.start();
	expect(gear.css('display')).toBe('block');
	ajax.stop();
	expect(gear.css('display')).toBe('none');

});


// Test MyAMS.ajax.get
test("Test MyAMS.ajax.get function", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.get(url).then((result) => {
		expect(result.settings.type).toBe('get');
		expect(result.settings.url).toBe(url);
		expect(result.settings.dataType).toBe('json');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});

test("Test MyAMS.ajax.get function with params", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.get(url, {fieldName: 'value'}).then((result) => {
		expect(result.settings.type).toBe('get');
		expect(result.settings.url).toBe(url);
		expect(result.settings.data).toBe('fieldName=value');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});

test("Test MyAMS.ajax.get function with options", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.get(url, {}, {dataType: 'text'}).then((result) => {
		expect(result.settings.type).toBe('get');
		expect(result.settings.url).toBe(url);
		expect(result.settings.dataType).toBe('text');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});

test("Test MyAMS.ajax.get function with params and options", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.get(url, {fieldName: 'value'}, {dataType: 'text'}).then((result) => {
		expect(result.settings.type).toBe('get');
		expect(result.settings.url).toBe(url);
		expect(result.settings.data).toBe('fieldName=value');
		expect(result.settings.dataType).toBe('text');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});


// Test MyAMS.ajax.post
test("Test MyAMS.ajax.post function", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.post(url).then((result) => {
		expect(result.settings.type).toBe('post');
		expect(result.settings.url).toBe(url);
		expect(result.settings.dataType).toBe('json');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});

test("Test MyAMS.ajax.post function with params", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.post(url, {fieldName: 'value'}).then((result) => {
		expect(result.settings.type).toBe('post');
		expect(result.settings.url).toBe(url);
		expect(result.settings.data).toBe('fieldName=value');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});

test("Test MyAMS.ajax.post function with options", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.post(url, {}, {dataType: 'text'}).then((result) => {
		expect(result.settings.type).toBe('post');
		expect(result.settings.url).toBe(url);
		expect(result.settings.dataType).toBe('text');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});

test("Test MyAMS.ajax.post function with params and options", () => {

	const
		url = 'http://example.com/url',
		oldAjax = $.ajax;
	$.ajax = jest.fn().mockImplementation((settings) => {
		return Promise.resolve({settings: settings, status: 'success'});
	});
	return ajax.post(url, {fieldName: 'value'}, {dataType: 'text'}).then((result) => {
		expect(result.settings.type).toBe('post');
		expect(result.settings.url).toBe(url);
		expect(result.settings.data).toBe('fieldName=value');
		expect(result.settings.dataType).toBe('text');
		expect(result.status).toBe('success');
		$.ajax = oldAjax;
	});
});
