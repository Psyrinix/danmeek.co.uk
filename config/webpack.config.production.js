const webpackConfig = require("./webpack.config.base.js");

module.exports = function() {
	const productionConfig = webpackConfig;

	productionConfig.mode = "production";

	return productionConfig;
};