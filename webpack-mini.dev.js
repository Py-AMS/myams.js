
var path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		'myams-mini': './src/js/myams-mini.js'
	},
	output: {
		path: path.resolve(__dirname, 'pkg', 'js', 'dev'),
		filename: '[name]-dev.js'
	},
	externals: {
		jquery: 'jquery',
		bootstrap: 'bootstrap',
		fontawesome: '@fortawesome/fontawesome-free'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			}
		]
	},
	devtool: 'source-map'
};
