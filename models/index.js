const path = require('path'),
    fs = require('fs');
module.exports = function() {
    var models = {};
    var current = path.basename(__filename);

    fs.readdirSync(__dirname).forEach(function(file) {
        var model = file.split('.')[0];
        if (file != current) {
            models[model] = require(path.join(__dirname, model));
        }
    });

    return models;
}