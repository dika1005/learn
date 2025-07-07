import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local!");
}
if (!dbName) {
  throw new Error("❌ MONGODB_DB is not defined in .env.local!");
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// ⛑️ Tambahkan ini untuk hindari error TypeScript:
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
