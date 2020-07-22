/* global jest, test, expect */
/**
 * MyAMS.plugins "checker" test
 */

import $ from "jquery";

import MyAMS, { init } from "../ext-base";
import { switcher } from "../mod-plugins";

import myams_require from "../ext-require";


init($);

if (!MyAMS.plugins) {
	MyAMS.config.modules.push('plugins');
}
MyAMS.require = myams_require;


test("Test MyAMS.plugins basic switcher", () => {

	document.body.innerHTML = `<div>
		<fieldset>
			<legend class="switcher"></legend>
			<div class="panel"></div>
		</fieldset>
	</div>`;

	const
		body = $(document.body),
		fieldset = $('fieldset', body),
		legend = $('legend', fieldset);

	switcher(body);

	expect(fieldset.hasClass('switched')).toBe(true);
	expect($('i.fa-plus', legend).exists()).toBe(true);

	legend.trigger('click');
	expect(fieldset.hasClass('switched')).toBe(false);
	expect($('i.fa-minus', legend).exists()).toBe(true);

	legend.trigger('click');
	expect(fieldset.hasClass('switched')).toBe(true);
	expect($('i.fa-minus', legend).exists()).toBe(false);

});


test("Test MyAMS.plugins basic switcher with veto", () => {

	document.body.innerHTML = `<div>
		<fieldset>
			<legend class="switcher"></legend>
			<div class="panel"></div>
		</fieldset>
	</div>`;

	const
		body = $(document.body),
		fieldset = $('fieldset', body),
		legend = $('legend', fieldset);

	legend.on('before-switch.ams.switcher', (evt, legend, veto) => {
		veto.veto = true;
	});

	switcher(body);

	expect(fieldset.hasClass('switched')).toBe(true);
	expect($('i.fa-plus', legend).exists()).toBe(true);

	legend.trigger('click');
	expect(fieldset.hasClass('switched')).toBe(true);

});


test("Test MyAMS.plugins basic switcher with pre-switched state", () => {

	document.body.innerHTML = `<div>
		<fieldset>
			<legend class="switcher"
					data-ams-switcher-state="open"></legend>
			<div class="panel"></div>
		</fieldset>
	</div>`;

	const
		body = $(document.body),
		fieldset = $('fieldset', body),
		legend = $('legend', fieldset);

	switcher(body);

	expect(fieldset.hasClass('switched')).toBe(false);
	expect($('i.fa-minus', legend).exists()).toBe(true);

	legend.trigger('click');
	expect(fieldset.hasClass('switched')).toBe(true);
	expect($('i.fa-plus', legend).exists()).toBe(true);

});


test("Test MyAMS.plugins synced switchers", () => {

	document.body.innerHTML = `<div>
		<fieldset>
			<legend class="switcher"
					id="parent-switch-id"></legend>
			<div class="panel">
				<fieldset class="inner" id="inner1">
					<legend class="switcher"
							data-ams-switcher-sync="parent-switch-id"></legend>
				</fieldset>
				<fieldset class="inner" id="inner2">
					<legend class="switcher"
							data-ams-switcher-sync="parent-switch-id"></legend>
				</fieldset>
			</div>
		</fieldset>
	</div>`;

	const
		body = $(document.body),
		fieldset = $('fieldset', body),
		legend = $('legend[id="parent-switch-id"]', fieldset),
		inner1 = $('#inner1', fieldset),
		legend1 = $('legend', inner1),
		inner2 = $('#inner2', fieldset),
		legend2 = $('legend', inner2);

	switcher(body);

	expect(fieldset.hasClass('switched')).toBe(true);
	expect(inner1.hasClass('switched')).toBe(true);
	expect(inner2.hasClass('switched')).toBe(true);

	legend.trigger('click');
	expect(fieldset.hasClass('switched')).toBe(false);
	expect(inner1.hasClass('switched')).toBe(false);
	expect(inner2.hasClass('switched')).toBe(false);

	legend.trigger('click');
	expect(fieldset.hasClass('switched')).toBe(true);
	expect(inner1.hasClass('switched')).toBe(false);
	expect(inner2.hasClass('switched')).toBe(false);

});
