## DetaileagueServer

The Backend of the Detaileague Client.

### Getting started

Since we use the RIOT API, we need a devKey.
Enter your devKey in a config.json with thekey "devKey".

We need also a MySql-Server.

config.json - Example

    "mysqlHost" : "localhost",
    "mysqlUser" : "root",
    "mysqlPassword" : "",
    "mysqlDatabase" : "detaileague",
    "devKey" : <your dev key>

Then run these commands...

Console: "npm install"

Console: "node ." or "node index.js"

Runs on localhost:3000

Now we can test it with
localhost:3000/api/v1/region/euw/summoner/Mute4win

T.N. euw = region, Mute4win = Summonername.
