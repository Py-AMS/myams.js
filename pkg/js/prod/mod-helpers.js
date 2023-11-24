!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.modHelpers=n.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.helpers=void 0;const t=MyAMS.$,n=e.helpers={clearValue:e=>{const n=t(e.currentTarget).data("target");n&&t(n).val(null)},clearDatetimeValue:e=>{const n=t(e.currentTarget).data("target"),o=t(n).data("datetimepicker");o&&o.date(null)},scrollTo:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"#content",n=arguments.length>1?arguments[1]:void 0,{...o}=arguments.length>2?arguments[2]:void 0;"string"==typeof n&&(n=t(n)),n.exists()&&MyAMS.require("ajax").then((()=>{MyAMS.ajax.check(t.fn.scrollTo,`${MyAMS.env.baseURL}../ext/jquery-scrollto${MyAMS.env.extext}.js`).then((()=>{t(e).scrollTo(n,o)}))}))},setLoginHash:()=>{const e=t("#login_form");t('input[name="login_form.widgets.hash"]',e).val(window.location.hash)},setSEOStatus:e=>{const n=t(e.target),o=n.siblings(".progress").children(".progress-bar"),a=Math.min(n.val().length,100);let r="success";a<20||a>80?r="danger":(a<40||a>66)&&(r="warning"),o.removeClassPrefix("bg-").addClass("bg-"+r).css("width",a+"%")},select2ChangeHelper:e=>new Promise(((n,o)=>{const a=t(e.currentTarget),r=a.data(),l=t(r.amsSelect2HelperTarget),i={};let s;if("html"===r.amsSelect2HelperType)l.html('<div class="text-center"><i class="fas fa-2x fa-spinner fa-spin"></i></div>'),i[r.amsSelect2HelperArgument||"value"]=a.val(),t.get(r.amsSelect2HelperUrl,i).then((e=>{s=MyAMS.core.getFunctionByName(r.amsSelect2HelperCallback)||(e=>{e?(l.html(e),MyAMS.core.initContent(l).then((()=>{n()}))):(l.empty(),n())}),s(e)})).catch((()=>{l.empty(),o()}));else s=r.amsSelect2HelperCallback,s&&(MyAMS.core.executeFunctionByName(s,a,r),n())})),refreshElement:(e,n)=>new Promise(((e,o)=>{let a=t(`[id="${n.object_id}"]`);MyAMS.core.executeFunctionByName(MyAMS.config.clearContent,document,a).then((()=>{a.replaceWith(t(n.content)),a=t(`[id="${n.object_id}"]`);const r=a.parents().first();MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,r).then((()=>{e(a)}),o)}),o)})),refreshWidget:(e,n)=>new Promise(((e,o)=>{let a=t(`[id="${n.widget_id}"]`),r=a.parents(".widget-group");MyAMS.core.executeFunctionByName(MyAMS.config.clearContent,document,r).then((()=>{r.replaceWith(t(n.content)),a=t(`[id="${n.widget_id}"]`),r=a.parents(".widget-group"),MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,r).then((()=>{e(a)}),o)}),o)})),addTableRow:(e,n)=>new Promise(((e,o)=>{const a=`table[id="${n.table_id}"]`,r=t(a),l=r.DataTable();let i;n.data?(l.rows.add(n.data).draw(),i=t(`tr[id="${n.row_id}"]`,r),e(i)):(i=t(n.content),l.rows.add(i).draw(),MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,i).then((()=>{e(i)}),o))})),refreshTableRow:(e,n)=>new Promise(((e,o)=>{const a=`tr[id="${n.row_id}"]`,r=t(a),l=r.parents("table").first();if(n.data)if(t.fn.DataTable){const o=l.DataTable();"string"==typeof n.data?(o.row(a).remove(),o.row.add(t(n.data)).draw()):o.row(a).data(n.data).draw(),e(r)}else o("No DataTable plug-in available!");else{const a=t(n.content);r.replaceWith(a),MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,a).then((()=>{e(a)}),o)}})),refreshImage:(e,n)=>{t(`[id="${n.image_id}"]`).attr("src",n.src)},moveElementToParentEnd:e=>{const t=e.parent();return e.detach().appendTo(t)},addElementToParent:(e,n)=>{let{element:o,parent:a,...r}=n;o=t(o),a=t(a);const l=o.appendTo(a);return r.scrollTo&&MyAMS.helpers.scrollTo(r.scrollParent,o),l},hideDropdown:e=>{t(e.target).closest(".dropdown-menu").dropdown("hide")}};window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("helpers"):(MyAMS.helpers=n,console.debug("MyAMS: helpers module loaded...")))}));