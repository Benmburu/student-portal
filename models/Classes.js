import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// schema used to model the document in a mongoDB database
const ClassSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
  },
  { collection: 'class' }, // the collection this schema refers to
  { timestamps: true }
);

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.Class || mongoose.model("Class", ClassSchema);
