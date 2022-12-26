
var path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		'myams-mini': './src/js/myams-mini.js'
	},
	output: {
		path: path.resolve(__dirname, 'pkg', 'js', 'prod'),
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
			}
		]
	}
};
