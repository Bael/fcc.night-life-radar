var express = require('express');
var router = express.Router();

let visitProvider = require("../providers/visit");
let placesProvider = require("../providers/place");

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth;
var client = new auth.OAuth2(process.env.GOOGLE_CLIENT_ID, '', '');



let parseTokenHeader = function (req, onParsedCallBack) {
  let token = req.header("authorization");
  if (!token) {
    return onParsedCallBack(new Error("no token applied"));
  }

  client.verifyIdToken(
    token,
    process.env.GOOGLE_CLIENT_ID,
    function (e, login) {
      if (e) {
        onParsedCallBack(e);
      } else {

        var payload = login.getPayload();
        onParsedCallBack(null, payload);
      }
    });
};


let authMiddleware = function (req, res, next) {
  parseTokenHeader(req, (e, payload) => {
    if (e) {
      console.log(e);
      res.status(401);
      res.json({ Error: 'Unauthorized' });
      res.end();
    } else {
      req.body.userId = payload.email;
      next();
    }
  }
  )

};


router.post('/new', authMiddleware, function (req, res, next) {
  let userId = req.body.userId;
  let placeId = req.body.placeId;
  let date = new Date(req.body.date);

  visitProvider.addVisit(userId, placeId, date, (err, rowId) => {
    if (err) {
      console.log(err);
      res.status(500);

    } else {
      res.status(200);
      res.json(rowId)
    }
    res.end();
  })
});

router.delete('/:visitid', authMiddleware, function (req, res, next) {
  let uservisitid = req.params.visitid;
  visitProvider.removeVisit(uservisitid, (err) => {
    if (err) {
      console.log(err);
      res.status(500);
    } else {
      res.status(200);
      res.json("OK")
    }
    res.end();
  })
});


router.get('/', function (req, res, next) {
  let location = req.query.location;
  if (location == null) {
    res.status(400);
    res.json("Location or user are not specified");
    res.end();
    return;
  }

  let userId = null;
  parseTokenHeader(req, (e, payload) => {
    if (e == null && payload != null) {
      userId = payload.email;
    }
    placesProvider.getPlacesByLocation(location, (err, placesArray) => {
      if (err) {
        console.log(err);
        res.json(err);
        res.end;
      }
      visitProvider.getVisitedPlacesOnDate(placesArray, new Date(), userId, (err, visitedPlaces) => {
        if (err) {
          res.json(err);
          res.status(500);
          res.end();
        } else {
          res.json(visitedPlaces);
          res.end();
        }
      });

    })


  })


});


module.exports = router;

