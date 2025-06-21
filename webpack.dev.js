
var path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		'myams': './pkg/js/myams.js',
		'emerald': './pkg/js/emerald.js',
		'darkmode': './pkg/js/darkmode.js',
		'lightmode': './pkg/js/lightmode.js'
	},
	output: {
		path: path.resolve(__dirname, 'src', 'myams_js', 'static', 'js', 'dev'),
		filename: '[name]-dev.js',
		assetModuleFilename: '../../css/webfonts/[name][ext]'
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
				type: 'asset/resource'
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				type: 'asset/resource'
			}
		]
	},
	devtool: 'source-map'
};
