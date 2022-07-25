const sassConfig = require("./sass.config.base.js");

module.exports = function() {
	const productionConfig = sassConfig;

	productionConfig.outputStyle = "compressed";

	return productionConfig;
};