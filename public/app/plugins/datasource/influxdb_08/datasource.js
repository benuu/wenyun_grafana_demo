/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","app/core/utils/datemath","./influx_series","./query_builder","./directives","./query_ctrl","./func_editor"],function(a,b,c,d,e){"use strict";var f=a.module("grafana.services");f.factory("InfluxDatasource_08",["$q","backendSrv","templateSrv",function(f,g,h){function i(a){this.urls=b.map(a.url.split(","),function(a){return a.trim()}),this.username=a.username,this.password=a.password,this.name=a.name,this.basicAuth=a.basicAuth}function j(a,b,c){return b().then(void 0,function(d){0!==d.status||d.status>=300?(d.message="InfluxDB Error: <br/>"+d.data,a.reject(d)):setTimeout(function(){return j(a,b,Math.min(2*c,3e4))},c)})}function k(a,b,c){var e=new d({seriesList:c,alias:a,groupByField:b});return e.getTimeSeries()}function l(a){var b=m(a.rangeRaw.from,!1),c=m(a.rangeRaw.to,!0),d="s"===b[b.length-1];return"now()"!==c||d?"time > "+b+" and time < "+c:"time > "+b}function m(a,d){if(b.isString(a)){if("now"===a)return"now()";var e=/^now-(\d+)([d|h|m|s])$/.exec(a);if(e){var f=parseInt(e[1]),g=e[2];return"now()-"+f+g}a=c.parse(a,d)}return(a.valueOf()/1e3).toFixed(0)+"s"}return i.prototype.query=function(a){var c=l(a),d=b.map(a.targets,function(d){if(d.hide||!(d.series&&d.column||d.query))return[];var f=new e(d),g=f.build();g=g.replace("$timeFilter",c),g=g.replace(/\$interval/g,d.interval||a.interval),g=h.replace(g,a.scopedVars);var i=d.alias?h.replace(d.alias,a.scopedVars):"",j=b.partial(k,i,f.groupByField);return this._seriesQuery(g).then(j)},this);return f.all(d).then(function(a){return{data:b.flatten(a)}})},i.prototype.annotationQuery=function(a){var b=l({rangeRaw:a.rangeRaw}),c=a.annotation.query.replace("$timeFilter",b);return c=h.replace(c),this._seriesQuery(c).then(function(b){return new d({seriesList:b,annotation:a.annotation}).getAnnotations()})},i.prototype.listColumns=function(a){return a=h.replace(a),a.match("^/.*/")||a.match(/^merge\(.*\)/)||(a='"'+a+'"'),this._seriesQuery("select * from "+a+" limit 1").then(function(a){return a?a[0].columns.map(function(a){return/^\w+$/.test(a)?a:'"'+a+'"'}):[]})},i.prototype.listSeries=function(a){return a&&a.length>0&&"/"!==a[0]&&(a="/"+a+"/"),this._seriesQuery("list series "+a).then(function(a){return a&&0!==a.length?b.map(a[0].points,function(a){return a[1]}):[]})},i.prototype.testDatasource=function(){return this.metricFindQuery("list series").then(function(){return{status:"success",message:"Data source is working",title:"Success"}})},i.prototype.metricFindQuery=function(a){var c;try{c=h.replace(a)}catch(d){return f.reject(d)}return this._seriesQuery(c).then(function(a){return a&&0!==a.length?b.map(a[0].points,function(a){return{text:a[1],expandable:!1}}):[]})},i.prototype._seriesQuery=function(a){return this._influxRequest("GET","/series",{q:a})},i.prototype._influxRequest=function(a,c,d){var e=this,h=f.defer();return j(h,function(){var f=e.urls.shift();e.urls.push(f);var i={u:e.username,p:e.password};"GET"===a&&(b.extend(i,d),d=null);var j={method:a,url:f+c,params:i,data:d,inspect:{type:"influxdb"}};return j.headers=j.headers||{},e.basicAuth&&(j.headers.Authorization="Basic "+e.basicAuth),g.datasourceRequest(j).then(function(a){h.resolve(a.data)})},10),h.promise},i.prototype._getDashboardInternal=function(c){var d='select dashboard from "grafana.dashboard_'+btoa(c)+'"';return this._seriesQuery(d).then(function(c){if(!c||!c.length)return null;var d=b.indexOf(c[0].columns,"dashboard"),e=c[0].points[0][d];return a.fromJson(e)},function(){return null})},i.prototype.getDashboard=function(a){return this._getDashboardInternal(a).then(function(a){if(null!==a)return a;throw"Dashboard not found"},function(a){throw"Could not load dashboard, "+a.data})},i.prototype.searchDashboards=function(){var a="select * from /grafana.dashboard_.*/ ";return this._seriesQuery(a).then(function(a){var c={dashboards:[],tags:[],tagsOnly:!1};if(!a||!a.length)return c;for(var d=0;d<a.length;d++){var e=b.indexOf(a[d].columns,"title"),f=b.indexOf(a[d].columns,"id"),g={id:a[d].points[0][e],title:a[d].points[0][e]};-1!==f&&(g.id=a[d].points[0][f]),c.dashboards.push(g)}return c})},i}])});