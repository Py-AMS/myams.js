
var path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		'myams': './src/js/emerald.js'
	},
	output: {
		path: path.resolve(__dirname, 'pkg', 'js', 'prod'),
		filename: 'emerald.js',
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
	}
};
