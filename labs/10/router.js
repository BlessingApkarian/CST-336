const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.use(express.json());

router.get("/", async function(req, res) {

    let categories = await getCategories();
    //console.log(categories);
    res.render("../labs/10/view", { "categories": categories });

}); //root

router.get("/login", async function(req, res) {

    res.render("../labs/10/login");

}); // login

/* POST login credentials to login via JSON. (/auth/login) */
router.post('/login', function(req, res, next) {

    // console.log('inside login post');

    let successful = false;
    let message = '';

    // TODO: replace with MySQL SELECT and hashing/salting...
    // console.log(req.body);
    if (req.body.username === 'hello' && req.body.password === 'world') {
        successful = true;
        req.session.username = req.body.username;
        // req.cookie('jason', 'the great!', { maxAge: 900000, httpOnly: true });
    }
    else {
        // delete the user as punishment!
        delete req.session.username;
        message = 'Wrong username or password!';
    }

    // console.log('session username', req.session.username);

    // console.log('res.body', req.body);

    // Return success or failure
    res.json({
        successful: successful,
        message: message
    });

});

router.get("/authors", async function(req, res) {

    // console.log("----b----",req.body);
    // console.log(res.body);
    // console.log("----q----", res.query);
    // console.log(req.query);
    
    // if (req.session.authenticated) { //if user hasn't authenticated, sending them to login screen
       
     let author = await getAuthorList();  
    //   console.log(author);
       res.render("../labs/10/authors", {"authorList":author});  // authorList becomes an object holding each author
       
//   }  else { 
    
    //   res.render("../labs/10/login"); 
   
//   }
}); //quotes

// function getAuthorInfo() {
//     let conn = dbConnection();

//     return new Promise(function(resolve, reject) { // confused about what gets returned here 
//         conn.connect(function(err) {
//             if (err) return reject(err);
//             //   console.log("Connected!");

//             let sql = `SELECT * 
//                       FROM l9_author`;
//             // console.log(sql);        
//             conn.query(sql, function(err, rows, fields) {
//                 // console.log(rows);
//                 if (err) return reject(err);
//                 conn.end();
//                 resolve(rows); // if everything goes well, DB connected and all, resolve() will return the rows
//             });

//         }); //connect
//     }); //promise

// }

// function getQuotes(query) {

//     let keyword = query.keyword;

//     let conn = dbConnection();

//     return new Promise(function(resolve, reject) {
//         conn.connect(function(err) {
//             if (err) throw err;
//             console.log("Connected!");

//             let params = [];

//             let sql = `SELECT quote, firstName, lastName, category, authorId
//                       FROM l9_quotes
//                       NATURAL JOIN l9_author
//                       WHERE 
//                       quote LIKE '%${keyword}%' OR firstName LIKE '%${keyword}%' OR lastName LIKE '%${keyword}%' OR CONCAT(l9_author.firstName, ' ', l9_author.lastName) LIKE '%${keyword}%'`;

//             if (query.category) { //user selected a category
//                 sql += " AND category = ?"; //To prevent SQL injection, SQL statement shouldn't have any quotes.
//             }
//             params.push(query.category);

//             console.log("SQL:", sql)
//             conn.query(sql, params, function(err, rows, fields) {
//                 if (err) throw err;
//                 //res.send(rows);
//                 conn.end();
//                 resolve(rows);
//             });

//         }); //connect
//     }); //promise

// } //getQuotes


function getCategories() {

    let conn = dbConnection();

    return new Promise(function(resolve, reject) {
        conn.connect(function(err) {
            if (err) throw err;
            // console.log("Connected!");

            let sql = `SELECT DISTINCT category 
                      FROM l9_quotes
                      ORDER BY category`;

            conn.query(sql, function(err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                conn.end();
                resolve(rows);
            });

        }); //connect
    }); //promise

} //getCategories

// router.get("/dbTest", function(req, res) {

//     let conn = dbConnection();

//     conn.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");

//         let sql = "SELECT * FROM l9_author WHERE sex = 'F'";

//         conn.query(sql, function(err, rows, fields) {
//             if (err) throw err;
//             conn.end();
//             res.send(rows);
//         });

//     });

// }); //dbTest

