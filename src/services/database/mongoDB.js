import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);

export async function connect() {
  try {
    let db;

    await mongoClient.connect().then(() => {
      db = mongoClient.db();
      console.log("Database connection has been opened");
    });

    return db;
  } catch (error) {
    return {
      error: "Connect function failed",
      details: error,
    };
  }
}

export async function close() {
  try {
    await mongoClient.close();
    console.log("Database connection has been closed");
    return;
  } catch (error) {
    return {
      error: "Close database connection has been failed",
      details: error,
    };
  }
}
