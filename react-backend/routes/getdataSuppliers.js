var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }
var result; //array of all tables

router.get('/', function(req, res, next) {
    mongoClient.connect(function(err, client) {

        const db = client.db("PAG_Flowers");
        const collection = db.collection("Suppliers");

        if (err) return console.log(err);
        collection.find().toArray(function(err, results) {
            result = results;
            res.json(result)
            client.close();
        });
        // console.log(result[0]);
    });
    //console.log(result);

});


module.exports = router;