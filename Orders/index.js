require('dotenv').config();
const client = require("./db.js");
const bp = require("body-parser");


//EXPRESS SERVER
const express = require("express");
const app = express();
app.use(bp.json());
const port = 8002;


//GET ALL
app.get("/orders", (req, res) => {
  client.query("SELECT * FROM orders", (err, result) => {
    if (!err) {
      const orders = result.rows;
      console.log(orders);
      res.send(orders);
    }
  });
});


//GET
app.get("/orders/:id", (req, res) => {
  client.query(`SELECT * FROM orders WHERE id=${req.params.id}`, (err, result) => {
    if (!err) {
      const orders = result.rows[0];
      console.log(orders);
      if (orders) {
        res.statusCode = 200;
        res.send(orders);
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
app.post("/orders", (req, res) => {
  console.log(req.body);
  const orders = req.body;
  let insertQuery = `INSERT INTO orders(name, surname) 
                     values('${orders.name}', '${orders.surname}')`;

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
app.put("/orders/:id", (req, res) => {
  let orders = req.body;
  let updateQuery = `UPDATE orders
                       SET name = '${orders.name}',
                       surname = '${orders.surname}',
                       dateofborrow = '${orders.dateofborrow}',
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
app.delete("/orders/:id", (req, res) => {
  let insertQuery = `DELETE FROM orders WHERE id=${req.params.id}`;

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