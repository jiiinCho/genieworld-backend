import { MongoClient, Db } from "mongodb";
import { config } from "../config";

const dbUrl = config.db.host;
let db: Db;

export async function connectDB() {
  return MongoClient.connect(dbUrl) //
    .then((client) => {
      db = client.db();
    });
}

export function getUsers() {
  return db.collection("users");
}

export function getGenies() {
  return db.collection("genies");
}

export function getCharacters() {
  return db.collection("characters");
}
