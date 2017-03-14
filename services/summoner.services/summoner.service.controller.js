var request = require('request');
var config = require('../../config.json');

//Gets Summoner
exports.getSummoner = (req,res,database) => {

    let summonerName    = req.params.summonerName;
    let region          = req.params.region;

    let summoner;

    if(summonerName == null){

        let error = new Object({
            "msg" : "Summonername not send.",
            "errorCode" : "1.1.1"
        })
        res.status(400).send(JSON.stringify(error))
     return;   
    }

    sqlString = "SELECT * FROM `summoners` WHERE name = " + database.escapeString(summonerName) + " AND region = " + database.escapeString(region);

    database.execQuery(sqlString,
        function (results) {

            if(results[0])
            {
                //Yay Summoner found on our server.
                console.log(results[0].id);
            } else {

                //Create new Summoner
                let summoner = new Object();

                //Get Summoner from RIOT-API || id - name - level
                request('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + summonerName +'?api_key=' + config.devKey, function (error, response, body) {
                    console.log('error:', error);
                    console.log('statusCode:', response && response.statusCode);
                    console.log('body:', body);

                    let data = JSON.parse(body);

                    if(response.statusCode == 404) {
                        res.status(404).send(data['status']['message']);
                        return;
                    }

                    summoner['id'] = data['mute4win']['id'];
                    summoner['name'] = data['mute4win']['name'];
                    summoner['region'] = region.toLowerCase();
                    summoner['level'] = data['mute4win']['summonerLevel'];

                    //Get Summoner from RIOT-API || normalWins - sdGames - sdWins
                    request('https://euw.api.pvp.net/api/lol/euw/v1.3/stats/by-summoner/' + summoner['id'] + '/summary?api_key=' + config.devKey, function(error, response, body) {
                        console.log('error:', error);
                        console.log('statusCode:', response && response.statusCode);
                        console.log('body:', body);

                        let data = JSON.parse(body);

                        if(response.statusCode >= 400) {
                            res.status(data['status']['status_code']).send(data['status']['message']);
                            return;
                        }

                        summoner['normalWins'] = data['playerStatSummaries'].find(o => o.playerStatSummaryType == 'Unranked')['wins'];
                        summoner['sdWins'] = data['playerStatSummaries'].find(o => o.playerStatSummaryType == 'RankedSolo5x5')['wins'];
                        summoner['sdGames'] = data['playerStatSummaries'].find(o => o.playerStatSummaryType == 'RankedSolo5x5')['losses'] + summoner['sdWins'];

                        res.send(summoner);

                    })
                });
            }
        },
        function (error) {
            console.log(error);
        });
}