var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const MongoClient = require("mongodb").MongoClient;
    //const url = "mongodb://localhost:27017/";
    const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

    var resultProducts = [];
    var result = [] //array of all tables

    mongoClient.connect(function(err, client) {

        const db = client.db("PAG_Flowers");
        const collectionCustomersOrders = db.collection("Customerorders");
        const collectionProducts = db.collection("Products");

        if (err) return console.log(err);

        collectionCustomersOrders.find().toArray(function(err, results) { // get customer orders table 
            result = results;
            collectionProducts.find().toArray(function(err, results) { //get customer table 
                resultProducts = results;
                result.forEach(joinTables) // for each customer order 
                function joinTables(item) {

                    for (let i = 0; i < item.OrderDetails.length; i++) {
                        let temp = item.OrderDetails[i]
                        let product = resultProducts.find((prod) => { if (prod.ProductID === temp.ProductId) return prod }) // all data of product
                        item.OrderDetails[i].ProductName = product.ProductName
                        item.OrderDetails[i].Description = product.Description
                    }
                }
                res.json(result)
                client.close();
            })
            console.log("***************getCustomersOrders*****************")
            console.log(result[0])
            console.log("***************------------------*****************")
        })

    });
});

module.exports = router;