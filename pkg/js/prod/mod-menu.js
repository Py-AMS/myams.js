!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var n={exports:{}};t(n.exports),e.modMenu=n.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.menu=void 0;const t=MyAMS.$;let n=!1;const o={init:()=>{n||(n=!0,t.fn.extend({contextMenu:function(e){function n(n,o){const i=t(window)[o](),r=t(e.menuSelector)[o]();let s=n;return n+r>i&&r<n&&(s-=r),s}return this.each(((o,i)=>{const r=t(i),s=t(e.menuSelector);t("a",s).each(((e,n)=>{t(n).data("ams-context-menu",!0)})),r.on("contextmenu",(function(e){if(!e.ctrlKey)return s.data("contextmenu-event-source",r).dropdown("show").css({position:"fixed",left:n(e.clientX,"width")-10,top:n(e.clientY,"height")-10}).off("click").on("click",(e=>{e.stopPropagation(),e.preventDefault(),s.dropdown("hide"),function(e){"A"!==e.get(0).tagName&&(e=e.parents("a").first());const t=e.data();if("modal"===t.toggle)MyAMS.require("modal").then((()=>{MyAMS.modal.open(e)}));else{let n=e.attr("href")||t.amsUrl;if(!n||n.startsWith("javascript:")||e.attr("target"))return;const o=MyAMS.core.getFunctionByName(n);if("function"==typeof o&&(n=o(e)),void 0===n)return;"function"==typeof n?n(e):MyAMS.require("form","skin").then((()=>{n=n.replace(/%23/,"#");const t=e.data("ams-target");t?MyAMS.form.confirmChangedForm(t).then((o=>{"success"===o&&MyAMS.skin.loadURL(n,t,e.data("ams-link-options"),e.data("ams-link-callback"))})):MyAMS.form.confirmChangedForm().then((e=>{"success"===e&&(n.startsWith("#")?n!==location.hash&&(MyAMS.dom.root.hasClass("mobile-view-activated")?(MyAMS.dom.root.removeClass("hidden-menu"),setTimeout((()=>{window.location.hash=n}),50)):window.location.hash=n):window.location=n)}))}))}}(t(e.target))})),!1})),t(document).click((()=>{s.dropdown("hide")}))}))}}),t(document).on("show.bs.dropdown",".btn-group",(e=>{const n=t(e.currentTarget),o=n.children(".dropdown-menu"),i=n.get(0).getBoundingClientRect(),r=i.top,s=i.height,d=o.outerHeight();r>d&&t(window).height()-r<s+d&&n.addClass("dropup"),t("input, select, textarea",o).first().focus()})).on("hidden.bs.dropdown",".btn-group",(e=>{t(e.currentTarget).removeClass("dropup")})),t(document).on("hide.bs.dropdown",(e=>{if(e.clickEvent){if(!1===t(e.clickEvent.target).parents(".dropdown-menu").data("ams-click-dismiss"))return e.preventDefault(),!1}})))}};e.menu=o,window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("menu"):(MyAMS.menu=o,console.debug("MyAMS: menu module loaded...")))}));