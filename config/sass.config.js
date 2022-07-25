module.exports = function(environment) {
	const sassConfig = require(`./sass.config.${environment}.js`);

	return sassConfig();
};