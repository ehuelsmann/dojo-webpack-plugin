module.exports = function(env) {
	it("env should specify foopath", function() {
		env.foopath.should.be.eql("test/foo");
	});
	return {
		paths: {foo: env.foopath},
		aliases: [[/^fooalias$/, function() {return env.foopath;}]],
		noConfigApi:!!env.noConfigApi,
		has:{'dojo-config-api': !env.noConfigApi}
	};
};
