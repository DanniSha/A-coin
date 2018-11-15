const path = require('path');

module.exports = {
    entry: './assets/js/main.mjs',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};