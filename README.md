**Deal Breaker API**
----
Developed a rest API to request all the deals posted by user and also can edit/delete deals posted by that user.
**Technologies**

Mongo DB 
NodeJS
ExpressJS

**Get Deals**
----
* **URL** 

http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/

* **Method** 

  `GET`

* **URL Parameters** 

  None

* **Data Parameters** 

  None

* **Success Response** 

  Code: 200 OK <br />
  ```[
    {
        "postedBy": "Michael Scott",
        "_id": "5df357df2605770a4da795bf",
        "title": "World's best boss coffee mug",
        "details": "Used by the best boss!",
        "price": "7",
        "location": "Dunder Mifflin",
        "__v": 0
    },
    {
        "postedBy": "Shrav Mehta",
        "_id": "5df496babc59562e963e8889",
        "title": "PS4 deal",
        "details": "Get it on Target.com",
        "price": "199",
        "location": "Charlotte",
        "__v": 0
    },
    {
        "postedBy": "Jim",
        "_id": "5df5771c63ae3f3d2a69e824",
        "title": "Iphone 11 pro",
        "details": "find the deal at walmart",
        "price": "700",
        "location": "New york",
        "__v": 0
    }]
  
* **Error Response**

  Code: 500 <br />


* **Sample Call**

   ```app.get("/deals", async(req, res)=>{
   await fetch('http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/deals')
       .then(res => res.json())
       .then(data => {
         let arr_deals = [];

         for(var i =0;i< data.deals.length; i++){
             arr_deals.push(data.deals[i]);
         }

         res.render("index", {deals:arr_deals});
       })    
         .catch(err => {
           console.log("could not get the data" +err);
       });
    
  });
  
**Add Deals**
----

* **URL**

  http://ec2-3-83-241-106.compute-1.amazonaws.com:3005/create

* **Method**

  `POST`

* **Request Payload** *

  Headers
  Body
  
* **URL Parameters** 

  None
  
* **Data Parameters** 

  ```
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


* **Success Response** 

  Code: 201 Created <br />
 ```
 Response: {
    "deal": {
        "postedBy": "Michael Scott",
        "_id": "5df357df2605770a4da795bf",
        "title": "World's best boss coffee mug",
        "details": "Used by the best boss!",
        "price": "7",
        "location": "Dunder Mifflin",
        "__v": 0
    }
}
```

* **Error Response**

  Code: 500 Internal Serve Error<br />

* **Sample Call**
  ```fetch("http://ec2-3-83-241-106.compute-1.amazonaws.com:3005/create", {
      method: "POST",
      headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
  })```
  

**Display Deal By Id**
----

* **URL**

  /deal/id

http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/deal?id=5df357df2605770a4da795bf
* **Method**

  `GET`
  
* **URL Parameters** 
  None
  
* **Data Parameters**
  
  None

* **Success Response** 

  Code: 200 OK <br />
  ```
    Sample URL: deal?id=5df357df2605770a4da795bf
    Result: {
    "deal": {
         "postedBy": "Michael Scott",
        "_id": "5df357df2605770a4da795bf",
        "title": "World's best boss coffee mug",
        "details": "Used by the best boss!",
        "price": "7",
        "location": "Dunder Mifflin",
        "__v": 0
    }
}

* **Error Response** *
 
  Code: 500 Internal Server Error <br />


* **Sample Call** *
  `await fetch('http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/deal?id=id)`
  


**Edit Deals**
----

* **URL**

http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/update

* **Method**

  `POST`

* **Request Payload** *

  Headers
  Body
  
* **URL Parameters** 

  None
  
* **Data Parameters** 

  ```postedBy:{
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
```

* **Success Response** 
```Code: 200 OK <br />
  Response: {
   
   {
    "deal": {
         "postedBy": "Michael Scott",
        "_id": "5df357df2605770a4da795bf",
        "title": "World's best boss coffee mug",
        "details": "Used by the best boss! updated price",
        "price": "10",
        "location": "Dunder Mifflin",
        "__v": 0
    }
}
```
* **Error Response**

  Code: 500 Internal Serve Error<br />
  Response: 
  


* **Sample Call**
  ```
  await fetch("http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/update" + id,{
     method: "POST",
     headers:{
         'Content-Type':'application/json'
     },
     body: JSON.stringify({
        postedBy: req.body.deal.postedBy,
        title: req.body.deal.title,
        details: req.body.deal.details,
        price: req.body.deal.price,
        location: req.body.deal.location
    })
    })
    ```
 
 
 
**Delete Deal**
----
  * **URL**
      http://ec2-3-135-18-42.us-east-2.compute.amazonaws.com/delete/id


* **Method**

  `DELETE`

* **Request Payload** *

  Headers
  
* **URL Parameters** 

  None
  
* **Data Parameters** 

  None

* **Success Response** 
```
  Code: 200 OK <br />
  Response: {
   
   {
    "message": "movie deleted",
    "deal": {
     "postedBy": "Michael Scott",
        "_id": "5df357df2605770a4da795bf",
        "title": "World's best boss coffee mug",
        "details": "Used by the best boss! updated price",
        "price": "10",
        "location": "Dunder Mifflin",
        "__v": 0   
    }
}
```
* **Error Response**

  Code: 500 Internal Serve Error<br />
 
 
 **Database Schema**
  ----
 * ** Model**
  ```
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
 ```
  


 
