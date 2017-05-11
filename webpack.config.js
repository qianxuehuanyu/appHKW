const pathTo = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')

const entry = {};
const weexEntry = {};
const vueWebTemp = 'temp';
const hasPluginInstalled = fs.existsSync('./web/plugin.js');
var isWin = /^win/.test(process.platform);


function getEntryFileContent(entryPath, vueFilePath) {
  let relativePath = pathTo.relative(pathTo.join(entryPath, '../'), vueFilePath);
  let contents = '';
  if (hasPluginInstalled) {
    const plugindir = pathTo.resolve('./web/plugin.js');
    contents = 'require(\'' + plugindir + '\') \n';
  }
  if (isWin) {
    relativePath = relativePath.replace(/\\/g,'\\\\');
  }
  contents += 'var App = require(\'' + relativePath + '\')\n';
  contents += 'App.el = \'#root\'\n';
  contents += 'new Vue(App)\n';
  return contents;
}

var fileType = '';

function walk(dir) {
  dir = dir || '.';
  const directory = pathTo.join(__dirname, 'src', dir);
  fs.readdirSync(directory)
    .forEach((file) => {
      const fullpath = pathTo.join(directory, file);
      const stat = fs.statSync(fullpath);
      const extname = pathTo.extname(fullpath);
      if (stat.isFile() && extname === '.vue' || extname === '.we') {
        if (!fileType) {
          fileType = extname;
        }
        if (fileType && extname !== fileType) {
          console.log('Error: This is not a good practice when you use ".we" and ".vue" togither!');
        }
        const name = pathTo.join(dir, pathTo.basename(file, extname));
        if (extname === '.vue') {
          const entryFile = pathTo.join(vueWebTemp, dir, pathTo.basename(file, extname) + '.js');
          fs.outputFileSync(pathTo.join(entryFile), getEntryFileContent(entryFile, fullpath));
          
          entry[name] = pathTo.join(__dirname, entryFile) + '?entry=true';
        } 
        weexEntry[name] = fullpath + '?entry=true';
      } else if (stat.isDirectory() && file !== 'build' && file !== 'include') {
        const subdir = pathTo.join(dir, file);
        walk(subdir);
      }
    });
}

walk();
// web need vue-loader
const plugins = [
  new webpack.optimize.UglifyJsPlugin({minimize: true}),
  new webpack.BannerPlugin({
    banner: '// { "framework": ' + (fileType === '.vue' ? '"Vue"' : '"Weex"') + '} \n',
    raw: true,
    exclude: 'Vue'
  })
  // 复制指定目录，打开本地图片需要增加java类
  // new TransferWebpackPlugin([
  //   {from: './src/img', to: './img'},
  //   {from: './src/img', to: '../platforms/android/app/src/main/assets/dist/img'}
  // ], pathTo.resolve(__dirname))
];
function getBaseConfig () {
  return {
    context: pathTo.join(__dirname, ''),
    entry: entry,
    output: {
      path: pathTo.join(__dirname, 'dist'),
      filename: '[name].web.js',
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'src': pathTo.resolve(__dirname, './src'),
        'common': pathTo.resolve(__dirname, './src/common/'),
        'views': pathTo.resolve(__dirname, './src/views/'),
        'components': pathTo.resolve(__dirname, './src/components/')
      }
    },
    module: {
      // webpack 2.0 
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader'
          }],
          exclude: /node_modules/
        },
        {
          test: /\.vue(\?[^?]+)?$/,
          use: []
        }
      ]
    },
    devServer: {
      contentBase: './',
      open: true,
      port: 8080,
      inline: true
    },
    plugins: plugins
  }
}

var webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[1].use.push({loader: 'vue-loader'})

var weexConfig = getBaseConfig()
weexConfig.output.filename = '[name].js'
weexConfig.module.rules[1].use.push({loader: 'weex-loader'})

var exports = [webConfig, weexConfig];

if (fileType === '.we') {
  exports = weexConfig;
}
module.exports = exports;
