var mongoose = require("mongoose");
var schema = mongoose.Schema;

var itemSchema = new schema();
var cartSchema = new schema();

var ItemModel;
var CartModel;

var database = {
    connect: function() {
        //mongodb/default port number/name of database to use
        mongoose.connect('mongodb://localhost:27017/smartCartDB',
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        },
        function(err) 
        {
            if (err == null)
            {
                itemSchema = {
                    name : String,
                    cost : Number,
                    type : String,
                    description : String,
                    country : String,
                    expiryDate : Date,
                },

                cartSchema = {
                    cart : [ {
                        item: {
                            type : schema.Types.ObjectId,
                            ref : 'Item'
                        },
                        quantity: Number
                    } ]
                }
            } else {
                console.log("An unknown error occured")
            }
        });
    },
    
    displayCartItems : function(id ,callback) {
        CartModel.find({_id : id}, callback);
    }


}
module.exports = database;
