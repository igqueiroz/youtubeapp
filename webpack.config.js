var webpack = require("webpack");

module.exports = {
	entry: "./src/index.js",
	output: {
		path: "dist/assets",
		filename: "bundle.js",
		publicPath: "assets"
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jquery: "jquery",
			"window.jQuery": "jquery",
			jQuery:"jquery"
		})
	],
	devServer: {
		inline: true,
		contentBase: './dist',
		port: 3000
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: ["babel-loader"],
				query: {
					presets: ["env", "stage-0", "react"]
				}
			},
			{
				test: /\.json$/,
				exclude: /(node_modules)/,
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				loader: 'style-loader!css-loader!autoprefixer-loader'
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules)/,
				loader: 'style-loader!css-loader!autoprefixer-loader!sass-loader'
			},
			{
		        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url?limit=10000&mimetype=application/font-woff'
		    },
		    {
		        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url?limit=10000&mimetype=application/octet-stream'
		    },
		    {
		        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'file'
		    },
		    {
		        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
		        loader: 'url?limit=10000&mimetype=image/svg+xml'
		    }
		]
	}
}







