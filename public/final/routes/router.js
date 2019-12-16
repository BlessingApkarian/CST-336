const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const session = require('express-session');

var ejs = require('ejs');

router.use(express.json());

router.get('/', async function(req, res){
    // console.log("root");
    
    // let userList = await getUserList();
    // console.log("root - User List", userList);
    
    let table = await getTableData();
    console.log("root - Table Data", table);
    
    res.render('../public/final/views/dash', {"table": table});
});

function getTableData(){
   
  let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
          if (err) throw err;
        //   console.log("Connected!");
        
          let sql = `SELECT id,
                            DATE_FORMAT (date, '%m-%d-%y') AS "date", 
                            TIME_FORMAT (start_time, '%h:%i %p') as "time", 
                            duration,
                            booked_by
                      FROM final_table`;
        
          conn.query(sql, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
          });
        
        });//connect
    });//promise 
}

function getAppointmentDetails(apptId){
    let conn = dbConnection();
    
    console.log(apptId);
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
          if (err) throw err;
        //   console.log("Connected!");
        
            let sql = `
                    SELECT *
                    FROM final_table
                    WHERE id = ?`;
            // console.log(sql); 
            conn.query(sql, [apptId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows[0]); //Query returns only ONE record
            });
            
        });//connect
    });//promise
    
}

router.get('/deleteTableElement', async function(req, res){
    console.log("get delete", req.query.id);
    
    let rows = await deleteTableElement(req.query.id);
    
    if(rows.affectedRows > 0) {
       console.log("deleted");
   }
  res.redirect("/final");
});

router.post('/deleteTableElement', async function(req, res){
    console.log("post delete", req.body);
    
    let rows = await deleteTableElement(req.body);
    
    if(rows.affectedRows > 0) {
       console.log("deleted");
   }
   res.redirect("/final");
});

function deleteTableElement(body){
    let conn = dbConnection();
    console.log("deleting:", body);
    console.log("deleting ID:", body.id);
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `DELETE FROM final_table
                      WHERE id = ?`;
        
           conn.query(sql, [body.id], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

router.get('/addTableElement', async function(req, res){
    res.redirect("/final");
});

router.post('/addTableElement', async function(req, res){
    
    console.log("add", req.body);
    let rows = await addTableElement(req.body);
    
    
    if(rows.affectedRows > 0) {
       console.log("added");
   }
   res.redirect("/final");
});

function addTableElement(body){
    let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
           let sql = `INSERT INTO final_table
                        (date, start_time, duration)
                        VALUES (?,?,?)`;
                        
            let params = [body.date, body.start_time, body.duration];
            
           conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

router.get('/login', function(req, res){
    
   res.render("../public/final/views/login");
});

// function getUserList(){
   
//   let conn = dbConnection();
    
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//           if (err) throw err;
//         //   console.log("Connected!");
        
//           let sql = `SELECT * 
//                       FROM final_user`;
        
//           conn.query(sql, function (err, rows, fields) {
//               if (err) throw err;
//               //res.send(rows);
//               conn.end();
//               resolve(rows);
//           });
        
//         });//connect
//     });//promise 
// }

function dbConnection() {

    let conn = mysql.createConnection({
        host: "c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "ds0xc2vmvbxi1e5j",
        password: "jke8m8nmv7y3hnq7",
        database: "skzjmcjkossn3dap"
    }); //createConnection

    return conn;
}

module.exports = router;
