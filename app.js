
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const path = require('path');

const adminRoute = require('./routes/admin');
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Handling CORS error
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use('/admin',adminRoute);

mongoose.connect("mongodb://localhost:27017/vendingDB", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  
  console.log("Server up and running")
  app.listen(8080);
});






