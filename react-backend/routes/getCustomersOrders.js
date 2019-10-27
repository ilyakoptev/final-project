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
    //console.log("create variables");

//router.get('/', async function(req, res, next) {
router.get('/', async function(req, res, next) {
    mongoClient.connect(function(err, client) {
        //console.log("Mongo Client Connect")

        const db = client.db("PAG_Flowers");
        const collectionCustomersOrders = db.collection("Customerorders");
        //  const collectionCustomersorderdetails = db.collection("Customersorderdetails");
        const collectionCustomers = db.collection("Customers");
        const collectionProducts = db.collection("Products");

        if (err) return console.log(err);

        collectionCustomersOrders.find().toArray(function(err, results) { // get customer orders table 
                result = results;
                collectionProducts.find().toArray(function(err, results) { //get customer table 
                    resultProducts = results;
                    result.forEach(joinTables) // for each customer order 
                    function joinTables(item) {

                        //     let customer = resultCustomers.find((cust) => { if (cust.CustID === item.CustomerID) return cust }) //get all data of Employee that work with current customer
                        //   item.Customer = customer.WorkName // add new property WorkName to custOrder object
                        // item.EmployeeID = customer.EmployeeID // add new property EmployeeID to custOrder object
                        //  item.OrderDetails = [] // add new property with array of  products list of current order 
                        for (let i = 0; i < item.OrderDetails.length; i++) {
                            let temp = item.OrderDetails[i]
                            let product = resultProducts.find((prod) => { if (prod.ProductID === temp.ProductId) return prod }) // all data of product
                                // console.log(product)
                            item.OrderDetails[i].ProductName = product.ProductName
                            item.OrderDetails[i].Description = product.Description
                                // item.OrderDetails.push(resultCustomersorderdetails[i])
                        }
                    }
                    client.close();

                    res.json(result)

                    console.log("***************getCustomersOrders*****************")
                    console.log(result[0])

                })
                client.close();
            })
            // collectionCustomersorderdetails.find().toArray(function(err, results) { //get order details table 
            //     resultCustomersorderdetails = results[0].data.data;
            // })
            // collectionCustomers.find().toArray(function(err, results) { //get customer table 
            //     resultCustomers = results;
            // })

    });
});




/* GET users listing. */

// let timer = 7000;
// setTimeout(function() { startRoute(); }, timer);

// function startRoute() {
//     //joining tables by orderId and insert customer name 

// }
//   res.json(result)

//}); // end of router 

module.exports = router;