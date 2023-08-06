const path = require('path')
// importuję bibliotekę [path] z [node.js]
const HtmlWebpackPlugin = require('html-webpack-plugin')
// importuję odpowiedni plugin
module.exports = {
	entry: './src/app.js',
	devServer: {
		static: './',
	},
	// definiuję plik wejściowy
	output: {
		path: path.resolve(__dirname, 'build'),
		// definiuję ścieżkę wyjściową
		filename: 'app.min.js',
		// definiuję nazwę pliku wyjściowego
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				// określam, jakie pliki
				// będą brane pod uwagę
				exclude: /node_modules/,
				// określam wykluczenia
				use: 'babel-loader',
				// określam, jaki [loader]
				// ma być wykorzystany
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			// wskazuję plik źródłowy
			filename: 'index.html',
			// określam nazwę dla pliku
		}),
	],
}
// eksportuję ustawienia dla webpacka
