const webpack = require('webpack') 
const path = require('path')
const HtmlWebpackPlugin =  require('html-webpack-plugin')

module.exports =  {
	entry: './src/app',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'ELock.[hash:8].js',
		publicPath: './'
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
	    new webpack.NoEmitOnErrorsPlugin(),
	    new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, 
            },
        }),
        new HtmlWebpackPlugin({
        	filename: 'index.html',
        	inject: true,
        	template: './deploy/index.ejs'
        })
	]
}
