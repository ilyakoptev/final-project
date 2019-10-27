var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const MongoClient = require("mongodb").MongoClient;
    const url = "mongodb://localhost:27017/";
    //const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

    var resultSuppliers = [];
    var resultProducts = [];
    var result = [] //array of all tables

    mongoClient.connect(function(err, client) {
        const db = client.db("PAG_Flowers");
        const collectionSuppliersOrders = db.collection("Supporders");
        const collectionSuppliers = db.collection("Suppliers");
        const collectionProducts = db.collection("Products");

        if (err) return console.log(err);
        collectionSuppliersOrders.find().toArray(function(err, results) { // get customer orders table 
            result = results;

            collectionSuppliers.find().toArray(function(err, results) { //get supplier table 
                resultSuppliers = results;
                //client.close();
                collectionProducts.find().toArray(function(err, results) { //get supplier table 
                    resultProducts = results;
                    // client.close();

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
                    res.json(result)
                    client.close();
                })
            })

            console.log("Read the result Suppliers Orders ");
            // console.log(result[0]);

        })
    });
}); // end of router 


module.exports = router;