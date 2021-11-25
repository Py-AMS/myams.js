!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):"undefined"!=typeof exports?t(exports):(t(t={}),e.modTree=t)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";function f(e,t){var a;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(a=function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return s(e,t)}(e))||t&&e&&"number"==typeof e.length){a&&(e=a);var r=0,t=function(){};return{s:t,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var n,o=!0,i=!1;return{s:function(){a=e[Symbol.iterator]()},n:function(){var e=a.next();return o=e.done,e},e:function(e){i=!0,n=e},f:function(){try{o||null==a.return||a.return()}finally{if(i)throw n}}}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}Object.defineProperty(e,"__esModule",{value:!0}),e.tree=void 0;var m=MyAMS.$,t={switchTreeNode:function(e){function a(e){m('tr[data-ams-tree-node-parent-id="'.concat(e,'"]')).each(function(e,t){t=m(t);a(t.data("ams-tree-node-id")),d.row(t).remove().draw()})}var t,r,n,o=m(e.currentTarget),i=m("i.switch",o),s=o.parents("tr").first(),e=s.parents("table").first(),d=e.DataTable();o.tooltip("hide"),i.hasClass("minus")?(a(s.data("ams-tree-node-id")),MyAMS.core.switchIcon(i,"minus-square","plus-square","far"),i.removeClass("minus")):(t=s.data("ams-location")||e.data("ams-location")||"",r=s.data("ams-tree-nodes-target")||e.data("ams-tree-nodes-target")||"get-tree-nodes.json",n=s.data("ams-element-name"),MyAMS.core.switchIcon(i,"plus-square","cog","fas"),MyAMS.require("ajax").then(function(){MyAMS.ajax.post(t+"/"+n+"/"+r,{can_sort:!m("td.sorter",s).is(":empty")}).then(function(e){if(0<e.length){var t=f(e);try{for(t.s();!(a=t.n()).done;){var a=a.value,a=m(a);d.row.add(a).draw(),MyAMS.core.initContent(a).then()}}catch(e){t.e(e)}finally{t.f()}}MyAMS.core.switchIcon(i,"cog","minus-square","far"),i.addClass("minus")})}))},switchTree:function(e){var t,a,r,n=m(e.currentTarget),o=m("i.switch",n),i=n.parents("th").parents("table").first(),e=i.data("ams-tree-node-id"),s=i.DataTable();n.tooltip("hide"),o.hasClass("minus")?(m("tr[data-ams-tree-node-parent-id]").filter('tr[data-ams-tree-node-parent-id!="'.concat(e,'"]')).each(function(e,t){s.row(t).remove().draw()}),m("i.switch",i).each(function(e,t){MyAMS.core.switchIcon(m(t),"minus-square","plus-square","far"),m(t).removeClass("minus")})):(t=i.data("ams-location")||"",a=i.data("ams-tree-nodes-target")||"get-tree.json",r=m("tbody tr",i.first()),MyAMS.core.switchIcon(o,"plus-square","cog","fas"),MyAMS.require("ajax").then(function(){MyAMS.ajax.post("".concat(t,"/").concat(a),{can_sort:!m("td.sorter",r).is(":empty")}).then(function(e){m("tr[data-ams-tree-node-id]",i).each(function(e,t){s.row(t).remove().draw()}),m(e).each(function(e,t){t=m(t);s.row.add(t).draw()}),MyAMS.core.initContent(i).then(),MyAMS.core.switchIcon(o,"cog","minus-square","far"),o.addClass("minus")})}))},deleteElement:function(e,t){console.debug(t);t=t.node_id;t&&m('tr[data-ams-tree-node-parent-id="'.concat(t,'"]')).each(function(e,t){m(t).parents("table").DataTable().row(t).remove().draw()})},sortTree:function(e){var t=m(e.target),o=t.DataTable(),a=m(t).data(),r=a.amsReorderUrl;if(r){var i=m(a.amsReorderSource.node);i.data("ams-disabled-handlers","click");try{var s,d,n=i.parents("table").first().data("ams-tree-node-id"),c=i.data("ams-tree-node-id"),u=i.data("ams-tree-node-parent-id"),l=i.prev("tr"),u=l.exists()?(s=l.data("ams-tree-node-id"),m(".switch",l).hasClass("minus")?u===s?"reorder":"reparent":u===(s=l.data("ams-tree-node-parent-id"))?"reorder":"reparent"):u===(s=n)?"reorder":"reparent",n=MyAMS.core.getFunctionByName(r);"function"==typeof n?n.call(t,dnd_table,post_data):(r.startsWith(window.location.protocol)||(n=a.amsLocation)&&(r=n+"/"+r),d={action:u,child:c,parent:s,order:JSON.stringify(m("tr[data-ams-tree-node-id]").listattr("data-ams-tree-node-id")),can_sort:!m("td.sorter",i).is(":empty")},MyAMS.require("ajax").then(function(){MyAMS.ajax.post(r,d).then(function(e){function r(e){m('tr[data-ams-tree-node-parent-id="'.concat(e,'"]')).each(function(e,t){var a=m(t),t=a.attr("data-ams-tree-node-id");r(t),o.row(a).remove().draw()})}if(e.status)MyAMS.ajax.handleJSON(e);else{"reparent"===d.action&&function(e){e=m('tr[data-ams-tree-node-id="'.concat(e,'"]'));o.row(e).remove().draw()}(s),r(s),r(c),o.row(i).remove().draw();var t=f(e);try{for(t.s();!(n=t.n()).done;){var a=n.value,n=m(a),a=m('tr[id="'.concat(n.attr("id"),'"]'));o.row(a).remove().draw(),o.row.add(n).draw(),MyAMS.core.initContent(n).then()}}catch(e){t.e(e)}finally{t.f()}}})}))}finally{setTimeout(function(){m(i).removeData("ams-disabled-handlers")},50)}}return!1}};e.tree=t,window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("tree"):(MyAMS.tree=t,console.debug("MyAMS: tree module loaded...")))});