const sqlite3 = require('sqlite3').verbose();
   /// add visit for (user, place, date) touple
function addVisit(userId, placeId, date, callback) {
    var db = getDB();
    
    

   console.log(userId + " "+  placeId + " " + getDateStr(date));
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");
        
        var stmt = db.prepare("INSERT INTO visit (userid, placeid, visitdate) VALUES (?, ?, ?) ");
        stmt.run(userId, placeId, getDateStr(date));
        stmt.finalize();
        
        /*db.each("SELECT rowid AS id, userid, placeid, visitdate FROM visit", function(err, row) {
                    //console.log(`row.id: ${row.id} userId: ${row.userid} placeId : ${row.placeId} date : ${row.visitdate}`);
                    console.log(row);
                    console.log(err);
                });*/
    });
            
    db.close((err) => { 
                console.log(err); callback(err); 
            });

}

/// Open file db and return. Possible error will be throwed ny sqllite
function getDB() {
    return new sqlite3.Database('./visit.db');
}

function cleanData() {
    var db = getDB();

     db.serialize(function() {
         db.run("DROP TABLE visit");
     });
     db.close();
}

/// Remove user visit (not checking existed it or not)
function removeVisit(userId, placeId, date) {
    
        var db = getDB();
       
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");
            
            var stmt = db.prepare("delete from visit where userid = ? and placeid = ? and visitdate = ? ");
            stmt.run(userId, placeId, getDateStr(date));
            stmt.finalize();
        });
                
        db.close();
    
    }
    

    /// todo use set\map\dictionary
function getPlacesOnDate(placesArray, date, userId, callback) {

   // console.log("userId is " + userId);
    //console.log("date is " + date);
    //console.log("placesArray " );
   // console.log(placesArray);
   // console.log(getDateStr(date));

    placesArray = placesArray || [];
    var placesMap = new Map();
    placesArray.forEach((element) => { placesMap.set(element.placeId, element)});
    
    var newplaces = [];
    var db = getDB();
    
    db.serialize(function() {
         

        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ")
          .each("SELECT userid, placeid FROM visit ",
        /*.each("SELECT userid, placeid FROM visit where visitdate = ?", getDateStr(date).trim(),*/ 
         (err, row) => {
             //console.log("!!");
             if (err)  {
                 console.log(err);

             } else {
              //  console.log(row)   ;

                let foundedPlace = placesMap.get(row.placeid);
                if (foundedPlace) {
                    /// given user already planning to visit place
                   // console.log('row.userid = ' + row.userid + '==? '+ (row.userid == userId));
                    if(row.userid == userId){
                      //  console.log("founded user! ");
                        foundedPlace.uservisit = true;
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



module.exports.addVisit = addVisit;
module.exports.getPlacesOnDate = getPlacesOnDate;

//addVisit("dk", "little-red-door-paris", new Date());

//placesArray = [{placeId:"harats", count:0}, {placeId:"brugge", count:0}, {placeId:"hamburg", count:0}];

/*

getPlacesOnDate(placesArray, new Date(), "dk", (err, places) => { 
                console.log(err);
                console.log(places);
            }
        );


*/




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



function prepareDB() {
    var db = new sqlite3.Database('./visit.db');
    
    db.serialize(function() {
         
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ");
        db.run("CREATE INDEX IF NOT EXISTS visitdate_index_name ON visit (visitdate DESC) ");
         
     });
     db.close();

}*/

