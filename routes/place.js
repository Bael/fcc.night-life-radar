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
  

                let rawarray = JSON.parse(result.body).businesses;
                let array = rawarray.map(item => { return {
                                                            
                                                              name:item.name, 
                                                              count: 0,
                                                              description:item.rating+ item.title,
                                                              coordinates:item.coordinates,
                                                              url:item.image_url,
                                                              price:item.price,
                                                              location:item.location,
                                                              phone:item.phone,

                                                            } 
                                                          }
                                                          );
                
               
              

                res.json(array);
                res.end();
            });
});



module.exports = router;

