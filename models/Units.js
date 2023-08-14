import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// schema used to model the document in a mongoDB database
const unitSchema = new mongoose.Schema(
  {
    unitCode: {
      type: String,
      required: false,
    },
    unitName: {
      type: String,
      required: false,
    },
    courseName: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
      required: false,
    },
  },
  { collection: 'units' }, // the collection this schema refers to
  { timestamps: true }
);

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.Units || mongoose.model("Units", unitSchema);