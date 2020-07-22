/* global MyAMS, bsCustomFileInput */
/**
 * MyAMS standard plugins
 */

const $ = MyAMS.$;

if (!$.templates) {
	const jsrender = require('jsrender');
	$.templates = jsrender.templates;
}


/**
 * Fieldset checker plug-in
 * A checker is like a simple switcher, but also provides a checkbox which is used
 * as "switcher" input field.
 * The "checker" class is applied to the fieldset legend; checkbox is created automatically
 * by the plug-in.
 * Check options are given as data attributes, all prefixed with "ams-checker-":
 *  - state: is 'off' by default; can be set to 'on' to automatically activate the checker
 *  - mode: is 'hide' by default, which make the fieldset hidden when the checker is not activated;
 *    you cna set it to "disable" to make fieldset content visible but disabled when the checker
 *    is not activated
 *  - fieldname: is the name of the input checkbox created by the plug-in
 *  - value: this is the "checked" value of the main checkbox field
 *  - readonly: if "true", the checkbox is disabled and in read-only mode
 *  - hidden-prefix: if not null, this is a prefix which will be assigned to an additional
 *    hidden input field, updated automatically when the checker is switched; the name of the
 *    hidden input if made of this prefix, followed by the "fieldname" value
 *  - value-on: this is the "checked" value of the hidden input; "true" by default
 *  - value-off: this is the "unchecked" value of the hidden input; "false" by default
 *  - marker: if not null, another hidden input with a fixed value of 1 will be created; the name
 *    of this input will be the "fieldname" value followed by this "marker" value
 *  - change-handler: this optional handler will be called on checker switch
 *  - cancel-default: if "true", the default behaviour will not be executed on checker switch
 */

const CHECKER_TEMPLATE_STRING = `
	<span class="custom-control custom-switch">
		<input type="checkbox"
			   id="{{: fieldId }}" name="{{: fieldName }}"
			   class="custom-control-input checker"
			   {{if checked}}checked{{/if}}
			   {{if readonly}}disabled{{/if}}
			   value="{{: value }}" />
		{{if prefix}}
		<input type="hidden" class="prefix"
			   id="{{: prefix}}{{: fieldName}}_prefix"
			   name="{{: prefix}}{{: fieldName}}"
			   value="{{if state==='on'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}" />
		{{else marker}}
		<input type="hidden" class="marker"
			   name="{{: fieldName}}{{: marker}}"
			   value="1" />
		{{/if}}
		<label for="{{: fieldId }}"
			   class="custom-control-label">
			{{: legend }}
		</label>
	</span>
`;

const CHECKER_TEMPLATE = $.templates({
	markup: CHECKER_TEMPLATE_STRING
});

export function checker(element) {
	$('legend.checker', element).each((idx, elt) => {
		const
			legend = $(elt),
			data = legend.data();
		if (!data.amsChecker) {
			const
				fieldset = legend.parent('fieldset'),
				checked = fieldset.hasClass('switched') || (data.amsCheckerState === 'on'),
				fieldName = data.amsCheckerFieldname || `checker_${MyAMS.core.generateId()}`,
				fieldId = fieldName.replace(/\./g, '_'),
				prefix = data.amsCheckerHiddenPrefix,
				marker = data.amsCheckerMarker || false,
				checkerMode = data.amsCheckerMode || 'hide',
				checkedValue = data.amsCheckerValueOn || 'true',
				uncheckedValue = data.amsCheckerValueOff || 'false',
				props = {
					legend: legend.text(),
					fieldName: fieldName,
					fieldId: fieldId,
					value: data.amsCheckerValue || true,
					checked: checked,
					readonly: data.amsCheckerReadonly,
					prefix: prefix,
					state: data.amsCheckerState,
					checkedValue: checkedValue,
					uncheckedValue: uncheckedValue,
					marker: marker
				};
			legend.html(CHECKER_TEMPLATE.render(props));
			$('input', legend).change((evt) => {
				const
					input = $(evt.target),
					checked = input.is(':checked'),
					veto = { veto: false };
				legend.trigger('before-switch.ams.checker', [legend, veto]);
				if (veto.veto) {
					input.prop('checked', !checked);
					return;
				}
				MyAMS.core.executeFunctionByName(data.amsCheckerChangeHandler, document,
					legend, checked);
				if (!data.amsCheckerCancelDefault) {
					const prefix = input.siblings('.prefix');
					if (checkerMode === 'hide') {
						if (checked) {
							fieldset.removeClass('switched');
							prefix.val(checkedValue);
							legend.trigger('opened.ams.checker', [legend]);
						} else {
							fieldset.addClass('switched');
							prefix.val(uncheckedValue);
							legend.trigger('closed.ams.checker', [legend]);
						}
					} else {
						fieldset.prop('disabled', !checked);
						prefix.val(checked ? checkedValue : uncheckedValue);
					}
				}
			});
			legend.closest('form').on('reset', () => {
				const checker = $('.checker', legend);
				if (checker.prop('checked') !== checked) {
					checker.click();
				}
			});
			if (!checked) {
				if (checkerMode === 'hide') {
					fieldset.addClass('switched');
				} else {
					fieldset.prop('disabled', true);
				}
			}
			legend.data('ams-checker', true);
		}
	});
}


