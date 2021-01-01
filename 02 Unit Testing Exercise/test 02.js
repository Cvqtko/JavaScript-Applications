// js-tests/foo/myNewTestFile.js
define([
	"chai/chai",
	"mocha/mocha",
], function(chai) {
	var assert = chai.assert;

	describe('isOddOrEven', function() {
		it('should return undefined with a number parameter',  function() {
			expect(isOddOrEven(13).to.equal(undefined,"Function did not return the correct result!"))
		});
	});
});