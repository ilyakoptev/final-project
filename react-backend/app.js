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

var app = express();

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
app.use('/getdataCustomers', getDataCustomers);
app.use('/getdataEmployees', getDataEmployees);
app.use('/getdataSuppliers', getDataSuppliers);
app.use('/getdataProducts', getDataProducts);
app.use('/getCustomersOrders', getCustomersOrders);
app.use('/insertCustomerOrder', insertCustomerOrder);
app.use('/insertNewCustomer', insertNewCustomer);
app.use('/getSuppliersOrders', getSuppliersOrders);
app.use('/getUnorderedCustOrders', getUnorderedCustOrders);




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

module.exports = app;