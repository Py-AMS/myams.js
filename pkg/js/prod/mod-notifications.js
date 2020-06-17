!function(t,a){if("function"==typeof define&&define.amd)define(["exports","jsrender"],a);else if("undefined"!=typeof exports)a(exports,require("jsrender"));else{var e={};a(e,t.jsrender),t.modNotifications=e}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(t,a){"use strict";function n(t,a){for(var e=0;e<a.length;e++){var i=a[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}Object.defineProperty(t,"__esModule",{value:!0}),t.notifications=void 0;var o=MyAMS.$,s=o.templates({markup:'\n\t<li class="p-1">\n\t\t<a class="d-flex flex-row"{{if url}} href="{{:url}}"{{/if}}>\n\t\t\t{{if source.avatar}}\n\t\t\t<img class="avatar mx-1 mt-1" src="{{:source.avatar}}" />\n\t\t\t{{else}}\n\t\t\t<i class="avatar fa fa-fw fa-2x fa-user mx-1 mt-1"></i>\n\t\t\t{{/if}}\n\t\t\t<div class="flex-grow-1 ml-2">\n\t\t\t\t<small class="timestamp float-right text-muted">\n\t\t\t\t\t{{*: new Date(data.timestamp).toLocaleString()}}\n\t\t\t\t</small>\n\t\t\t\t<strong class="title d-block">\n\t\t\t\t\t{{:source.title}}\n\t\t\t\t</strong>\n\t\t\t\t<p class="text-muted mb-2">{{:message}}</p>\n\t\t\t</div>\n\t\t</a>\n\t</li>',allowCode:!0}),l=o.templates({markup:'\n\t<ul class="list-style-none flex-grow-1 overflow-auto m-0 p-0">\n\t\t{{for notifications tmpl=~itemTemplate /}}\n\t</ul>\n\t{{if !~options.hideTimestamp}}\n\t<div class="timestamp border-top pt-1">\n\t\t<span>{{*: MyAMS.i18n.LAST_UPDATE }}{{: ~timestamp.toLocaleString() }}</span>\n\t\t<i class="fa fa-fw fa-sync float-right"\n\t\t   data-ams-click-handler="MyAMS.notifications.getNotifications"\n\t\t   data-ams-click-handler-options=\'{"localTimestamp": "{{: ~useLocalTime }}"}\'></i>\n\t</div>\n\t{{/if}}',allowCode:!0}),r=function(){function e(t){var a=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};!function(t,a){if(!(t instanceof a))throw new TypeError("Cannot call a class as a function")}(this,e),this.values=t,this.options=a}var t,a,i;return t=e,(a=[{key:"render",value:function(t){o(t).html(l.render(this.values,{itemTemplate:s,timestamp:this.options.localTimestamp?new Date:new Date(this.values.timestamp),useLocalTime:this.options.localTimestamp?"true":"false",options:this.options}))}}])&&n(t.prototype,a),i&&n(t,i),e}(),e={getNotifications:function(t,a){var e=a||t.data,i=o(t.target),n=o(t.currentTarget),s=n.data("ams-notifications-source")||n.parents("[data-ams-notifications-source]").data("ams-notifications-source");MyAMS.require("ajax").then(function(){MyAMS.ajax.get(s,n.data("ams-notifications-params")||"",n.data("ams-notifications-options")||{}).then(function(t){var a=o(i.data("ams-notifications-target")||i.parents("[data-ams-notifications-target]").data("ams-notifications-target")||n.attr("href"));new r(t,e).render(a)})})}};t.notifications=e,MyAMS.env.bundle?MyAMS.config.modules.push("notifications"):(MyAMS.notifications=e,console.debug("MyAMS: notifications module loaded..."))});