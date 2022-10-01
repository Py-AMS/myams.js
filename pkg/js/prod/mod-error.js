!function(e,t){if("function"==typeof define&&define.amd)define(["exports","jsrender"],t);else if("undefined"!=typeof exports)t(exports,require("jsrender"));else{var r={exports:{}};t(r.exports,e.jsrender),e.modError=r.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.error=void 0;const r=MyAMS.$,s=r.templates({markup:'\n\t<div class="alert alert-{{:status}}" role="alert">\n\t\t<button type="button" class="close" data-dismiss="alert" \n\t\t\t\taria-label="{{*: MyAMS.i18n.BTN_CLODE }}">\n\t\t\t<i class="fa fa-times" aria-hidden="true"></i>\t\n\t\t</button>\n\t\t{{if header}}\n\t\t<h5 class="alert-heading">{{:header}}</h5>\n\t\t{{/if}}\n\t\t{{if message}}\n\t\t<p>{{:message}}</p>\n\t\t{{/if}}\n\t\t{{if messages}}\n\t\t<ul>\n\t\t{{for messages}}\n\t\t\t<li>\n\t\t\t\t{{if header}}<strong>{{:header}} :</strong>{{/if}}\n\t\t\t\t{{:message}}\n\t\t\t</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{/if}}\n\t\t{{if widgets}}\n\t\t<ul>\n\t\t{{for widgets}}\n\t\t\t<li>\n\t\t\t\t{{if header}}<strong>{{:header}} :</strong>{{/if}}\n\t\t\t\t{{:message}}\n\t\t\t</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{/if}}\n\t</div>',allowCode:!0}),n={showErrors:(e,t)=>new Promise(((n,a)=>{"string"==typeof t?MyAMS.require("i18n","alert").then((()=>{MyAMS.alert.alert({parent:e,status:"danger",header:MyAMS.i18n.ERROR_OCCURED,message:t})})).then(n,a):r.isArray(t)?MyAMS.require("i18n","alert").then((()=>{MyAMS.alert.alert({parent:e,status:"danger",header:MyAMS.i18n.ERRORS_OCCURED,message:t})})).then(n,a):MyAMS.require("i18n","ajax","alert","form").then((()=>{MyAMS.form.clearAlerts(e);const n=[];for(const e of t.messages||[])"string"==typeof e?n.push({header:null,message:e}):n.push(e);for(const e of t.widgets||[])n.push({header:e.label,message:e.message});const a={status:"danger",header:t.header||(n.length>1?MyAMS.i18n.ERRORS_OCCURED:MyAMS.i18n.ERROR_OCCURED),message:t.error||null,messages:n};r(s.render(a)).prependTo(e);for(const s of t.widgets||[]){let t;t=s.id?r(`#${s.id}`,e):r(`[name="${s.name}"]`,e),t.exists()&&MyAMS.form.setInvalid(e,t,s.message)}MyAMS.require("helpers").then((()=>{let t=e.parents(".modal-body");t.exists()||(t=r("#main")),MyAMS.helpers.scrollTo(t,e,{offset:-15})}))})).then(n,a)})),showHTTPError:e=>new Promise(((t,r)=>{MyAMS.require("alert").then((()=>{MyAMS.alert.messageBox({status:"error",title:e.title,message:e.message,hideTimestamp:!1,timeout:0})})).then(t,r)}))};e.error=n,window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("error"):(MyAMS.error=n,console.debug("MyAMS: error module loaded...")))}));