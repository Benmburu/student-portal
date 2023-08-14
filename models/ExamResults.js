import mongoose, { model } from "mongoose";


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
      className: {
        type: String,
        required: false,
        unique: false,
      },
      unit1: {
        type: String,
        required: false,
        unique: false,
      },
      unit2: {
        type: String,
        required: false,
        unique: false,
      },
      unit3: {
        type: String,
        required: false,
        unique: false,
      },
      unit4: {
        type: String,
        required: false,
        unique: false,
      },
      unit5: {
        type: String,
        required: false,
        unique: false,
      },
      unit6: {
        type: String,
        required: false,
        unique: false,
      },
      unit7: {
        type: String,
        required: false,
        unique: false,
      },
      unit8: {
        type: String,
        required: false,
        unique: false,
      },
    },
    { collection: 'examResults' }, // the collection this schema refers to
    { timestamps: true }
  );

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.examResults || mongoose.model("examResults", examResultSchema)
// export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);