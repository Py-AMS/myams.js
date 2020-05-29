
var path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		'myams': './src/js/myams.js'
	},
	output: {
		path: path.resolve(__dirname, 'pkg', 'js', 'dev'),
		filename: '[name]-dev.js'
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
	},
	devtool: 'source-map'
};
