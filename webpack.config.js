const path = require(`path`);

module.exports = {

  entry: [
    `./js/elements.js`,
    `./js/util.js`,
    `./js/debounce.js`,
    `./js/message.js`,
    `./js/load.js`,
    `./js/pin.js`,
    `./js/card.js`,
    `./js/filter.js`,
    `./js/upload.js`,
    `./js/preview.js`,
    `./js/form.js`,
    `./js/map.js`,
    `./js/move.js`,
    `./js/main.js`
  ],

  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },

  devtool: false

};
