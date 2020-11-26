!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):"undefined"!=typeof exports?t(exports):(t(t={}),e.modPlugins=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function p(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,c=void 0;try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,c=e}finally{try{n||null==s.return||s.return()}finally{if(r)throw c}}return a}(e,t)||s(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e,t){if(e){if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}Object.defineProperty(e,"__esModule",{value:!0}),e.checker=t,e.contextMenu=a,e.datatables=r,e.dragdrop=c,e.fileInput=o,e.select2=l,e.svgPlugin=u,e.switcher=d,e.validate=y;var M=MyAMS.$;M.templates||(e=require("jsrender"),M.templates=e.templates);var m=M.templates({markup:'\n\t<span class="custom-control custom-switch">\n\t\t<input type="checkbox"\n\t\t\t   id="{{: fieldId }}" name="{{: fieldName }}"\n\t\t\t   class="custom-control-input checker"\n\t\t\t   {{if checked}}checked{{/if}}\n\t\t\t   {{if readonly}}disabled{{/if}}\n\t\t\t   value="{{: value }}" />\n\t\t{{if prefix}}\n\t\t<input type="hidden" class="prefix"\n\t\t\t   id="{{: prefix}}{{: fieldName}}_prefix"\n\t\t\t   name="{{: prefix}}{{: fieldName}}"\n\t\t\t   value="{{if state===\'on\'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}" />\n\t\t{{else marker}}\n\t\t<input type="hidden" class="marker"\n\t\t\t   name="{{: fieldName}}{{: marker}}"\n\t\t\t   value="1" />\n\t\t{{/if}}\n\t\t<label for="{{: fieldId }}"\n\t\t\t   class="custom-control-label">\n\t\t\t{{: legend }}\n\t\t</label>\n\t</span>\n'});function t(n){return new Promise(function(e,t){var a=M("legend.checker",n);0<a.length?(a.each(function(e,t){var n,a,r,c,o,s,i,l,u=M(t),d=u.data();d.amsChecker||(n=u.parent("fieldset"),a=n.hasClass("switched")||"on"===d.amsCheckerState,c=(r=d.amsCheckerFieldname||"checker_".concat(MyAMS.core.generateId())).replace(/\./g,"_"),l=d.amsCheckerHiddenPrefix,t=d.amsCheckerMarker||!1,o=d.amsCheckerMode||"hide",s=d.amsCheckerValueOn||"true",i=d.amsCheckerValueOff||"false",t={veto:!(l={legend:u.text(),fieldName:r,fieldId:c,value:d.amsCheckerValue||!0,checked:a,readonly:d.amsCheckerReadonly,prefix:l,state:d.amsCheckerState,checkedValue:s,uncheckedValue:i,marker:t})},u.trigger("before-init.ams.checker",[u,l,t]),t.veto||(u.html(m.render(l)),M("input",u).change(function(e){var t=M(e.target),a=t.is(":checked"),e={veto:!1};u.trigger("before-switch.ams.checker",[u,e]),e.veto?t.prop("checked",!a):(MyAMS.core.executeFunctionByName(d.amsCheckerChangeHandler,document,u,a),d.amsCheckerCancelDefault||(t=t.siblings(".prefix"),"hide"===o?a?(n.removeClass("switched"),t.val(s),u.trigger("opened.ams.checker",[u])):(n.addClass("switched"),t.val(i),u.trigger("closed.ams.checker",[u])):(n.prop("disabled",!a),t.val(a?s:i))))}),u.closest("form").on("reset",function(){var e=M(".checker",u);e.prop("checked")!==a&&e.click()}),a||("hide"===o?n.addClass("switched"):n.prop("disabled",!0)),u.trigger("after-init.ams.checker",[u]),u.data("ams-checker",!0)))}),e(a)):e(null)})}function a(n){return new Promise(function(e,t){var a=M(".context-menu",n);0<a.length?MyAMS.require("menu").then(function(){a.each(function(e,t){var a=M(t),n=a.data(),r={menuSelector:n.amsContextmenuSelector||n.amsMenuSelector},t=M.extend({},r,n.amsContextmenuOptions||n.amsOptions),t=MyAMS.core.executeFunctionByName(n.amsContextmenuInitCallback||n.amsInit,document,a,t)||t,r={veto:!1};a.trigger("before-init.ams.contextmenu",[a,t,r]),r.veto||(r=a.contextMenu(t),MyAMS.core.executeFunctionByName(n.amsContextmenuAfterInitCallback||n.amsAfterInit,document,a,r,t),a.trigger("after-init.ams.contextmenu",[a,r]))})},t).then(function(){e(a)}):e(null)})}var f={init:function(){var e=M.fn.dataTable.ext.type;e.detect.unshift(function(e){return null!==e&&e.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3}$/)?"date-euro":null}),e.detect.unshift(function(e){return null!==e&&e.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3} - ([0-1][0-9]|2[0-3]):[0-5][0-9]$/)?"datetime-euro":null}),M.extend(e.order,{"numeric-comma-asc":function(e,t){e=e.replace(/,/,".").replace(/ /g,""),t=t.replace(/,/,".").replace(/ /g,"");return(e=parseFloat(e))<(t=parseFloat(t))?-1:t<e?1:0},"numeric-comma-desc":function(e,t){e=e.replace(/,/,".").replace(/ /g,""),t=t.replace(/,/,".").replace(/ /g,"");return(e=parseFloat(e))<(t=parseFloat(t))?1:t<e?-1:0},"date-euro-pre":function(e){e=M.trim(e);return""!==e?+((e=e.split("/"))[2]+e[1]+e[0]):1e7},"date-euro-asc":function(e,t){return e-t},"date-euro-desc":function(e,t){return t-e},"datetime-euro-pre":function(e){var t=M.trim(e);return""!==t?(t=(e=t.split(" - "))[0].split("/"),e=e[1].split(":"),+(t[2]+t[1]+t[0]+e[0]+e[1])):1e11},"datetime-euro-asc":function(e,t){return e-t},"datetime-euro-desc":function(e,t){return t-e}})},reorderRows:function(l){return new Promise(function(r,e){var t,a,n,c=M(l.target),o=c.data(),s=o.amsReorderUrl,i=null;s&&(s=MyAMS.core.executeFunctionByName(s,document,c)||s,t=M("tbody tr",c),0<(i="function"==typeof(a=MyAMS.core.getFunctionByName(o.amsReorderData)||"data-ams-row-id")?M.makeArray(t).map(a):t.listattr(a)).length&&(o.amsReorderPostData?n=MyAMS.core.executeFunctionByName(o.amsReorderPostData,document,c,i):(a=o.amsReorderPostAttr||"order",(n={})[a]=i),MyAMS.require("ajax").then(function(){MyAMS.ajax.post(s,n).then(function(e,t,a){var n=o.amsReorderCallback;n?MyAMS.core.executeFunctionByName(n,document,c,e,t,a).then(function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];r.apply.apply(r,[c].concat(t))}):MyAMS.ajax.handleJSON(e,c.parents(".dataTables_wrapper")).then(function(){r(e)})},e)})))})}};function r(e){var d="".concat(MyAMS.env.baseURL,"../ext/datatables/"),m="".concat(MyAMS.env.baseURL,"../../css/ext/datatables/");return new Promise(function(l,t){var u=M(".datatable",e);0<u.length?MyAMS.ajax.check(M.fn.dataTable,"".concat(MyAMS.env.baseURL,"../ext/datatables/dataTables").concat(MyAMS.env.extext,".js")).then(function(i){var e=[];i&&(e.push(MyAMS.core.getScript("".concat(d,"dataTables-bootstrap4").concat(MyAMS.env.extext,".js"))),e.push(MyAMS.core.getCSS("".concat(m,"dataTables-bootstrap4").concat(MyAMS.env.extext,".css"),"datatables-bs4"))),M.when.apply(M,e).then(function(){var r={},n=[],c=[],o=[],s={};u.each(function(e,t){var a=M(t),t=a.data();"default"===t.buttons?(a.attr("data-buttons",'["copy", "print"]'),a.removeData("buttons"),t.buttons=a.data("buttons")):"all"===t.buttons&&(a.attr("data-buttons",'["copy", "csv", "excel", "print", "pdf", "colvis"]'),a.removeData("buttons"),t.buttons=a.data("buttons")),!t.autoFill||s.autoFill||M.fn.dataTable.AutoFill||(n.push("".concat(d,"autoFill").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"autoFill-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-autofill-bs4"]="".concat(m,"autoFill-bootstrap4").concat(MyAMS.env.extext,".css"),s.autoFill=!0),t.buttons&&(s.buttons||M.fn.dataTable.Buttons||(n.push("".concat(d,"buttons").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"buttons-bootstrap4").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"buttons-html5").concat(MyAMS.env.extext,".js")),r["dt-buttons-bs4"]="".concat(m,"buttons-bootstrap4").concat(MyAMS.env.extext,".css"),s.buttons=!0),M.isArray(t.buttons)&&(0<=t.buttons.indexOf("print")&&(s.buttons_print||M.fn.dataTable.ext.buttons.print||(o.push("".concat(d,"buttons-print").concat(MyAMS.env.extext,".js")),s.buttons_print=!0)),0<=t.buttons.indexOf("excel")&&(s.buttons_excel||M.fn.dataTable.ext.buttons.excelHtml5||(n.push("".concat(d,"jszip").concat(MyAMS.env.extext,".js")),s.buttons_excel=!0)),0<=t.buttons.indexOf("pdf")&&(s.buttons_pdf||window.pdfMake||(n.push("".concat(d,"pdfmake").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"vfs_fonts").concat(MyAMS.env.extext,".js")),s.buttons_pdf=!0)),0<=t.buttons.indexOf("colvis")&&(s.buttons_colvis||M.fn.dataTable.ext.buttons.colvis||(o.push("".concat(d,"buttons-colVis").concat(MyAMS.env.extext,".js")),s.buttons_colvis=!0)))),!t.colReorder||s.colReorder||M.fn.dataTable.ColReorder||(n.push("".concat(d,"colReorder").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"colReorder-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-colreorder-bs4"]="".concat(m,"colReorder-bootstrap4").concat(MyAMS.env.extext,".css"),s.colReorder=!0),!t.fixedColumns||s.fixedColumns||M.fn.dataTable.FixedColumns||(n.push("".concat(d,"fixedColumns").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"fixedColumns-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-fixedcolumns-bs4"]="".concat(m,"fixedColumns-bootstrap4").concat(MyAMS.env.extext,".css"),s.fixedColumns=!0),!t.fixedHeader||s.fixedHeader||M.fn.dataTable.FixedHeader||(n.push("".concat(d,"fixedHeader").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"fixedHeader-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-fixedheader-bs4"]="".concat(m,"fixedHeader-bootstrap4").concat(MyAMS.env.extext,".css"),s.fixedHeader=!0),!t.keyTable||s.keyTable||M.fn.dataTable.KeyTable||(n.push("".concat(d,"keyTable").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"keyTable-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-keytable-bs4"]="".concat(m,"keyTable-bootstrap4").concat(MyAMS.env.extext,".css"),s.keyTable=!0),!1===t.responsive||s.responsive||M.fn.dataTable.Responsive||(n.push("".concat(d,"responsive").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"responsive-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-responsive-bs4"]="".concat(m,"responsive-bootstrap4").concat(MyAMS.env.extext,".css"),s.responsive=!0),!t.rowGroup||s.rowGroup||M.fn.dataTable.RowGroup||(n.push("".concat(d,"rowGroup").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"rowGroup-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-rowgroup-bs4"]="".concat(m,"rowGroup-bootstrap4").concat(MyAMS.env.extext,".css"),s.rowGroup=!0),!t.rowReorder||s.rowReorder||M.fn.dataTable.RowReorder||(n.push("".concat(d,"rowReorder").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"rowReorder-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-rowreorder-bs4"]="".concat(m,"rowReorder-bootstrap4").concat(MyAMS.env.extext,".css"),s.rowReorder=!0),!t.scroller||s.scroller||M.fn.dataTable.Scroller||(n.push("".concat(d,"scroller").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"scroller-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-scroller-bs4"]="".concat(m,"scroller-bootstrap4").concat(MyAMS.env.extext,".css"),s.scroller=!0),!t.searchBuilder||s.searchBuilder||M.fn.dataTable.SearchBuilder||(n.push("".concat(d,"searchBuilder").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"searchBuilder-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-searchbuilder-bs4"]="".concat(m,"searchBuilder-bootstrap4").concat(MyAMS.env.extext,".css"),s.searchBuilder=!0),!t.searchPanes||s.searchPanes||M.fn.dataTable.SearchPanes||(s.select||M.fn.dataTable.select||(n.push("".concat(d,"select").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"select-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-select-bs4"]="".concat(m,"select-bootstrap4").concat(MyAMS.env.extext,".css"),s.select=!0),c.push("".concat(d,"searchPanes").concat(MyAMS.env.extext,".js")),o.push("".concat(d,"searchPanes-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-searchpanes-bs4"]="".concat(m,"searchPanes-bootstrap4").concat(MyAMS.env.extext,".css"),s.searchPanes=!0),!t.select||s.select||M.fn.dataTable.select||(n.push("".concat(d,"select").concat(MyAMS.env.extext,".js")),c.push("".concat(d,"select-bootstrap4").concat(MyAMS.env.extext,".js")),r["dt-select-bs4"]="".concat(m,"select-bootstrap4").concat(MyAMS.env.extext,".css"),s.select=!0)}),M.when.apply(M,n.map(MyAMS.core.getScript)).then(function(){return M.when.apply(M,c.map(MyAMS.core.getScript)).then(function(){return M.when.apply(M,o.map(MyAMS.core.getScript)).then(function(){i&&f.init();for(var e=0,t=Object.entries(r);e<t.length;e++){var a=p(t[e],2),n=a[0],a=a[1];MyAMS.core.getCSS(a,n)}u.each(function(e,t){var a,n,r=M(t);M.fn.dataTable.isDataTable(r)||((n=(a=r.data()).amsDatatableDom||a.amsDom||a.dom||"")||(a.buttons&&(n+="B"),a.searchBuilder&&(n+="Q"),a.searchPanes&&(n+="P"),!1===a.searching&&!1===a.lengthChange||(n+="<'row px-2'",!1!==a.searching&&(n+="<'col-sm-6 col-md-8'f>"),!1!==a.lengthChange&&(n+="<'col-sm-6 col-md-4'l>"),n+=">"),n+="<'row'<'col-sm-12'tr>>",!1===a.info&&!1===a.paging||(n+="<'row px-2 py-1'",!1!==a.info&&(n+="<'col-sm-12 col-md-5'i>"),!1!==a.paging&&(n+="<'col-sm-12 col-md-7'p>"),n+=">")),t={language:a.amsDatatableLanguage||a.amsLanguage||MyAMS.i18n.plugins.datatables,responsive:!0,dom:n},n=M.extend({},t,a.amsDatatableOptions||a.amsOptions),n=MyAMS.core.executeFunctionByName(a.amsDatatableInitCallback||a.amsInit,document,r,n)||n,t={veto:!1},r.trigger("before-init.ams.datatable",[r,n,t]),t.veto||(t=r.DataTable(n),n.rowReorder&&t.on("row-reorder",MyAMS.core.getFunctionByName(a.amsDatatableReordered||a.amsReordered)||f.reorderRows),MyAMS.core.executeFunctionByName(a.amsDatatableAfterInitCallback||a.amsAfterInit,document,r,t,n),r.trigger("after-init.ams.datatable",[r,t])))}),l(u)},t)},t)},t)},t)},t):l(null)})}function c(n){return new Promise(function(e,t){var a=M(".draggable, .droppable, .sortable",n);0<a.length?MyAMS.ajax.check(M.fn.draggable,"".concat(MyAMS.env.baseURL,"../ext/jquery-ui").concat(MyAMS.env.extext,".js")).then(function(){a.each(function(e,t){var a=M(t),n=a.data();if(a.hasClass("draggable")){var r={cursor:n.amsDraggableCursor||"move",containment:n.amsDraggableContainment,handle:n.amsDraggableHandle,connectToSortable:n.amsDraggableConnectSortable,helper:MyAMS.core.getFunctionByName(n.amsDraggableHelper)||n.amsDraggableHelper,start:MyAMS.core.getFunctionByName(n.amsDraggableStart),stop:MyAMS.core.getFunctionByName(n.amsDraggableStop)},t=M.extend({},r,n.amsDraggableOptions||n.amsOptions),t=MyAMS.core.executeFunctionByName(n.amsDraggableInitCallback||n.amsInit,document,a,t)||t,r={veto:!1};if(a.trigger("before-init.ams.draggable",[a,t,r]),r.veto)return;r=a.draggable(t);a.disableSelection(),MyAMS.core.executeFunctionByName(n.amsDraggableAfterInitCallback||n.amsAfterInit,document,a,r,t),a.trigger("after-init.ams.draggable",[a,r])}if(a.hasClass("droppable")){var c={accept:n.amsDroppableAccept||n.amsAccept,drop:MyAMS.core.getFunctionByName(n.amsDroppableDrop)},o=M.extend({},c,n.amsDroppableOptions||n.amsOptions),o=MyAMS.core.executeFunctionByName(n.amsDroppableInitCallback||n.amsInit,document,a,o)||o,c={veto:!1};if(a.trigger("before-init.ams.droppable",[a,o,c]),c.veto)return;var c=a.droppable(o);MyAMS.core.executeFunctionByName(n.amsDroppableAfterInitCallback||n.amsAfterInit,document,a,c,o),a.trigger("after-init.ams.droppable",[a,c])}a.hasClass("sortable")&&(o={items:n.amsSortableItems,handle:n.amsSortableHandle,helper:MyAMS.core.getFunctionByName(n.amsSortableHelper)||n.amsSortableHelper,connectWith:n.amsSortableConnectwith,containment:n.amsSortableContainment,placeholder:n.amsSortablePlaceholder,start:MyAMS.core.getFunctionByName(n.amsSortableStart),over:MyAMS.core.getFunctionByName(n.amsSortableOver),stop:MyAMS.core.getFunctionByName(n.amsSortableStop)},c=M.extend({},o,n.amsSortableOptions||n.amsOptions),c=MyAMS.core.executeFunctionByName(n.amsSortableInitCallback||n.amsInit,document,a,c)||c,o={veto:!1},a.trigger("before-init.ams.sortable",[a,c,o]),o.veto||(o=a.sortable(c),a.disableSelection(),MyAMS.core.executeFunctionByName(n.amsSortableAfterInitCallback||n.amsAfterInit,document,a,o,c),a.trigger("after-init.ams.sortable",[a,o])))})},t).then(function(){e(a)}):e(null)})}function o(n){return new Promise(function(e,t){var a=M(".custom-file-input",n);0<a.length?MyAMS.require("ajax").then(function(){MyAMS.ajax.check(window.bsCustomFileInput,"".concat(MyAMS.env.baseURL,"../ext/bs-custom-file-input").concat(MyAMS.env.extext,".js")).then(function(){a.each(function(e,t){var a=M(t),n=a.attr("id"),r=n?"#".concat(n):a.attr("name"),n=M(t.form),t=n.attr("id"),t=t?"#".concat(t):n.attr("name"),n={veto:!1};a.trigger("before-init.ams.fileinput",[a,n]),n.veto||(bsCustomFileInput.init(r,t),a.trigger("after-init.ams.fileinput",[a]))})},t).then(function(){e(a)})},t):e(null)})}var i={select2UpdateHiddenField:function(a){var n=[];a.parent().find("ul.select2-selection__rendered").children("li[title]").each(function(e,t){n.push(a.children('option[data-content="'.concat(t.title,'"]')).attr("value"))}),a.data("select2-target").val(n.join(a.data("ams-select2-separator")||","))}};function l(e){return new Promise(function(a,n){var r=M(".select2",e);0<r.length?MyAMS.require("ajax","helpers").then(function(){MyAMS.ajax.check(M.fn.select2,"".concat(MyAMS.env.baseURL,"../ext/select2/select2").concat(MyAMS.env.extext,".js")).then(function(e){var t=[];e&&(t.push(MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/select2/i18n/").concat(MyAMS.i18n.language,".js"))),t.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/select2").concat(MyAMS.env.extext,".css"),"select2")),t.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/select2-bootstrap4").concat(MyAMS.env.extext,".css"),"select2_bs4"))),M.when.apply(M,t).then(function(){r.each(function(e,t){var a,n,r=M(t),c=r.data();c.select2||(t={theme:c.amsSelect2Theme||c.amsTheme||"bootstrap4",language:c.amsSelect2Language||c.amsLanguage||MyAMS.i18n.language,escapeMarkup:MyAMS.core.getFunctionByName(c.amsSelect2EscapeMarkup||c.amsEscapeMarkup),matcher:MyAMS.core.getFunctionByName(c.amsSelect2Matcher||c.amsMatcher),sorter:MyAMS.core.getFunctionByName(c.amsSelect2Sorter||c.amsSorter),templateResult:MyAMS.core.getFunctionByName(c.amsSelect2TemplateResult||c.amsTemplateResult),templateSelection:MyAMS.core.getFunctionByName(c.amsSelect2TemplateSelection||c.amsTemplateSelection),tokenizer:MyAMS.core.getFunctionByName(c.amsSelect2Tokenizer||c.amsTokenizer)},(c.amsSelect2AjaxUrl||c.amsAjaxUrl||c["ajax-Url"])&&(t.ajax={url:MyAMS.core.getFunctionByName(c.amsSelect2AjaxUrl||c.amsAjaxUrl)||c.amsSelect2AjaxUrl||c.amsAjaxUrl,data:MyAMS.core.getFunctionByName(c.amsSelect2AjaxData||c.amsAjaxData)||c.amsSelect2AjaxData||c.amsAjaxData,processResults:MyAMS.core.getFunctionByName(c.amsSelect2AjaxProcessResults||c.amsAjaxProcessResults)||c.amsSelect2AjaxProcessResults||c.amsAjaxProcessResults,transport:MyAMS.core.getFunctionByName(c.amsSelect2AjaxTransport||c.amsAjaxTransport)||c.amsSelect2AjaxTransport||c.amsAjaxTransport},t.minimumInputLength=c.amsSelect2MinimumInputLength||c.amsMinimumInputLength||c.minimumInputLength||1),r.hasClass("sortable")&&((a=M('<input type="hidden" name="'.concat(r.attr("name"),'">')).insertAfter(r)).val(M("option:selected",r).listattr("value").join(c.amsSelect2Separator||",")),r.data("select2-target",a).removeAttr("name"),t.templateSelection=function(e){var t=M(e.element);return t.attr("data-content",t.html()),e.text}),a=M.extend({},t,c.amsSelect2Options||c.amsOptions),a=MyAMS.core.executeFunctionByName(c.amsSelect2InitCallback||c.amsInit,document,r,a)||a,t={veto:!1},r.trigger("before-init.ams.select2",[r,a,t]),t.veto||(n=r.select2(a),r.on("select2:opening select2:selecting select2:unselecting select2:clearing",function(e){if(M(e.target).is(":disabled"))return!1}),r.on("select2:opening",function(e){e=M(e.currentTarget).parents(".modal").first();e.exists()&&(e=parseInt(e.css("z-index")),n.data("select2").$dropdown.css("z-index",e+1))}),r.hasClass("sortable")&&MyAMS.ajax.check(M.fn.sortable,"".concat(MyAMS.env.baseURL,"../ext/jquery-ui").concat(MyAMS.env.extext,".js")).then(function(){r.parent().find("ul.select2-selection__rendered").sortable({containment:"parent",update:function(){i.select2UpdateHiddenField(r)}}),r.on("select2:select select2:unselect",function(e){var t=e.params.data.id,e=M(e.currentTarget),t=e.children('option[value="'.concat(t,'"]'));MyAMS.helpers.moveElementToParentEnd(t),e.trigger("change"),i.select2UpdateHiddenField(e)})}),MyAMS.core.executeFunctionByName(c.amsSelect2AfterInitCallback||c.amsAfterInit,document,r,n,a),r.trigger("after-init.ams.select2",[r,n])))})},n).then(function(){a(r)})},n)},n):a(null)})}function u(n){return new Promise(function(e,t){var a=M(".svg-container",n);0<a.length?(a.each(function(e,t){var a=M(t),n=M("svg",a),r=n.attr("width"),a=n.attr("height");r&&a&&t.setAttribute("viewBox","0 0 ".concat(Math.round(parseFloat(r))," ").concat(Math.round(parseFloat(a)))),n.attr("width","100%").attr("height","auto")}),e(a)):e(null)})}function d(n){return new Promise(function(e,t){var a=M("legend.switcher",n);0<a.length?(a.each(function(e,t){var a=M(t),n=a.parent("fieldset"),r=a.data(),c=r.amsSwitcherMinusClass||r.amsMinusClass||"minus",o=r.amsSwitcherPlusClass||r.amsPlusClass||"plus";r.amsSwitcher||(t={veto:!1},a.trigger("before-init.ams.switcher",[a,r,t]),t.veto||(M('<i class="fa fa-'.concat("open"===r.amsSwitcherState?c:o,' mr-2"></i>')).prependTo(a),a.on("click",function(e){e.preventDefault();e={};a.trigger("before-switch.ams.switcher",[a,e]),e.veto||(n.hasClass("switched")?(n.removeClass("switched"),MyAMS.core.switchIcon(M("i",a),o,c),a.trigger("opened.ams.switcher",[a]),(e=a.attr("id"))&&M('legend.switcher[data-ams-switcher-sync="'.concat(e,'"]'),n).each(function(e,t){t=M(t);t.parents("fieldset").hasClass("switched")&&t.click()})):(n.addClass("switched"),MyAMS.core.switchIcon(M("i",a),c,o),a.trigger("closed.ams.switcher",[a])))}),"open"!==r.amsSwitcherState&&n.addClass("switched"),a.trigger("after-init.ams.switcher",[a]),a.data("ams-switcher",!0)))}),e(a)):e(null)})}function y(n){return new Promise(function(e,t){var a=M("form:not([novalidate])",n);0<a.length&&MyAMS.require("ajax","i18n").then(function(){MyAMS.ajax.check(M.fn.validate,"".concat(MyAMS.env.baseURL,"../ext/validate/jquery-validate").concat(MyAMS.env.extext,".js")).then(function(e){e&&"en"!==MyAMS.i18n.language&&MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/validate/i18n/messages_").concat(MyAMS.i18n.language).concat(MyAMS.env.extext,".js")).then(function(){}),a.each(function(e,t){var c=M(t),a=c.data(),n={ignore:null,invalidHandler:MyAMS.core.getFunctionByName(a.amsValidateInvalidHandler)||function(e,t){M("span.is-invalid",c).remove(),M(".is-invalid",c).removeClass("is-invalid");var a=function(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=s(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var n=0,t=function(){};return{s:t,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,c=!0,o=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return c=e.done,e},e:function(e){o=!0,r=e},f:function(){try{c||null==a.return||a.return()}finally{if(o)throw r}}}}(t.errorList);try{for(a.s();!(r=a.n()).done;){var n=r.value,r=M(n.element),n=r.parents(".tab-pane");r.parents("fieldset.switched").each(function(e,t){M("legend.switcher",t).click()}),n.each(function(e,t){var a=M(t),t=a.parents(".tab-content").siblings(".nav-tabs");M("li:nth-child(".concat(a.index()+1,")"),t).addClass("is-invalid"),M("li.is-invalid:first a",t).click()})}}catch(e){a.e(e)}finally{a.f()}},errorElement:a.amsValidateErrorElement||"span",errorClass:a.amsValidateErrorClass||"is-invalid",errorPlacement:MyAMS.core.getFunctionByName(a.amsValidateErrorPlacement)||function(e,t){e.addClass("invalid-feedback"),t.closest(".form-widget").append(e)},submitHandler:MyAMS.core.getFunctionByName(a.amsValidateSubmitHandler)||(void 0!==c.attr("data-async")?function(){MyAMS.require("form").then(function(){MyAMS.form.submit(c)})}:function(){c.get(0).submit()})};M("[data-ams-validate-rules]",c).each(function(e,t){0===e&&(n.rules={}),n.rules[M(t).attr("name")]=M(t).data("ams-validate-rules")}),M("[data-ams-validate-messages]",c).each(function(e,t){0===e&&(n.messages={}),n.messages[M(t).attr("name")]=M(t).data("ams-validate-messages")});var r=M.extend({},n,a.amsValidateOptions||a.amsOptions),r=MyAMS.core.executeFunctionByName(a.amsValidateInitCallback||a.amsInit,document,c,r)||r,t={veto:!1};c.trigger("before-init.ams.validate",[c,r,t]),t.veto||(t=c.validate(r),MyAMS.core.executeFunctionByName(a.amsValidateAfterInitCallback||a.amsAfterInit,document,c,t,r),c.trigger("after-init.ams.validate",[c,t]))})},t).then(function(){e(a)})},t)})}window.MyAMS&&(MyAMS.registry.register(t,"checker"),MyAMS.registry.register(a,"contextMenu"),MyAMS.registry.register(r,"datatables"),MyAMS.registry.register(c,"dragdrop"),MyAMS.registry.register(o,"fileInput"),MyAMS.registry.register(l,"select2"),MyAMS.registry.register(u,"svg"),MyAMS.registry.register(d,"switcher"),MyAMS.registry.register(y,"validate"),MyAMS.config.modules.push("plugins"),MyAMS.env.bundle||console.debug("MyAMS: plugins module loaded..."))});