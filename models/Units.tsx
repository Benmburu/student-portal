import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUnitSchema extends mongoose.Document{
  unitCode?: string;
  unitName?: string;
  className?: string;
  semester?: string;
}
// schema used to model the document in a mongoDB database
const unitSchema: mongoose.Schema<IUnitSchema> = new mongoose.Schema(
  {
    unitCode: {
      type: String,
      required: false,
    },
    unitName: {
      type: String,
      required: false,
    },
    className: {
      type: String,
      required: false,
    },
    semester: {
      type: String,
      required: false,
    },
  },
  { 
    collection: 'units', // the collection this schema refers to
    timestamps: true 
  }
);

// use this model if it exists, otherwise create a new model named Units using the unitSchema
const Units = mongoose.models.Units || mongoose.model<IUnitSchema>("Units", unitSchema);
export default Units;