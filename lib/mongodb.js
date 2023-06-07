import mongoose from "mongoose";

const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const database = encodeURIComponent("student_details")
const MONGO_URI = `mongodb+srv://${username}:${password}@cluster0.7rmpeat.mongodb.net/${database}?retryWrites=true&w=majority`

const initDB = () => {
  // Dont connect to DB if already connected
  if (mongoose.connections[0].readyState) {
    console.log("already connected");
    return;
  }
  // Connect to DB
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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