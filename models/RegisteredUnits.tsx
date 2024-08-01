import mongoose, { model } from "mongoose";

interface  IUnitSchema{
  unitCode?: string;
  unitName?: string;
  semester?: string
}

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
    semester: {
        type: String,
        required: false,
        unique: false,
    },
  }
);

interface  IRegisteredUnitSchema extends mongoose.Document{
  serviceNumber ?: string;
  studentName?: string;
  className ?: string;
  registeredUnits: IUnitSchema[]
}

const registeredUnitSchema: mongoose.Schema<IRegisteredUnitSchema> = new mongoose.Schema(
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
    {
      collection: 'registeredUnits', // the collection this schema refers to
      timestamps: true 
    }
  );

// use this model if it exists, otherwise create a new model named registeredUnits using the registeredUnitSchema
const registeredUnits = mongoose.models.registeredUnits || mongoose.model<IRegisteredUnitSchema>("registeredUnits", registeredUnitSchema)
export default registeredUnits;