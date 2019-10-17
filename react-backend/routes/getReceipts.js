var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }
var result;


mongoClient.connect(function(err, client) {

    const db = client.db("PAG_Flowers");
    const collection = db.collection("Receipts");


    if (err) return console.log(err);

    collection.find().toArray(function(err, results) {
        //  getDataFromDb(results)
        result = results //[0].data.data;
    })
    client.close();
});

// mongoClient.connect(function(err, client) {

//     const db = client.db("PAG_Flowers");
//     const collection = db.collection("Receipts");


//     if (err) return console.log(err);

//     const document = ({ "name": "Bill", "age": 32, languages: ["english", "french"] })
//     collection.insertOne({"name": "Tom", "age": 28, languages: ["english", "spanish"]})
//     client.close();
// });

mongoClient.connect(function(err, db) {
    if (err) throw err;
    var dbo = db.db("PAG_Flowers");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("Receipts").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
});
//console.log(result);

/* GET users listing. */

let timer = 7000;
setTimeout(function() { startRoute(); }, timer);

function startRoute() {
    router.get('/', function(req, res, next) {
        //   res.json([{ id: 1, username: "Nick 1" }, { id: 2, username: "Name 2" }])
        res.json(result)

    });
    console.log(result);
}


module.exports = router;