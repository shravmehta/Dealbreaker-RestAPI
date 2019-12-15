var mongoose = require('mongoose');

//database Schema Defination
var dealSchema = mongoose.Schema({
    postedBy:{
        type: String,
        default: "Michael"
    },
    title:{
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }

});

//creating model to bind the schema defined here with the MongoDB database named deals
//so that the database will known the data type and fields of the incoming data
var deal_model = mongoose.model('deals',dealSchema,'deals');

//function to get all deals
module.exports.getDeals =  function(){
    try{
          return deal_model.find();
    }catch(err){
        console.log("couldnot find all users");
        
    }
  };

  //functon to add new deal to the database
  module.exports.addDeal = function(title,postedBy,details,price,location){
    var deal = new deal_model({title:title,postedBy:postedBy,details:details,price:price,location:location});
    deal.save(function(err){
      if(err) console.log("error adding the deal" +err);
    })
    };

//function to get a particular deal from the database
module.exports.getDeal = function(id){
    try{
        return deal_model.findById(id);
      } catch(err){
        console.log("error fetching single deal" +err);
        
      }
};

//function to delete a particular deal from the database
module.exports.deleteDeal = function(id){
    try{
        return deal_model.deleteOne({_id:id});
    }catch(err){console.log("couldnot remove deal" +err);
    }
};

//function to update a particular deal in the database
module.exports.updateDeal = function(id,title,postedBy,details,price,location){
    try{
        return deal_model.findOneAndUpdate({_id:id},{title:title,postedBy:postedBy, details:details, price:price, location:location},{new:true,useFindAndModify:false});
    }catch(err){
        console.log("couldnot update the deal" +err);
    };
};

