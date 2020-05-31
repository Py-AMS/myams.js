/**
 * MyAMS plugins tests
 */

import $ from "jquery";
import MyAMS, {init} from "../ext-base";

import { registry } from "../ext-registry";


init($);

// Test MyAMS.registry.initData
test("Test MyAMS.registry.initData function", () => {

	const tag = $(`<div class="parent"><p data-ams-data='{"ams-field1": "value1"}'>Data block</p></div>`);

	const element = $(tag);
	registry.initData(element);

	const p = $('p', element);
	expect(p.attr('data-ams-field1')).toBe('value1');

});

// Test MyAMS.registry.register
test("Test MyAMS.registry.register function from props", () => {

	const callback = (element, context) => {
		$('.inner', element).addClass('modified');
	};
	const props = {
		name: 'MyAMS_test',
		callback: callback
	};
	const plugin = registry.register(props);
	expect(plugin).toBeInstanceOf(Object);
	expect(plugin.name).toBe('MyAMS_test');
	expect(plugin.src).toBe(undefined);
	expect(plugin.css).toBe(undefined);
	expect($.isArray(plugin.callbacks)).toBe(true);
	expect(plugin.async).toBe(true);
	expect(plugin.loaded).toBe(true);

	document.body.innerHTML = `<div>
		<div class="inner"></div>
	</div>`;
	const body = $(document.body);
	registry.run(body);
	expect($('.inner', body).hasClass('modified')).toBe(true);

	// cleanup
	registry.plugins.plugins.delete(plugin.name);
});

test("Test MyAMS.registry.register function from callable", () => {

	const callback = (element, context) => {
		$('.inner', element).addClass('modified');
	};
	const plugin = registry.register(callback, 'MyAMS_test');
	expect(plugin).toBeInstanceOf(Object);
	expect(plugin.name).toBe('MyAMS_test');

	document.body.innerHTML = `<div>
		<div class="inner"></div>
	</div>`;
	const body = $(document.body);
	registry.run(body);
	expect($('.inner', body).hasClass('modified')).toBe(true);

	// cleanup
	registry.plugins.plugins.delete(plugin.name);

});

test("Test MyAMS.registry.register function from callable name", () => {

	MyAMS.pluginCall = (element, context) => {
		$('.inner', element).addClass('modified');
	};
	const plugin = registry.register('MyAMS.pluginCall', 'MyAMS_test');
	expect(plugin).toBeInstanceOf(Object);
	expect(plugin.name).toBe('MyAMS_test');

	document.body.innerHTML = `<div>
		<div class="inner"></div>
	</div>`;
	const body = $(document.body);
	registry.run(body);
	expect($('.inner', body).hasClass('modified')).toBe(true);

	// cleanup
	registry.plugins.plugins.delete(plugin.name);
	delete MyAMS.pluginCall;

});

// Test MyAMS.registry.load
test("Test MyAMS.registry.load from string definition", () => {

	MyAMS.pluginCall = (element, context) => {
		$('.inner', element).addClass('modified');
	};

	document.body.innerHTML = `<div>
		<div data-ams-plugins="MyAMS_test"
			 data-ams-plugin-MyAMS_test-callback="MyAMS.pluginCall">
			<div class="inner"></div>
		</div>
	</div>`;
	const body = $(document.body);

	// Load registry
	registry.initElement(body);
	const plugin = registry.plugins.plugins.get('MyAMS_test');
	expect(plugin).toBeInstanceOf(Object);
	expect(plugin.name).toBe('MyAMS_test');

	// Run registry
	registry.run(body);
	expect($('.inner', body).hasClass('modified')).toBe(true);

	// cleanup
	registry.plugins.plugins.delete(plugin.name);
	delete MyAMS.pluginCall;
});

test("Test MyAMS.registry.load from object definition", () => {

	MyAMS.pluginCall = (element, context) => {
		$('.inner', element).addClass('modified');
	};

	document.body.innerHTML = `<div>
		<div data-ams-plugins='{"name": "MyAMS_test", "callback": "MyAMS.pluginCall"}'>
			<div class="inner"></div>
		</div>
	</div>`;
	const body = $(document.body);

	// Load registry
	registry.initElement(body);
	const plugin = registry.plugins.plugins.get('MyAMS_test');
	expect(plugin).toBeInstanceOf(Object);
	expect(plugin.name).toBe('MyAMS_test');

	// Run registry
	registry.run(body);
	expect($('.inner', body).hasClass('modified')).toBe(true);

	// cleanup
	registry.plugins.plugins.delete(plugin.name);
	delete MyAMS.pluginCall;
});

test("Test MyAMS.registry.load from array definition", () => {

	MyAMS.pluginCall = (element, context) => {
		$('.inner', element).addClass('modified');
	};

	document.body.innerHTML = `<div>
		<div data-ams-plugins='[{"name": "MyAMS_test", "callback": "MyAMS.pluginCall"}]'>
			<div class="inner"></div>
		</div>
	</div>`;
	const body = $(document.body);

	// Load registry
	registry.initElement(body);
	const plugin = registry.plugins.plugins.get('MyAMS_test');
	expect(plugin).toBeInstanceOf(Object);
	expect(plugin.name).toBe('MyAMS_test');

	// Run registry
	registry.run(body);
	expect($('.inner', body).hasClass('modified')).toBe(true);

	// cleanup
	registry.plugins.plugins.delete(plugin.name);
	delete MyAMS.pluginCall;
});
