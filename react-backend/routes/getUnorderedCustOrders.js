var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
    const MongoClient = require("mongodb").MongoClient;
    //const url = "mongodb://localhost:27017/";
    const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

    var resultSuppliersOrders = [];
    var result = [] //array of all tables
    var resArr = []
        //console.log("create variables");

    mongoClient.connect(function(err, client) {

        const db = client.db("PAG_Flowers");
        const collectionSuppliersOrders = db.collection("Supporders");
        const collectionCustomerorders = db.collection("Customerorders");

        if (err) return console.log(err);

        collectionCustomerorders.find().toArray(function(err, results) { //get supplier table 
            result = results;
            collectionSuppliersOrders.find().toArray(function(err, results) { // get customer orders table 
                resultSuppliersOrders = results;
                //client.close();
                result.forEach(joinTables) // for each customer order 
                function joinTables(order) {
                    let result = resultSuppliersOrders.find((item) => { if (item.CustomerOrderID == order.CustOrderID) return item })
                    if (result === undefined)
                        resArr = resArr.concat(order)
                }
                res.json(resArr)
                console.log(resArr[0]);
                client.close();
            })

        })
    });

    // let timer = 7000;
    // setTimeout(function() { startRoute(); }, timer);

    // function startRoute() {
    // }

}); // end of router 

module.exports = router;