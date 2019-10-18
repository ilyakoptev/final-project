var express = require('express');
var router = express.Router();
var app = express();

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useNewUrlParser: true }); //{ useNewUrlParser: true }
var result;


mongoClient.connect(function(err, client) {

    const db = client.db("PAG_Flowers");
    const collection = db.collection("Receipts");


    if (err) return console.log(err);

    collection.find().toArray(function(err, results) {
        result = results
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

// mongoClient.connect(function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("PAG_Flowers");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("Receipts").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });
//console.log(result);

/* GET users listing. */

let timer = 7000;
setTimeout(function() { startRoute(); }, timer); // staat function with delay to await for getting all data 

function startRoute() {
    router.get('/', function(req, res, next) {
        //   res.json([{ id: 1, username: "Nick 1" }, { id: 2, username: "Name 2" }])
        res.json(result)
    });
    console.log(result);
}

// router.route('/').post(function(req,res,next){
//     res.send(req.body)
//        .then(function(data){ 
//            console.log(data);
//     }).catch(function(err){console.log(err)});
//    });

//const express     = require('express');
//const { Client }  = require('pg');
const bodyParser = require('body-parser');
//const app         = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log('you posted to /insertCustomerOrders'); //appears in console as expected
    console.log(req.body); // {} -- always empty? cant figre out why
    console.log(typeof req.body); //"object"
    console.log(req.method); // "POST"
    res.json({ greeting: "hello" }); //this is sent back to the browser and i can access it
});

module.exports = router;