var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }
var result; //array of all tables

mongoClient.connect(function(err, client) {

    const db = client.db("PAG_Flowers");
    const collection = db.collection("Suppliers");

    if (err) return console.log(err);
    collection.find().toArray(function(err, results) {
        //  getDataFromDb(results)
        result = results;
        client.close();
    });
});
//console.log(result);

/* GET users listing. */


let timer = 3000;
setTimeout(function() { startRoute(); }, timer);

function startRoute() {
    router.get('/', function(req, res, next) {
        res.json(result)

    });
    console.log(result[0]);
}


module.exports = router;