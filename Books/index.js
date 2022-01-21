require('dotenv').config();
const client = require("./db.js");
const bp = require("body-parser");


//EXPRESS SERVER
const express = require("express");
const app = express();
app.use(bp.json());
const port = 8001;


//GET ALL
app.get("/bookslib", (req, res) => {
  client.query("SELECT * FROM bookslib", (err, result) => {
    if (!err) {
      const bookslib = result.rows;
      console.log(bookslib);
      res.send(bookslib);
    }
  });
});


//GET
app.get("/bookslib/:id", (req, res) => {
  client.query(`SELECT * FROM bookslib WHERE id=${req.params.id}`, (err, result) => {
    if (!err) {
      const bookslib = result.rows[0];
      console.log(bookslib);
      if (bookslib) {
        res.statusCode = 200;
        res.send(bookslib);
      } else {
        res.statusCode = 404;
        res.send();
      }
    } else {
      res.status = 500;
      res.send();
      console.log(err);
    }
  });
});


//POST
app.post("/bookslib", (req, res) => {
  console.log(req.body);
  const bookslib = req.body;
  let insertQuery = `INSERT INTO bookslib(title, author, publisher) 
                     values('${bookslib.title}', '${bookslib.author}', '${bookslib.publisher}')`;

  client.query(insertQuery, (err, result) => {
    console.log("Query...");
    if (!err) {
      res.send("POST was successful!");
    } else {
      console.log(err.message);
      res.send();
    }
  });
});


//PUT
app.put("/bookslib/:id", (req, res) => {
  let bookslib = req.body;
  let updateQuery = `UPDATE bookslib
                       SET title = '${bookslib.title}',
                       author = '${bookslib.author}',
                       publisher = '${bookslib.publisher}'
                       WHERE id = ${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("PUT was successful!");
    } else {
      console.log(err.message);
      res.send();
    }
  });
});


//DELETE
app.delete("/bookslib/:id", (req, res) => {
  let insertQuery = `DELETE FROM bookslib WHERE id=${req.params.id}`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("DELETE was successful!");
    } else {
      console.log(err.message);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});