/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery","./gfunc"],function(a,b,c,d){"use strict";function e(a){return b.reduce(a,function(a,c){return b.each(c,function(b){a.push(b.name)}),a},[])}function f(a){return b.map(a,function(a,c){return{text:c,submenu:b.map(a,function(a){return{text:a.name,click:"addFunction('"+a.name+"')"}})}})}a.module("grafana.directives").directive("graphiteAddFunc",["$compile",function(a){var g='<input type="text" class="tight-form-input input-medium tight-form-input" spellcheck="false" style="display:none"></input>',h='<a  class="tight-form-item tight-form-func dropdown-toggle" tabindex="1" gf-dropdown="functionMenu" data-toggle="dropdown"><i class="fa fa-plus"></i></a>';return{link:function(i,j){var k=d.getCategories(),l=e(k);i.functionMenu=f(k);var m=c(g),n=c(h);m.appendTo(j),n.appendTo(j),m.attr("data-provide","typeahead"),m.typeahead({source:l,minLength:1,items:10,updater:function(a){var c=d.getFuncDef(a);if(c||(a=a.toLowerCase(),c=b.find(l,function(b){return 0===b.toLowerCase().indexOf(a)})))return i.$apply(function(){i.addFunction(c)}),m.trigger("blur"),""}}),n.click(function(){n.hide(),m.show(),m.focus()}),m.keyup(function(){j.toggleClass("open",""===m.val())}),m.blur(function(){setTimeout(function(){m.val(""),m.hide(),n.show(),j.removeClass("open")},200)}),a(j.contents())(i)}}}])});