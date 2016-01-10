/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["lodash","jquery","../core_module"],function(a,b,c){"use strict";c.directive("metricSegment",["$compile","$sce",function(c,d){var e='<input type="text" data-provide="typeahead"  class="tight-form-clear-input input-medium" spellcheck="false" style="display:none"></input>',f='<a class="tight-form-item" ng-class="segment.cssClass" tabindex="1" give-focus="segment.focus" ng-bind-html="segment.html"></a>';return{scope:{segment:"=",getOptions:"&",onChange:"&"},link:function(g,h){var i=b(e),j=b(f),k=g.segment,l=null,m=null,n=!0;i.appendTo(h),j.appendTo(h),g.updateVariableValue=function(b){""!==b&&k.value!==b&&g.$apply(function(){var c=a.findWhere(g.altSegments,{value:b});c?(k.value=c.value,k.html=c.html,k.fake=!1,k.expandable=c.expandable):"false"!==k.custom&&(k.value=b,k.html=d.trustAsHtml(b),k.expandable=!0,k.fake=!1),g.onChange()})},g.switchToLink=function(a){(!n||a)&&(clearTimeout(m),m=null,n=!0,i.hide(),j.show(),g.updateVariableValue(i.val()))},g.inputBlur=function(){m=setTimeout(g.switchToLink,200)},g.source=function(b,c){return l?l:void g.$apply(function(){g.getOptions().then(function(b){g.altSegments=b,l=a.map(g.altSegments,function(a){return a.value}),"false"!==k.custom&&(k.fake||-1!==a.indexOf(l,k.value)||l.unshift(k.value)),c(l)})})},g.updater=function(a){return a===k.value?(clearTimeout(m),i.focus(),a):(i.val(a),g.switchToLink(!0),a)},g.matcher=function(a){var b=this.query;"/"===b[0]&&(b=b.substring(1)),"/"===b[b.length-1]&&(b=b.substring(0,b.length-1));try{return a.toLowerCase().match(b)}catch(c){return!1}},i.attr("data-provide","typeahead"),i.typeahead({source:g.source,minLength:0,items:1e4,updater:g.updater,matcher:g.matcher});var o=i.data("typeahead");o.lookup=function(){this.query=this.$element.val()||"";var a=this.source(this.query,b.proxy(this.process,this));return a?this.process(a):a},j.keydown(function(a){(40===a.keyCode||13===a.keyCode)&&j.click()}),j.click(function(){l=null,i.css("width",j.width()+16+"px"),j.hide(),i.show(),i.focus(),n=!1;var a=i.data("typeahead");a&&(i.val(""),a.lookup())}),i.blur(g.inputBlur),c(h.contents())(g)}}}]),c.directive("metricSegmentModel",["uiSegmentSrv","$q",function(b,c){return{template:'<metric-segment segment="segment" get-options="getOptionsInternal()" on-change="onSegmentChange()"></metric-segment>',restrict:"E",scope:{property:"=",options:"=",getOptions:"&",onChange:"&"},link:{pre:function(d,e,f){d.valueToSegment=function(c){var e=a.findWhere(d.options,{value:c}),g={cssClass:f.cssClass,custom:f.custom,value:e?e.text:c};return b.newSegment(g)},d.getOptionsInternal=function(){if(d.options){var e=a.map(d.options,function(a){return b.newSegment({value:a.text})});return c.when(e)}return d.getOptions()},d.onSegmentChange=function(){if(d.options){var b=a.findWhere(d.options,{text:d.segment.value});b&&b.value!==d.property?d.property=b.value:"false"!==f.custom&&(d.property=d.segment.value)}else d.property=d.segment.value;d.$$postDigest(function(){d.onChange()})},d.segment=d.valueToSegment(d.property)}}}}])});