//values in red must be updated
function dbConnection() {

    let conn = mysql.createConnection({
        host: "c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        user: "ds0xc2vmvbxi1e5j",
        password: "jke8m8nmv7y3hnq7",
        database: "skzjmcjkossn3dap"
    }); //createConnection

    return conn;
}

router.get('/logout', function(req, res, next) {

    if (req.session && req.session.username && req.session.username.length) {
        delete req.session.username;
    }

    res.json({
        successful: true,
        message: ''
    });

});


function getSingleAuthorInfo(authorId){
    let conn = dbConnection();
    
    // console.log(authorId);
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
          if (err) throw err;
        //   console.log("Connected!");
        
            let sql = `
                    SELECT *
                    FROM l9_author
                    WHERE authorId = ?`;
            // console.log(sql); 
            conn.query(sql, [authorId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows[0]); //Query returns only ONE record
            });
            
        });//connect
    });//promise
    
}


router.get("/update", async function(req, res) {

    // console.log("hello");
    let authorInfo = await getSingleAuthorInfo(req.query.authorId);
    // console.log(authorInfo);
    res.render("../labs/10/update", { "author": authorInfo }); // author holds author info
});

router.post("/update", async function(req, res) {
    let rows = await updateAuthor(req.body);
    
    let authorInfo = req.body;
    // console.log("post->update->req.body",req.body);
    // console.log(rows);
    // console.log("First name: " + req.body.firstName); //When using the POST method, the form info is stored in req.body
    let message = "Author WAS NOT updated!";
    if (rows.affectedRows > 0) {
        message = "Author successfully updated!";
    }
    res.render("../labs/10/update", { "message": message, "author": authorInfo });
});

function updateAuthor(body) {

    let conn = dbConnection();

    return new Promise(function(resolve, reject) {
        conn.connect(function(err) {
            if (err) throw err;
            // console.log("Connected!");

            let sql = `UPDATE l9_author
                      SET firstName = ?, 
                          lastName  = ?
                     WHERE authorId = ?`;

            let params = [body.firstName, body.lastName, body.authorId];

            // console.log(sql);
            // console.log(params);

            conn.query(sql, params, function (err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                conn.end();
                resolve(rows);
            });

        }); //connect
    }); //promise 
}

router.get("/deleteAuthor", async function(req, res){
    // console.log("AAAAAAA");
    let rows = await deleteAuthor(req.query.authorId);
    // console.log(rows);
    //res.send("First name: " + req.body.firstName); //When using the POST method, the form info is stored in req.body
    let message = "Author WAS NOT deleted!";
    if (rows.affectedRows > 0) {
        message= "Author successfully deleted!";
    }    
    
    let authorList = await getAuthorList();  
    // console.log(authorList);
    res.render("../labs/10/authors", {"authorList":authorList});
}); // delete 

function deleteAuthor(authorId){
   
    let conn = dbConnection();
    // console.log(authorId);
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
        //   console.log("Connected!");
        
           let sql = `DELETE FROM l9_author
                      WHERE authorId = ?`;
        
           conn.query(sql, [authorId], function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

function getAuthorList(){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
        //   console.log("Connected!");
        
           let sql = `SELECT authorId, firstName, lastName 
                        FROM l9_author
                        ORDER BY lastName`;
        
           conn.query(sql, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

router.get("/addAuthor", function(req, res){
  res.render("../labs/10/addAuthor");
});

router.post("/addAuthor", async function(req, res){
  //res.render("newAuthor");
  let rows = await insertAuthor(req.body);
  console.log(rows);
  console.log(req.body);
  
  //res.send("First name: " + req.body.firstName); //When using the POST method, the form info is stored in req.body
  let message = "Author WAS NOT added to the database!";
  if (rows.affectedRows > 0) {
      message= "Author successfully added!";
  }
  res.render("../labs/10/addAuthor", {"message":message});
    
});

function insertAuthor(body){
   
   let conn = dbConnection();
    
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
        //   console.log("Connected!");
        
           let sql = `INSERT INTO l9_author
                        (firstName, lastName, sex)
                        VALUES (?,?,?)`;
        
           let params = [body.firstName, body.lastName, body.gender];
        
           conn.query(sql, params, function (err, rows, fields) {
              if (err) throw err;
              //res.send(rows);
              conn.end();
              resolve(rows);
           });
        
        });//connect
    });//promise 
}

module.exports = router;
