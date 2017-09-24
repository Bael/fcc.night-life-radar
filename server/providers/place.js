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
        let placesarray = rawarray.map(item => {
          return {
            placeId: item.id,
            name: item.name,
            count: 0,
            description: item.rating + item.title,
            coordinates: item.coordinates,
            url: item.image_url,
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