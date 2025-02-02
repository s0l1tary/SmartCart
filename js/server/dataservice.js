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
    },
    getCart: function (callback) {
        CartModel.find({}).exec(callback);
    },
    displayCartItems : function(id ,callback) {
        // CartModel.findOne({_id : id}).populate('item').exec(callback);
        CartModel.findOne({_id : id}).populate('cart.item').exec(callback);
    },
    displayItemDetails: function (id, callback) {
        ItemModel.findOne({ itemId: id }, callback);
    },
    deleteCart: function (callback) {
        CartModel.delete({}, callback);
    },
    addCart: function (cartId, itemId, quantity, callback) {
        cart = cartId;
        var newItem = new Cart({
            item: itemId,
            quantity: quantity
        })
        newItem.save(callback);
    }
}
module.exports = database;
