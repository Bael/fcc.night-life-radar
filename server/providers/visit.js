const sqlite3 = require('sqlite3').verbose();

  // add visit for (user, place, date) touple
function addVisit(userId, placeId, date, callback) {
    var db = getDB();
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");

        var stmt = db.prepare("INSERT INTO visit (userid, placeid, visitdate) VALUES (?, ?, ?) ");
        stmt.run(userId, placeId, getDateStr(date), function (err, lastID) {
            if (err) {
                callback(err);
            } else {
                callback(null, this.lastID);
            }
        });
        stmt.finalize();

    });

    db.close();

}

/// Open file db and return. Possible error will be throwed ny sqllite
function getDB() {
    return new sqlite3.Database('./visit.db');
}

function cleanData() {
    var db = getDB();

    db.serialize(function () {
        db.run("DROP TABLE visit");
    });
    db.close();
}

// Remove user visit (not checking existed it or not)
function removeVisit(uservisitid, callback) {

    var db = getDB();
    console.log(uservisitid);

    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");

        var stmt = db.prepare("delete from visit where  rowid = ? ");
        stmt.run(uservisitid);
        stmt.finalize();
    });

    db.close(callback);

}


/// Get visit info from given places and merge it with places. 
function getVisitedPlacesOnDate(placesArray, date, userId, callback) {

    placesArray = placesArray || [];
    var placesMap = new Map();
    // We will compare places with visit rows by placeid
    placesArray.forEach((element) => { placesMap.set(element.placeId, element)});

    var newplaces = [];
    var db = getDB();

    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ")
            .each("SELECT userid, placeid FROM visit where visitdate = ?", getDateStr(date),
           (err, row) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                     
                    let foundedPlace = placesMap.get(row.placeid);
                    if (foundedPlace) {
                        /// given user already planning to visit place
                        /// so we need to save row id if user will cancel the visit
                        if (row.userid == userId) {
                            foundedPlace.uservisit = true;
                            foundedPlace.uservisitid = row.rowid;
                        }
                        foundedPlace.count += 1;
                    }
                }
            });

    });

    //callback(placesArray);
    db.close((err) => {
        placesMap.clear();
        callback(err, placesArray);

    });

}


function getDateStr(date) {
    date = (date) || new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}

function prepareDB() {
    var db = getDB();

    db.serialize(function () {

        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ");
        db.run("CREATE INDEX IF NOT EXISTS visitdate_index_name ON visit (visitdate DESC) ");


    });
    db.close();

}

module.exports.addVisit = addVisit;
module.exports.getVisitedPlacesOnDate = getVisitedPlacesOnDate;
module.exports.removeVisit = removeVisit;
module.exports.prepareDB = prepareDB;
module.exports.cleanData = cleanData;



/*

    /*
function getVisitCountStatement(db, callback) {
    var stmt = db.prepare("select count(rowid) as visitcount from visit where placeid = ? and visitdate = ?");
    stmt.get(placeId, getDateStr(date), (err, count) => {
        if(err) {
            callback(err);
        } else {
            callback(null, count.visitcount);
        }
    });
    stmt.finalize();
}

function execStatement(statementFunction, args, callback) {
    var db = new sqlite3.Database('./visit.db');
    
    db.serialize(function() {
         
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ");
        db.run("CREATE INDEX IF NOT EXISTS visitdate_index_name ON visit (visitdate DESC) ");
        
        statementFunction(db, callback);
     });

    db.close();
    
}



*/

