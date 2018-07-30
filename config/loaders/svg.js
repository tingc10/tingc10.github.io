module.exports = {
  test: /\.svg$/,
  use: [
    "babel-loader",
    {
      loader: "react-svg-loader",
      options: {
        svgo: {
          plugins: [
            {
              removeTitle: false
            }
          ],
          floatPrecision: 2
        }
      }
    }
  ]
}
