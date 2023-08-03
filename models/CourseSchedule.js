import mongoose, { model } from "mongoose";

const courseSchema = new mongoose.Schema(
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
    { collection: 'courses' }, // the collection this schema refers to
    { timestamps: true }
  );

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.Courses || mongoose.model("Courses", courseSchema)
// export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);