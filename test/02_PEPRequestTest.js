var chai = require('chai');
var expect = chai.expect;
var PEPRequest = require("./../lib/PEPRequest");
var Category = require("../lib/category/Category");
var Subject = require("../lib/category/Subject")
var Resource = require("../lib/category/Resource");
var Action = require("../lib/category/Action");
var Application = require("../lib/category/Application");
var Environment =  require("../lib/category/Environment");
var Host = require("../lib/category/Host");
var PoD = require("../lib/category/DiscretionaryPolicies");
var Recipient = require("../lib/category/Recipient");
var XACML3 = require("../lib/xacml/XACML3");

var subject0 = new Subject("John");
subject0.addAttribute("attr", "value");
var subject1 = new Subject("John1");
subject1.addAttribute("attr1", "value1");
var resource = new Resource("C:/Test");
var action = new Action("Access");
var requestObjects = [];

describe("PEPRequest Creation", function() {
	it("Should successfully create a simple request with subject, resource and action without any attribute", function() {
		requestObjects.push(subject0);
		requestObjects.push(action);
		requestObjects.push(resource);

		var pepRequest = new PEPRequest(null, requestObjects);

		expect(pepRequest).to.not.equals(null);
		expect(pepRequest).to.not.equals(undefined);

		expect(JSON.parse(pepRequest.toXACMLJson())).to.have.property("Request");

		

		var request = JSON.parse(pepRequest.toXACMLJson()).Request;

		expect(request).to.have.property("CombinedDecision");
		expect(request).to.have.property("ReturnPolicyIdList");
		expect(request).to.have.property("Category");
		expect(request.Category).to.have.length(3);
	});

	it("Should successfully merge objects with the same type", function() {
		requestObjects = [];

		requestObjects.push(subject0);
		requestObjects.push(subject1);
		requestObjects.push(action);
		requestObjects.push(resource);

		var pepRequest = new PEPRequest(null, requestObjects);
		expect(pepRequest).to.not.equals(null);
		expect(pepRequest).to.not.equals(undefined);

		expect(JSON.parse(pepRequest.toXACMLJson())).to.have.property("Request");
		var request = JSON.parse(pepRequest.toXACMLJson()).Request;

		expect(request).to.have.property("Category");
		expect(request.Category).to.have.length(3);

		var res_subject;

		request.Category.forEach(function (category) {
			if (category.CategoryId === XACML3.ID_SUBJECT_CATEGORY_ACCESS_SUBJECT) {
				res_subject = category;
			}
		});

		expect(res_subject).to.not.equal(undefined);
		expect(res_subject.Attribute).to.have.length(3);
	});

});