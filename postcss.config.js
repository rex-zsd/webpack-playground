var autoprefixer = require('autoprefixer'); // 自动补全css前缀

autoprefixer = autoprefixer({
    browsers: ['iOS >= 8', 'Android > 4']
});

module.exports = {
    plugins: [autoprefixer]
};
