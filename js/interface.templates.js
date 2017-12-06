this["Fliplet"] = this["Fliplet"] || {};
this["Fliplet"]["Widget"] = this["Fliplet"]["Widget"] || {};
this["Fliplet"]["Widget"]["Templates"] = this["Fliplet"]["Widget"]["Templates"] || {};

this["Fliplet"]["Widget"]["Templates"]["templates.app"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder folder\" data-app-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder folder\">\n      <div class=\"image-overlay\">\n        <i class=\"fa fa-folder\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-folder\">Delete</li>\n    </ul>\n  </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.document"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder image document "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-file-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-file-ext=\""
    + alias4(((helper = (helper = helpers.ext || (depth0 != null ? depth0.ext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ext","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder file\">\n      <div class=\"image-overlay\" style=\"opacity: 1\">\n        <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-file\">Delete</li>\n    </ul>\n  </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.folder"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder folder "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-folder-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-parent-id=\""
    + alias4(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder folder\">\n      <div class=\"image-overlay\">\n        <i class=\"fa fa-folder\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-folder\">Delete</li>\n    </ul>\n  </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.font"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"3":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder image font "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-file-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-file-ext=\""
    + alias4(((helper = (helper = helpers.ext || (depth0 != null ? depth0.ext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ext","hash":{},"data":data}) : helper)))
    + "\">\n    <div class=\"thumb-wrapper\">\n      <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n      <div class=\"image-holder file\">\n        <div class=\"image-overlay\" style=\"opacity: 1\">\n          <i class=\"fa fa-font\" aria-hidden=\"true\"></i>\n        </div>\n      </div>\n    </div>\n    <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n    <div class=\"contextual-menu\">\n      <ul>\n        <li class=\"organization-media "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOrganizationMedia : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">Make it available to the organization <i class=\"fa fa-check\"></i></li>\n        <li role=\"separator\" class=\"divider\"></li>\n        <li class=\"text-danger delete-file\">Delete</li>\n      </ul>\n    </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.image"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder image "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-file-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-file-ext=\""
    + alias4(((helper = (helper = helpers.ext || (depth0 != null ? depth0.ext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ext","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder file\" style=\"background-image: url('"
    + alias4(((helper = (helper = helpers.urlSmall || (depth0 != null ? depth0.urlSmall : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"urlSmall","hash":{},"data":data}) : helper)))
    + "');\">\n      <div class=\"image-overlay\">\n        <i class=\"fa\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-file\">Delete</li>\n    </ul>\n  </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.nofiles"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"nofiles-msg\">\n  <div class=\"drop-zone-container\">\n    <div class=\"dropZ\">\n      <p><strong>No content found</strong></p>\n      <span>Drop files here or use the <i>[Add <span class=\"caret\"></span>]</i> button</span>\n    </div>\n  </div>\n</div>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.organization"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder folder\" data-organization-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder folder\">\n      <div class=\"image-overlay\">\n        <i class=\"fa fa-folder\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-folder\">Delete</li>\n    </ul>\n  </div>\n</div>\n";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.other"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder image other "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-file-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-file-ext=\""
    + alias4(((helper = (helper = helpers.ext || (depth0 != null ? depth0.ext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ext","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder file\">\n      <div class=\"image-overlay\" style=\"opacity: 1\">\n        <i class=\"fa fa-file\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-file\">Delete</li>\n    </ul>\n  </div>\n</div>";
},"useData":true});

this["Fliplet"]["Widget"]["Templates"]["templates.video"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-4 col-sm-3 col-md-2 item-holder image video "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-file-id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" data-file-ext=\""
    + alias4(((helper = (helper = helpers.ext || (depth0 != null ? depth0.ext : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ext","hash":{},"data":data}) : helper)))
    + "\">\n  <div class=\"thumb-wrapper\">\n    <div class=\"more-options\"><i class=\"fa fa-ellipsis-v\"></i></div>\n    <div class=\"image-holder file\">\n      <div class=\"image-overlay\" style=\"opacity: 1\">\n        <i class=\"fa fa-video-camera\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n  </div>\n  <div class=\"image-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\n  <div class=\"contextual-menu\">\n    <ul>\n      <li class=\"text-danger delete-file\">Delete</li>\n    </ul>\n  </div>\n</div>";
},"useData":true});