const sqlite3 = require('sqlite3').verbose();
function addVisit(userId, placeId, date) {

    var db = new sqlite3.Database('./visit.db');
   
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT)");
        
        var stmt = db.prepare("INSERT INTO visit (userid, placeid, visitdate) VALUES (?, ?, ?) ");
        stmt.run(userId, placeId, getDateStr(date));
        stmt.finalize();
        
        db.each("SELECT rowid AS id, userid, placeid, visitdate FROM visit", function(err, row) {
                    //console.log(`row.id: ${row.id} userId: ${row.userid} placeId : ${row.placeId} date : ${row.visitdate}`);
                    console.log(row);
                    console.log(err);
                });
    });
            
    db.close();

}

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
    
    

function getVisitCount(placeId, date) {

    var db = new sqlite3.Database('./visit.db');
    
     db.serialize(function() {
         
        db.run("CREATE TABLE IF NOT EXISTS visit (userid TEXT, placeid TEXT, visitdate TEXT) ");
         
         var stmt = db.prepare("select count(rowid) as visitcount from visit where placeid = ? and visitdate = ?");
         stmt.get(placeId, getDateStr(date), (err, count) =>
            {
                console.log(err);
                console.log("count is "+count.visitcount);
        });

        stmt.finalize();

        

        //db.each("SELECT rowid AS id, userid, placeid, visitdate FROM visit", function(err, row) {
        //    console.log(`row.id: ${row.id} userId: ${row.userid} placeId : ${row.placeId} date : ${row.visitdate}`);
        //});
         
        
     });
             
     db.close();
 

}

function getDateStr(date) {
    date = (date) || new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}


module.exports.addVisit = addVisit;
module.exports.getVisitCount = getVisitCount;

//addVisit("dk","harats", new Date());
//addVisit("dya","harats", new Date());





