/*! grafana - v2.6.0 - 2015-12-14
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["require","exports","test/lib/common","../query_part"],function(a,b,c,d){c.describe("InfluxQueryPart",function(){c.describe("series with mesurement only",function(){c.it("should handle nested function parts",function(){var a=d.create({type:"derivative",params:["10s"]});c.expect(a.text).to.be("derivative(10s)"),c.expect(a.render("mean(value)")).to.be("derivative(mean(value), 10s)")}),c.it("should handle suffirx parts",function(){var a=d.create({type:"math",params:["/ 100"]});c.expect(a.text).to.be("math(/ 100)"),c.expect(a.render("mean(value)")).to.be("mean(value) / 100")}),c.it("should handle alias parts",function(){var a=d.create({type:"alias",params:["test"]});c.expect(a.text).to.be("alias(test)"),c.expect(a.render("mean(value)")).to.be('mean(value) AS "test"')})})})});