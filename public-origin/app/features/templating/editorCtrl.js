/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash"],function(a,b){"use strict";var c=a.module("grafana.controllers");c.controller("TemplateEditorCtrl",["$scope","datasourceSrv","templateSrv","templateValuesSrv",function(c,d,e,f){var g={type:"query",datasource:null,refresh:!1,name:"",options:[],includeAll:!1,allFormat:"glob",multi:!1,multiFormat:"glob"};c.init=function(){c.mode="list",c.datasources=b.filter(d.getMetricSources(),function(a){return!a.meta.builtIn}),c.variables=e.variables,c.reset(),c.$watch("mode",function(a){"new"===a&&c.reset()}),c.$watch("current.datasource",function(a){"new"===c.mode&&d.get(a).then(function(a){a.meta.defaultMatchFormat&&(c.current.allFormat=a.meta.defaultMatchFormat,c.current.multiFormat=a.meta.defaultMatchFormat)})})},c.add=function(){c.isValid()&&(c.variables.push(c.current),c.update(),c.updateSubmenuVisibility())},c.isValid=function(){if(!c.current.name)return c.appEvent("alert-warning",["Validation","Template variable requires a name"]),!1;if(!c.current.name.match(/^\w+$/))return c.appEvent("alert-warning",["Validation","Only word and digit characters are allowed in variable names"]),!1;var a=b.findWhere(c.variables,{name:c.current.name});return a&&a!==c.current?(c.appEvent("alert-warning",["Validation","Variable with the same name already exists"]),!1):!0},c.runQuery=function(){return f.updateOptions(c.current).then(null,function(a){a.data&&a.data.message&&(a.message=a.data.message),c.appEvent("alert-error",["Templating","Template variables could not be initialized: "+a.message])})},c.edit=function(a){c.current=a,c.currentIsNew=!1,c.mode="edit",void 0===c.current.datasource&&(c.current.datasource=null,c.current.type="query",c.current.allFormat="glob")},c.duplicate=function(b){c.current=a.copy(b),c.variables.push(c.current),c.current.name="copy_of_"+b.name,c.updateSubmenuVisibility()},c.update=function(){c.isValid()&&c.runQuery().then(function(){c.reset(),c.mode="list"})},c.reset=function(){c.currentIsNew=!0,c.current=a.copy(g)},c.typeChanged=function(){"interval"===c.current.type&&(c.current.query="1m,10m,30m,1h,6h,12h,1d,7d,14d,30d"),"query"===c.current.type&&(c.current.query="")},c.removeVariable=function(a){var d=b.indexOf(c.variables,a);c.variables.splice(d,1),c.updateSubmenuVisibility()}}])});