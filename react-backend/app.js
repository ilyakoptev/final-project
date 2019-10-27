var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getDataCustomers = require('./routes/getdataCustomers');
var getDataEmployees = require('./routes/getdataEmployees');
var getDataSuppliers = require('./routes/getdataSuppliers');
var getDataProducts = require('./routes/getdataProducts');
var getCustomersOrders = require('./routes/getCustomersOrders');
var insertCustomerOrder = require('./routes/insertCustomerOrder');
var insertNewCustomer = require('./routes/insertNewCustomer');
var getSuppliersOrders = require('./routes/getSuppliersOrders');
var getUnorderedCustOrders = require('./routes/getUnorderedCustOrders');
var getSuppPriceList = require('./routes/getSuppPriceList');
var insertSupplierOrder = require('./routes/insertSupplierOrder');

var app = express();
//----------------------------------------------
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/', () =>
// console.log(' mongoose - connected to DB'));

//-----------------------------------------


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/getdataSuppliers', getDataSuppliers);
app.use('/getdataCustomers', getDataCustomers);
app.use('/getdataEmployees', getDataEmployees);
app.use('/getdataProducts', getDataProducts);
app.use('/getCustomersOrders', getCustomersOrders);
app.use('/insertCustomerOrder', insertCustomerOrder);
app.use('/insertNewCustomer', insertNewCustomer);
app.use('/getSuppliersOrders', getSuppliersOrders);
app.use('/getUnorderedCustOrders', getUnorderedCustOrders);
app.use('/getSuppPriceList', getSuppPriceList);
app.use('/insertSupplierOrder', insertSupplierOrder);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
///*************************************************** */
// const MongoClient = require("mongodb").MongoClient;

// const url = "mongodb://localhost:27017/";
// //const url = "mongodb+srv://admin:admin@koptevilya-wdc68.mongodb.net/admin?retryWrites=true&w=majority";
// const mongoClient = new MongoClient(url, { useUnifiedTopology: true }); //{ useNewUrlParser: true }


// /* GET users listing. */

// var db
// mongoClient.connect(function(err, client) {

//     const dbc = client.db("PAG_Flowers");
//     db = dbc
//     if (err) return console.log(err);
// });

// //module.exports = bdConnect;

module.exports = app;