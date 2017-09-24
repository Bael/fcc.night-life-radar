// just testing that correct api return array of photo
const expect = require('expect');
const request = require('supertest');
const path = require('path');

const placeProvider = require('../providers/place');

const testpath = path.normalize(__dirname+"/../../.env");
require('dotenv').config({path:testpath});


describe("place search", function ()  {
  describe("#search should works with correct api key", function ()  {
      this.slow(5000);
  		it("should work", function(done) {
        let length = 20;
        placeProvider.getPlacesByLocation("London",function(err, array) {
          if(err) {
            return done(err);
          }
          let expectedKeys = ["placeId", "name", "description", "coordinates", "url", "price", "phone", "location"];
          array.forEach(function( val) {
            expectedKeys.forEach((key, index, arr) => expect(val).toHaveProperty(key));
          });
          expect(array.length).toBe(length);
          done();
        });
  		});
      
	});
});
