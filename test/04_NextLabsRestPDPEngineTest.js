var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var NextLabsRestPDPEngine = require("./../lib/NextLabsRestPDPEngine");


var dummyRequest = {
	"Request" : {
		"ReturnPolicyIdList" : false,
		"Category" : [{
			"CategoryId" : "urn:nextlabs:names:evalsvc:1.0:attribute-category:application",
			"Attribute" : [{
				"AttributeId" : "urn:nextlabs:names:evalsvc:1.0:application:application-id",
				"Value" : "JUnit",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}, {
				"AttributeId" : "id",
				"Value" : "APP-654",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}]
		}, {
			"CategoryId" : "urn:oasis:names:tc:xacml:1.0:subject-category:access-subject",
			"Attribute" : [{
				"AttributeId" : "urn:oasis:names:tc:xacml:1.0:subject:subject-id",
				"Value" : "0173b47a-bca2-4fda-a419-6043717b682b",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}, {
				"AttributeId" : "name",
				"Value" : "udo.myaxa@axa.ch",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}]
		}, {
			"CategoryId" : "urn:oasis:names:tc:xacml:3.0:attribute-category:action",
			"Attribute" : [{
				"AttributeId" : "urn:oasis:names:tc:xacml:1.0:action:action-id",
				"Value" : "AENDERN",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}]
		}, {
			"CategoryId" : "urn:oasis:names:tc:xacml:3.0:attribute-category:resource",
			"Attribute" : [{
				"AttributeId" : "urn:oasis:names:tc:xacml:1.0:resource:resource-id",
				"Value" : "3202004",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}, {
				"AttributeId" : "xacmlResourceType",
				"Value" : "VV_VERTRAG_DETAILDATEN",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}, {
				"AttributeId" : "gesnrb",
				"Value" : "L01",
				"DataType" : "http://www.w3.org/2001/XMLSchema#string",
				"IncludeInResult" : false
			}]
		}]
	}
};

var engine;
var options = {host:"10.63.0.209"};

describe("Initialize NextLabsPDPEngine", function() {
	it ("Should successfully initialize the engine with only host as mandatory", function() {
		engine = new NextLabsRestPDPEngine(options);
		expect(engine).to.not.equal(null);
		expect(engine).to.not.equal(undefined);
		expect(engine._endpoint).to.equal("http://10.63.0.209:58080/dpc/authorization/pdp");
	});

	it("Should throw exception when host is not provided", function() {
		expect(() => new NextLabsRestPDPEngine({})).to.throw("Host is null or undefined");
	})
});


describe("Send dummy post request without authentication required", function() {
	it ("Should successfully send request and receive a promise for a dummy request", function() {
		options.resourcePath = "/dpc/PDPConnector/go";
		engine = new NextLabsRestPDPEngine(options);

		var resultPromise = engine.evaluate(JSON.stringify(dummyRequest));

		return expect(resultPromise).to.eventually.have.property("Response");
	})
});



describe("Send dummy post request with authentication required", function() {
	it ("Should successfully send request and receive a promise for a dummy request", function() {
		 this.timeout(15000);

		options = {
			protocol: 'https',
			host:'jpc-cloud.platform.nextlabs.solutions',
			port: 443,
			authenticationType:'CAS_AUTH',
			casUsername: 'Administrator',
			casPassword:'123next!'	
		};
		engine = new NextLabsRestPDPEngine(options);

		var resultPromise = engine.evaluate(JSON.stringify(dummyRequest));

		return expect(resultPromise).to.eventually.have.property("Response");
	});

	it ("Should not require authentication for near subsequence request", function() {
		var resultPromise = engine._sendRequest(JSON.stringify(dummyRequest));
		return expect(resultPromise).to.eventually.have.property("Response");
	});
});