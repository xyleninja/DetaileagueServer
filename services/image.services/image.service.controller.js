var fs = require('fs');
var path = require('path');

exports.getImage = (req,res) => {

    let imageName = req.params.image;

    let imagePath = path.resolve(__dirname + '\\..\\..\\assets\\base_icons\\' + imageName);

    if(!fs.existsSync(imagePath)) {
        let error = new Object({
            "msg" : "Image not found.",
            "errorCode" : "0.1.1"
        })
        res.status(404).send(JSON.stringify(error))
        return;
    }

    res.sendFile(imagePath);

}