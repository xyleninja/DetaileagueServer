var summonerService = require('./summoner.services/summoner.service.route');
var imageService = require('./image.services/image.service.route');

exports.importAll = (_app, _database) =>{
    summonerService.import(_app, _database);
    imageService.import(_app);
}