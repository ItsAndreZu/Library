const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: process.env.DB_HOST,
  database: "customers",
  password: "postgres",
  port: process.env.DB_PORT,
});

client.connect();

module.exports = client;