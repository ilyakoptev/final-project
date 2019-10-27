var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    //const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

    var result;

    /* GET users listing. */


    mongoClient.connect(function(err, client) {
        const db = client.db("PAG_Flowers");
        const collection = db.collection("Customers");

        if (err) return console.log(err);

        collection.find().toArray(function(err, results) {
            result = results;
            res.send(JSON.stringify(result))
        });
        console.log("--------getdataCustomers---------");
        // console.log(result[0]);
        console.log("--------------------");
        //// client.close();
    })

});


module.exports = router;