/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["require","exports","test/specs/helpers","test/lib/common","../query_ctrl","app/core/services/segment_srv"],function(a,b,c,d){d.describe("ElasticQueryCtrl",function(){var a=new c.ControllerTestContext;d.beforeEach(d.angularMocks.module("grafana.controllers")),d.beforeEach(d.angularMocks.module("grafana.services")),d.beforeEach(a.providePhase()),d.beforeEach(a.createControllerPhase("ElasticQueryCtrl")),d.beforeEach(function(){a.scope.target={},a.scope.$parent={get_data:d.sinon.spy()},a.scope.datasource=a.datasource,a.scope.datasource.metricFindQuery=d.sinon.stub().returns(a.$q.when([]))}),d.describe("init",function(){d.beforeEach(function(){a.scope.init()})})})});