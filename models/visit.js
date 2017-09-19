const sqlite3 = require('sqlite3').verbose();
   /// add visit for (user, place, date) touple
function addVisit(userId, placeId, date) {
    var db = new sqlite3.Database('./visit.db');
   
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");
        
        var stmt = db.prepare("INSERT INTO visit (userid, placeid, visitdate) VALUES (?, ?, ?) ");
        stmt.run(userId, placeId, getDateStr(date));
        stmt.finalize();
        
        db.each("ScallbackELECT rowid AS id, userid, placeid, visitdate FROM visit", function(err, row) {
                    //console.log(`row.id: ${row.id} userId: ${row.userid} placeId : ${row.placeId} date : ${row.visitdate}`);
                    console.log(row);
                    console.log(err);
                });
    });
            
    db.close();

}

/// Remove user visit (not checking existed it or not)
function removeVisit(userId, placeId, date) {
    
        var db = new sqlite3.Database('./visit.db');
       
        db.serialize(function() {
            db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");
            
            var stmt = db.prepare("delete from visit where userid = ? and placeid = ? and visitdate = ? ");
            stmt.run(userId, placeId, getDateStr(date));
            stmt.finalize();
        });
                
        db.close();
    
    }
    

    /// Get total visit count today for place
  function getVisitCount(placeId, date) {
    
        var db = new sqlite3.Database('./visit.db');
        
         db.serialize(function() {
             
            db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ");
             
             var stmt = db.prepare("select count(rowid) as visitcount from visit where placeid = ? and visitdate = ?");
             stmt.get(placeId, getDateStr(date), (err, count) =>
                {
                    console.log(err);
                    console.log("count is " + count.visitcount);
            });
    
            stmt.finalize();
    
            
    
            //db.each("SELECT rowid AS id, userid, placeid, visitdate FROM visit", function(err, row) {
            //    console.log(`row.id: ${row.id} userId: ${row.userid} placeId : ${row.placeId} date : ${row.visitdate}`);
            //});
             
            
         });
                 
         db.close();
     
    
}
     

    /// todo use set\map\dictionary
function getPlacesOnDate(placesArray, date, callback) {

    placesArray = placesArray || [];
    var newplaces = [];
    var db = new sqlite3.Database('./visit.db');
    
    db.serialize(function() {
         
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ")
          .each("SELECT userid, placeid FROM visit where visitdate = ?", getDateStr(date),
        
         (err, row) => {
            placesArray.findIndex((element, index, array) => {
                //console.log(element);

                if (element.placeId === row.placeid) {
                   console.log("element founded");
                   console.log(element);
                
                   array[index].count += 1;
                   
                   return true;
                   
               } 
               return false;
            });


             
            //console.log(row);
            //console.log(err);
        }); 

        

        //db.each("SELECT rowid AS id, userid, placeid, visitdate FROM visit", function(err, row) {
        //    console.log(`row.id: ${row.id} userId: ${row.userid} placeId : ${row.placeId} date : ${row.visitdate}`);
        //});
         
        
     });
        
     //callback(placesArray);
     db.close((err) => {
        if(!err) {
            callback(placesArray);
        }
     });

     
 

}

function getDateStr(date) {
    date = (date) || new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}



module.exports.addVisit = addVisit;
module.exports.getVisitCount = getVisitCount;

placesArray = [{placeId:"harats", count:0}, {placeId:"brugge", count:0}, {placeId:"hamburg", count:0}];

getPlacesOnDate(placesArray, new Date(), (places) => { 
                console.log(places);
            }
        );



//addVisit("dk","harats", new Date());
//addVisit("dya","harats", new Date());
//addVisit("dk","brugge", new Date());




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

