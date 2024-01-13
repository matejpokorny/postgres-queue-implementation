import getDb from "./db.js";

async function migrate() {
  const db = await getDb();

  db.query({
    text: `CREATE TABLE IF NOT EXISTS queue (
        id SERIAL PRIMARY KEY,
        header JSONB NOT NULL,
        body JSONB NOT NULL
        );`,
  })
    .then(() => {
      console.log("Table queue created successfully!");
    })
    .catch((err) => {
      console.log(err);
    });

  db.query({
    text: `CREATE TABLE IF NOT EXISTS store1 (
        PK SERIAL PRIMARY KEY,
        body JSONB NOT NULL
        );`,
  })
    .then(() => {
      console.log("Table store 1 created successfully!");
    })
    .catch((err) => {
      console.log(err);
    });

  db.query({
    text: `CREATE TABLE IF NOT EXISTS store2 (
          PK SERIAL PRIMARY KEY,
          body JSONB NOT NULL
          );`,
  })
    .then(() => {
      console.log("Table store 2 created successfully!");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      db.end();
    });
}

migrate();
