var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    const MongoClient = require("mongodb").MongoClient;
    //const url = "mongodb://localhost:27017/";
    const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }

    var result = []; //array of all tables
    var resultJobs = [];

    mongoClient.connect(function(err, client) {
        const db = client.db("PAG_Flowers");
        const collection = db.collection("Employees");
        const collectionJobs = db.collection("Jobpositions");

        if (err) return console.log(err);

        collection.find().toArray(function(err, results) {
                result = results;
                collectionJobs.find().toArray(function(err, results) {
                    resultJobs = results;
                    result.forEach(joinTables) // for each customer order 
                    function joinTables(item) {
                        let job = resultJobs.find((job) => { if (job.JobPositionId === item.Position) return job }) // all data of product
                        item.JobTitle = job.JobName
                    }
                    res.send(JSON.stringify(result))
                    client.close();
                })
                if (result.length > 0)
                //  console.log(result[0]);
                    console.log("getdataCustomers loaded successfull");
            })
            //console.log(result[0]);
    });

})

module.exports = router;