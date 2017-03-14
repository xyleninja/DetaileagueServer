// Service
var controller = require('./image.service.controller');

//Main-Function import
exports.import = (_app, _database) => {
    _app.get('/api/v1/assets/base_icons/:image', (req,res) => {
        controller.getImage(req,res);
    })
}