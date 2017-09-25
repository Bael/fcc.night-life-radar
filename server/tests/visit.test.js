// just testing that correct api return array of photo
const expect = require('expect');
const request = require('supertest');
const path = require('path');

const visitProvider = require('../providers/visit');


describe("visit crud", function () {
    describe("#should add/remove visit ", function () {

        let visitId = "";
        it("add visit", function (done) {
            let length = 20;
            let userId = "dk";
            let placeId = "London";
            let date = new Date();
            visitProvider.addVisit(userId, placeId, date, function (err, addedVisitId) {
                if (err) {
                    return done(err);
                }
                expect(addedVisitId).toBeGreaterThan(0);
                visitId = addedVisitId;

                done();
            });
        });

        it("remove visit", function (done) {
            visitProvider.removeVisit(visitId, (err) => {
                done(err);
            })

        })

    });
});
