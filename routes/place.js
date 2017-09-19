var express = require('express');
var router = express.Router();
let request = require('request');
let visit = require("../models/visit");

router.post('/:placeid', function(req, res, next) {
  let userid = req.body.userId;
  let placeId = req.params.placeId;
  let date = new Date();

  visit.addVisit(userId, placeId, date, (err) => {
    if(err) {
      res.status(500);
      
    } else {
      res.status(200);
      res.send("OK")
    }

    res.end();

  })
});
router.get('/', function(req, res, next) {
  
  var auth = {
    'auth' : {
      bearer : process.env.ACCESS_TOKEN
    }
  }

  let location = req.query.location || 'new york';
  let userId = req.query.userId;

  var url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=nightlife`;
  
  request.get(url, auth, 
           function(error, result) {
                if (error) {
                    res.send(error);
      
                }
  

                let rawarray = JSON.parse(result.body).businesses;
                let placesarray = rawarray.map(item => { return {
                                                              placeId:item.id,
                                                              name:item.name, 
                                                              count: 0,
                                                              description:item.rating + item.title,
                                                              coordinates:item.coordinates,
                                                              url:item.image_url,
                                                              price:item.price,
                                                              location:item.location,
                                                              phone:item.phone,
                                                              uservisit:false,
                                                            } 
                                                          }
                                                          );
                
               
              

                visit.getPlacesOnDate(placesarray, new Date(), userId, (err, places) => {
                  if(err) {
                    res.send(err);
                    res.status(500);
                    res.end();
                  }

                  res.json(places);
                  res.end();
                });

            });
});



module.exports = router;

