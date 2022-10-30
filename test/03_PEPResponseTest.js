var chai = require('chai');
var expect = chai.expect;
var Obligation = require("./../lib/Obligation");
var PEPResponse = require("./../lib/PEPResponse");

var response= {
	"Response" : {
		"Result" : [{
			"Decision" : "Permit",
			"Status" : {
				"StatusMessage" : "success",
				"StatusCode" : {
					"Value" : "urn:oasis:names:tc:xacml:1.0:status:ok"
				}
			},
			"Obligations" : []
		},{
			"Decision" : "Permit",
			"Status" : {
				"StatusMessage" : "success",
				"StatusCode" : {
					"Value" : "urn:oasis:names:tc:xacml:1.0:status:ok"
				}
			},
			"Obligations" : [{
				"Id" : "CE::NOTIFY",
				"AttributeAssignment" : [{
					"AttributeId" : "Message",
					"Value" : ["Request is allowed"]
				}]
			}]
		},{
			"Decision" : "Deny",
			"Status" : {
				"StatusMessage" : "success",
				"StatusCode" : {
					"Value" : "urn:oasis:names:tc:xacml:1.0:status:ok"
				}
			},
			"Obligations" : [{
				"Id" : "CE::NOTIFY",
				"AttributeAssignment" : [{
					"AttributeId" : "Message",
					"Value" : ["Request is denied"]
				}]
			}]
		},{
			"Decision" : "Indeterminate",
			"Status" : {
				"StatusMessage" : "Something is wrong",
				"StatusCode" : {
					"Value" : "urn:oasis:names:tc:xacml:1.0:status:error"
				}
			}
		},{
			"Decision" : "Random",
			"Status" : {
				"StatusMessage" : "Something is wrong",
				"StatusCode" : {
					"Value" : "urn:oasis:names:tc:xacml:1.0:status:error"
				}
			}
		}]
	}
};

describe("PEPResponse Creation", function() {
	it ("Should successfully create a PEPResponse without any obligation", function() {
		var pepResponse = new PEPResponse(response.Response[0]);
		expect(pepResponse).to.not.equal(null);
		expect(pepResponse).to.not.equal(undefined);
		expect(pepResponse.allowed()).to.equal(true);
	});

	it ("Should successfully create a PEPResponse with obligation", function() {
		var pepResponse = new PEPResponse(response.Response[1]);
		expect(pepResponse).to.not.equal(null);
		expect(pepResponse).to.not.equal(undefined);
		expect(pepResponse.allowed()).to.equal(true);
		expect(pepResponse.getObligations()['CE::NOTIFY']).to.not.equal(null);
	});

	it ("Should successfully create a PEPResponse with deny decision", function() {
		var pepResponse = new PEPResponse(response.Response[2]);
		expect(pepResponse).to.not.equal(null);
		expect(pepResponse).to.not.equal(undefined);
		expect(pepResponse.allowed()).to.equal(false);
		expect(pepResponse.getObligations()['CE::NOTIFY']).to.not.equal(null);
	});

	it ("Should throw error in case of indeterminate", function() {
		var pepResponse = new PEPResponse(response.Response[3]);
		expect(pepResponse).to.not.equal(null);
		expect(pepResponse).to.not.equal(undefined);
		expect(() => pepResponse.allowed()).to.throw("Decision: Indeterminate - Status Code: urn:oasis:names:tc:xacml:1.0:status:error, Status Message: Something is wrong");
	});

	it ("Should throw error in case of other decision", function() {
		var pepResponse = new PEPResponse(response.Response[4]);
		expect(pepResponse).to.not.equal(null);
		expect(() => pepResponse.allowed()).to.throw("Invalid response from PDP");
	});
});
