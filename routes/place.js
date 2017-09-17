var express = require('express');
var router = express.Router();
let request = require('request');


router.get('/', function(req, res, next) {
  
  var auth = {
    'auth' : {
      bearer : process.env.ACCESS_TOKEN
    }
  }

  let location = req.query.location || 'new york';

  var url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=nightlife`;
  
  request.get(url, auth, 
           function(error, result) {
                if (error) {
                    res.send(error);
      
                }
  
                res.json(result);
                res.end();
            });
});



module.exports = router;

