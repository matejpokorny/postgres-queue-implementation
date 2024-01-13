import { getDb, countMessagesInQueue } from "./db.js";

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

    for (let i = 0; i < 100; i++) {
      const message = generateRandomMessage();
      await db.query({
        text: `INSERT INTO queue (header, body) VALUES ($1, $2)`,
        values: [message.header, message.body],
      });
    }

    await db.end();
  } catch (error) {
    console.error("Error pushing messages to the queue:", error);
  }
}

// push 10x100 messages to the queue in parallel
console.log("Starting to push messages to the queue with 10 workers...");
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
