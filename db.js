import pg from "pg";

export async function getDb() {
  const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  await client.connect();

  return client;
}

export async function countMessagesInQueue() {
  try {
    const db = await getDb();

    db.query({
      text: `SELECT COUNT(*) FROM queue`,
    })
      .then((res) => {
        console.log("Messages in the queue:", res.rows[0].count);
      })
      .finally(() => {
        db.end();
      });
  } catch (error) {
    console.error("Error counting messages in the queue:", error);
  }
}

export async function countMessagesInStore1() {
  try {
    const db = await getDb();

    db.query({
      text: `SELECT COUNT(*) FROM store1`,
    })
      .then((res) => {
        console.log("Messages in store1:", res.rows[0].count);
      })
      .finally(() => {
        db.end();
      });
  } catch (error) {
    console.error("Error counting messages in store1:", error);
  }
}

export async function countMessagesInStore2() {
  try {
    const db = await getDb();

    db.query({
      text: `SELECT COUNT(*) FROM store2`,
    })
      .then((res) => {
        console.log("Messages in store2:", res.rows[0].count);
      })
      .finally(() => {
        db.end();
      });
  } catch (error) {
    console.error("Error counting messages in store2:", error);
  }
}

export async function clearStore(storeNumber) {
  try {
    const db = await getDb();

    db.query({
      text: `DELETE FROM store` + storeNumber,
    })
      .then(() => {
        console.log("Store" + storeNumber + " cleared successfully.");
      })
      .finally(() => {
        db.end();
      });
  } catch (error) {
    console.error("Error clearing store" + storeNumber + ":", error);
  }
}
