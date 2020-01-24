var db = require("./js/server/dataservice.js");

var bodyParser=require("body-parser");

db.connect();

var routes = function () {
    var router = require("express").Router();

    router.use(bodyParser.urlencoded ({
        extended: true
    }));

    router.get('/cart/:id', function(request, response) {
        var cartID = request.params.id;
        db.displayCartItems(cartID, function(err, items) {
            if(err){
                response.status(500).send("Yo the cart got issue");
            } else {
                response.status(200).send(items);
            }
        });
    });

    return router;
};

module.exports = routes();