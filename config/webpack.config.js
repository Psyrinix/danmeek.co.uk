module.exports = function(environment) {
	const webpackConfig = require(`./webpack.config.${environment}.js`);

	return webpackConfig();
};