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
                //Yay Summoner found on our server. Now check if 20 minutes have passed.
                if(Math.floor(Date.now() / 1000) - results[0].timeStamp >= 1200) {
                    
                } else {
                    res.send(results[0]);
                    return;
                }
            }
            //Create new Summoner
            let summoner = new Object();

            //Get Summoner from RIOT-API || id - name - level
            request('https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/' + summonerName +'?api_key=' + config.devKey, function (error, response, body) {

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

                    let data = JSON.parse(body);

                    if(response.statusCode >= 400) {
                        res.status(data['status']['status_code']).send(data['status']['message']);
                        return;
                    }

                    summoner['normalGames'] = 0;
                    summoner['normalWins'] = data['playerStatSummaries'].find(o => o.playerStatSummaryType == 'Unranked')['wins'];
                    summoner['sdWins'] = data['playerStatSummaries'].find(o => o.playerStatSummaryType == 'RankedSolo5x5')['wins'];
                    summoner['sdGames'] = data['playerStatSummaries'].find(o => o.playerStatSummaryType == 'RankedSolo5x5')['losses'] + summoner['sdWins'];

                    //Get Summoner from RIOT-API || soloDuo - flex3v3 - flex5v5
                    request('https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/' + summoner['id'] + '?api_key=' + config.devKey, function(error, response, body){

                        let data = JSON.parse(body);

                            if(response.statusCode >= 400) {
                                res.status(data['status']['status_code']).send(data['status']['message']);
                                return;
                            }

                        let soloDuo = data[summoner['id']].find(o => o.queue == 'RANKED_SOLO_5x5');
                        let flex3v3 = data[summoner['id']].find(o => o.queue == 'RANKED_FLEX_TT');
                        let flex5v5 = data[summoner['id']].find(o => o.queue == 'RANKED_FLEX_SR');

                        if(soloDuo != undefined) {
                            summoner['soloDuo'] = soloDuo['tier'];
                        } else summoner['soloDuo'] = "PROVISIONAL";
                        if(flex3v3 != undefined) {
                            summoner['flex3v3'] = flex3v3['tier'];
                        } else summoner['flex3v3'] = "PROVISIONAL";
                        if(soloDuo != undefined) {
                            summoner['flex5v5'] = flex5v5['tier'];
                        } else summoner['flex5v5'] = "PROVISIONAL";

                    //Save Summoner in DB
                    sqlString = "INSERT INTO `summoners` (`id`, `name`, `region`, `level`, `normalGames`, `normalWins`, `sdGames`, `sdWins`, `soloDuo`, `flex3v3`, `flex5v5`, `timeStamp`)" + 
                                "VALUES ('" 
                                + summoner['id'] + "', '" 
                                + summoner['name'] + "', '" 
                                + summoner['region'] + "', '" 
                                + summoner['level'] + "', '" 
                                + summoner['normalGames'] + "', '" 
                                + summoner['normalWins'] + "', '" 
                                + summoner['sdGames'] + "', '" 
                                + summoner['sdWins'] + "', '" 
                                + summoner['soloDuo'] + "', '" 
                                + summoner['flex3v3'] + "', '" 
                                + summoner['flex5v5'] + "', '" 
                                + Math.floor(Date.now() / 1000) + "')";

                    database.execQuery(sqlString,
                        function (results) {
                            //Send Summoner
                            res.send(summoner);
                        },function (error) {
                            res.send(error);
                        });
                    });
                })
            });
        },
        function (error) {
            res.send(error);
        });
}