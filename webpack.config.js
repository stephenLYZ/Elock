import webpack from 'webpack'
import path from 'path'

export default {
	devtool: 'source-map',
	entry: {
		app: [
			'webpack-hot-middleware/client?reload=true&path=http://localhost:3000/__webpack_hmr',
			'./src/index'
		],
		vendor: ['jquery', 'lodash']
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		publicPath: 'http://localhost:3000/build/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoEmitOnErrorsPlugin()
	]
}
