let request = require('request');

function getPlacesByLocation(location, callback) {
  var auth = {
    'auth': {
      bearer: process.env.ACCESS_TOKEN
    }
  }
  
  var url = `https://api.yelp.com/v3/businesses/search?location=${location}&categories=bars`;
 url = "https://api.yelp.com/v3/graphql";
  let formData = new Object();
  let str = `{ search(term:"nightlife", location:"${location}"), 
  
              { business { name, display_phone, id, url, 
                hours {
                        is_open_now, open {
                            start, end
                          }
                          },
                price, rating, 
                coordinates { longitude, latitude},
                photos, location {city, address1},
                reviews {text, rating, time_created, url}}}}`;

  formData.auth = { 'auth': {
    bearer: process.env.ACCESS_TOKEN
  }};

  let options = {
    url:"https://api.yelp.com/v3/graphql",
    auth:  {
      bearer: process.env.ACCESS_TOKEN
    },
    headers: {
      "content-type":'application/graphql'
    },
    body:str,
    method:"POST",
    


  };

  formData.query = str;
  request.post(options,
  //request.get(url, auth,
    function (error, result) {
      if (error) {
        console.log(error);
        callback(error);
      } else {

        console.log(result);

        let rawresult = JSON.parse(result.body);
        if(!rawresult) {
          return callback(new Error("no data about places"));
        }

        if (!rawresult.data.search) {
          return callback(new Error("no data about places"));
        }

        let rawarray = rawresult.data.search.business;
        
        let placesarray = rawarray.map(item => {
          let review = "";
          if (item.reviews && item.reviews.length > 0) {
            review = item.reviews[0].text;
          }
          let smallImageUrl = "";
          
          if(item.photos && item.photos.length>0) {
            smallImageUrl = new String(item.photos[0]).replace("o.jpg", "ms.jpg");
          }

          return {
            placeId: item.id,
            name: item.name,
            count: 0,
            description: review,
            coordinates: item.coordinates,
            url: smallImageUrl,
            price: item.price,
            rating: item.rating,
            location: item.location.city+ ", "+item.location.address1,
            phone: item.display_phone,
            uservisit: false,
            uservisitid: "",
            businessUrl:item.url
            //hours:item.hours,

          }
        }
        );

        callback(null, placesarray);
      }
    }
  );
}
module.exports.getPlacesByLocation = getPlacesByLocation;