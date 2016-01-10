/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash"],function(a,b){"use strict";var c=a.module("grafana.controllers");c.controller("PrometheusQueryCtrl",["$scope",function(c){c.init=function(){var a=c.target;a.expr=a.expr||"",a.intervalFactor=a.intervalFactor||2,c.metric="",c.resolutions=b.map([1,2,3,4,5,10],function(a){return{factor:a,label:"1/"+a}}),c.$on("typeahead-updated",function(){c.$apply(c.inputMetric),c.refreshMetricData()})},c.refreshMetricData=function(){b.isEqual(c.oldTarget,c.target)||(c.oldTarget=a.copy(c.target),c.get_data())},c.inputMetric=function(){c.target.expr+=c.target.metric,c.metric=""},c.suggestMetrics=function(a,b){c.datasource.performSuggestQuery(a).then(b)},c.linkToPrometheus=function(){var a=Math.ceil((c.range.to.valueOf()-c.range.from.valueOf())/1e3),b=c.range.to.utc().format("YYYY-MM-DD HH:MM"),d={expr:c.target.expr,range_input:a+"s",end_input:b,step_input:"",stacked:c.panel.stack,tab:0},e=encodeURIComponent(JSON.stringify([d]));return c.datasource.directUrl+"/graph#"+e},c.init()}])});