var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

var resultCustomers = [];
var resultProducts = [];
var resultCustomersorderdetails = [];
var result = [] //array of all tables
console.log("create variables");


router.get('/', async function(req, res, next) {


    mongoClient.connect(function(err, client) {
        console.log("Mongo Client Connect")

        const db = client.db("PAG_Flowers");
        const collectionCustomersOrders = db.collection("Customerorders");
        const collectionCustomers = db.collection("Customers");
        const collectionProducts = db.collection("Products");

        if (err) return console.log(err);

        collectionCustomersOrders.find().toArray(function(err, results) { // get customer orders table 
            result = results;
        })
        collectionCustomers.find().toArray(function(err, results) { //get customer table 
            resultCustomers = results;
        })
        collectionProducts.find().toArray(function(err, results) { //get customer table 
            resultProducts = results;
        })
        console.log(result[0])
        client.close();
    });




    /* GET users listing. */

    let timer = 3000;
    setTimeout(function() { startRoute(); }, timer);

    function startRoute() {
        //joining tables by orderId and insert customer name 
        result.forEach(joinTables)

        function joinTables(item) {

            let customer = resultCustomers.find((cust) => { if (cust.CustID === item.CustomerID) return cust }) //get all data of Employee that work with current customer
            item.Customer = customer.WorkName // add new property WorkName to custOrder object
            item.EmployeeID = customer.EmployeeID // add new property EmployeeID to custOrder object
            item.OrderDetails = [] // add new property with array of  products list of current order 

        }

    }
    res.json(result)
    console.log("Read the result Customers Orders ");
    console.log(result[0]);

}); // end of router 
console.log("End of file ");


//console.log(resultCustomers);
//console.log(resultProducts);



module.exports = router;