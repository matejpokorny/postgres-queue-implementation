import { Client } from "pg";

export function getDb() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
  });

  client.connect();

  // create database if not exists
  client.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME + ";", (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database testdb created");
    }
  });

  client.end();

  return client;
}
