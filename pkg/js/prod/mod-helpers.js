!function(e,n){"function"==typeof define&&define.amd?define(["exports"],n):"undefined"!=typeof exports?n(exports):(n(n={}),e.modHelpers=n)}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.helpers=void 0;var d=MyAMS.$,n={refreshElement:function(e,o){return new Promise(function(e,n){var t=d('[id="'.concat(o.object_id,'"]'));MyAMS.core.executeFunctionByName(MyAMS.config.clearContent,document,t).then(function(){t.replaceWith(d(o.content)),t=d('[id="'.concat(o.object_id,'"]')),MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,t).then(function(){e(t)},n)},n)})},refreshWidget:function(e,i){return new Promise(function(e,n){var t=d('[id="'.concat(i.widget_id,'"]')),o=t.parents(".widget-group");MyAMS.core.executeFunctionByName(MyAMS.config.clearContent,document,o).then(function(){o.replaceWith(d(i.content)),t=d('[id="'.concat(i.widget_id,'"]')),o=t.parents(".widget-group"),MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,o).then(function(){e(t)},n)},n)})},refreshTableRow:function(e,r){return new Promise(function(e,n){var t,o='tr[id="'.concat(r.row_id,'"]'),i=d(o),c=i.parents("table").first().DataTable();r.data?(c.row(o).data(r.data),e(i)):(t=d(r.content),i.replaceWith(t),MyAMS.core.executeFunctionByName(MyAMS.config.initContent,document,t).then(function(){e(t)},n))})},refreshImage:function(e,n){d('[id="'.concat(n.image_id,'"]')).attr("src",n.src)},moveElementToParentEnd:function(e){var n=e.parent();return e.detach().appendTo(n)},hideDropdown:function(e){d(e.target).closest(".dropdown-menu").dropdown("hide")}};e.helpers=n,window.MyAMS&&(MyAMS.env.bundle?MyAMS.config.modules.push("helpers"):(MyAMS.helpers=n,console.debug("MyAMS: helpers module loaded...")))});