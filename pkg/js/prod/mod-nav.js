!function(e,t){if("function"==typeof define&&define.amd)define(["exports","jsrender"],t);else if("undefined"!=typeof exports)t(exports,require("jsrender"));else{var n={};t(n,e.jsrender),e.modNav=n}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e,t){"use strict";function v(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e)))return;var n=[],a=!0,i=!1,r=void 0;try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(n.push(o.value),!t||n.length!==t);a=!0);}catch(e){i=!0,r=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw r}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function n(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),e}Object.defineProperty(e,"__esModule",{value:!0}),e.nav=void 0;var h=MyAMS.$,s=function(){function t(e){i(this,t),this.props=e}return n(t,[{key:"render",value:function(){return h('<li class="header"></li>').text(this.props.header||"")}}]),t}(),M=function(){function e(){i(this,e)}return n(e,[{key:"render",value:function(){return h('<li class="divider"></li>')}}]),e}(),l=function(){function p(e){i(this,p),this.items=e}return n(p,[{key:"render",value:function(){var e=h("<div></div>"),t=!0,n=!1,a=void 0;try{for(var i,r=this.items[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;if(o.label){for(var s=h("<li></li>"),l=h("<a></a>").attr("href",o.href||"#").attr("title",o.label),c=0,d=Object.entries(o.attrs||{});c<d.length;c++){var f=v(d[c],2),u=f[0],m=f[1];l.attr(u,m)}o.icon&&h('<i class="fa-lg fa-fw mr-1"></i>').addClass(o.icon).appendTo(l),h('<span class="menu-item-parent"></span>').text(o.label).appendTo(l),o.badge&&h('<span class="badge ml-1 mr-3 float-right"></span>').addClass("bg-".concat(o.badge.status)).text(o.badge.value).appendTo(l),l.appendTo(s),o.items&&h("<ul></ul>").append(new p(o.items).render()).appendTo(s),s.appendTo(e)}else(new M).render().appendTo(e)}}catch(e){n=!0,a=e}finally{try{t||null==r.return||r.return()}finally{if(n)throw a}}return e.children()}}]),p}(),c=function(){function a(e,t,n){i(this,a),this.menus=e,this.parent=t,this.settings=n}return n(a,[{key:"getMenus",value:function(){var e=h("<ul></ul>"),t=!0,n=!1,a=void 0;try{for(var i,r=this.menus[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;void 0!==o.header&&e.append(new s(o).render()),e.append(new l(o.items).render())}}catch(e){n=!0,a=e}finally{try{t||null==r.return||r.return()}finally{if(n)throw a}}return e}},{key:"render",value:function(){var e=this.getMenus();this.init(e),this.parent.append(e)}},{key:"init",value:function(a){var s=this.settings;a.find("li").each(function(e,t){var n=h(t);if(0<n.find("ul").length){var a=n.find("a:first");a.append('<b class="collapse-sign">'.concat(s.closedSign,"</b>")),"#"===a.attr("href")&&a.click(function(){return!1})}}),a.find("li.active").each(function(e,t){var n=h(t).parents("ul"),a=n.parent("li");n.slideDown(s.speed),a.find("b:first").html(s.openedSign),a.addClass("open")}),a.find("li a").on("click",function(e){var t=h(e.currentTarget);if(!t.hasClass("active")){t.parents("li").removeClass("active");var i=t.attr("href").replace(/^#/,""),r=t.parent().find("ul");if(s.accordion){var o=t.parent().parents("ul");a.find("ul:visible").each(function(e,n){var a=!0;if(o.each(function(e,t){if(t===n)return a=!1}),a&&r!==n){var t=h(n);!i&&t.hasClass("active")||t.slideUp(s.speed,function(e){t.parent("li").removeClass("open").find("b:first").delay(s.speed).html(s.closedSign)})}})}var n=t.parent().find("ul:first");i||!n.is(":visible")||n.hasClass("active")?n.slideDown(s.speed,function(){t.parent("li").addClass("open").find("b:first").delay(s.speed).html(s.openedSign)}):n.slideUp(s.speed,function(){t.parent("li").removeClass("open").find("b:first").delay(s.speed).html(s.closedSign)})}})}}]),a}(),r=!1;function d(e){e.startsWith("#")?e!==location.hash&&(MyAMS.dom.root.hasClass("mobile-view-activated")?(MyAMS.dom.root.removeClass("hidden-menu"),setTimeout(function(){window.location.hash=e},50)):window.location.hash=e):window.location=e}var o={init:function(){r||(r=!0,h.fn.extend({navigationMenu:function(e){var t=this;if(0!==this.length){var n=this.data(),a={accordion:!1!==n.amsMenuAccordion,speed:200};if(MyAMS.config.useSVGIcons){var i=FontAwesome.findIconDefinition({iconName:"angle-down"}),r=FontAwesome.findIconDefinition({iconName:"angle-up"});h.extend(a,{closedSign:"<em data-fa-i2svg>".concat(FontAwesome.icon(i).html,"</em>"),openedSign:"<em data-fa-i2svg>".concat(FontAwesome.icon(r).html,"</em>")})}else h.extend(a,{closedSign:'<em class="fa fa-angle-down"></em>',openedSign:'<em class="fa fa-angle-up"></em>'});var o=h.extend({},a,e);if(n.amsMenuConfig)MyAMS.require("ajax").then(function(){MyAMS.ajax.get(n.amsMenuConfig).then(function(e){new(MyAMS.core.getObject(n.amsMenuFactory)||c)(e,h(t),o).render(),MyAMS.require("skin").then(function(){MyAMS.skin.checkURL()})})});else{var s=h("ul",this);new c(null,h(this),o).init(s)}}}}),MyAMS.config.ajaxNav&&(h(document).on("click",'a[href="#"]',function(e){e.preventDefault()}),h(document).on("click",'a[href!="#"]:not([data-toggle]), [data-ams-url]:not([data-toggle])',function(e){var t=h(e.currentTarget),n=t.data("ams-disabled-handlers");if(!0!==n&&"click"!==n&&"all"!==n){var a=t.attr("href")||t.data("ams-url");if(a&&!a.startsWith("javascript:")&&!t.attr("target")&&!0!==t.data("ams-context-menu")){var i,r,o;e.preventDefault(),e.stopPropagation(),o=0<=a.indexOf("?")?(r=(i=a.split("?"))[0],i[1].unserialize()):void(r=a);var s=MyAMS.core.getFunctionByName(r);if("function"==typeof s&&(a=s.call(t,o)),"function"==typeof a)a.call(t,o);else if(a=a.replace(/%23/,"#"),e.ctrlKey)window.open(a);else{var l=t.data("ams-target")||t.attr("target");l?"_blank"===l?window.open(a):MyAMS.form?MyAMS.form.confirmChangedForm().then(function(e){"success"===e&&MyAMS.skin&&MyAMS.skin.loadURL(a,l,t.data("ams-link-options"),t.data("ams-link-callback"))}):MyAMS.skin&&MyAMS.skin.loadURL(a,l,t.data("ams-link-options"),t.data("ams-link-callback")):MyAMS.form?MyAMS.form.confirmChangedForm().then(function(e){"success"===e&&d(a)}):d(a)}}}}),h(document).on("click",'a[target="_blank"]',function(e){e.preventDefault();var t=h(e.currentTarget);window.open(t.attr("href")),MyAMS.stats&&MyAMS.stats.logEvent(t.data("ams-stats-category")||"Navigation",t.data("ams-stats-action")||"External",t.data("ams-stats-label")||t.attr("href"))}),h(document).on("click",'a[target="_top"]',function(t){t.preventDefault(),MyAMS.form&&MyAMS.form.confirmChangedForm().then(function(e){"success"===e&&(window.location=h(t.currentTarget).attr("href"))})}),h(document).on("click",".nav-tabs a[data-toggle=tab]",function(e){if(h(e.currentTarget).parent("li").hasClass("disabled"))return e.stopPropagation(),e.preventDefault(),!1}),h(document).on("show.bs.tab",function(e){var t=h(e.target);t.exists()&&"A"!==t.get(0).tagName&&(t=h("a[href]",t));var n=t.data();if(n&&n.amsUrl){if(n.amsTabLoaded)return;t.append('<i class="fa fa-spin fa-cog ml-1"></i>'),MyAMS.require("skin").then(function(){MyAMS.skin.loadURL(n.amsUrl,t.attr("href")).then(function(){n.amsTabLoadOnce&&(n.amsTabLoaded=!0),h("i",t).remove()},function(){h("i",t).remove()})})}}),MyAMS.config.isMobile?(MyAMS.dom.root.addClass("mobile-detected"),MyAMS.config.enableFastclick&&MyAMS.require("ajax").then(function(){MyAMS.ajax.check(h.fn.noClickDelay,"".concat(MyAMS.env.baseURL,"../ext/js-smartclick").concat(MyAMS.env.extext,".js")).then(function(){h("a",MyAMS.dom.nav).noClickDelay(),h("a","#hide-menu").noClickDelay()})})):MyAMS.dom.root.addClass("desktop-detected")),o.restoreState())},initElement:function(e){h("nav",e).navigationMenu({speed:MyAMS.config.menuSpeed})},setActiveMenu:function(e){var t=MyAMS.dom.nav;if(h(".active",t).removeClass("active"),e.addClass("open").addClass("active"),e.parents("li").addClass("open active").children("ul").addClass("active").show(),e.parents("li:first").removeClass("open"),e.parents("ul").addClass(e.attr("href").replace(/^#/,"")?"active":"").show(),e.exists()){var n=t.scrollTop(),a=h(e).parents("li:last").position();(a.top<n||a.top>t.height()+n)&&t.scrollTop(a.top)}},drawBreadcrumbs:function(){var o=h("ol.breadcrumb","#ribbon");if(h("li",o).not(".parent").remove(),!h("li",o).exists()){var e='<li class="breadcrumb-item">\n\t\t\t\t\t<a class="p-r-1" href="'.concat(h('a[href!="#"]:first',MyAMS.dom.nav).attr("href"),'">').concat(MyAMS.i18n.HOME,"</a></li>");o.append(h(e))}h("li.active >a",MyAMS.dom.nav).each(function(e,t){var n=h(t),a=h.trim(n.clone().children(".badge").remove().end().text()),i=n.attr("href"),r=h('<li class="breadcrumb-item"></li>').append(i.replace(/^#/,"")?h("<a></a>").html(a).attr("href",i):a);o.append(r)})},minifyMenu:function(e){e&&e.preventDefault(),MyAMS.dom.root.toggleClass("minified"),MyAMS.dom.root.hasClass("minified")?MyAMS.core.switchIcon(h("i",e.currentTarget),"arrow-circle-left","arrow-circle-right"):MyAMS.core.switchIcon(h("i",e.currentTarget),"arrow-circle-right","arrow-circle-left"),window.localStorage&&(MyAMS.dom.root.hasClass("minified")?localStorage.setItem("window-state","minified"):localStorage.setItem("window-state",""))},hideMenu:function(e){e&&e.preventDefault(),MyAMS.dom.root.toggleClass("hidden-menu"),window.localStorage&&(MyAMS.dom.root.hasClass("hidden-menu")?localStorage.setItem("window-state","hidden-menu"):localStorage.setItem("window-state",""))},restoreState:function(){if(window.localStorage){var e=localStorage.getItem("window-state");"minified"===e?h("#minifyme").click():MyAMS.dom.root.addClass(e)}}};e.nav=o,MyAMS.env.bundle?MyAMS.config.modules.push("nav"):(MyAMS.nav=o,console.debug("MyAMS: nav module loaded..."))});