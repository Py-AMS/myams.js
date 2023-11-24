!function(e,t){if("function"==typeof define&&define.amd)define(["exports","jsrender"],t);else if("undefined"!=typeof exports)t(exports,require("jsrender"));else{var s={exports:{}};t(s.exports,e.jsrender),e.modError=s.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.error=void 0;const s=MyAMS.$,r=s.templates({markup:'\n\t<div class="alert alert-{{:status}}" role="alert">\n\t\t<button type="button" class="close" data-dismiss="alert" \n\t\t\t\taria-label="{{*: MyAMS.i18n.BTN_CLOSE }}">\n\t\t\t<i class="fa fa-times" aria-hidden="true"></i>\t\n\t\t</button>\n\t\t{{if header}}\n\t\t<h5 class="alert-heading">{{:header}}</h5>\n\t\t{{/if}}\n\t\t{{if message}}\n\t\t<p>{{:message}}</p>\n\t\t{{/if}}\n\t\t{{if messages}}\n\t\t<ul>\n\t\t{{for messages}}\n\t\t\t<li>\n\t\t\t\t{{if header}}<strong>{{:header}} :</strong>{{/if}}\n\t\t\t\t{{:message}}\n\t\t\t</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{/if}}\n\t\t{{if widgets}}\n\t\t<ul>\n\t\t{{for widgets}}\n\t\t\t<li>\n\t\t\t\t{{if header}}<strong>{{:header}} :</strong>{{/if}}\n\t\t\t\t{{:message}}\n\t\t\t</li>\n\t\t{{/for}}\n\t\t</ul>\n\t\t{{/if}}\n\t</div>',allowCode:!0}),n=e.error={showErrors:(e,t)=>new Promise(((n,a)=>{"string"==typeof t?MyAMS.require("i18n","alert").then((()=>{MyAMS.alert.alert({parent:e,status:"danger",header:MyAMS.i18n.ERROR_OCCURED,message:t})})).then(n,a):s.isArray(t)?MyAMS.require("i18n","alert").then((()=>{MyAMS.alert.alert({parent:e,status:"danger",header:MyAMS.i18n.ERRORS_OCCURED,message:t})})).then(n,a):MyAMS.require("i18n","ajax","alert","form").then((()=>{MyAMS.form.clearAlerts(e);const n=[];for(const e of t.messages||[])"string"==typeof e?n.push({header:null,message:e}):n.push(e);for(const e of t.widgets||[])n.push({header:e.label,message:e.message});const a={status:"danger",header:t.header||(n.length>1?MyAMS.i18n.ERRORS_OCCURED:MyAMS.i18n.ERROR_OCCURED),message:t.error||null,messages:n};s(r.render(a)).prependTo(e);for(const r of t.widgets||[]){let t;t=r.id?s(`#${r.id}`,e):s(`[name="${r.name}"]`,e),t.exists()&&MyAMS.form.setInvalid(e,t,r.message);t.parents("fieldset.switched").each(((e,t)=>{s("legend.switcher",t).click()}));t.parents(".tab-pane").each(((e,t)=>{const r=s(t),n=r.parents(".tab-content").siblings(".nav-tabs");s(`li:nth-child(${r.index()+1})`,n).addClass("is-invalid"),s("li.is-invalid:first a",n).click()}))}MyAMS.require("helpers").then((()=>{let t=e.parents(".modal-body");t.exists()||(t=s("#main")),MyAMS.helpers.scrollTo(t,e,{offset:-15})}))})).then(n,a)})),showHTTPError:e=>new Promise(((t,s)=>{MyAMS.require("alert").then((()=>{MyAMS.alert.messageBox({status:"error",title:e.title,message:e.message,hideTimestamp:!1,timeout:0})})).then(t,s)}))};window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("error"):(MyAMS.error=n,console.debug("MyAMS: error module loaded...")))}));