var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }
var resultCustomersOrders;
var resultCustomersorderdetails;
var result //array of all tables


mongoClient.connect(function(err, client) {

    const db = client.db("PAG_Flowers");
    const collectionCustomersOrders = db.collection("Customerorders");
    const collectionCustomersorderdetails = db.collection("Customersorderdetails");


    if (err) return console.log(err);

    collectionCustomersOrders.find().toArray(function(err, results) {
        //  getDataFromDb(results)
        // resultCustomersOrders = results[0].data.data;
        result = results[0].data.data;
    })
    collectionCustomersorderdetails.find().toArray(function(err, results) {
        //  getDataFromDb(results)
        resultCustomersorderdetails = results[0].data.data;
        //result = results[0].data.data;
    })
    client.close();
});
//console.log(result);

//joining two objects by orderId



//result = resultCustomersOrders
/* GET users listing. */

let timer = 7000;
setTimeout(function() { startRoute(); }, timer);

function startRoute() {

    result.forEach(joinTables)
    
    function joinTables(item) {
        item.orderDetails = []
        for (let i = 0; i < resultCustomersorderdetails.length; i++) {
           if (item.CustOrderID === resultCustomersorderdetails[i].OrderId) {
                item.orderDetails.push(resultCustomersorderdetails[i])
            }
        }

    }

    router.get('/', function(req, res, next) {
        //   res.json([{ id: 1, username: "Nick 1" }, { id: 2, username: "Name 2" }])
        res.json(result)

    });
    console.log(result[0]);
}


module.exports = router;