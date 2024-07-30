import mongoose from "mongoose";

const username: string = encodeURIComponent(process.env.MONGODB_USERNAME as string);
const password: string = encodeURIComponent(process.env.MONGODB_PASSWORD as string);
const database: string = encodeURIComponent("student_details")

const MONGO_URI: string = `mongodb://${username}:${password}@ac-lxhagxb-shard-00-00.7rmpeat.mongodb.net:27017,ac-lxhagxb-shard-00-01.7rmpeat.mongodb.net:27017,ac-lxhagxb-shard-00-02.7rmpeat.mongodb.net:27017/?ssl=true&replicaSet=atlas-103h87-shard-0&authSource=admin&retryWrites=true&w=majority`
const initDB = (): void => {
  // Dont connect to DB if already connected
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  // Connect to DB
  mongoose.connect(MONGO_URI, {
    dbName: "student_details",
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
  });
  mongoose.connection.on("error", (err: Error) => {
    console.log("error connecting", err);
  });
};

export default initDB;