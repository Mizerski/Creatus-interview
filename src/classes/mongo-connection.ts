import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export class MongoConnection {
  private dbName: string;

  constructor() {
    this.dbName = process.env.MONGO_DB_NAME || "";
  }

  async connect() {
    const mongoURI = (process.env.MONGO_BASE_URI ?? "")
      .replace("{user}", process.env.MONGO_USER ?? "")
      .replace(
        "{password}",
        encodeURIComponent(process.env.MONGO_PASSWORD ?? "")
      );
    try {
      await mongoose.connect(mongoURI);
      console.log("MongoDB connected successfully via Mongoose");
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      console.log("Disconnected from MongoDB");
    } catch (err) {
      console.error(err);
    }
  }

  async getCollection(collectionName: string) {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionExists = collections.some(
      (collection) => collection.name === collectionName
    );
    if (!collectionExists) {
      throw new Error(
        `Collection ${collectionName} does not exist in database ${this.dbName}.`
      );
    }
    return db.collection(collectionName);
  }

  async getDatabase() {
    const db = mongoose.connection.db;
    const adminDb = db.admin();
    const { databases } = await adminDb.listDatabases();
    const dbExists = databases.some((db) => db.name === this.dbName);
    if (!dbExists) {
      throw new Error(`Database ${this.dbName} does not exist.`);
    }
    return db;
  }
}
