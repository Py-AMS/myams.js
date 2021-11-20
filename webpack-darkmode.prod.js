
var path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		'myams': './src/js/darkmode.js'
	},
	output: {
		path: path.resolve(__dirname, 'pkg', 'js', 'prod'),
		filename: 'darkmode.js'
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
			},
			{
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [ 'url-loader' ]
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				use: [ 'file-loader' ]
			}
		]
	}
};