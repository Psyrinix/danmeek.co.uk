module.exports = {
	cache: true,
	entry: {
		index: "./src/ts/index.ts"
	},
	output: {
		filename: "[name].js"
	},
	resolve: {
		extensions: [".ts", ".tsx"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: ["babel-loader", "ts-loader"]
			}
		]
	}
};