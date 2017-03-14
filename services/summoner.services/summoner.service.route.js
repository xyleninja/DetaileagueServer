// Service
var controller = require('./summoner.service.controller');

//Main-Function import
exports.import = (_app, _database) => {
    _app.get('/api/v1/region/:region/summoner/:summonerName', (req,res) => {
        controller.getSummoner(req,res, _database);
    })
}