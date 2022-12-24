const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

const app = express();
// getting-started.js
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

//DEFINE NONGOOSE SCHEMA
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,

});
const Contact = mongoose.model('Contact', ContactSchema);

const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static' , express.static('static'));    //for serving static files 
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine' , 'pug');                   //set the template engine for pug
app.set('views', path.join(__dirname ,'views'));  //set the views directory

//ENDPOINTS
app.get('/',(req , res)=>{
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get('/contact',(req , res)=>{
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post('/contact',(req , res)=>{
    const params = {};
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the  databse");
    }).catch(()=>{
        res.status(400).send("Iten was not saved to the database");
    });
});


//START THE SERVER
app.listen(port, () =>{
    console.log(`The application started successfully on port ${port}`);
});