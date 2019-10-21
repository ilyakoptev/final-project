var express = require('express');
var router = express.Router();


const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

var resultSuppliers = [];
var resultProducts = [];
var resultSuppliersorderdetails = [];
var result = [] //array of all tables
console.log("create variables");


router.get('/', async function(req, res, next) {


    mongoClient.connect(function(err, client) {
        console.log("Mongo Client Connect")

        const db = client.db("PAG_Flowers");
        const collectionSuppliersOrders = db.collection("Supporders");
        const collectionSuppliers = db.collection("Suppliers");
        const collectionProducts = db.collection("Products");

        if (err) return console.log(err);


        collectionSuppliersOrders.find().toArray(function(err, results) { // get customer orders table 
            result = results;
            client.close();
        })

        collectionSuppliers.find().toArray(function(err, results) { //get supplier table 
            resultSuppliers = results;
            client.close();

        })
        collectionProducts.find().toArray(function(err, results) { //get supplier table 
            resultProducts = results;
            client.close();
        })

        // console.log(result)
        //  client.close();
    });




    /* GET users listing. */

    let timer = 7000;
    setTimeout(function() { startRoute(); }, timer);

    function startRoute() {
        //console.log(result)
        //joining tables by orderId and insert customer name 
        result.forEach(joinTables) // for each customer order 

        function joinTables(item) {

            let supplier = resultSuppliers.find((supp) => { if (supp.SuppId === item.SupplierID) return supp })
            item.SuppName = supplier.SuppName // add new property SuppName to suppOrder object
            for (let i = 0; i < item.OrderDetails.length; i++) {
                let temp = item.OrderDetails[i]
                let product = resultProducts.find((prod) => { if (prod.ProductID === temp.ProductId) return prod }) // all data of product
                    //console.log(product)
                item.OrderDetails[i].ProductName = product.ProductName
                item.OrderDetails[i].Description = product.Description
            }
        }

        // router.get('/', function(req, res, next) {
        //     res.json(result)
        // });
        console.log(result[0]);
        // console.log(resultSuppliers[0]);
        //console.log(resultSuppliers[0]);
        // console.log(resultSuppliersorderdetails[0]);
        //console.log(resultProducts[0]);
    }

    res.json(result)
    console.log("Read the result Suppliers Orders ");
    console.log(result[0]);

}); // end of router 
console.log("End of file ");




module.exports = router;