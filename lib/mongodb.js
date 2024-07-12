import mongoose from "mongoose";

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const database = encodeURIComponent("student_details")

const MONGO_URI = `mongodb://${username}:${password}@ac-lxhagxb-shard-00-00.7rmpeat.mongodb.net:27017,ac-lxhagxb-shard-00-01.7rmpeat.mongodb.net:27017,ac-lxhagxb-shard-00-02.7rmpeat.mongodb.net:27017/?ssl=true&replicaSet=atlas-103h87-shard-0&authSource=admin&retryWrites=true&w=majority`
const initDB = () => {
  // Dont connect to DB if already connected
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  // Connect to DB
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    dbName: "student_details",
  });
  mongoose.connection.on("connected", () => {
    console.log("connected to mongo");
    // console.log(mongoose.connections);
  });
  mongoose.connection.on("error", (err) => {
    console.log("error connecting", err);
  });
};

export default initDB;