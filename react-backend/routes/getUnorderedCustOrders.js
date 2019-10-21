var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

var resultSuppliers = [];
var resultProducts = [];
var resultSuppliersOrders = [];
var result = [] //array of all tables
var resArr = []
console.log("create variables");


router.get('/', async function(req, res, next) {


    mongoClient.connect(function(err, client) {
        console.log("Mongo Client Connect")

        const db = client.db("PAG_Flowers");
        const collectionSuppliersOrders = db.collection("Supporders");
        const collectionCustomerorders = db.collection("Customerorders");
        // const collectionProducts = db.collection("Products");

        if (err) return console.log(err);


        collectionSuppliersOrders.find().toArray(function(err, results) { // get customer orders table 
            resultSuppliersOrders = results;
            client.close();
        })

        collectionCustomerorders.find().toArray(function(err, results) { //get supplier table 
                result = results;
                client.close();

            })
            // collectionProducts.find().toArray(function(err, results) { //get supplier table 
            //     resultProducts = results;
            //     client.close();
            // })

        // console.log(result)
        //  client.close();
    });




    /* GET users listing. */

    let timer = 7000;
    setTimeout(function() { startRoute(); }, timer);

    function startRoute() {
        //console.log(result)

        result.forEach(joinTables) // for each customer order 

        function joinTables(order) {

            let result = resultSuppliersOrders.find((item) => { if (item.CustomerOrderID == order.CustOrderID) return item })
            if (result === undefined)
                resArr.push(order)

        }

        // router.get('/', function(req, res, next) {
        //     res.json(resArr)
        // });
        // console.log(resArr);
        // console.log(resultSuppliers[0]);
        //console.log(resultSuppliers[0]);
        // console.log(resultSuppliersorderdetails[0]);
        //console.log(resultProducts[0]);
    }

    //res.json(result)
    ////console.log("Read the result Suppliers Orders ");
    //console.log(result[0]);

}); // end of router 
//console.log("End of file ");




module.exports = router;