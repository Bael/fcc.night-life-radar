let request = require('request');

function getPlacesByLocation(location, callback) {
  var auth = {
    'auth': {
      bearer: process.env.ACCESS_TOKEN
    }
  }
  
  var url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=nightlife`;

  request.get(url, auth,
    function (error, result) {
      if (error) {
        callback(error);
      } else {

        let rawarray = JSON.parse(result.body).businesses;
        if(!rawarray) {
          return callback(new Error("no data about places"));
        }
        
        let placesarray = rawarray.map(item => {
          let smallImageUrl = new String(item.image_url).replace("o.jpg", "m.jpg");
          return {
            placeId: item.id,
            name: item.name,
            count: 0,
            description: item.rating + item.title,
            coordinates: item.coordinates,
            url: smallImageUrl,
            price: item.price,
            location: item.location,
            phone: item.phone,
            uservisit: false,
            uservisitid: ""
          }
        }
        );

        callback(null, placesarray);
      }
    }
  );
}
module.exports.getPlacesByLocation = getPlacesByLocation;