


 
 const express=require('express');
 const app=express();
 const session = require('express-session');
 var bodyParser=require('body-parser');
 app.use(bodyParser());
 app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));
 const mongoose = require('mongoose'); 
 var path=require('path');
 mongoose.connect('mongodb://localhost:27017/webassign', function (err) {
 
    if (err) throw err;
  
    console.log('Successfully connected');
  
 });

 mongoose.Promise = global.Promise;
 const db = mongoose.connection;
 var pug = require('pug');
 app.set('view engine', 'pug');


 app.use(bodyParser.json()); 
 app.use(express.static('public')); 

 app.use(bodyParser.urlencoded({ 
     extended: true
 })); 
 db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
 

 
var userroutes = require('./routes/userroutes');
app.use(userroutes);


app.get('/',function(req,res){ 
    res.redirect('/createuser');

    }).listen(3000)

