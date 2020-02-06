var mongoose = require("mongoose");
var schema = mongoose.Schema;

var itemSchema = new schema();
var cartSchema = new schema();

var ItemModel;
var CartModel;

var database = {
    connect: function () {
        //mongodb/default port number/name of database to use
        mongoose.connect('mongodb://localhost:27017/smartCartDB',
            {
<<<<<<< HEAD
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            },
            function (err) {
                if (err == null) {
                    console.log("Connected to Dongo DB")
                    itemSchema = {
                        itemId: Number,
                        name: String,
                        cost: Number,
                        type: String,
                        description: String,
                        country: String,
                        expiryDate: Date,
                    },

                        cartSchema = {
                            cart: [{
                                item: {
                                    type: schema.Types.ObjectId,
                                    ref: 'Item'
                                },
                                quantity: Number
                            }]
                        };
                    CartModel = mongoose.model("cart", cartSchema);
                    ItemModel = mongoose.model("item", itemSchema);
                } else {
                    console.log("An unknown error occured")
                }
            });
=======
                console.log("Connected to Mongo DB")
                itemSchema = {
                    itemId:Number,
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
                };
                CartModel = mongoose.model('Cart', cartSchema);
                ItemModel = mongoose.model('Item', itemSchema);
            } else {
                console.log("An unknown error occured")
            }
        });
>>>>>>> 9a7e833d74dd7526b2e687f39a6ae973576fe529
    },
    getCart: function (callback) {
        CartModel.find({}).exec(callback);
    },
<<<<<<< HEAD
    displayCartItems: function (id, callback) {
        CartModel.find({ _id: id }, callback);
=======
    displayCartItems : function(id ,callback) {
        // CartModel.findOne({_id : id}).populate('item').exec(callback);
        CartModel.findOne({_id : id}).populate('cart.item').exec(callback);
>>>>>>> 9a7e833d74dd7526b2e687f39a6ae973576fe529
    },

    displayItemDetails: function (id, callback) {
        ItemModel.findOne({ itemId: id }, callback);
    },
    deleteCart: function (callback) {
        CartModel.delete({}, callback);
    },
    addCart: function (i, q, p, callback) {
        var newItem = new CartModel({
            name: i,
            quantity: q,
            cost: p,
        })
        newItem.save(callback);
    }
}
module.exports = database;
