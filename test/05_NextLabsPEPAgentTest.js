var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var Category = require("../lib/category/Category");
var Subject = require("../lib/category/Subject")
var Resource = require("../lib/category/Resource");
var Action = require("../lib/category/Action");
var Application = require("../lib/category/Application");
var Environment =  require("../lib/category/Environment");
var Host = require("../lib/category/Host");
var PoD = require("../lib/category/DiscretionaryPolicies");
var Recipient = require("../lib/category/Recipient");

var NextLabsPEPAgent = require("../NextLabsPEPAgent");
var PEPResponse = NextLabsPEPAgent.PEPResponse;

var subject0 = new Subject("John");
var resource = new Resource("C:/Test");
var action = new Action("Access");
var application = new Application("MSWord");
var options = {host:"10.63.0.209",resourcePath:"/dpc/PDPConnector/go"};

describe("Send request by NextLabsPEPAgent", function() {
	var agent;

	it ("Should successfully create the agent with an engine", function() {
		agent = new NextLabsPEPAgent(options);
		expect(agent.pdpEngine).to.not.equal(undefined);
	});

	it ("Should successfully send request and get back response for single request", function() {
		var responsePromise = agent.decide(subject0, resource, action, application);

		return expect(responsePromise).to.eventually.be.an.instanceof(PEPResponse);
	});

	it ("Should successfully send request and get back response for multi request", function() {
		var association = [];
		var resource1 = new Resource("C:/Test1");
		association.push(resource);
		association.push(resource1);
		var responsePromise = agent.bulkDecide(association, subject0, action, application);

		return expect(responsePromise).to.eventually.have.length(2);
	});
}) 



