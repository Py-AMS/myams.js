!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):"undefined"!=typeof exports?t(exports):(t(t={}),e.modPlugins=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function y(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=c(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var n=0,t=function(){};return{s:t,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,r=!0,o=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return r=e.done,e},e:function(e){o=!0,s=e},f:function(){try{r||null==a.return||a.return()}finally{if(o)throw s}}}}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,s=!1,r=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){s=!0,r=e}finally{try{n||null==c.return||c.return()}finally{if(s)throw r}}return a}(e,t)||c(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(e,t){if(e){if("string"==typeof e)return n(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(e,t):void 0}}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}Object.defineProperty(e,"__esModule",{value:!0}),e.checker=t,e.contextMenu=a,e.datatables=s,e.datetime=r,e.dragdrop=o,e.editor=i,e.fileInput=l,e.imgAreaSelect=m,e.select2=d,e.svgPlugin=M,e.switcher=p,e.tinymce=S,e.validate=v;var g=MyAMS.$;g.templates||(e=require("jsrender"),g.templates=e.templates);var h=g.templates({markup:'\n\t<span class="custom-control custom-switch">\n\t\t<input type="checkbox"\n\t\t\t   id="{{: fieldId }}" name="{{: fieldName }}"\n\t\t\t   class="custom-control-input checker"\n\t\t\t   {{if checked}}checked{{/if}}\n\t\t\t   {{if readonly}}disabled{{/if}}\n\t\t\t   value="{{: value }}" />\n\t\t{{if prefix}}\n\t\t<input type="hidden" class="prefix"\n\t\t\t   id="{{: prefix}}{{: fieldName}}_prefix"\n\t\t\t   name="{{: prefix}}{{: fieldName}}"\n\t\t\t   value="{{if state===\'on\'}}{{: checkedValue}}{{else}}{{: uncheckedValue}}{{/if}}" />\n\t\t{{else marker}}\n\t\t<input type="hidden" class="marker"\n\t\t\t   name="{{: fieldName}}{{: marker}}"\n\t\t\t   value="1" />\n\t\t{{/if}}\n\t\t<label for="{{: fieldId }}"\n\t\t\t   class="custom-control-label">\n\t\t\t{{: legend }}\n\t\t</label>\n\t</span>\n'});function t(a){return new Promise(function(e){var t=g("legend.checker",a);0<t.length?(t.each(function(e,t){var n,a,s,r,o,c,i,l,m,u,d,M=g(t),p=M.data();p.amsChecker||(n=M.parent("fieldset"),u=p.amsCheckerState||p.amsState,a=n.hasClass("switched")||"on"===u,r=(s=p.amsCheckerFieldname||p.amsFieldname||"checker_".concat(MyAMS.core.generateId())).replace(/\./g,"_"),o=p.amsCheckerHiddenPrefix||p.amsHiddenPrefix,d=p.amsCheckerMarker||p.amsMarker||!1,c=p.amsCheckerMode||p.amsMode||"hide",i=p.amsCheckerValueOn||p.amsValueOn||"true",l=p.amsCheckerValueOff||p.amsValueOff||"false",m=p.amsCheckerValue||p.amsValue,t=p.amsCheckerReadonly||p.amsReadonly,d={veto:!(u={legend:M.text(),fieldName:s,fieldId:r,value:m||!0,checked:a,readonly:t,prefix:o,state:u,checkedValue:i,uncheckedValue:l,marker:d})},M.trigger("before-init.ams.checker",[M,u,d]),d.veto||(M.html(h.render(u)),g("input",M).change(function(e){var t=g(e.target),a=t.is(":checked"),e={veto:!1};M.trigger("before-switch.ams.checker",[M,e]),e.veto?t.prop("checked",!a):(MyAMS.core.executeFunctionByName(p.amsCheckerChangeHandler||p.amsChangeHandler,document,M,a),p.amsCheckerCancelDefault||p.amsCancelDefault||(t=t.siblings(".prefix"),"hide"===c?a?(n.removeClass("switched"),t.val(i),M.trigger("opened.ams.checker",[M])):(n.addClass("switched"),t.val(l),M.trigger("closed.ams.checker",[M])):(n.prop("disabled",!a),t.val(a?i:l))))}),M.closest("form").on("reset",function(){var e=g(".checker",M);e.prop("checked")!==a&&e.click()}),a||("hide"===c?n.addClass("switched"):n.prop("disabled",!0)),M.trigger("after-init.ams.checker",[M]),M.data("ams-checker",!0)))}),e(t)):e(null)})}function a(n){return new Promise(function(e,t){var a=g(".context-menu",n);0<a.length?MyAMS.require("menu").then(function(){a.each(function(e,t){var a=g(t),n=a.data(),s={menuSelector:n.amsContextmenuSelector||n.amsMenuSelector},t=g.extend({},s,n.amsContextmenuOptions||n.amsOptions),t=MyAMS.core.executeFunctionByName(n.amsContextmenuInitCallback||n.amsInit,document,a,t)||t,s={veto:!1};a.trigger("before-init.ams.contextmenu",[a,t,s]),s.veto||(s=a.contextMenu(t),MyAMS.core.executeFunctionByName(n.amsContextmenuAfterInitCallback||n.amsAfterInit,document,a,s,t),a.trigger("after-init.ams.contextmenu",[a,s]))})},t).then(function(){e(a)}):e(null)})}var b={init:function(){var e=g.fn.dataTable.ext.type;e.detect.unshift(function(e){return null!==e&&e.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3}$/)?"date-euro":null}),e.detect.unshift(function(e){return null!==e&&e.match(/^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-3][0-9]{3} - ([0-1][0-9]|2[0-3]):[0-5][0-9]$/)?"datetime-euro":null}),g.extend(e.order,{"numeric-comma-asc":function(e,t){e=e.replace(/,/,".").replace(/ /g,""),t=t.replace(/,/,".").replace(/ /g,"");return(e=parseFloat(e))<(t=parseFloat(t))?-1:t<e?1:0},"numeric-comma-desc":function(e,t){e=e.replace(/,/,".").replace(/ /g,""),t=t.replace(/,/,".").replace(/ /g,"");return(e=parseFloat(e))<(t=parseFloat(t))?1:t<e?-1:0},"date-euro-pre":function(e){e=g.trim(e);return""!==e?+((e=e.split("/"))[2]+e[1]+e[0]):1e7},"date-euro-asc":function(e,t){return e-t},"date-euro-desc":function(e,t){return t-e},"datetime-euro-pre":function(e){var t=g.trim(e);return""!==t?(t=(e=t.split(" - "))[0].split("/"),e=e[1].split(":"),+(t[2]+t[1]+t[0]+e[0]+e[1])):1e11},"datetime-euro-asc":function(e,t){return e-t},"datetime-euro-desc":function(e,t){return t-e}})},reorderRows:function(m){return new Promise(function(s,e){var r=g(m.target),o=r.data(),t=o.amsReorderInputTarget,a=o.amsReorderUrl;t||a||s();var n,c,i=g("tbody tr",r),l=MyAMS.core.getFunctionByName(o.amsReorderData)||"data-ams-row-value",i="function"==typeof l?g.makeArray(i).map(l):i.listattr(l),l=o.amsReorderSeparator||";";t?(t=g(t)).exists()&&t.val(i.join(l)):i=i.join(l),a&&((a=MyAMS.core.executeFunctionByName(a,document,r)||a).startsWith(window.location.protocol)||a.startsWith("/")||(n=r.data("ams-location"),a="".concat(n||"","/").concat(a)),0<i.length&&(o.amsReorderPostData?c=MyAMS.core.executeFunctionByName(o.amsReorderPostData,document,r,i):(n=o.amsReorderPostAttr||"order",(c={})[n]=i),MyAMS.require("ajax").then(function(){MyAMS.ajax.post(a,c).then(function(e,t,a){var n=o.amsReorderCallback;n?MyAMS.core.executeFunctionByName(n,document,r,e,t,a).then(function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];s.apply.apply(s,[r].concat(t))}):MyAMS.ajax.handleJSON(e,r.parents(".dataTables_wrapper")).then(function(){s(e)})},e)})))})}};function s(e){var u="".concat(MyAMS.env.baseURL,"../ext/datatables/"),d="".concat(MyAMS.env.baseURL,"../../css/ext/datatables/");return new Promise(function(l,t){var m=g(".datatable",e);0<m.length?MyAMS.ajax.check(g.fn.dataTable,"".concat(MyAMS.env.baseURL,"../ext/datatables/dataTables").concat(MyAMS.env.extext,".js")).then(function(i){var e=[];i&&(e.push(MyAMS.core.getScript("".concat(u,"dataTables-bootstrap4").concat(MyAMS.env.extext,".js"))),e.push(MyAMS.core.getCSS("".concat(d,"dataTables-bootstrap4").concat(MyAMS.env.extext,".css"),"datatables-bs4"))),g.when.apply(g,e).then(function(){var s={},n=[],r=[],o=[],c={};m.each(function(e,t){var a=g(t),t=a.data();"default"===t.buttons?(a.attr("data-buttons",'["copy", "print"]'),a.removeData("buttons"),t.buttons=a.data("buttons")):"all"===t.buttons&&(a.attr("data-buttons",'["copy", "csv", "excel", "print", "pdf", "colvis"]'),a.removeData("buttons"),t.buttons=a.data("buttons")),!t.autoFill||c.autoFill||g.fn.dataTable.AutoFill||(n.push("".concat(u,"autoFill").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"autoFill-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-autofill-bs4"]="".concat(d,"autoFill-bootstrap4").concat(MyAMS.env.extext,".css"),c.autoFill=!0),t.buttons&&(c.buttons||g.fn.dataTable.Buttons||(n.push("".concat(u,"buttons").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"buttons-bootstrap4").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"buttons-html5").concat(MyAMS.env.extext,".js")),s["dt-buttons-bs4"]="".concat(d,"buttons-bootstrap4").concat(MyAMS.env.extext,".css"),c.buttons=!0),g.isArray(t.buttons)&&(0<=t.buttons.indexOf("print")&&(c.buttons_print||g.fn.dataTable.ext.buttons.print||(o.push("".concat(u,"buttons-print").concat(MyAMS.env.extext,".js")),c.buttons_print=!0)),0<=t.buttons.indexOf("excel")&&(c.buttons_excel||g.fn.dataTable.ext.buttons.excelHtml5||(n.push("".concat(u,"jszip").concat(MyAMS.env.extext,".js")),c.buttons_excel=!0)),0<=t.buttons.indexOf("pdf")&&(c.buttons_pdf||window.pdfMake||(n.push("".concat(u,"pdfmake").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"vfs_fonts").concat(MyAMS.env.extext,".js")),c.buttons_pdf=!0)),0<=t.buttons.indexOf("colvis")&&(c.buttons_colvis||g.fn.dataTable.ext.buttons.colvis||(o.push("".concat(u,"buttons-colVis").concat(MyAMS.env.extext,".js")),c.buttons_colvis=!0)))),!t.colReorder||c.colReorder||g.fn.dataTable.ColReorder||(n.push("".concat(u,"colReorder").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"colReorder-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-colreorder-bs4"]="".concat(d,"colReorder-bootstrap4").concat(MyAMS.env.extext,".css"),c.colReorder=!0),!t.fixedColumns||c.fixedColumns||g.fn.dataTable.FixedColumns||(n.push("".concat(u,"fixedColumns").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"fixedColumns-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-fixedcolumns-bs4"]="".concat(d,"fixedColumns-bootstrap4").concat(MyAMS.env.extext,".css"),c.fixedColumns=!0),!t.fixedHeader||c.fixedHeader||g.fn.dataTable.FixedHeader||(n.push("".concat(u,"fixedHeader").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"fixedHeader-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-fixedheader-bs4"]="".concat(d,"fixedHeader-bootstrap4").concat(MyAMS.env.extext,".css"),c.fixedHeader=!0),!t.keyTable||c.keyTable||g.fn.dataTable.KeyTable||(n.push("".concat(u,"keyTable").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"keyTable-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-keytable-bs4"]="".concat(d,"keyTable-bootstrap4").concat(MyAMS.env.extext,".css"),c.keyTable=!0),!1===t.responsive||c.responsive||g.fn.dataTable.Responsive||(n.push("".concat(u,"responsive").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"responsive-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-responsive-bs4"]="".concat(d,"responsive-bootstrap4").concat(MyAMS.env.extext,".css"),c.responsive=!0),!t.rowGroup||c.rowGroup||g.fn.dataTable.RowGroup||(n.push("".concat(u,"rowGroup").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"rowGroup-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-rowgroup-bs4"]="".concat(d,"rowGroup-bootstrap4").concat(MyAMS.env.extext,".css"),c.rowGroup=!0),!t.rowReorder||c.rowReorder||g.fn.dataTable.RowReorder||(n.push("".concat(u,"rowReorder").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"rowReorder-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-rowreorder-bs4"]="".concat(d,"rowReorder-bootstrap4").concat(MyAMS.env.extext,".css"),c.rowReorder=!0),!t.scroller||c.scroller||g.fn.dataTable.Scroller||(n.push("".concat(u,"scroller").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"scroller-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-scroller-bs4"]="".concat(d,"scroller-bootstrap4").concat(MyAMS.env.extext,".css"),c.scroller=!0),!t.searchBuilder||c.searchBuilder||g.fn.dataTable.SearchBuilder||(n.push("".concat(u,"searchBuilder").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"searchBuilder-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-searchbuilder-bs4"]="".concat(d,"searchBuilder-bootstrap4").concat(MyAMS.env.extext,".css"),c.searchBuilder=!0),!t.searchPanes||c.searchPanes||g.fn.dataTable.SearchPanes||(c.select||g.fn.dataTable.select||(n.push("".concat(u,"select").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"select-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-select-bs4"]="".concat(d,"select-bootstrap4").concat(MyAMS.env.extext,".css"),c.select=!0),r.push("".concat(u,"searchPanes").concat(MyAMS.env.extext,".js")),o.push("".concat(u,"searchPanes-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-searchpanes-bs4"]="".concat(d,"searchPanes-bootstrap4").concat(MyAMS.env.extext,".css"),c.searchPanes=!0),!t.select||c.select||g.fn.dataTable.select||(n.push("".concat(u,"select").concat(MyAMS.env.extext,".js")),r.push("".concat(u,"select-bootstrap4").concat(MyAMS.env.extext,".js")),s["dt-select-bs4"]="".concat(d,"select-bootstrap4").concat(MyAMS.env.extext,".css"),c.select=!0)}),g.when.apply(g,n.map(MyAMS.core.getScript)).then(function(){return g.when.apply(g,r.map(MyAMS.core.getScript)).then(function(){return g.when.apply(g,o.map(MyAMS.core.getScript)).then(function(){i&&b.init();for(var e=0,t=Object.entries(s);e<t.length;e++){var a=f(t[e],2),n=a[0],a=a[1];MyAMS.core.getCSS(a,n)}m.each(function(e,t){var a=g(t);if(!g.fn.dataTable.isDataTable(a)){var n=a.data(),t=n.amsDatatableDom||n.amsDom||n.dom||"";t||(n.buttons&&(t+="B"),n.searchBuilder&&(t+="Q"),n.searchPanes&&(t+="P"),!1===n.searching&&!1===n.lengthChange||(t+="<'row px-2'",!1!==n.searching&&(t+="<'col-sm-6 col-md-8'f>"),!1!==n.lengthChange&&(t+="<'col-sm-6 col-md-4'l>"),t+=">"),t+="<'row'<'col-sm-12'tr>>",!1===n.info&&!1===n.paging||(t+="<'row px-2 py-1'",!1!==n.info&&(t+="<'col-sm-12 col-md-5'i>"),!1!==n.paging&&(t+="<'col-sm-12 col-md-7'p>"),t+=">")),(n.buttons||n.searchBuilder||n.searchPanes||!1!==n.searching)&&!1!==n.lengthChange||a.siblings("h3").addClass("mb-0");t={language:n.amsDatatableLanguage||n.amsLanguage||MyAMS.i18n.plugins.datatables,responsive:!0,dom:t};if("string"==typeof(r=n.amsDatatableOrder||n.amsOrder)){var s=r.split(";"),r=[],o=y(s);try{for(o.s();!(c=o.n()).done;){var c=c.value.split(",");c[0]=parseInt(c[0]),r.push(c)}}catch(e){o.e(e)}finally{o.f()}}r&&(t.order=r);var s=g("thead th",a),i=[];s.each(function(e,t){i[e]=g(t).data("ams-column")||{}});var l=y(s.listattr("data-ams-sortable").entries());try{for(l.s();!(u=l.n()).done;){var m=f(u.value,2),u=m[0],m=m[1];void 0!==m&&(i[u].sortable="string"==typeof m?JSON.parse(m):m)}}catch(e){l.e(e)}finally{l.f()}var d=y(s.listattr("data-ams-type").entries());try{for(d.s();!(p=d.n()).done;){var M=f(p.value,2),p=M[0],M=M[1];void 0!==M&&(i[p].type=M)}}catch(e){d.e(e)}finally{d.f()}t.columns=i;s=g.extend({},t,n.amsDatatableOptions||n.amsOptions),s=MyAMS.core.executeFunctionByName(n.amsDatatableInitCallback||n.amsInit,document,a,s)||s,t={veto:!1};a.trigger("before-init.ams.datatable",[a,s,t]),t.veto||(t=a.DataTable(s),MyAMS.core.executeFunctionByName(n.amsDatatableAfterInitCallback||n.amsAfterInit,document,a,t,s),a.trigger("after-init.ams.datatable",[a,t]),s.rowReorder&&t.on("row-reorder",MyAMS.core.getFunctionByName(n.amsDatatableReordered||n.amsReordered)||b.reorderRows))}}),l(m)},t)},t)},t)},t)},t):l(null)})}function r(n){return new Promise(function(e,t){var a=g(".datetime",n);0<a.length?MyAMS.ajax.check(window.moment,"".concat(MyAMS.env.baseURL,"../ext/moment").concat(MyAMS.env.extext,".js")).then(function(){MyAMS.ajax.check(g.fn.datetimepicker,"".concat(MyAMS.env.baseURL,"../ext/tempusdominus-bootstrap4").concat(MyAMS.env.extext,".js")).then(function(e){var t=[];e&&t.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/tempusdominus-bootstrap4").concat(MyAMS.env.extext,".css"),"tempusdominus")),g.when.apply(g,t).then(function(){a.each(function(e,t){var a=g(t),n=a.data(),s={locale:n.amsDatetimeLanguage||n.amsLanguage||MyAMS.i18n.language,icons:{time:"far fa-clock",date:"far fa-calendar",up:"fas fa-arrow-up",down:"fas fa-arrow-down",previous:"fas fa-chevron-left",next:"fas fa-chevron-right",today:"far fa-calendar-check-o",clear:"far fa-trash",close:"far fa-times"},date:a.val(),format:n.amsDatetimeFormat||n.amsFormat},t=g.extend({},s,n.datetimeOptions||n.options),t=MyAMS.core.executeFunctionByName(n.amsDatetimeInitCallback||n.amsInit,document,a,t)||t,s={veto:!1};a.trigger("before-init.ams.datetime",[a,t,s]),s.veto||(a.datetimepicker(t),t=a.data("datetimepicker"),(n.amsDatetimeIsoTarget||n.amsIsoTarget)&&a.on("change.datetimepicker",function(e){var t=g(e.currentTarget).data();g(t.amsDatetimeIsoTarget||t.amsIsoTarget).val(e.date?e.date.toISOString(!0):null)}),a.trigger("after-init.ams.datetime",[a,t]))})})},t).then(function(){e(a)})},t):e(null)})}function o(n){return new Promise(function(e,t){var a=g(".draggable, .droppable, .sortable, .resizable",n);0<a.length?MyAMS.ajax.check(g.fn.draggable,"".concat(MyAMS.env.baseURL,"../ext/jquery-ui").concat(MyAMS.env.extext,".js")).then(function(){MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/jquery-ui.structure").concat(MyAMS.env.extext,".css"),"jquery-ui").then(function(){a.each(function(e,t){var a=g(t),t=a.data();if(a.hasClass("draggable")){var n={cursor:t.amsDraggableCursor||"move",containment:t.amsDraggableContainment,handle:t.amsDraggableHandle,connectToSortable:t.amsDraggableConnectSortable,helper:MyAMS.core.getFunctionByName(t.amsDraggableHelper)||t.amsDraggableHelper,start:MyAMS.core.getFunctionByName(t.amsDraggableStart),stop:MyAMS.core.getFunctionByName(t.amsDraggableStop)},s=g.extend({},n,t.amsDraggableOptions||t.amsOptions),s=MyAMS.core.executeFunctionByName(t.amsDraggableInitCallback||t.amsInit,document,a,s)||s,n={veto:!1};if(a.trigger("before-init.ams.draggable",[a,s,n]),n.veto)return;n=a.draggable(s);a.disableSelection(),MyAMS.core.executeFunctionByName(t.amsDraggableAfterInitCallback||t.amsAfterInit,document,a,n,s),a.trigger("after-init.ams.draggable",[a,n])}if(a.hasClass("droppable")){s={accept:t.amsDroppableAccept||t.amsAccept,drop:MyAMS.core.getFunctionByName(t.amsDroppableDrop)},n=g.extend({},s,t.amsDroppableOptions||t.amsOptions),n=MyAMS.core.executeFunctionByName(t.amsDroppableInitCallback||t.amsInit,document,a,n)||n,s={veto:!1};if(a.trigger("before-init.ams.droppable",[a,n,s]),s.veto)return;s=a.droppable(n);MyAMS.core.executeFunctionByName(t.amsDroppableAfterInitCallback||t.amsAfterInit,document,a,s,n),a.trigger("after-init.ams.droppable",[a,s])}if(a.hasClass("sortable")){var r={items:t.amsSortableItems,handle:t.amsSortableHandle,helper:MyAMS.core.getFunctionByName(t.amsSortableHelper)||t.amsSortableHelper,connectWith:t.amsSortableConnectwith,containment:t.amsSortableContainment,placeholder:t.amsSortablePlaceholder,start:MyAMS.core.getFunctionByName(t.amsSortableStart),over:MyAMS.core.getFunctionByName(t.amsSortableOver),stop:MyAMS.core.getFunctionByName(t.amsSortableStop)},o=g.extend({},r,t.amsSortableOptions||t.amsOptions),o=MyAMS.core.executeFunctionByName(t.amsSortableInitCallback||t.amsInit,document,a,o)||o,r={veto:!1};if(a.trigger("before-init.ams.sortable",[a,o,r]),r.veto)return;var r=a.sortable(o);a.disableSelection(),MyAMS.core.executeFunctionByName(t.amsSortableAfterInitCallback||t.amsAfterInit,document,a,r,o),a.trigger("after-init.ams.sortable",[a,r])}a.hasClass("resizable")&&(o={autoHide:!1===t.amsResizableAutohide||t.amsResizableAutohide,containment:t.amsResizableContainment,grid:t.amsResizableGrid,handles:t.amsResizableHandles,start:MyAMS.core.getFunctionByName(t.amsResizableStart),resize:MyAMS.core.getFunctionByName(t.amsResizableResize),stop:MyAMS.core.getFunctionByName(t.amsResizableStop)},r=g.extend({},o,t.amsResizableOptions||t.amsOptions),r=MyAMS.core.executeFunctionByName(t.amsResizableInitCallback||t.amsInit,document,a,r)||r,o={veto:!1},a.trigger("before-init.ams.resizable",[a,r,o]),o.veto||(o=a.resizable(r),a.disableSelection(),MyAMS.core.executeFunctionByName(t.amsResizableAfterInitCallback||t.amsAfterInit,document,a,o,r),a.trigger("after-init.ams.resizable",[a,o])))})})},t).then(function(){e(a)}):e(null)})}function i(n){return new Promise(function(e,t){var a=g(".editor textarea",n);0<a.length?MyAMS.require("ajax").then(function(){MyAMS.ajax.check(window.ace,"".concat(MyAMS.env.baseURL,"../ext/ace/ace").concat(MyAMS.env.extext,".js")).then(function(e){var i=window.ace,t=[];e&&(i.config.set("basePath","".concat(MyAMS.env.baseURL,"../ext/ace")),t.push(MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/ace/ext-modelist").concat(MyAMS.env.extext,".js")))),g.when.apply(g,t).then(function(){a.each(function(e,t){var s=g(t),r=s.parents(".editor"),o=s.data(),t=i.require("ace/ext/modelist"),c=o.amsEditorMode||o.amsMode||t.getModeForPath(o.amsEditorFilename||o.amsFilename||"text.txt").mode;setTimeout(function(){var e=g("<div>",{position:"absolute",width:s.width(),height:s.height(),class:s.attr("class")}).insertBefore(s);s.css("display","none");var t,a={mode:c,fontSize:11,tabSize:4,useSoftTabs:!1,showGutter:!0,showLineNumbers:!0,printMargin:132,showInvisibles:!0},n=g.extend({},a,o.amsEditorOptions||o.amsOptions),n=MyAMS.core.executeFunctionByName(o.amsEditorInitCallback||o.amsInit,document,s,n)||n,a={veto:!1};s.trigger("before-init.ams.editor",[s,n,a]),a.veto||((t=i.edit(e[0])).setOptions(n),t.session.setValue(s.val()),t.session.on("change",function(){s.val(t.session.getValue())}),r.data("editor",t),MyAMS.core.executeFunctionByName(o.amsEditorAfterEditCallback||o.amsAfterInit,document,s,t,n),s.trigger("after-init.ams.editor",[s,t]))},200)})})})},t).then(function(){e(a)}):e(null)})}function l(n){return new Promise(function(e,t){var a=g(".custom-file-input",n);0<a.length?MyAMS.require("ajax").then(function(){MyAMS.ajax.check(window.bsCustomFileInput,"".concat(MyAMS.env.baseURL,"../ext/bs-custom-file-input").concat(MyAMS.env.extext,".js")).then(function(){a.each(function(e,t){var a=g(t),n=a.attr("id"),s=n?"#".concat(n):a.attr("name"),n=g(t.form),t=n.attr("id"),t=t?"#".concat(t):n.attr("name"),n={veto:!1};a.trigger("before-init.ams.fileinput",[a,n]),n.veto||(bsCustomFileInput.init(s,t),a.trigger("after-init.ams.fileinput",[a]))})},t).then(function(){e(a)})},t):e(null)})}function m(e){return new Promise(function(a,n){var s=g(".imgareaselect",e);0<s.length?MyAMS.require("ajax").then(function(){MyAMS.ajax.check(g.fn.imgAreaSelect,"".concat(MyAMS.env.baseURL,"../ext/jquery-imgareaselect").concat(MyAMS.env.extext,".js")).then(function(e){var t=[];e&&t.push(MyAMS.core.getCSS("".concat(MyAMS.env.baseURL,"../../css/ext/imgareaselect-animated").concat(MyAMS.env.extext,".css"),"imgareaselect")),g.when.apply(g,t).then(function(){s.each(function(e,t){var n,s,a,r=g(t);r.data("imgAreaSelect")||(t=(n=r.data()).amsImgareaselectParent||n.amsParent,t={instance:!0,handles:!0,parent:s=t?r.parents(t):"body",x1:n.amsImgareaselectX1||n.amsX1||0,y1:n.amsImgareaselectY1||n.amsY1||0,x2:n.amsImgareaselectX2||n.amsX2||n.amsImgareaselectImageWidth||n.amsImageWidth,y2:n.amsImgareaselectY2||n.amsY2||n.amsImgareaselectImageHeight||n.amsImageHeight,imageWidth:n.amsImgareaselectImageWidth||n.amsImageWidth,imageHeight:n.amsImgareaselectImageHeight||n.amsImageHeight,imgWidth:n.amsImgareaselectThumbWidth||n.amsThumbWidth,imgHeight:n.amsImgareaselectThumbHeight||n.amsThumbHeight,minWidth:128,minHeight:128,aspectRatio:n.amsImgareaselectAspectRatio||n.amsAspectRatio,onSelectEnd:MyAMS.core.getFunctionByName(n.amsImgareaselectSelectEnd||n.amsSelectedEnd)||function(e,t){var a=n.amsImgareaselectTargetField||n.amsTargetField||"image_";g('input[name="'.concat(a,'x1"]'),s).val(t.x1),g('input[name="'.concat(a,'y1"]'),s).val(t.y1),g('input[name="'.concat(a,'x2"]'),s).val(t.x2),g('input[name="'.concat(a,'y2"]'),s).val(t.y2)}},a=g.extend({},t,n.amsImgareaselectOptions||n.amsOptions),a=MyAMS.core.executeFunctionByName(n.amsImgareaselectInitCallback||n.amsInit,document,r,a)||a,t={veto:!1},r.trigger("before-init.ams.imgareaselect",[r,a,t]),t.veto||setTimeout(function(){var e=r.imgAreaSelect(a);r.trigger("after-init.ams.imgareaselect",[r,e])},200))})},n).then(function(){a(s)})},n)},n):a(null)})}var u={select2UpdateHiddenField:function(a){var n=[];a.parent().find("ul.select2-selection__rendered").children("li[title]").each(function(e,t){n.push(a.children('option[data-content="'.concat(t.title,'"]')).attr("value"))}),a.data("select2-target").val(n.join(a.data("ams-select2-separator")||","))},select2AjaxParamsHelper:function(e,t){return Object.assign({},e,t)}};function d(e){return new Promise(function(a,n){var s=g(".select2",e);0<s.length?MyAMS.require("ajax","helpers").then(function(){MyAMS.ajax.check(g.fn.select2,"".concat(MyAMS.env.baseURL,"../ext/select2/select2").concat(MyAMS.env.extext,".js")).then(function(e){var t=[];e&&t.push(MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/select2/i18n/").concat(MyAMS.i18n.language,".js"))),g.when.apply(g,t).then(function(){s.each(function(e,t){var a,n,s,r,o=g(t),c=o.data();c.select2||(t={theme:c.amsSelect2Theme||c.amsTheme||"bootstrap4",language:c.amsSelect2Language||c.amsLanguage||MyAMS.i18n.language,escapeMarkup:MyAMS.core.getFunctionByName(c.amsSelect2EscapeMarkup||c.amsEscapeMarkup),matcher:MyAMS.core.getFunctionByName(c.amsSelect2Matcher||c.amsMatcher),sorter:MyAMS.core.getFunctionByName(c.amsSelect2Sorter||c.amsSorter),templateResult:MyAMS.core.getFunctionByName(c.amsSelect2TemplateResult||c.amsTemplateResult),templateSelection:MyAMS.core.getFunctionByName(c.amsSelect2TemplateSelection||c.amsTemplateSelection),tokenizer:MyAMS.core.getFunctionByName(c.amsSelect2Tokenizer||c.amsTokenizer)},(c.amsSelect2AjaxUrl||c.amsAjaxUrl||c["ajax-Url"])&&("function"==typeof(n=MyAMS.core.getFunctionByName(c.amsSelect2AjaxParams||c.amsAjaxParams||c["ajax-Params"])||c.amsSelect2AjaxParams||c.amsAjaxParams||c["ajax-Params"])?a=n:n&&(a=function(e){return u.select2AjaxParamsHelper(e,n)}),t.ajax={url:MyAMS.core.getFunctionByName(c.amsSelect2AjaxUrl||c.amsAjaxUrl)||c.amsSelect2AjaxUrl||c.amsAjaxUrl,data:a||MyAMS.core.getFunctionByName(c.amsSelect2AjaxData||c.amsAjaxData)||c.amsSelect2AjaxData||c.amsAjaxData,processResults:MyAMS.core.getFunctionByName(c.amsSelect2AjaxProcessResults||c.amsAjaxProcessResults)||c.amsSelect2AjaxProcessResults||c.amsAjaxProcessResults,transport:MyAMS.core.getFunctionByName(c.amsSelect2AjaxTransport||c.amsAjaxTransport)||c.amsSelect2AjaxTransport||c.amsAjaxTransport},t.minimumInputLength=c.amsSelect2MinimumInputLength||c.amsMinimumInputLength||c.minimumInputLength||1),o.hasClass("sortable")&&((s=g('<input type="hidden" name="'.concat(o.attr("name"),'">')).insertAfter(o)).val(g("option:selected",o).listattr("value").join(c.amsSelect2Separator||",")),o.data("select2-target",s).removeAttr("name"),t.templateSelection=function(e){var t=g(e.element);return t.attr("data-content",t.html()),e.text}),s=g.extend({},t,c.amsSelect2Options||c.amsOptions),s=MyAMS.core.executeFunctionByName(c.amsSelect2InitCallback||c.amsInit,document,o,s)||s,t={veto:!1},o.trigger("before-init.ams.select2",[o,s,t]),t.veto||(r=o.select2(s),o.on("select2:opening select2:selecting select2:unselecting select2:clearing",function(e){if(g(e.target).is(":disabled"))return!1}),o.on("select2:opening",function(e){e=g(e.currentTarget).parents(".modal").first();e.exists()&&(e=parseInt(e.css("z-index")),r.data("select2").$dropdown.css("z-index",e+1))}),o.hasClass("sortable")&&MyAMS.ajax.check(g.fn.sortable,"".concat(MyAMS.env.baseURL,"../ext/jquery-ui").concat(MyAMS.env.extext,".js")).then(function(){o.parent().find("ul.select2-selection__rendered").sortable({containment:"parent",update:function(){u.select2UpdateHiddenField(o)}}),o.on("select2:select select2:unselect",function(e){var t=e.params.data.id,e=g(e.currentTarget),t=e.children('option[value="'.concat(t,'"]'));MyAMS.helpers.moveElementToParentEnd(t),e.trigger("change"),u.select2UpdateHiddenField(e)})}),MyAMS.core.executeFunctionByName(c.amsSelect2AfterInitCallback||c.amsAfterInit,document,o,r,s),o.trigger("after-init.ams.select2",[o,r])))})},n).then(function(){a(s)})},n)},n):a(null)})}function M(a){return new Promise(function(e){var t=g(".svg-container",a);0<t.length?(t.each(function(e,t){var a=g(t),n=g("svg",a),s=n.attr("width"),a=n.attr("height");s&&a&&t.setAttribute("viewBox","0 0 ".concat(Math.round(parseFloat(s))," ").concat(Math.round(parseFloat(a)))),n.attr("width","100%").attr("height","auto")}),e(t)):e(null)})}function p(a){return new Promise(function(e){var t=g("legend.switcher",a);0<t.length?(t.each(function(e,t){var a=g(t),n=a.parent("fieldset"),s=a.data(),r=s.amsSwitcherState||s.amsState,o=s.amsSwitcherMinusClass||s.amsMinusClass||"minus",c=s.amsSwitcherPlusClass||s.amsPlusClass||"plus";s.amsSwitcher||(t={veto:!1},a.trigger("before-init.ams.switcher",[a,s,t]),t.veto||(g('<i class="fa fa-'.concat("open"===r?o:c,' mr-2"></i>')).prependTo(a),a.on("click",function(e){e.preventDefault();e={};a.trigger("before-switch.ams.switcher",[a,e]),e.veto||(n.hasClass("switched")?(n.removeClass("switched"),MyAMS.core.switchIcon(g("i",a),c,o),a.trigger("opened.ams.switcher",[a]),(e=a.attr("id"))&&g('legend.switcher[data-ams-switcher-sync="'.concat(e,'"]'),n).each(function(e,t){t=g(t);t.parents("fieldset").hasClass("switched")&&t.click()})):(n.addClass("switched"),MyAMS.core.switchIcon(g("i",a),o,c),a.trigger("closed.ams.switcher",[a])))}),"open"!==r&&n.addClass("switched"),a.trigger("after-init.ams.switcher",[a]),a.data("ams-switcher",!0)))}),e(t)):e(null)})}function S(e){return new Promise(function(a,n){var s=g(".tinymce",e);0<s.length?MyAMS.require("ajax","i18n").then(function(){var i="".concat(MyAMS.env.baseURL,"../ext/tinymce").concat(MyAMS.env.devmode?"/dev":"");MyAMS.ajax.check(window.tinymce,"".concat(i,"/tinymce").concat(MyAMS.env.extext,".js")).then(function(e){var t=[];e&&(S.baseURL=i,S.suffix=MyAMS.env.extext,t.push(MyAMS.core.getScript("".concat(i,"/jquery.tinymce.min.js"))),t.push(MyAMS.core.getScript("".concat(i,"/themes/silver/theme").concat(MyAMS.env.extext,".js"))),g(document).on("focusin",function(e){g(e.target).closest(".tox-tinymce, .tox-tinymce-aux, .moxman-window, .tam-assetmanager-root").length&&e.stopImmediatePropagation()})),g.when.apply(g,t).then(function(){s.each(function(e,t){var a=g(t),n=a.data(),s={base_url:i,theme:n.amsTinymceTheme||n.amsTheme||"silver",language:MyAMS.i18n.language,menubar:!1!==n.amsTinymceMenubar&&!1!==n.amsMenubar,statusbar:!1!==n.amsTinymceStatusbar&&!1!==n.amsStatusbar,plugins:n.amsTinymcePlugins||n.amsPlugins||["advlist autosave autolink lists link charmap print preview hr anchor pagebreak","searchreplace wordcount visualblocks visualchars code fullscreen","insertdatetime nonbreaking save table contextmenu directionality","emoticons paste textcolor colorpicker textpattern autoresize"],toolbar:n.amsTinymceToolbar||n.amsToolbar,toolbar1:!1!==n.amsTinymceToolbar1&&!1!==n.amsToolbar1&&(n.amsTinymceToolbar1||n.amsToolbar1||"undo redo | pastetext | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent"),toolbar2:!1!==n.amsTinymceToolbar2&&!1!==n.amsToolbar2&&(n.amsTinymceToolbar2||n.amsToolbar2||"forecolor backcolor emoticons | charmap link image media | fullscreen preview print | code"),content_css:n.amsTinymceContentCss||n.amsContentCss,formats:n.amsTinymceFormats||n.amsFormats,style_formats:n.amsTinymceStyleFormats||n.amsStyleFormats,block_formats:n.amsTinymceBlockFormats||n.amsBlockFormats,valid_classes:n.amsTinymceValidClasses||n.amsValidClasses,image_advtab:!0,image_list:MyAMS.core.getFunctionByName(n.amsTinymceImageList||n.amsImageList)||n.amsTinymceImageList||n.amsImageList,image_class_list:n.amsTinymceImageClassList||n.amsImageClassList,link_list:MyAMS.core.getFunctionByName(n.amsTinymceLinkList||n.amsLinkList)||n.amsTinymceLinkList||n.amsLinkList,link_class_list:n.amsTinymceLinkClassList||n.amsLinkClassList,paste_as_text:void 0===n.amsTinymcePasteAsText&&void 0===n.amsPasteAsText||(n.amsTinymcePasteAsText||n.amsPasteAsText),paste_auto_cleanup_on_paste:void 0===n.amsTinymcePasteAutoCleanup&&void 0===n.amsPasteAutoCleanup||(n.amsTinymcePasteAutoCleanup||n.amsPasteAutoCleanup),paste_strip_class_attributes:n.amsTinymcePasteStripClassAttributes||n.amsPasteStripClassAttributes||"all",paste_remove_spans:void 0===n.amsTinymcePasteRemoveSpans&&void 0===n.amsPasteRemoveSpans||(n.amsTinymcePasteRemoveSpans||n.amsPasteRemoveSpans),paste_remove_styles:void 0===n.amsTinymcePasteRemoveStyles||void 0===n.amsPasteRemoveStyles||(n.amsTinymcePasteRemoveStyles||n.amsPasteRemoveStyles),height:n.amsTinymceHeight||n.amsHeight||50,min_height:50,resize:!0,autoresize_min_height:50,autoresize_max_height:500,init_instance_callback:function(e){function t(){e.remove("#".concat(e.id)),g(document).off("cleared.ams.content",t)}g(document).on("cleared.ams.content",t)}},t=n.amsTinymceExternalPlugins||n.amsExternalPlugins;if(t){var r=y(t.split(/\s+/));try{for(r.s();!(c=r.n()).done;){var o=c.value,c=a.data("ams-tinymce-plugin-".concat(o))||a.data("ams-plugin-".concat(o));S.PluginManager.load(o,MyAMS.core.getSource(c))}}catch(e){r.e(e)}finally{r.f()}}t=g.extend({},s,n.amsTinymceOptions||n.amsOptions),t=MyAMS.core.executeFunctionByName(n.amsTinymceInitCallback||n.amsInit,document,a,t)||t,s={veto:!1};a.trigger("before-init.ams.tinymce",[a,t,s]),s.veto||(s=a.tinymce(t),MyAMS.core.executeFunctionByName(n.amsTinymceAfterInitCallback||n.amsAfterInit,document,a,s,t),a.trigger("after-init.ams.tinymce",[a,t]))})},n).then(function(){a(s)})},n)},n):a(null)})}function v(n){return new Promise(function(e,t){var a=g("form:not([novalidate])",n);0<a.length&&MyAMS.require("ajax","i18n").then(function(){MyAMS.ajax.check(g.fn.validate,"".concat(MyAMS.env.baseURL,"../ext/validate/jquery-validate").concat(MyAMS.env.extext,".js")).then(function(e){e&&"en"!==MyAMS.i18n.language&&MyAMS.core.getScript("".concat(MyAMS.env.baseURL,"../ext/validate/i18n/messages_").concat(MyAMS.i18n.language).concat(MyAMS.env.extext,".js")).then(function(){}),a.each(function(e,t){var r=g(t),a=r.data(),n={ignore:null,invalidHandler:MyAMS.core.getFunctionByName(a.amsValidateInvalidHandler)||function(e,t){g("span.is-invalid",r).remove(),g(".is-invalid",r).removeClass("is-invalid");var a=y(t.errorList);try{for(a.s();!(s=a.n()).done;){var n=s.value,s=g(n.element),n=s.parents(".tab-pane");s.parents("fieldset.switched").each(function(e,t){g("legend.switcher",t).click()}),n.each(function(e,t){var a=g(t),t=a.parents(".tab-content").siblings(".nav-tabs");g("li:nth-child(".concat(a.index()+1,")"),t).addClass("is-invalid"),g("li.is-invalid:first a",t).click()})}}catch(e){a.e(e)}finally{a.f()}},errorElement:a.amsValidateErrorElement||"span",errorClass:a.amsValidateErrorClass||"is-invalid",errorPlacement:MyAMS.core.getFunctionByName(a.amsValidateErrorPlacement)||function(e,t){e.addClass("invalid-feedback"),t.closest(".form-widget").append(e)},submitHandler:MyAMS.core.getFunctionByName(a.amsValidateSubmitHandler)||(void 0!==r.attr("data-async")?function(){MyAMS.require("form").then(function(){MyAMS.form.submit(r)})}:function(){r.get(0).submit()})};g("[data-ams-validate-rules]",r).each(function(e,t){0===e&&(n.rules={}),n.rules[g(t).attr("name")]=g(t).data("ams-validate-rules")}),g("[data-ams-validate-messages]",r).each(function(e,t){0===e&&(n.messages={}),n.messages[g(t).attr("name")]=g(t).data("ams-validate-messages")});var s=g.extend({},n,a.amsValidateOptions||a.amsOptions),s=MyAMS.core.executeFunctionByName(a.amsValidateInitCallback||a.amsInit,document,r,s)||s,t={veto:!1};r.trigger("before-init.ams.validate",[r,s,t]),t.veto||(t=r.validate(s),MyAMS.core.executeFunctionByName(a.amsValidateAfterInitCallback||a.amsAfterInit,document,r,t,s),r.trigger("after-init.ams.validate",[r,t]))})},t).then(function(){e(a)})},t)})}window.MyAMS&&(MyAMS.registry.register(t,"checker"),MyAMS.registry.register(a,"contextMenu"),MyAMS.registry.register(s,"datatables"),MyAMS.registry.register(r,"datetime"),MyAMS.registry.register(o,"dragdrop"),MyAMS.registry.register(i,"editor"),MyAMS.registry.register(l,"fileInput"),MyAMS.registry.register(m,"imgAreaSelect"),MyAMS.registry.register(d,"select2"),MyAMS.registry.register(M,"svg"),MyAMS.registry.register(p,"switcher"),MyAMS.registry.register(S,"tinymce"),MyAMS.registry.register(v,"validate"),MyAMS.config.modules.push("plugins"),MyAMS.env.bundle||console.debug("MyAMS: plugins module loaded..."))});