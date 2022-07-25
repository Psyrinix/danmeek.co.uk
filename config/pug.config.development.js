const pugConfig = require("./pug.config.base.js");

module.exports = function () {
	const developmentConfig = pugConfig;

	developmentConfig.compileDebug = true;
	developmentConfig.locals.platform = "development";
	developmentConfig.pretty = true;
	developmentConfig.verbose = true;

	return developmentConfig;
};