/**
 * Context menu plug-in
 */

export function contextMenu(element) {
	const menus = $('.context-menu', element);
	if (menus.length > 0) {
		MyAMS.require('menu').then(() => {
			menus.each((idx, elt) => {
				const
					menu = $(elt),
					data = menu.data(),
					options = {
						menuSelector: data.amsContextmenuSelector || data.amsMenuSelector
					};
				let settings = $.extend({}, options, data.amsContextmenuOptions || data.amsOptions);
				settings = MyAMS.core.executeFunctionByName(
					data.amsContextmenuinitCallback || data.amsInit, menu, settings) || settings;
				const plugin = menu.contextMenu(settings);
				MyAMS.core.executeFunctionByName(
					data.amsContextmenuAfterInitCallback || data.amsAfterinit, menu, plugin, settings);
			});
		});
	}
}


/**
 * Bootstrap custom file input manager
 */

export function fileInput(element) {
	const inputs = $('.custom-file-input', element);
	if (inputs.length > 0) {
		MyAMS.require('ajax').then(() => {
			MyAMS.ajax.check(window.bsCustomFileInput,
				`${MyAMS.env.baseURL}../ext/bs-custom-file-input${MyAMS.env.extext}.js`).then(() => {
				$(inputs).each((idx, elt) => {
					const
						input = $(elt),
						inputId = input.attr('id'),
						inputSelector = inputId ? `#${inputId}` : input.attr('name'),
						form = $(elt.form),
						formId = form.attr('id'),
						formSelector = formId ? `#${formId}` : form.attr('name');
					bsCustomFileInput.init(inputSelector, formSelector);
				});
			});
		})
	}
}


/**
 * Select2 plug-in integration
 */

const _select2Helpers = {

	select2UpdateHiddenField: function(input) {
		const values = [];
		input.parent().find('ul.select2-selection__rendered').children('li[title]').each((idx, elt) => {
			values.push(input.children(`option[data-content="${elt.title}"]`).attr('value'));
		});
		input.data('select2-target').val(values.join(input.data('ams-select2-separator') || ','));
	}
};

