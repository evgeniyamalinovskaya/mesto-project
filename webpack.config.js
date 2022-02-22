const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');// подключите плагин
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин очистки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // подключили к проекту mini-css-extract-plugin

module.exports = {
    entry: { main: './src/components/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/, // добавим правило для обработки файлов
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/, // регулярное выражение, которое ищет все файлы с такими расширениями
                type: 'asset/resource'
            },
            {
                test: /\.css$/, // применять это правило только к CSS-файлам
                use: [MiniCssExtractPlugin.loader, { // при обработке этих файлов нужно использовать
                    loader: 'css-loader', // MiniCssExtractPlugin.loader и css-loader
                    options: { importLoaders: 1 } // добавьте объект options
                }, 'postcss-loader'] // Добавили postcss-loader
            },
        ]
    },
    plugins: [ // добавьте массив
        new HtmlWebpackPlugin({
            template: './src/index.html' // путь к файлу index.html
        }),
        new CleanWebpackPlugin(), // вызвали плагин очистки dist
        new MiniCssExtractPlugin() // подключение плагина для объединения файлов
    ]
};