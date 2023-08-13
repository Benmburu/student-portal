import mongoose, { model } from "mongoose";

const resultSchema = new mongoose.Schema(
    {
      unitCode: {
        type: String,
        required: false,
      },
      unitName: {
        type: String,
        required: false,
      },
      marks: {
        type: String,
        required: false,
      },
    }
)

const examResultSchema = new mongoose.Schema(
    {
        serviceNumber: {
        type: String,
        required: false,
      },
      studentName: {
        type: String,
        required: false,
        unique: false,
      },
      semester: {
        type: String,
        required: false,
        unique: false,
      },
      results: [resultSchema],
    },
    { collection: 'examResults' }, // the collection this schema refers to
    { timestamps: true }
  );

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.examResults || mongoose.model("examResults", examResultSchema)
// export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);