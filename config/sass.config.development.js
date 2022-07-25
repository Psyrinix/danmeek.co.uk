const sassConfig = require("./sass.config.base.js");

module.exports = function() {
	const developmentConfig = sassConfig;

	developmentConfig.sourceComments = "true";

	return developmentConfig;
};