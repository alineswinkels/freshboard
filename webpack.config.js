var ExtractTextPlugin = require("extract-text-webpack-plugin"),
    path = require('path');

var sassOptions = {
   outputStyle: 'nested',
   includePaths: [
       path.resolve(__dirname, 'node_modules/bootstrap-sass/assets/stylesheets')
   ]
};

module.exports = {
   entry : [
       __dirname + '/theme/freshboard/src/js/app.js',
       __dirname + '/theme/freshboard/src/scss/app.scss'
   ],
   output: {
       path: __dirname + "/theme/freshboard/build/",
       filename: 'js/app.js'
   },
   resolve: {
       modulesDirectories: ['node_modules', 'bower_components'],
   },
   module: {
       loaders: [{
           test: /\.scss$/,
           loader: ExtractTextPlugin.extract(
               'style',
               'raw!autoprefixer?{browsers:["last 2 version", "ie >= 9"]}!sass?' + JSON.stringify(sassOptions)
           )
       }]
   },
   plugins: [
       new ExtractTextPlugin('css/app.css')
   ]
};
