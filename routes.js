var db = require("./js/server/dataservice.js");

var bodyParser=require("body-parser");

db.connect();

var routes = function () {
    var router = require("express").Router();

    router.use(bodyParser.urlencoded ({
        extended: true
    }));

    router.get("/",function(req,res){
        res.sendFile(__dirname + "/views/index.html");
    })
    //localost:4000/css/*
    router.get("/css/*", function(request,response){
        console.log(request.originalUrl);
        response.sendFile(__dirname+request.originalUrl);
    });

    //localost:4000/js/*
    router.get("/js/*", function(request,response){
        console.log(request.originalUrl);
        response.sendFile(__dirname+request.originalUrl);
    });

    //localost:4000/js/*
    router.get("/resources/*", function(request,response){
        console.log(request.originalUrl);
        response.sendFile(__dirname+request.originalUrl);
    });

    router.get('/api/cart/:id', function(request, response) {
        var cartID = request.params.id;
        db.displayCartItems(cartID, function(err, cart) {
            if(err){
                response.status(500).send("Yo the cart got issue");
            } else {
                if (cart == null || cart.length == 0) {
                    response.status(200).send("No cart found.");
                } else {
                    response.status(200).send(cart);
                }
            }
        });
    });

    router.get('/cartDetails', function(request, response) {
        response.sendFile(__dirname+"/views/cartDetails.html");
    });

    router.get('/api/cartDetails/:id', function(request, response) {
        var itemID = request.params.id;
        db.displayItemDetails(itemID, function(err, item) {
            if(err) {
                response.status(500).send("An unexpected error occured");
            } else {
                if(item == null || item.length == 0) {
                    response.status(200).send("No item found with ID: "+itemID);
                } else {
                    response.status(200).send(item);
                }
            }
        });
    });

    router.get('/cart',function(req,res){
        res.sendFile(__dirname + '/views/cart.html');
    });

    router.get('/api/cart',function(req,res){
        db.getCart(function(err,items){
            if(err){
                res.status(500).send("Unable to get cart");
            }else{
                res.status(200).send(items);
            }
        })
    });

    router.post('/api/cart',function(req,res){
        var data = req.body;
        db.addCart(data.name, data.quantity,data.price, function(err, cart){
            if(err){
                res.status(500).send("Unable to add item cart");
            }else{
                res.status(200).send("Item added to Cart");
            }
        })
    })
    router.delete('/api/cart',function(req,res){
        db.deleteCart(function(err,delCar){
            if(err){
                res.status(500).send("Unable to delete cart");
            }else{
                res.status(200).send("Deleted Cart");
            }
        })
    })
    return router;
};

module.exports = routes();