var express = require('express');
var router = express.Router();

let visitProvider = require("../providers/visit");
let placesProvider = require("../providers/place");

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, '', '');

let authMiddleware =function(req, res, next) {
  
  
  console.log(JSON.stringify(req.headers));
  let token = req.header("authorization");
  console.log(token);

  client.verifyIdToken(
    token,
    process.env.GOOGLE_CLIENT_ID,
    function(e, login) {
      if (e) {
        console.log(e);
        
        
        res.status(401);
        res.json({Error:'Unauthorized'});
        res.end();
      }
      else {
        var payload = login.getPayload();
        req.body.userId = payload.email;
        next();
      }
    });
};


router.post('/new', authMiddleware, function(req, res, next) {
  let userId = req.body.userId;
  let placeId = req.body.placeId;
  let date = new Date(req.body.date);

  visitProvider.addVisit(userId, placeId, date, (err, rowId) => {
    if(err) {
      res.status(500);
      
    } else {
      res.status(200);
      res.json(rowId)
    }
    res.end();
  })
});

router.delete('/:visitid', function(req, res, next) {
  let uservisitid = req.params.visitid;
  visitProvider.removeVisit(uservisitid, (err) => {
    if(err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200);
      res.json("OK")
    }
   res.end();
  })
});


router.get('/', function(req, res, next) {

  let location = req.query.location;
  let userId = req.query.userId;

  if(location == null || userId == null) {
    res.status(400);
    res.json("Location or user are not specified");
    res.end();
    return;
  }

  placesProvider.getPlacesByLocation(location, (err, placesArray) => {
    if(err) {
      console.log(err);
      res.json(err);
      res.end;
    }
    visitProvider.getVisitedPlacesOnDate(placesArray, new Date(), userId, (err, visitedPlaces) => {
      if(err) {
        res.json(err);
        res.status(500);
        res.end();
      } else {
      res.json(visitedPlaces);
      res.end();
      }
    });

  })
});
  
  
  
  

 
              

                


module.exports = router;

