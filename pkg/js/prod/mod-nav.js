!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var a={exports:{}};t(a.exports),e.modNav=a.exports}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.NavigationMenu=void 0,e.linkClickHandler=d,e.nav=void 0;const t=MyAMS.$;class a{constructor(e){this.props=e}render(){return t('<li class="header"></li>').text(this.props.header||"")}}class n{render(){return t('<li class="divider"></li>')}}class s{constructor(e){this.items=e}render(){const e=t("<div></div>");for(const a of this.items)if(a.label){const n=t("<li></li>"),o=t("<a></a>").attr("href",a.href||"#").attr("title",a.label);for(const[e,t]of Object.entries(a.attrs||{}))o.attr(e,t);a.icon&&t('<i class="fa-lg fa-fw mr-1"></i>').addClass(a.icon).appendTo(o),t('<span class="menu-item-parent"></span>').text(a.label).appendTo(o),a.badge&&t('<span class="badge ml-1 mr-3 float-right"></span>').addClass(`bg-${a.badge.status}`).text(a.badge.value).appendTo(o),o.appendTo(n),a.items&&t("<ul></ul>").append(new s(a.items).render()).appendTo(n),n.appendTo(e)}else(new n).render().appendTo(e);return e.children()}}class o{constructor(e,t,a){this.menus=e,this.parent=t,this.settings=a}getMenus(){const e=t("<ul></ul>");for(const t of this.menus)void 0!==t.header&&e.append(new a(t).render()),e.append(new s(t.items).render());return e}render(){const e=this.getMenus();this.init(e),this.parent.append(e)}init(e){const a=this.settings;e.find("li").each(((e,n)=>{const s=t(n);if(s.find("ul").length>0){const e=s.find("a:first"),n=t(`<b class="collapse-sign">${a.closedSign}</b>`);n.on("click",(e=>{e.preventDefault()})),e.append(n),"#"===e.attr("href")&&e.click((()=>!1))}})),e.find("li.open").each(((e,n)=>{const s=t(n);t("> ul",s).slideDown(a.speed),s.find(">a b.collapse-sign").html(a.openedSign)})),e.find("li.active").each(((e,n)=>{const s=t(n).parents("ul"),o=s.parent("li");s.slideDown(a.speed),o.find("b:first").html(a.openedSign),o.addClass("open")})),e.find("li a").on("click",(n=>{const s=t(n.currentTarget);if(s.hasClass("active"))return;s.parents("li").removeClass("active");const o=s.attr("href").replace(/^#/,""),i=s.parent().find("ul");if(a.accordion){const n=s.parent().parents("ul");e.find("ul:visible").each(((e,s)=>{let r=!0;if(n.each(((e,t)=>{if(t===s)return r=!1,!1})),r&&i!==s){const e=t(s);!o&&e.hasClass("active")||e.slideUp(a.speed,(()=>{e.parent("li").removeClass("open").find("b:first").delay(a.speed).html(a.closedSign)}))}}))}const r=s.parent().find("ul:first");o||!r.is(":visible")||r.hasClass("active")?r.slideDown(a.speed,(()=>{s.parent("li").addClass("open").find("b:first").delay(a.speed).html(a.openedSign)})):r.slideUp(a.speed,(()=>{s.parent("li").removeClass("open").find("b:first").delay(a.speed).html(a.closedSign)}))}))}}e.NavigationMenu=o;let i=!1,r=null;function l(e){location&&e.startsWith("#")?e!==location.hash&&(location.hash=e):location.toString()===e?location.reload():window.location=e}function d(e){return new Promise(((a,n)=>{const s=t(e.currentTarget),o=s.data("ams-disabled-handlers");if(!0===o||"click"===o||"all"===o)return;let i,r,d,c=s.attr("href")||s.data("ams-url");if(!c||c.startsWith("javascript:")||s.attr("target")||!0===s.data("ams-context-menu"))return;e.preventDefault(),e.stopPropagation(),c.indexOf("?")>=0?(i=c.split("?"),r=i[0],d=i[1].unserialize()):(r=c,d=void 0);const f=MyAMS.core.getFunctionByName(r);if("function"==typeof f&&(c=f(s,d)),c)if("function"==typeof c)a(c(s,d));else if(c=c.replace(/%23/,"#"),e.ctrlKey)window.open&&window.open(c),a();else{const e=s.data("ams-target")||s.attr("target");e?"_blank"===e?(window.open&&window.open(c),a()):"_top"===e?(window.location=c,a()):MyAMS.form?MyAMS.form.confirmChangedForm().then((t=>{"success"===t&&MyAMS.skin&&MyAMS.skin.loadURL(c,e,s.data("ams-link-options"),s.data("ams-link-callback")).then(a,n)})):MyAMS.skin&&MyAMS.skin.loadURL(c,e,s.data("ams-link-options"),s.data("ams-link-callback")).then(a,n):MyAMS.form?MyAMS.form.confirmChangedForm().then((e=>{"success"===e&&l(c)})).then(a):(l(c),a())}else a(null)}))}const c={init:()=>{i||(i=!0,t.fn.extend({navigationMenu:function(e){if(0===this.length)return;const a=this.data(),n={accordion:!1!==a.amsMenuAccordion,speed:200};if(MyAMS.config.useSVGIcons){const e=FontAwesome.findIconDefinition({iconName:"angle-down"}),a=FontAwesome.findIconDefinition({iconName:"angle-up"});t.extend(n,{closedSign:`<em data-fa-i2svg>${FontAwesome.icon(e).html}</em>`,openedSign:`<em data-fa-i2svg>${FontAwesome.icon(a).html}</em>`})}else t.extend(n,{closedSign:'<em class="fa fa-angle-down"></em>',openedSign:'<em class="fa fa-angle-up"></em>'});const s=t.extend({},n,e),i=MyAMS.core.getObject(a.amsMenuFactory)||o;if(a.amsMenuConfig)MyAMS.require("ajax","skin").then((()=>{MyAMS.ajax.get(a.amsMenuConfig).then((e=>{new i(e,t(this),s).render(),MyAMS.skin.checkURL()}))}));else{const e=t("ul",this);new i(null,t(this),s).init(e)}}}),MyAMS.config.ajaxNav&&(t(document).on("click",'a[href="#"]',(e=>{e.preventDefault()})),t(document).on("click",'a[href!="#"]:not([data-toggle]), [data-ams-url]:not([data-toggle])',(e=>{if(!t(e).data("ams-click-handler")){if("TD"===e.target.tagName){const a=t(e.target);if(a.hasClass("dtr-control")){if(a.parents("table.datatable").hasClass("collapsed"))return}}return d(e)}})),t(document).on("click",'a[target="_blank"]',(e=>{e.preventDefault();const a=t(e.currentTarget);window.open&&window.open(a.attr("href")),MyAMS.stats&&MyAMS.stats.logEvent(a.data("ams-stats-category")||"Navigation",a.data("ams-stats-action")||"External",a.data("ams-stats-label")||a.attr("href"))})),t(document).on("click",'a[target="_top"]',(e=>{e.preventDefault(),MyAMS.form&&MyAMS.form.confirmChangedForm().then((a=>{"success"===a&&(window.location=t(e.currentTarget).attr("href"))}))})),t(document).on("click",".nav-tabs a[data-toggle=tab]",(e=>{if(t(e.currentTarget).parent("li").hasClass("disabled"))return e.stopPropagation(),e.preventDefault(),!1})),t(document).on("show.bs.tab",(e=>{let a=t(e.target);a.exists()&&"A"!==a.get(0).tagName&&(a=t("a[href]",a));const n=a.data();if(n&&n.amsUrl){if(n.amsTabLoaded)return;a.append('<i class="fa fa-spin fa-cog ml-1"></i>'),MyAMS.require("skin").then((()=>{MyAMS.skin.loadURL(n.amsUrl,a.attr("href")).then((()=>{n.amsTabLoadOnce&&(n.amsTabLoaded=!0),t("i",a).remove()}),(()=>{t("i",a).remove()}))}))}})),MyAMS.config.isMobile?(MyAMS.dom.root.addClass("mobile-detected"),MyAMS.require("ajax").then((()=>{MyAMS.config.enableFastclick&&MyAMS.ajax.check(t.fn.noClickDelay,`${MyAMS.env.baseURL}../ext/js-smartclick${MyAMS.env.extext}.js`).then((()=>{t("a",MyAMS.dom.nav).noClickDelay(),t("a","#hide-menu").noClickDelay()})),MyAMS.dom.root.exists()&&MyAMS.ajax.check(window.Hammer,`${MyAMS.env.baseURL}../ext/hammer${MyAMS.env.extext}.js`).then((()=>{r=new Hammer.Manager(MyAMS.dom.root.get(0)),r.add(new Hammer.Pan({direction:Hammer.DIRECTION_HORIZONTAL,threshold:200})),r.on("panright",(()=>{MyAMS.dom.root.hasClass("hidden-menu")||MyAMS.nav.switchMenu()})),r.on("panleft",(()=>{MyAMS.dom.root.hasClass("hidden-menu")&&MyAMS.nav.switchMenu()}))}))}))):MyAMS.dom.root.addClass("desktop-detected")),c.restoreState())},initElement:e=>{t("nav",e).navigationMenu({speed:MyAMS.config.menuSpeed})},setActiveMenu:e=>{const a=MyAMS.dom.nav;if(t(".active",a).removeClass("active"),e.addClass("open").addClass("active"),e.parents("li").addClass("open active").children("ul").addClass("active").show(),e.parents("li:first").removeClass("open"),e.parents("ul").addClass(e.attr("href").replace(/^#/,"")?"active":"").show(),e.exists()){const n=a.scrollTop(),s=t(e).parents("li:last").position();(s.top<n||s.top>a.height()+n)&&a.scrollTop(s.top)}},drawBreadcrumbs:()=>{const e=t("ol.breadcrumb","#ribbon");if(t("li",e).not(".persistent").remove(),!t("li",e).exists()){const a=`<li class="breadcrumb-item">\n\t\t\t\t\t<a class="p-r-1" href="${t('a[href!="#"]:first',MyAMS.dom.nav).attr("href")}">\n\t\t\t\t\t\t${MyAMS.i18n.HOME}\n\t\t\t\t\t</a>\n\t\t\t\t</li>`;e.append(t(a))}t("li.active >a",MyAMS.dom.nav).each(((a,n)=>{const s=t(n),o=t.trim(s.clone().children(".badge").remove().end().text()),i=s.attr("href"),r=t('<li class="breadcrumb-item"></li>').append(i.replace(/^#/,"")?t("<a></a>").html(o).attr("href",i):o);e.append(r)}))},minifyMenu:e=>{e&&e.preventDefault(),MyAMS.dom.root.toggleClass("minified"),MyAMS.dom.root.hasClass("minified")?MyAMS.core.switchIcon(t("i",e.currentTarget),"arrow-circle-left","arrow-circle-right"):MyAMS.core.switchIcon(t("i",e.currentTarget),"arrow-circle-right","arrow-circle-left"),window.localStorage&&(MyAMS.dom.root.hasClass("minified")?localStorage.setItem("window-state","minified"):localStorage.setItem("window-state",""))},switchMenu:e=>{e&&e.preventDefault(),MyAMS.dom.root.toggleClass("hidden-menu"),window.localStorage&&(MyAMS.dom.root.hasClass("hidden-menu")?localStorage.setItem("window-state","hidden-menu"):localStorage.setItem("window-state",""))},restoreState:()=>{if(window.localStorage){const e=localStorage.getItem("window-state");"minified"===e?MyAMS.nav.minifyMenu({currentTarget:t("#minifyme"),preventDefault:()=>{}}):MyAMS.dom.root.addClass(e)}}};e.nav=c,MyAMS.env.bundle?MyAMS.config.modules.push("nav"):(MyAMS.nav=c,console.debug("MyAMS: nav module loaded..."))}));