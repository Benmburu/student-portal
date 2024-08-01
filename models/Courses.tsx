import mongoose, { model } from "mongoose";

interface IClassCourseSchema extends mongoose.Document{
  course_code?: string;
  school?: string;
  course_name?: string
}

const courseSchema: mongoose.Schema<IClassCourseSchema> = new mongoose.Schema(
  {
    course_code: {
      type: String,
      required: false,
    },
    school: {
      type: String,
      required: false,
      unique: false,
    },
    course_name: {
      type: String,
      required: false,
    },
  },
  { 
    collection: 'courses', // the collection this schema refers to
    timestamps: true 
  }
);

// use this model if it exists, otherwise create a new model named Courses using the courseSchema
const Courses = mongoose.models.Courses || mongoose.model<IClassCourseSchema>("Courses", courseSchema)
export default Courses;