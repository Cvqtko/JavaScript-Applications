// js-tests/foo/myNewTestFile.js
define([
	"chai/chai",
	"mocha/mocha",
], function(chai) {
	var assert = chai.assert;

	describe("component X", function() {
		it("should do Y", function() {
			assert.equal(1, 1, "Hopefully 1 == 1");
		});
		it("should do Z", function() {
			// Make more assertions here
		});
	});
});