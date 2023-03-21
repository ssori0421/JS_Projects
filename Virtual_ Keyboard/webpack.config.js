const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
module.exports = {
  entry: './src/js/index.js', //entry: js파일의 진입점을 나타냄
  output: {
    //output: build를 했을 떄 bundle 파일 관련 속성을 나타냄(이름, 위치할 경로, 다른 파일이 있다면 제거해줘)
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'), //path를 불러와서 resolve메소드를 사용 => webpack이 절대경로를 찾을 수 있도록 함
    clean: true,
  },
  devtool: 'source-map', //source-map: build된 파일과 원본 파일을 연결시켜줌
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    open: true, //webpack devServer를 열 때마다 새 창을 열어줘
    watchFiles: 'index.html', //index.html 파일에 변화가 있을 때 마다 reload를 해줘
  },
  plugins: [
    new HtmlWebpackPlugins({
      title: 'keyboard', //title속성: 브라우저 띄웠을 때 타이틀 지정
      template: './index.html', //template속성: build를 할 때 index.html파일을 사용
      inject: 'body', //inject속성: build를 할 때 js파일을 body부분에 넣을 것인지, head부분에 넣을 것인지 설정
      favicon: './favicons.png', // here
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
