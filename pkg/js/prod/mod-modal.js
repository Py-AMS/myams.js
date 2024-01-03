!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var a={exports:{}};t(a.exports),e.modModal=a.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.dynamicModalHiddenEventHandler=l,e.dynamicModalShowEventHandler=d,e.dynamicModalShownEventHandler=s,e.modal=void 0,e.modalDismissEventHandler=r,e.modalHiddenEventHandler=i,e.modalShownEventHandler=n,e.modalToggleEventHandler=o;const t=MyAMS.$;let a=!1;function o(e){return new Promise(((a,o)=>{const n=t(e.currentTarget),d=n.data("ams-disabled-handlers");n.attr("disabled")||n.hasClass("disabled")||!0===d||"click"===d||"all"===d?a(!1):!0!==n.data("ams-context-menu")?(!0===n.data("ams-stop-propagation")&&e.stopPropagation(),e.preventDefault(),n.tooltip("hide"),MyAMS.modal.open(n).then((()=>{a(!0)}),o)):a(!1)}))}function n(e){const a=t(e.target),o=1100+100*t(".modal:visible").length;a.css("z-index",o),setTimeout((()=>{t(".modal-backdrop").not(".modal-stack").first().css("z-index",o-10).addClass("modal-stack")}),0),t(a).off("click",'[data-dismiss="modal"]').on("click",'[data-dismiss="modal"]',(e=>{const a=t(e.currentTarget).data("ams-dismiss-handler")||r;return MyAMS.core.executeFunctionByName(a,document,e)}))}function d(e){const a=t(e.target);return MyAMS.core.executeFunctionByName(a.data("ams-init-content")||MyAMS.config.initContent,document,a)}function s(e){return new Promise(((a,o)=>{MyAMS.require("form").then((()=>{const o=t(e.target);MyAMS.form.setFocus(o),a(o)}),o)}))}function r(e){return new Promise(((a,o)=>{const n=t(e.currentTarget).parents(".modal").first();n.data("modal-result",t(e.currentTarget).data("modal-dismiss-value")),MyAMS.form?MyAMS.form.confirmChangedForm(n).then((e=>{"success"===e&&n.modal("hide")})).then(a,o):(n.modal("hide"),a())}))}function i(){t(".modal:visible").length>0&&(t.fn.modal.Constructor.prototype._checkScrollbar(),t.fn.modal.Constructor.prototype._setScrollbar(),t("body").addClass("modal-open"))}function l(e){const a=t(e.target);MyAMS.core.executeFunctionByName(a.data("ams-clear-content")||MyAMS.config.clearContent,document,a).then((()=>{!0===a.data("dynamic")&&(a.remove(),MyAMS.form&&MyAMS.form.setFocus(t(".modal-dialog").last()))}))}const c=e.modal={init:()=>{a||(a=!0,MyAMS.config.ajaxNav&&t(document).off("click",'[data-toggle="modal"]').on("click",'[data-toggle="modal"]',(e=>{if(t(e.currentTarget).data("is-dragging"))return;e.stopPropagation();const a=t(e.currentTarget).data("ams-modal-handler")||o;MyAMS.core.executeFunctionByName(a,document,e)})),t(document).on("shown.bs.modal",".modal",(e=>{const a=t(e.currentTarget).data("ams-shown-handler")||n;MyAMS.core.executeFunctionByName(a,document,e)})),t(document).on("hidden.bs.modal",".modal",(e=>{const a=t(e.currentTarget).data("ams-hidden-handler")||i;MyAMS.core.executeFunctionByName(a,document,e)})))},open:(e,a)=>new Promise(((o,n)=>{let r={},i=e;"string"!=typeof e&&(r=e.data(),i=e.attr("href")||r.amsUrl);const c=MyAMS.core.getFunctionByName(i);"function"==typeof c&&(i=c(e)),i||n("No provided URL!"),i.startsWith("#")?(t(i).modal("show"),o()):t.ajax({type:"get",url:i,cache:void 0!==r.amsAllowCache&&r.amsAllowCache,data:a}).then(((a,n,c)=>{let m=null;MyAMS.require("ajax").then((()=>{const a=MyAMS.ajax.getResponse(c),o=a.contentType,n=a.data;let u,M,y,f,g;switch(o){case"json":MyAMS.ajax.handleJSON(n,t(t(e).data("ams-json-target")||"#content"));break;case"script":case"xml":break;default:u=t(n),M=t(".modal-dialog",u.wrap("<div></div>").parent()),y=M.data()||{},f={backdrop:void 0===y.backdrop?"static":y.backdrop,keyboard:void 0===y.keyboard||y.keyboard},g=t.extend({},f,y.amsOptions),g=MyAMS.core.executeFunctionByName(y.amsInit,M,g)||g,m=t("<div>").addClass("modal fade").attr("tabIndex","-1").data("dynamic",!0).append(u).on("show.bs.modal",d).on("shown.bs.modal",s).on("hidden.bs.modal",l).modal(g),MyAMS.stats&&!1!==r.amsLogEvent&&!1!==y.amsLogEvent&&MyAMS.stats.logPageview(i)}})).then((()=>{o(m)}))}))})),fitWidthToImage:(e,a)=>{setTimeout((()=>{const o=e.currentTarget,n=a?t(a["resize-target"]):o;if(n.exists()){const e=n.parents(".modal-dialog"),a=e.width()-n.width();e.css("max-width",Math.min(t(window).width(),n.get(0).naturalWidth+a))}}),150)},close:e=>{"string"==typeof e?e=t(e):void 0===e&&(e=t(".modal-dialog:last"));const a=e.objectOrParentWithClass("modal");a.length>0&&a.modal("hide")}};MyAMS.env.bundle?MyAMS.config.modules.push("modal"):(MyAMS.modal=c,console.debug("MyAMS: modal module loaded..."))}));