export function select2(element) {
	const selects = $('.select2', element);
	if (selects.length > 0) {
		MyAMS.require('ajax', 'helpers').then(() => {
			MyAMS.ajax.check($.fn.select2,
				`${MyAMS.env.baseURL}../ext/select2/select2${MyAMS.env.extext}.js`).then((firstLoad) => {
				const required = [];
				if (firstLoad) {
					required.push(MyAMS.core.getScript(`${MyAMS.env.baseURL}../ext/select2/i18n/${MyAMS.i18n.language}.js`));
					required.push(MyAMS.core.getCSS(`${MyAMS.env.baseURL}../../css/ext/select2${MyAMS.env.extext}.css`, 'select2'));
					required.push(MyAMS.core.getCSS(`${MyAMS.env.baseURL}../../css/ext/select2-bootstrap4${MyAMS.env.extext}.css`, 'select2_bs4'));
				}
				$.when.apply($, required).then(() => {
					selects.each((idx, elt) => {
						const
							select = $(elt),
							data = select.data();
						if (data.select2) {
							return;  // already initialized
						}
						const defaultOptions = {
							theme: 'bootstrap4',
							language: MyAMS.i18n.language
						};
						if (select.hasClass('sortable')) {
							// create hidden input for sortable selections
							const hidden = $(`<input type="hidden" name="${select.attr('name')}">`).insertAfter(select);
							hidden.val($('option:selected', select).listattr('value').join(data.amsSelect2Separator || ','));
							select.data('select2-target', hidden)
								.removeAttr('name');
							defaultOptions.templateSelection = (data) => {
								const elt = $(data.element);
								elt.attr('data-content', elt.html());
								return data.text;
							};
						}
						let settings = $.extend({}, defaultOptions, data.amsSelect2Options || data.amsOptions);
						settings = MyAMS.core.executeFunctionByName(
							data.amsSelect2InitCallback || data.amsInit, select, settings) || settings;
						const plugin = select.select2(settings);
						select.on('select2:opening select2:selecting select2:unselecting select2:clearing', (evt) => {
							if ($(evt.target).is(':disabled')) {
								return false;
							}
						});
						select.on('select2:opening', (evt) => {
							const modal = $(evt.currentTarget).parents('.modal').first();
							if (modal.exists()) {
								const zIndex = parseInt(modal.css('z-index'));
								plugin.data('select2').$dropdown.css('z-index', zIndex + 1);
							}
						});
						if (select.hasClass('sortable')) {
							MyAMS.ajax.check($.fn.sortable,
								`${MyAMS.env.baseURL}../ext/jquery-ui${MyAMS.env.extext}.js`).then(() => {
								select.parent().find('ul.select2-selection__rendered').sortable({
									containment: 'parent',
									update: () => {
										_select2Helpers.select2UpdateHiddenField(select);
									}
								});
								select.on('select2:select select2:unselect', (evt) => {
									const
										id = evt.params.data.id,
										target = $(evt.currentTarget),
										option = target.children(`option[value="${id}"]`);
									MyAMS.helpers.moveElementToParentEnd(option);
									target.trigger('change');
									_select2Helpers.select2UpdateHiddenField(target);
								});
							});
						}
						MyAMS.core.executeFunctionByName(
							data.amsSelect2AfterInitCallback || data.amsAfterInit,
							select, plugin, settings);
					})
				});
			})
		});
	}
}


/**
 * SVG image plug-in
 */

export function svgPlugin(element) {
	const svgs = $('.svg-container', element);
	if (svgs.length > 0) {
		svgs.each((idx, elt) => {
			const
				container = $(elt),
				svg = $('svg', container),
				width = svg.attr('width'),
				height = svg.attr('height');
			if (width && height) {
				elt.setAttribute('viewBox',
					`0 0 ${Math.round(parseFloat(width))} ${Math.round(parseFloat(height))}`);
			}
			svg.attr('width', '100%').attr('height', 'auto');
		});
	}
}


/**
 * Fieldset switcher plug-in
 */

export function switcher(element) {
	$('legend.switcher', element).each((idx, elt) => {
		const
			legend = $(elt),
			fieldset = legend.parent('fieldset'),
			data = legend.data(),
			minusClass = data.amsSwitcherMinusClass || data.amsMinusClass || 'minus',
			plusClass = data.amsSwitcherPlusClass || data.amsPlusClass || 'plus';
		if (!data.amsSwitcher) {
			$(`<i class="fa fa-${data.amsSwitcherState === 'open' ? minusClass : plusClass} mr-2"></i>`)
				.prependTo(legend);
			legend.on('click', (evt) => {
				evt.preventDefault();
				const veto = {};
				legend.trigger('before-switch.ams.switcher', [legend, veto]);
				if (veto.veto) {
					return;
				}
				if (fieldset.hasClass('switched')) {
					fieldset.removeClass('switched');
					MyAMS.core.switchIcon($('i', legend), plusClass, minusClass);
					legend.trigger('opened.ams.switcher', [legend]);
					const id = legend.attr('id');
					if (id) {
						$(`legend.switcher[data-ams-switcher-sync="${id}"]`, fieldset).each((idx, elt) => {
							const switcher = $(elt);
							if (switcher.parents('fieldset').hasClass('switched')) {
								switcher.click();
							}
						});
					}
				} else {
					fieldset.addClass('switched');
					MyAMS.core.switchIcon($('i', legend), minusClass, plusClass);
					legend.trigger('closed.ams.switcher', [legend]);
				}
			});
			if (data.amsSwitcherState !== 'open') {
				fieldset.addClass('switched');
			}
			legend.data('ams-switcher', true);
		}
	});
}


