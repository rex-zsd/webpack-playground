var fs = require('fs');
var path = require('path');

function getPages(basePath) {
    return fs.readdirSync(basePath).map(function(name) {
        var pagePath = path.resolve(basePath, name);
        if (fs.statSync(pagePath).isDirectory()) {
            var config;
            try {
                config = require(path.resolve(pagePath, 'config.js'));
            } catch (err) {
                config = {};
            }
            return {name: name, entry: pagePath, config: config};
        }
    });
}

module.exports = getPages;
