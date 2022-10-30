var expect = require("chai").expect;

var Category = require("../lib/category/Category");
var Subject = require("../lib/category/Subject")
var Resource = require("../lib/category/Resource");
var Action = require("../lib/category/Action");
var Application = require("../lib/category/Application");
var Environment =  require("../lib/category/Environment");
var NamedAttribute =  require("../lib/category/NamedAttribute");
var Host = require("../lib/category/Host");
var PoD = require("../lib/category/DiscretionaryPolicies");
var Recipient = require("../lib/category/Recipient");
var XACML3 = require("../lib/xacml/XACML3");
var NextLabsXACML = require("../lib/xacml/NextLabsXACML");

describe("Categories creation", function() {
	describe("Subject creation", function() {
		var subject = new Subject("john");

		it ("Should successfully create a new subject with id", function() {	
			expect(subject).to.not.equal(null);
			expect(subject.getAttribute(XACML3.ID_SUBJECT_SUBJECT_ID)).to.equal("john");
		});

		it ("Should successfully add an attribute to the subject", function() {
			subject.addAttribute("citizenship","USA");
			expect(subject.getAttribute("citizenship")).to.equal("USA");
		});

		it ("Should throw error when creating a new subject without input", function() {
			expect(() => new Subject()).to.throw("Object id is null or undefined");
		});
	});

	describe("Resource creation", function() {
		var resource = new Resource("C:/Test");

		it ("Should successfully create new resource with id", function() {	
			expect(resource).to.not.equal(null);
			expect(resource.getAttribute(XACML3.ID_RESOURCE_RESOURCE_ID)).to.equal("C:/Test");
		});

		it ("Should successfull set the resource type", function() {
			resource.setResourceType("fso");
			expect(resource.getResourceType()).to.equal("fso");
		});

		it ("Should successfull add an attribute to the resource", function() {
			resource.addAttribute("author","John");
			expect(resource.getAttribute("author")).to.equal("John");
		});

		it ("Should throw error when creating a new resource without input", function() {
			expect(() => new Resource()).to.throw("Object id is null or undefined");
		});
	});

	describe("Action creation", function() {
		var action = new Action("ACCESS");

		it ("Should successfully create new action with id", function() {	
			expect(action).to.not.equal(null);
			expect(action.getAttribute(XACML3.ID_ACTION_ACTION_ID)).to.equal("ACCESS");
		});

		it ("Should throw error when creating a new action without input", function() {
			expect(() => new Action()).to.throw("Object id is null or undefined");
		});
	});

	describe("Application creation", function() {
		var application = new Application("MSWord");

		it ("Should successfully create a new application with id", function() {	
			expect(application).to.not.equal(null);
			expect(application.getAttribute(NextLabsXACML.ID_APPLICATION_APPLICATION_ID)).to.equal("MSWord");
		});

		it ("Should throw error when creating a new application without input", function() {
			expect(() => new Application()).to.throw("Object id is null or undefined");
		});
	});

	describe("Environment creation", function() {
		var environment = new Environment();

		it ("Should successfully create a new environment", function() {	
			expect(environment).to.not.equal(null);
		});
	});

	describe("Named attribute creation", function() {
		var namedAttribute = new NamedAttribute("random1");

		it ("Should successfully create a new named attribute", function() {	
			expect(namedAttribute).to.not.equal(null);
		});


		it ("Should throw error for invalid name", function() {	
			expect(() => new NamedAttribute()).to.throw("Attribute name is null or undefined");
		});
	});

	describe("Policy on demand creation", function() {
		var pod = new PoD("POLICY \"test/allow-all\" ATTRIBUTE DOCUMENT_POLICY FOR (TRUE AND TRUE) ON (TRUE AND TRUE) TO (TRUE AND TRUE) BY ((TRUE AND TRUE) AND (TRUE AND TRUE) AND (TRUE AND TRUE)) WHERE (TRUE AND (TRUE AND user.name = \"Amila\")) DO allow");

		it ("Should successfully create a new policy on demand with pql", function() {	
			expect(pod).to.not.equal(null);
			expect(pod.getAttribute(NextLabsXACML.ID_POD_IGNORE_BUILT_IN)).to.equal("false");
		});

		var pod1 = new PoD("POLICY \"test/allow-all\" ATTRIBUTE DOCUMENT_POLICY FOR (TRUE AND TRUE) ON (TRUE AND TRUE) TO (TRUE AND TRUE) BY ((TRUE AND TRUE) AND (TRUE AND TRUE) AND (TRUE AND TRUE)) WHERE (TRUE AND (TRUE AND user.name = \"Amila\")) DO allow", true);

		it ("Should successfully create a new policy on demand with pql and flag", function() {	
			expect(pod1).to.not.equal(null);
			expect(pod1.getAttribute(NextLabsXACML.ID_POD_IGNORE_BUILT_IN)).to.equal("true");
		});


		it ("Should throw error when creating a new subject without input", function() {
			expect(() => new PoD()).to.throw("PQL is null or undefined");
		});
	});

	describe("Host creation", function() {
		var host;

		it ("Should successfully create a new host with a name", function() {
			host = new Host("LABS_PC")	
			expect(host).to.not.equal(null);
			expect(host.getAttribute(NextLabsXACML.ID_HOST_HOST_NAME)).to.equal("LABS_PC");
			expect(host.getAttribute(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS)).to.equal('2130706433');
		});

		it ("Should successfully create a new host with an address", function() {
			host = new Host(0x7f000001)	
			expect(host).to.not.equal(null);
			expect(host.getAttribute(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS)).to.equal('2130706433');
		});

		it ("Should successfully create a new host with default value when no input is supplied", function() {
			host = new Host()	
			expect(host).to.not.equal(null);
			expect(host.getAttribute(NextLabsXACML.ID_HOST_HOST_NAME)).to.equal("localhost");
			expect(host.getAttribute(NextLabsXACML.ID_HOST_HOST_INET_ADDRESS)).to.equal('2130706433');
		});
	});

	describe("Recipient creation", function() {
		var recipient;

		it ("Should successfully create a single recipient with id ", function() {	
			recipient = new Recipient("abc");
			recipient.addAttribute("email", "abc@gmail.com")
			expect(recipient).to.not.equal(null);
			expect(recipient.getAttribute(NextLabsXACML.ID_RECIPIENT_RECIPIENT_ID)).to.equal("abc");
			expect(recipient.getAttribute("email")).to.equal("abc@gmail.com");
		});

		it ("Should successfully create a recipient object with multiple email addresses", function() {
			var recipients = ["abc@gmail.com", "def@gmail.com"];
			recipient = new Recipient(recipients);
			expect(recipient).to.not.equal(null);
			expect(recipient.getAttribute(NextLabsXACML.ID_RECIPIENT_RECIPIENT_EMAIL)).to.have.length(2);
		});

		it ("Should throw error when creating a new recipient without input", function() {
			expect(() => new Recipient()).to.throw("Recipient id or email is null or undefined");
		});
	});

});