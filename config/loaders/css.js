const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('../paths');
const path = require('path');
const publicPath = paths.servedPath;
const isProd = process.env.NODE_ENV == 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
const cssFilename = 'static/css/[name].[contenthash:8].css';
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ? // Making sure that the publicPath goes back to to build folder.
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};
const postCssLoaderOptions = {
  // Necessary for external CSS imports to work
  // https://github.com/facebookincubator/create-react-app/issues/2677
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009',
    }),
  ],
}

const baseObjectConfig = {
  test: /\.(scss|sass|css)$/i,
}

const sassLoaderOptions = {
  loader: "sass-loader",
}

const baseCssLoaderConfig = {
  importLoaders: 2,
  localIdentName: "[local]__[hash:base64:6]",
  camelCase: true,
  modules: true
}

// The notation here is somewhat confusing.
// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader normally turns CSS into JS modules injecting <style>,
// but unlike in development configuration, we do something different.
// `ExtractTextPlugin` first applies the "postcss" and "css" loaders
// (second argument), then grabs the result CSS and puts it into a
// separate file in our build process. This way we actually ship
// a single CSS file in production instead of JS code injecting <style>
// tags. If you use code splitting, however, any async bundles will still
// use the "style" loader inside the async code so CSS from them won't be
// in the main CSS file.
const production = Object.assign({
  loader: ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: require.resolve('style-loader'),
        use: [
          {
            loader: require.resolve('css-loader'),
            options: Object.assign({
              minimize: true,
              sourceMap: shouldUseSourceMap,
            }, baseCssLoaderConfig),
          },
          {
            loader: require.resolve('resolve-url-loader'),
          },
          {
            loader: require.resolve('postcss-loader'),
            options: postCssLoaderOptions,
          },
          sassLoaderOptions,
        ],
      },
      extractTextPluginOptions
    )
  ),
  // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
}, baseObjectConfig)

// "postcss" loader applies autoprefixer to our CSS.
// "css" loader resolves paths in CSS and adds assets as dependencies.
// "style" loader turns CSS into JS modules that inject <style> tags.
// In production, we use a plugin to extract that CSS to a file, but
// in development "style" loader enables hot editing of CSS.
const development = Object.assign({
  use: [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: baseCssLoaderConfig,
    },
    {
      loader: require.resolve('resolve-url-loader'),
    },
    {
      loader: require.resolve('postcss-loader'),
      options: postCssLoaderOptions,
    },
    sassLoaderOptions,
  ],
}, baseObjectConfig)

module.exports = isProd ? production : development
