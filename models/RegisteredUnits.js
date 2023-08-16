import mongoose, { model } from "mongoose";

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
    semester: {
        type: String,
        required: false,
        unique: false,
    },
  });


const registeredUnitSchema = new mongoose.Schema(
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
      className: {
        type: String,
        required: false,
        unique: false,
      },
      registeredUnits: [unitSchema],
    },
    { collection: 'registeredUnits' }, // the collection this schema refers to
    { timestamps: true }
  );

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.registeredUnits || mongoose.model("registeredUnits", registeredUnitSchema)
// export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);