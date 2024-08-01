import mongoose, { model } from "mongoose";

interface ICourseScheduleSchema extends mongoose.Document{
  activity?: string;
  startDate?: string;
  endDate?: string
}

const courseScheduleSchema: mongoose.Schema<ICourseScheduleSchema> = new mongoose.Schema(
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
  { 
    collection: 'courseSchedule', // the collection this schema refers to
    timestamps: true
  }
);

// use this model if it exists, otherwise create a new model named courseSchedule using the courseScheduleSchema
const courseSchedule = mongoose.models.courseSchedule || mongoose.model<ICourseScheduleSchema>("courseSchedule", courseScheduleSchema)
export default courseSchedule;