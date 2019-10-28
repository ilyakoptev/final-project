const express = require('express');
var router = express.Router();

//const { Client }  = require('pg');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
var dataFromClient
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/', async(req, res) => {
    console.log('you posted to /insertCustomerOrders'); //appears in console as expected
    console.log(req.body); // {} -- always empty? cant figre out why
    console.log(typeof req.body); //"object"
    console.log(req.method); // "POST"
    dataFromClient = req.body

    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    //const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useNewUrlParser: true }); //{ useNewUrlParser: true }

    mongoClient.connect(function(err, db) {
        if (err) throw err;
        var dbo = db.db("PAG_Flowers");
        // var myobj = { name: "Company Inc", address: "Highway 37" }; 

        //*********** original insert one order  */
        dbo.collection("Customerorders").insertOne(dataFromClient, function(err, res) {
            if (err) throw err;
            console.log("Success inserting new customer order to DB");
            db.close();
        });
        //******************************* */

    });
    res.json({ greeting: "callback from insert New Order" }); //this is sent back to the browser and i can access it
});


module.exports = router;