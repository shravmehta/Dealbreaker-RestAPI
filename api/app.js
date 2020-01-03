var express = require("express");
var path = require('path');
var app = express(); //intializing express 
var cors = require('cors');

const bodyparser = require('body-parser');
const mongoose = require('mongoose');

var Deal = require('./model/deal'); //exporting the deal model from model folder
var currentSelection="";

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false })); 
app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../views')); 
app.use(express.static(path.join(__dirname,'../resources'))); 

//route for homepage
app.get('/', async function(req, res, next) {
    var deals = await Deal.getDeals();
    res.render('index',{data:deals})
  });

  app.get('/create', function(req,res){
    res.render('newDeal');
  });

  // route for showing the deals
  app.get('/deal', async (req,res,next)=>{

    var selectedDeal = await Deal.getDeal(req.query.id);
    currentSelection = selectedDeal._id;
    console.log(selectedDeal);

  res.render('showDeal',{data:selectedDeal});
});
//route for updating/editing the deal 
app.post('/update', async (req,res,next)=>{

    await Deal.updateDeal(currentSelection,req.body.titleInput,req.body.userInput,req.body.deetInput,req.body.priceInput,req.body.locInput);
    currentSelection="";
    res.redirect('/');
})

//route for uploading the deal 
app.post('/create',async (req,res,next)=>{

    await Deal.addDeal(req.body.titleInput,req.body.userInput,req.body.deetInput,req.body.priceInput,req.body.locInput);    
    res.redirect('/');
})

//route for deleting the deal
app.get('/delete',async (req,res,next)=>{

    await Deal.deleteDeal(currentSelection);   
    currentSelection="";
    res.redirect('/');
})

//route for handling bad request
app.get('/*', (req,res)=>{
    res.status(404).send({error: 'ERROR 404! Page Not Found. Please enter a valid address!!'});
});

//connect to MongoDB atlas
mongoose.connect(`mongodb+srv://MONGO_USERNAME:MONGO_PASSWORD@eventsdatacluster-si5ri.mongodb.net/DATABASE?retryWrites=true&w=majority`).then(()=>{
    app.listen('5000');
    console.log("listening at 5000 and connected to mongoDB");
    
}).catch(err=>{
    console.log(err);   
});