/**
 * Form validation plug-in
 */

export function validate(element) {
	const forms = $('form:not([novalidate])', element);
	if (forms.length > 0) {
		MyAMS.require('ajax', 'i18n').then(() => {
			MyAMS.ajax.check($.fn.validate,
				`${MyAMS.env.baseURL}../ext/validate/jquery-validate${MyAMS.env.extext}.js`).then((firstLoad) => {
				if (firstLoad && (MyAMS.i18n.language !== 'en')) {
					MyAMS.core.getScript(`${MyAMS.env.baseURL}../ext/validate/i18n/messages_${MyAMS.i18n.language}${MyAMS.env.extext}.js`).then(() => {});
				}
				forms.each((idx, elt) => {
					const
						form = $(elt),
						data = form.data(),
						dataOptions = {
							ignore: null,
							invalidHandler: MyAMS.core.getFunctionByName(data.amsValidateInvalidHandler) || (
								(evt, validator) => {
									// automatically display hidden fields with errors!
									$('span.is-invalid', form).remove();
									$('.is-invalid', form).removeClass('is-invalid');
									for (const error of validator.errorList) {
										const
											element = $(error.element),
											panels = element.parents('.tab-pane'),
											fieldsets = element.parents('fieldset.switched');
										fieldsets.each((idx, elt) => {
											$('legend.switcher', elt).click();
										})
										panels.each((idx, elt) => {
											const
												panel = $(elt),
												tabs = panel.parents('.tab-content')
													.siblings('.nav-tabs');
											$(`li:nth-child(${panel.index()+1})`, tabs)
												.addClass('is-invalid');
											$('li.is-invalid:first a', tabs)
												.click();
										});
									}
								}
							),
							errorElement: data.amsValidateErrorElement || 'span',
							errorClass: data.amsValidateErrorClass || 'is-invalid',
							errorPlacement: MyAMS.core.getFunctionByName(data.amsvalidateErrorPlacement) ||
								((error, element) => {
									error.addClass('invalid-feedback');
									element.closest('.form-widget').append(error);
								}),
							submitHandler: MyAMS.core.getFunctionByName(data.amsValidateSubmitHandler) ||
								(form.attr('data-async') !== undefined ?
									() => {
										MyAMS.require('form').then(() => {
											MyAMS.form.submit(form);
										});
									}
									: () => {
										form.get(0).submit();
									})
						};
					$('[data-ams-validate-rules]', form).each((idx, elt) => {
						if (idx === 0) {
							dataOptions.rules = {};
						}
						dataOptions.rules[$(elt).attr('name')] = $(elt).data('ams-validate-rules');
					});
					$('[data-ams-validate-messages]', form).each((idx, elt) => {
						if (idx === 0) {
							dataOptions.messages = {};
						}
						dataOptions.messages[$(elt).attr('name')] = $(elt).data('ams-validate-messages');
					});
					let settings = $.extend({}, dataOptions, data.amsValidateOptions || data.amsOptions);
					settings = MyAMS.core.executeFunctionByName(data.amsValidateInitCallback ||
						data.amsInit, form, settings) || settings;
					const plugin = form.validate(settings);
					MyAMS.core.executeFunctionByName(data.amsValidateAfterInitCallback ||
						data.amsAfterInit, form, plugin, settings);
				});
			});
		});
	}
}


/**
 * Global module initialization
 */

if (window.MyAMS) {

	// register loaded plug-ins
	MyAMS.registry.register(checker, 'checker');
	MyAMS.registry.register(contextMenu, 'contextMenu');
	MyAMS.registry.register(fileInput, 'fileInput');
	MyAMS.registry.register(select2, 'select2');
	MyAMS.registry.register(svgPlugin, 'svg');
	MyAMS.registry.register(switcher, 'switcher');
	MyAMS.registry.register(validate, 'validate');

	// register module
	MyAMS.config.modules.push('plugins');
	if (!MyAMS.env.bundle) {
		console.debug("MyAMS: plugins module loaded...");
	}
}
