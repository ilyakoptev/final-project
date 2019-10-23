var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }
var result;

/* GET users listing. */

//router.get('/', async function(req, res, next) {

mongoClient.connect(function(err, client) {

    const db = client.db("PAG_Flowers");
    const collection = db.collection("Customers");

    if (err) return console.log(err);

    collection.find().toArray(function(err, results) {
        //  getDataFromDb(results)
        result = results;

        router.get('/', async function(req, res, next) {
            res.json(result)
        });
        console.log("--------getdataCustomers---------");
        console.log(result[0]);
        console.log("--------------------");
        client.close();
    })

});


// let timer = 1000;
// setTimeout(function() { startRoute(); }, timer);

// function startRoute() {

//     //   res.json([{ id: 1, username: "Nick 1" }, { id: 2, username: "Name 2" }])
//     res.json(result)
// }

//});


module.exports = router;