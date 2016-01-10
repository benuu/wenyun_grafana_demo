/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","../core_module","app/core/config"],function(a,b,c,d){"use strict";c.service("datasourceSrv",["$q","$injector","$rootScope",function(a,c,e){var f=this;this.init=function(){this.datasources={},this.metricSources=[],this.annotationSources=[],b.each(d.datasources,function(a,b){a.meta&&a.meta.metrics&&f.metricSources.push({value:b===d.defaultDatasource?null:b,name:b,meta:a.meta}),a.meta&&a.meta.annotations&&f.annotationSources.push(a)}),this.metricSources.sort(function(a,b){return a.meta.builtIn||a.name>b.name?1:a.name<b.name?-1:0})},this.get=function(b){return b?this.datasources[b]?a.when(this.datasources[b]):this.loadDatasource(b):this.get(d.defaultDatasource)},this.loadDatasource=function(b){var g=d.datasources[b];if(!g)return a.reject({message:"Datasource named "+b+" was not found"});var h=a.defer(),i=g.meta;return e.require([i.module],function(){var a=c.get(i.serviceName),d=new a(g,i);d.meta=i,d.name=b,f.datasources[b]=d,h.resolve(d)}),h.promise},this.getAll=function(){return d.datasources},this.getAnnotationSources=function(){return this.annotationSources},this.getMetricSources=function(){return this.metricSources},this.init()}])});