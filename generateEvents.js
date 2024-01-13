import getDb from "./db.js";

function generateRandomMessage() {
  const topics = ["topic1", "topic2"];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];
  const header = {
    topic: `${randomTopic}`,
  };
  const body = { data: Math.random().toString(36).substring(7) };
  return { header, body };
}

async function pushMessagesToQueue() {
  try {
    const db = await getDb();

    for (let i = 0; i < 1000; i++) {
      const message = generateRandomMessage();
      await db.query({
        text: `INSERT INTO queue (header, body) VALUES ($1, $2)`,
        values: [message.header, message.body],
      });
    }

    await db.end();
    console.log("Messages pushed to the queue successfully.");
  } catch (error) {
    console.error("Error pushing messages to the queue:", error);
  }
}

async function countMessagesInQueue() {
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

// push 10x1000 messages to the queue in parallel
Promise.all([
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
  pushMessagesToQueue(),
]).then(() => {
  console.log("Database populated successfully.");
  countMessagesInQueue();
});
