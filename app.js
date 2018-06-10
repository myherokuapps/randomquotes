var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose')
mongoose.Promise = Promise

var dbUrl = 'mongodb://quotes:quotes123@ds147864.mlab.com:47864/data'
var Schema =mongoose.Schema;
var Message = new Schema({
  _id:Object,
  QUOTE:String,
  AUTHOR:String,
  "GENRE":String
})

var Message = mongoose.model('Message', Message,"quotes")


var app = express();
app.get('/quotes', (req, res,next) => {
  Message.find({},'-_id',(err, messages) => {
   let max=75967;
     var x= Math.floor(Math.random() *Math.floor(max));
     //console.log(x);
      //console.log('Your random Quote is '+messages[x]);
      if(err) return next(err);
      //res.send('Your random Quote is '+messages[x]);
      res.render(__dirname + '/views/quote.ejs',{ quote:messages[x].QUOTE, author:messages[x].AUTHOR, genre:messages[x].GENRE});
    
  })
})
app.get('/api', (req, res,next) => {
  Message.find({},'-_id',(err, messages) => {
   let max=75967;
     var x= Math.floor(Math.random() *Math.floor(max));
     //console.log(x);
      console.log('Your random Quote is '+messages[x]);
      if(err) return next(err);
      res.send('Your random Quote is '+messages[x]);
     // res.render(__dirname + '/views/quote.ejs',{ quote:messages[x] });
    
  })
})
mongoose.connect(dbUrl, (err) => {
  console.log('mongo db connection', err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
