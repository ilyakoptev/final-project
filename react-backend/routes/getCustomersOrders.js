var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }
var collectionCustomersOrders = [];
var resultCustomers = [];
var resultProducts = [];
var resultCustomersorderdetails = [];
var result = [] //array of all tables


mongoClient.connect(function(err, client) {

    const db = client.db("PAG_Flowers");
    const collectionCustomersOrders = db.collection("Customerorders");
    const collectionCustomersorderdetails = db.collection("Customersorderdetails");
    const collectionCustomers = db.collection("Customers");
    const collectionProducts = db.collection("Products");

    if (err) return console.log(err);

    collectionCustomersOrders.find().toArray(function(err, results) { // get customer orders table 
        result = results;
    })
    collectionCustomersorderdetails.find().toArray(function(err, results) { //get order details table 
        resultCustomersorderdetails = results[0].data.data;
    })
    collectionCustomers.find().toArray(function(err, results) { //get customer table 
        resultCustomers = results;
    })
    collectionProducts.find().toArray(function(err, results) { //get customer table 
        resultProducts = results;
    })
    client.close();
});




/* GET users listing. */

let timer = 7000;
setTimeout(function() { startRoute(); }, timer);

function startRoute() {
    //joining tables by orderId and insert customer name 
    result.forEach(joinTables)

    function joinTables(item) {

        let customer = resultCustomers.find((cust) => { if (cust.CustID === item.CustomerID) return cust }) //get all data of Employee that work with current customer
        item.Customer = customer.WorkName // add new property WorkName to custOrder object
        item.EmployeeID = customer.EmployeeID // add new property EmployeeID to custOrder object
        item.OrderDetails = [] // add new property with array of  products list of current order 
        for (let i = 0; i < resultCustomersorderdetails.length; i++) {
            if (item.CustOrderID === resultCustomersorderdetails[i].OrderId) {
                let temp = resultCustomersorderdetails[i]
                let product = resultProducts.find((prod) => { if (prod.ProductID === temp.ProductId) return prod }) // all data of product
                    //console.log(product)
                resultCustomersorderdetails[i].ProductName = product.ProductName
                resultCustomersorderdetails[i].Description = product.Description
                item.OrderDetails.push(resultCustomersorderdetails[i])
            }
        }

    }

    router.get('/', function(req, res, next) {
        //   res.json([{ id: 1, username: "Nick 1" }, { id: 2, username: "Name 2" }])
        res.json(result)

    });
    console.log(result[0]);
    //console.log(resultCustomersorderdetails);
    //console.log(resultCustomers);
    //console.log(resultProducts);
}


module.exports = router;