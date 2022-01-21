require('dotenv').config()
const client = require("./db.js");
const bp = require("body-parser");

//EXPRESS server
const express = require("express");
const app = express();
app.use(bp.json());
const port = 8000;
//---------------------------------------------------------------------------GET ALL Customers
app.get("/customers", (req, res) => {
  client.query("SELECT * FROM customers", (err, result) => {
    if (!err) {
      const customers = result.rows;
      console.log(customers);
      res.send(customers);
    }
  });
});
//---------------------------------------------------------------------------GET Customer
app.get("/customers/:id", (req, res) => {
  client.query(`Select * from customers where id=${req.params.id}`, (err, result) => {
    if (!err) {
      const customers = result.rows[0];
      console.log(customers);
      if (customers) {
        res.statusCode = 200;
        res.send(customers);
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
//---------------------------------------------------------------------------ADD new Customers
app.post("/customers", (req, res) => {
  console.log(req.body);
  const customers = req.body;
  let insertQuery = `insert into customers(name, surname) 
                     values('${customers.name}', '${customers.surname}')`;

  client.query(insertQuery, (err, result) => {
    console.log("Query...");
    if (!err) {
      res.send("Post was successful!");
    } else {
      console.log(err.message);
      res.send();
    }
  });
});

//---------------------------------------------------------------------------------------UPDATE customers

app.put("/customers/:id", (req, res) => {
  let customers = req.body;
  let updateQuery = `update customers
                       set name = '${customers.name}',
                       surname = '${customers.surname}'
                       where id = ${req.params.id}`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("UPDATE was successful");
    } else {
      console.log(err.message);
      res.send();
    }
  });
});

//---------------------------------------------------------------------------------------DELETE customers

app.delete("/customers/:id", (req, res) => {
  let insertQuery = `delete from customers where id=${req.params.id}`;

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
