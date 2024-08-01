import mongoose from "mongoose";

interface IClass extends mongoose.Document{
  className?: string;
  course?: string;
  courseCode?: string;
  school?: string
}
// schema used to model the document in a mongoDB database
const ClassSchema: mongoose.Schema<IClass> = new mongoose.Schema(
  {
    className: {
      type: String,
      required: false,
    },
    course: {
      type: String,
      required: false,
    },
    courseCode: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
    },
  },
  { 
    collection: 'class', // the collection this schema refers to
    timestamps: true 
  }
);

// use this model if it exists, otherwise create a new model named Class using the classSchema
export default mongoose.models.Class || mongoose.model<IClass>("Class", ClassSchema);
