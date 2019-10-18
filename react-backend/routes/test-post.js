const express = require('express');
var router = express.Router();

//const { Client }  = require('pg');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/', (req, res) => {
    console.log('you posted to /insertCustomerOrders'); //appears in console as expected
    console.log(req.body); // {} -- always empty? cant figre out why
    console.log(typeof req.body); //"object"
    console.log(req.method); // "POST"
    res.json({ greeting: "hello" }); //this is sent back to the browser and i can access it
});

module.exports = router;