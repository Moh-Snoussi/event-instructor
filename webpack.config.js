const path = require('path');

module.exports = {

	mode: "development",
	entry: './public/index.js',
	module: {
		rules: [
			{
				test   : /\.tsx?$/,
				use    : 'ts-loader',
				exclude: /node_modules/,
			}, {
				use: {
					loader : 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties']
					}

				}
			}
		],
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
};