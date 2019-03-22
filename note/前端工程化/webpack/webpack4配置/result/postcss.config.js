module.exports = {
  // parser: 'postcss-strip-inline-comments',
  plugins: [
    require('autoprefixer')({
      browsers: ['cover 99.5% in CN']
    }),
    require('postcss-import')(),
  ]
};