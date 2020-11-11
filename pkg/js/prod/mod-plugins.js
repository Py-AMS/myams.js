!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):"undefined"!=typeof exports?t(exports):(t(t={}),e.modPlugins=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function c(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return i(e,t)}(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var n=0,t=function(){};return{s:t,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,c=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return s=e.done,e},e:function(e){c=!0,r=e},f:function(){try{s||null==a.return||a.return()}finally{if(c)throw r}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}Object.defineProperty(e,"__esModule",{value:!0}),e.checker=t,e.contextMenu=a,e.dragdrop=n,e.fileInput=r,e.select2=s,e.svgPlugin=l,e.switcher=m,e.validate=u;var d=MyAMS.$;d.templates||(e=require("jsrender"),d.templates=e.templates);var g=d.templates({markup:'\n\t<span class="custom-control custom-switch">\n\t\t<input type="checkbox"\n\t\t\t   id="{{: fieldId }}" name="{{: fieldName }}"\n\t\t\t   class="custom-control-input checker"\n\t\t\t   {{if checked}}checked{{/if}}\n\t\t\t   {{if readonly}}disabled{{/if}}\n\t\t\t   value="{{: value }}" />\n\t\t{{if prefix}}\n\t\t<input type="hidden" class="prefix"\n\t\t\t   id="{{: prefix}}{{: fieldName}}_prefix"\n\t\t\t   name="{{: prefix}}{{: fieldName}}"\n\t\t\t   value="{{if state===\'on\'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}" />\n\t\t{{else marker}}\n\t\t<input type="hidden" class="marker"\n\t\t\t   name="{{: fieldName}}{{: marker}}"\n\t\t\t   value="1" />\n\t\t{{/if}}\n\t\t<label for="{{: fieldId }}"\n\t\t\t   class="custom-control-label">\n\t\t\t{{: legend }}\n\t\t</label>\n\t</span>\n'});function t(n){return new Promise(function(e,t){var a=d("legend.checker",n);0<a.length?(a.each(function(e,t){var n,a,r,s,c,i,o,l,m=d(t),u=m.data();u.amsChecker||(n=m.parent("fieldset"),a=n.hasClass("switched")||"on"===u.amsCheckerState,s=(r=u.amsCheckerFieldname||"checker_".concat(MyAMS.core.generateId())).replace(/\./g,"_"),l=u.amsCheckerHiddenPrefix,t=u.amsCheckerMarker||!1,c=u.amsCheckerMode||"hide",i=u.amsCheckerValueOn||"true",o=u.amsCheckerValueOff||"false",t={veto:!(l={legend:m.text(),fieldName:r,fieldId:s,value:u.amsCheckerValue||!0,checked:a,readonly:u.amsCheckerReadonly,prefix:l,state:u.amsCheckerState,checkedValue:i,uncheckedValue:o,marker:t})},m.trigger("before-init.ams.checker",[m,l,t]),t.veto||(m.html(g.render(l)),d("input",m).change(function(e){var t=d(e.target),a=t.is(":checked"),e={veto:!1};m.trigger("before-switch.ams.checker",[m,e]),e.veto?t.prop("checked",!a):(MyAMS.core.executeFunctionByName(u.amsCheckerChangeHandler,document,m,a),u.amsCheckerCancelDefault||(t=t.siblings(".prefix"),"hide"===c?a?(n.removeClass("switched"),t.val(i),m.trigger("opened.ams.checker",[m])):(n.addClass("switched"),t.val(o),m.trigger("closed.ams.checker",[m])):(n.prop("disabled",!a),t.val(a?i:o))))}),m.closest("form").on("reset",function(){var e=d(".checker",m);e.prop("checked")!==a&&e.click()}),a||("hide"===c?n.addClass("switched"):n.prop("disabled",!0)),m.trigger("after-init.ams.checker",[m]),m.data("ams-checker",!0)))}),e(a)):e(null)})}function a(n){return new Promise(function(e,t){var a=d(".context-menu",n);0<a.length?MyAMS.require("menu").then(function(){a.each(function(e,t){var a=d(t),n=a.data(),r={menuSelector:n.amsContextmenuSelector||n.amsMenuSelector},t=d.extend({},r,n.amsContextmenuOptions||n.amsOptions),t=MyAMS.core.executeFunctionByName(n.amsContextmenuInitCallback||n.amsInit,document,a,t)||t,r={veto:!1};a.trigger("before-init.ams.contextmenu",[a,t,r]),r.veto||(r=a.contextMenu(t),MyAMS.core.executeFunctionByName(n.amsContextmenuAfterInitCallback||n.amsAfterInit,document,a,r,t),a.trigger("after-init.ams.contextmenu",[a,r]))})},t).then(function(){e(a)}):e(null)})}function n(n){return new Promise(function(e,t){var a=d(".draggable, .droppable, .sortable",n);0<a.length?MyAMS.ajax.check(d.fn.draggable,"".concat(MyAMS.env.baseURL,"../ext/jquery-ui").concat(MyAMS.env.extext,".js")).then(function(){a.each(function(e,t){var a=d(t),n=a.data();if(a.hasClass("draggable")){var r={cursor:n.amsDraggableCursor||"move",containment:n.amsDraggableContainment,handle:n.amsDraggableHandle,connectToSortable:n.amsDraggableConnectSortable,helper:MyAMS.core.getFunctionByName(n.amsDraggableHelper)||n.amsDraggableHelper,start:MyAMS.core.getFunctionByName(n.amsDraggableStart),stop:MyAMS.core.getFunctionByName(n.amsDraggableStop)},t=d.extend({},r,n.amsDraggableOptions||n.amsOptions),t=MyAMS.core.executeFunctionByName(n.amsDraggableInitCallback||n.amsInit,document,a,t)||t,r={veto:!1};if(a.trigger("before-init.ams.draggable",[a,t,r]),r.veto)return;r=a.draggable(t);a.disableSelection(),MyAMS.core.executeFunctionByName(n.amsDraggableAfterInitCallback||n.amsAfterInit,document,a,r,t),a.trigger("after-init.ams.draggable",[a,r])}if(a.hasClass("droppable")){var s={accept:n.amsDroppableAccept||n.amsAccept,drop:MyAMS.core.getFunctionByName(n.amsDroppableDrop)},c=d.extend({},s,n.amsDroppableOptions||n.amsOptions),c=MyAMS.core.executeFunctionByName(n.amsDroppableInitCallback||n.amsInit,document,a,c)||c,s={veto:!1};if(a.trigger("before-init.ams.droppable",[a,c,s]),s.veto)return;var s=a.droppable(c);MyAMS.core.executeFunctionByName(n.amsDroppableAfterInitCallback||n.amsAfterInit,document,a,s,c),a.trigger("after-init.ams.droppable",[a,s])}a.hasClass("sortable")&&(c={items:n.amsSortableItems,handle:n.amsSortableHandle,helper:MyAMS.core.getFunctionByName(n.amsSortableHelper)||n.amsSortableHelper,connectWith:n.amsSortableConnectwith,containment:n.amsSortableContainment,placeholder:n.amsSortablePlaceholder,start:MyAMS.core.getFunctionByName(n.amsSortableStart),over:MyAMS.core.getFunctionByName(n.amsSortableOver),stop:MyAMS.core.getFunctionByName(n.amsSortableStop)},s=d.extend({},c,n.amsSortableOptions||n.amsOptions),s=MyAMS.core.executeFunctionByName(n.amsSortableInitCallback||n.amsInit,document,a,s)||s,c={veto:!1},a.trigger("before-init.ams.sortable",[a,s,c]),c.veto||(c=a.sortable(s),a.disableSelection(),MyAMS.core.executeFunctionByName(n.amsSortableAfterInitCallback||n.amsAfterInit,document,a,c,s),a.trigger("after-init.ams.sortable",[a,c])))})},t).then(function(){e(a)}):e(null)})}function r(n){return new Promise(function(e,t){var a=d(".custom-file-input",n);0<a.length?MyAMS.require("ajax").then(function(){MyAMS.ajax.check(window.bsCustomFileInput,"".concat(MyAMS.env.baseURL,"../ext/bs-custom-file-input").concat(MyAMS.env.extext,".js")).then(function(){a.each(function(e,t){var a=d(t),n=a.attr("id"),r=n?"#".concat(n):a.attr("name"),n=d(t.form),t=n.attr("id"),t=t?"#".concat(t):n.attr("name"),n={veto:!1};a.trigger("before-init.ams.fileinput",[a,n]),n.veto||(bsCustomFileInput.init(r,t),a.trigger("after-init.ams.fileinput",[a]))})},t).then(function(){e(a)})},t):e(null)})}var o={select2UpdateHiddenField:function(a){var n=[];a.parent().find("ul.select2-selection__rendered").children("li[title]").each(function(e,t){n.push(a.children('option[data-content="'.concat(t.title,'"]')).attr("value"))}),a.data("select2-target").val(n.join(a.data("ams-select2-separator")||","))}};function s(e){return new Promise(function(a,n){var r=d(".select2",e);0<r.length?MyAMS.require("ajax","helpers").then(function(){MyAMS.ajax.check(d.fn.select2,"".concat(MyAMS.env.baseURL,"../ext/select2/select2").concat(MyAMS.env.extext,".js")).then(function(e){var t=[];e&&(t.push(MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/select2/i18n/").concat(MyAMS.i18n.language,".js"))),t.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/select2").concat(MyAMS.env.extext,".css"),"select2")),t.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/select2-bootstrap4").concat(MyAMS.env.extext,".css"),"select2_bs4"))),d.when.apply(d,t).then(function(){r.each(function(e,t){var a,n,r=d(t),s=r.data();s.select2||(t={theme:s.amsSelect2Theme||s.amsTheme||"bootstrap4",language:s.amsSelect2Language||s.amsLanguage||MyAMS.i18n.language,escapeMarkup:MyAMS.core.getFunctionByName(s.amsSelect2EscapeMarkup||s.amsEscapeMarkup),matcher:MyAMS.core.getFunctionByName(s.amsSelect2Matcher||s.amsMatcher),sorter:MyAMS.core.getFunctionByName(s.amsSelect2Sorter||s.amsSorter),templateResult:MyAMS.core.getFunctionByName(s.amsSelect2TemplateResult||s.amsTemplateResult),templateSelection:MyAMS.core.getFunctionByName(s.amsSelect2TemplateSelection||s.amsTemplateSelection),tokenizer:MyAMS.core.getFunctionByName(s.amsSelect2Tokenizer||s.amsTokenizer),ajax:{url:MyAMS.core.getFunctionByName(s.amsSelect2AjaxUrl||s.amsAjaxUrl)||s.amsSelect2AjaxUrl||s.amsAjaxUrl,data:MyAMS.core.getFunctionByName(s.amsSelect2AjaxData||s.amsAjaxData)||s.amsSelect2AjaxData||s.amsAjaxData,processResults:MyAMS.core.getFunctionByName(s.amsSelect2AjaxProcessResults||s.amsAjaxProcessResults)||s.amsSelect2AjaxProcessResults||s.amsAjaxProcessResults,transport:MyAMS.core.getFunctionByName(s.amsSelect2AjaxTransport||s.amsAjaxTransport)||s.amsSelect2AjaxTransport||s.amsAjaxTransport}},r.hasClass("sortable")&&((a=d('<input type="hidden" name="'.concat(r.attr("name"),'">')).insertAfter(r)).val(d("option:selected",r).listattr("value").join(s.amsSelect2Separator||",")),r.data("select2-target",a).removeAttr("name"),t.templateSelection=function(e){var t=d(e.element);return t.attr("data-content",t.html()),e.text}),a=d.extend({},t,s.amsSelect2Options||s.amsOptions),a=MyAMS.core.executeFunctionByName(s.amsSelect2InitCallback||s.amsInit,document,r,a)||a,t={veto:!1},r.trigger("before-init.ams.select2",[r,a,t]),t.veto||(n=r.select2(a),r.on("select2:opening select2:selecting select2:unselecting select2:clearing",function(e){if(d(e.target).is(":disabled"))return!1}),r.on("select2:opening",function(e){e=d(e.currentTarget).parents(".modal").first();e.exists()&&(e=parseInt(e.css("z-index")),n.data("select2").$dropdown.css("z-index",e+1))}),r.hasClass("sortable")&&MyAMS.ajax.check(d.fn.sortable,"".concat(MyAMS.env.baseURL,"../ext/jquery-ui").concat(MyAMS.env.extext,".js")).then(function(){r.parent().find("ul.select2-selection__rendered").sortable({containment:"parent",update:function(){o.select2UpdateHiddenField(r)}}),r.on("select2:select select2:unselect",function(e){var t=e.params.data.id,e=d(e.currentTarget),t=e.children('option[value="'.concat(t,'"]'));MyAMS.helpers.moveElementToParentEnd(t),e.trigger("change"),o.select2UpdateHiddenField(e)})}),MyAMS.core.executeFunctionByName(s.amsSelect2AfterInitCallback||s.amsAfterInit,document,r,n,a),r.trigger("after-init.ams.select2",[r,n])))})},n).then(function(){a(r)})},n)},n):a(null)})}function l(n){return new Promise(function(e,t){var a=d(".svg-container",n);0<a.length?(a.each(function(e,t){var a=d(t),n=d("svg",a),r=n.attr("width"),a=n.attr("height");r&&a&&t.setAttribute("viewBox","0 0 ".concat(Math.round(parseFloat(r))," ").concat(Math.round(parseFloat(a)))),n.attr("width","100%").attr("height","auto")}),e(a)):e(null)})}function m(n){return new Promise(function(e,t){var a=d("legend.switcher",n);0<a.length?(a.each(function(e,t){var a=d(t),n=a.parent("fieldset"),r=a.data(),s=r.amsSwitcherMinusClass||r.amsMinusClass||"minus",c=r.amsSwitcherPlusClass||r.amsPlusClass||"plus";r.amsSwitcher||(t={veto:!1},a.trigger("before-init.ams.switcher",[a,r,t]),t.veto||(d('<i class="fa fa-'.concat("open"===r.amsSwitcherState?s:c,' mr-2"></i>')).prependTo(a),a.on("click",function(e){e.preventDefault();e={};a.trigger("before-switch.ams.switcher",[a,e]),e.veto||(n.hasClass("switched")?(n.removeClass("switched"),MyAMS.core.switchIcon(d("i",a),c,s),a.trigger("opened.ams.switcher",[a]),(e=a.attr("id"))&&d('legend.switcher[data-ams-switcher-sync="'.concat(e,'"]'),n).each(function(e,t){t=d(t);t.parents("fieldset").hasClass("switched")&&t.click()})):(n.addClass("switched"),MyAMS.core.switchIcon(d("i",a),s,c),a.trigger("closed.ams.switcher",[a])))}),"open"!==r.amsSwitcherState&&n.addClass("switched"),a.trigger("after-init.ams.switcher",[a]),a.data("ams-switcher",!0)))}),e(a)):e(null)})}function u(n){return new Promise(function(e,t){var a=d("form:not([novalidate])",n);0<a.length&&MyAMS.require("ajax","i18n").then(function(){MyAMS.ajax.check(d.fn.validate,"".concat(MyAMS.env.baseURL,"../ext/validate/jquery-validate").concat(MyAMS.env.extext,".js")).then(function(e){e&&"en"!==MyAMS.i18n.language&&MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/validate/i18n/messages_").concat(MyAMS.i18n.language).concat(MyAMS.env.extext,".js")).then(function(){}),a.each(function(e,t){var s=d(t),a=s.data(),n={ignore:null,invalidHandler:MyAMS.core.getFunctionByName(a.amsValidateInvalidHandler)||function(e,t){d("span.is-invalid",s).remove(),d(".is-invalid",s).removeClass("is-invalid");var a=c(t.errorList);try{for(a.s();!(r=a.n()).done;){var n=r.value,r=d(n.element),n=r.parents(".tab-pane");r.parents("fieldset.switched").each(function(e,t){d("legend.switcher",t).click()}),n.each(function(e,t){var a=d(t),t=a.parents(".tab-content").siblings(".nav-tabs");d("li:nth-child(".concat(a.index()+1,")"),t).addClass("is-invalid"),d("li.is-invalid:first a",t).click()})}}catch(e){a.e(e)}finally{a.f()}},errorElement:a.amsValidateErrorElement||"span",errorClass:a.amsValidateErrorClass||"is-invalid",errorPlacement:MyAMS.core.getFunctionByName(a.amsValidateErrorPlacement)||function(e,t){e.addClass("invalid-feedback"),t.closest(".form-widget").append(e)},submitHandler:MyAMS.core.getFunctionByName(a.amsValidateSubmitHandler)||(void 0!==s.attr("data-async")?function(){MyAMS.require("form").then(function(){MyAMS.form.submit(s)})}:function(){s.get(0).submit()})};d("[data-ams-validate-rules]",s).each(function(e,t){0===e&&(n.rules={}),n.rules[d(t).attr("name")]=d(t).data("ams-validate-rules")}),d("[data-ams-validate-messages]",s).each(function(e,t){0===e&&(n.messages={}),n.messages[d(t).attr("name")]=d(t).data("ams-validate-messages")});var r=d.extend({},n,a.amsValidateOptions||a.amsOptions),r=MyAMS.core.executeFunctionByName(a.amsValidateInitCallback||a.amsInit,document,s,r)||r,t={veto:!1};s.trigger("before-init.ams.validate",[s,r,t]),t.veto||(t=s.validate(r),MyAMS.core.executeFunctionByName(a.amsValidateAfterInitCallback||a.amsAfterInit,document,s,t,r),s.trigger("after-init.ams.validate",[s,t]))})},t).then(function(){e(a)})},t)})}window.MyAMS&&(MyAMS.registry.register(t,"checker"),MyAMS.registry.register(a,"contextMenu"),MyAMS.registry.register(n,"dragdrop"),MyAMS.registry.register(r,"fileInput"),MyAMS.registry.register(s,"select2"),MyAMS.registry.register(l,"svg"),MyAMS.registry.register(m,"switcher"),MyAMS.registry.register(u,"validate"),MyAMS.config.modules.push("plugins"),MyAMS.env.bundle||console.debug("MyAMS: plugins module loaded..."))});