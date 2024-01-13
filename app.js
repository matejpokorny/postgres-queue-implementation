import {
  getDb,
  countMessagesInQueue,
  countMessagesInStore1,
  countMessagesInStore2,
  clearStore,
} from "./db.js";

async function messageProcessor(workerNumber, db) {
  const message = await db.query({
    text: `
    DELETE FROM queue
    WHERE id = (
        SELECT id FROM queue 
        ORDER BY id ASC 
        FOR UPDATE SKIP LOCKED 
        LIMIT 1
    )
    RETURNING *
        `,
  });

  if (message.rows.length === 0) {
    console.log("No messages in the queue, ending worker " + workerNumber);
    return;
  } else {
    let store = "";
    if (message.rows[0].header.topic === "topic1") {
      store = "store1";
    } else {
      store = "store2";
    }
    db.query({
      text: "INSERT INTO " + store + " (body) VALUES ($1)",
      values: [message.rows[0].body],
    });

    await messageProcessor(workerNumber, db);
  }
}

await countMessagesInQueue();
console.log("Starting to process messages using 5 workers...");

const dbConn1 = await getDb();
const dbConn2 = await getDb();
const dbConn3 = await getDb();
const dbConn4 = await getDb();
const dbConn5 = await getDb();

Promise.all([
  messageProcessor(1, dbConn1),
  messageProcessor(2, dbConn2),
  messageProcessor(3, dbConn3),
  messageProcessor(4, dbConn4),
  messageProcessor(5, dbConn5),
])
  .then(async () => {
    console.log("Finished processing messages.");
    await countMessagesInQueue();
    await countMessagesInStore1();
    await countMessagesInStore2();
  })
  .finally(() => {
    dbConn1.end();
    dbConn2.end();
    dbConn3.end();
    dbConn4.end();
    dbConn5.end();
  });
