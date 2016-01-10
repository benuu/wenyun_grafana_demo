/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery","../core_module","app/core/config"],function(a,b,c,d,e){"use strict";d.controller("SideMenuCtrl",["$scope","$location","contextSrv","backendSrv",function(a,c,d,f){a.getUrl=function(a){return e.appSubUrl+a},a.setupMainNav=function(){a.mainLinks.push({text:"Dashboards",icon:"fa fa-fw fa-th-large",href:a.getUrl("/")}),d.hasRole("Admin")&&a.mainLinks.push({text:"Data Sources",icon:"fa fa-fw fa-database",href:a.getUrl("/datasources")})},a.loadOrgs=function(){a.orgMenu=[],d.hasRole("Admin")&&(a.orgMenu.push({text:"Organization settings",href:a.getUrl("/org")}),a.orgMenu.push({text:"Users",href:a.getUrl("/org/users")}),a.orgMenu.push({text:"API Keys",href:a.getUrl("/org/apikeys")})),a.orgMenu.length>0&&a.orgMenu.push({cssClass:"divider"}),f.get("/api/user/orgs").then(function(c){b.each(c,function(b){b.orgId!==d.user.orgId&&a.orgMenu.push({text:"Switch to "+b.name,icon:"fa fa-fw fa-random",click:function(){a.switchOrg(b.orgId)}})}),e.allowOrgCreate&&a.orgMenu.push({text:"New Organization",icon:"fa fa-fw fa-plus",href:a.getUrl("/org/new")})})},a.switchOrg=function(b){f.post("/api/user/using/"+b).then(function(){window.location.href=a.getUrl("/")})},a.setupAdminNav=function(){a.systemSection=!0,a.grafanaVersion=e.buildInfo.version,a.mainLinks.push({text:"System info",icon:"fa fa-fw fa-info",href:a.getUrl("/admin/settings")}),a.mainLinks.push({text:"Global Users",icon:"fa fa-fw fa-user",href:a.getUrl("/admin/users")}),a.mainLinks.push({text:"Global Orgs",icon:"fa fa-fw fa-users",href:a.getUrl("/admin/orgs")})},a.updateMenu=function(){a.systemSection=!1,a.mainLinks=[],a.orgMenu=[];var b=c.path();0===b.indexOf("/admin")?a.setupAdminNav():a.setupMainNav()},a.init=function(){a.updateMenu(),a.$on("$routeChangeSuccess",a.updateMenu)}}])});