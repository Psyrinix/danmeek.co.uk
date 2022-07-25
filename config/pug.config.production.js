const pugConfig = require("./pug.config.base.js");

module.exports = function () {
	const productionConfig = pugConfig;

	productionConfig.locals.platform = "production";
	productionConfig.compileDebug = false;
	productionConfig.pretty = true;
	productionConfig.verbose = false;

	return productionConfig;
};