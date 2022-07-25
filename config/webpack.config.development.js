const webpackConfig = require("./webpack.config.base.js");

module.exports = function() {
	const developmentConfig = webpackConfig;
	developmentConfig.devtool = 'sourcemap'
	developmentConfig.mode = "development";
	developmentConfig.watch = false;

	return developmentConfig;
};