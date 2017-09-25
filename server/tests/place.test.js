// just testing that correct api return array of photo
const expect = require('expect');
const request = require('supertest');
const path = require('path');

const placeProvider = require('../providers/place');
const visitProvider = require('../providers/visit');

const testpath = path.normalize(__dirname + "/../../.env");
require('dotenv').config({ path: testpath });


describe("place search", function () {
  let placesArray = [];
  let date = new Date();
  let userId = "dk";
  let length = 20;


  it("should clean db", function (done) {
    visitProvider.cleanData(done);
  });
  describe("#search should works with correct api key", function () {
    this.slow(5000);

    it("search should work", function (done) {

      placeProvider.getPlacesByLocation("London", function (err, array) {
        if (err) {
          return done(err);
        }
        placesArray = array;
        let expectedKeys = ["placeId", "name", "description", "coordinates", "url", "price", "phone", "location"];
        array.forEach(function (val) {
          expectedKeys.forEach((key, index, arr) => expect(val).toHaveProperty(key));
        });
        expect(array.length).toBe(length);
        done();
      });
    });



  });

  describe("#searched places should work visit provider", function () {
    this.slow(5000);

    it("we should receieve unvisited places", function (done) {
      let length = 20;
      visitProvider.getVisitedPlacesOnDate(placesArray, date, userId, function (err, array) {
        if (err) {
          return done(err);
        }

        placesArray = array;

        let expectedKeys = ["placeId", "name", "description", "coordinates", "url", "price", "phone", "location"];
        array.forEach(function (val) {
          expect(val).toHaveProperty("uservisitid");
          expect(val.uservisitid).toBe("");
          expect(val.count).toBe(0);

        });
        expect(array.length).toBe(length);
        done();
      });
    });

    it("should add visit", function (done) {
      let placeId = placesArray[length - 1].placeId;

      visitProvider.addVisit(userId, placeId, date, function (err, addedVisitId) {
        if (err) {
          return done(err);
        }
        expect(addedVisitId).toBeGreaterThan(0);
        visitId = addedVisitId;

        done();
      });
    });

    it("added visit should be visible", function (done) {

      visitProvider.getVisitedPlacesOnDate(placesArray, date, userId, function (err, array) {
        if (err) {
          return done(err);
        }

        placesArray = array;

        let expectedKeys = ["placeId", "name", "description", "coordinates", "url", "price", "phone", "location"];
        array.forEach(function (val) {
          expect(val).toHaveProperty("uservisitid");
          if (val.uservisitid == userId) {
            expect(val.count).toBe(1);
          }
        });
        expect(array.length).toBe(length);
        done();
      });
    });


  });



});
