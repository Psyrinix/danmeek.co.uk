module.exports = function(environment) {
	const pugConfig = require(`./pug.config.${environment}.js`);

	return pugConfig();
};