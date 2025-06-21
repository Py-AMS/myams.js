
var path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		'myams-core': './pkg/js/myams-core.js'
	},
	output: {
		path: path.resolve(__dirname, 'src', 'myams_js', 'static', 'js', 'prod'),
		filename: '[name].js',
		assetModuleFilename: '../../css/webfonts/[name][ext]'
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
