import mongoose, { model } from "mongoose";

const courseScheduleSchema = new mongoose.Schema(
    {
        activity: {
        type: String,
        required: false,
      },
      startDate: {
        type: String,
        required: false,
        unique: false,
      },
      endDate: {
        type: String,
        required: false,
      },
    },
    { collection: 'courseSchedule' }, // the collection this schema refers to
    { timestamps: true }
  );

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.courseSchedule || mongoose.model("courseSchedule", courseScheduleSchema)
// export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);