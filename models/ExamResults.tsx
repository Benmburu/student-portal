import mongoose, { model } from "mongoose";

interface IResultSchema{
  unitName?: string;
  marks?: string;
  grade?: string
}

const resultSchema: mongoose.Schema<IResultSchema> = new mongoose.Schema(
  {
    unitName: {
      type: String,
      required: false,
    },
    marks: {
      type: String,
      required: false,
    },
    grade: {
      type: String,
      required: false,
    },
  }
);

interface IExamResultSchema extends mongoose.Document{
  serviceNumber?: string;
  studentName?: string;
  semester?: string;
  className?: string;
  results?: [IResultSchema]
}

const examResultSchema: mongoose.Schema<IExamResultSchema> = new mongoose.Schema(
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
      results: [resultSchema],
    },
    { 
      collection: 'examResults', // the collection this schema refers to
      timestamps: true 
    }
  );

// use this model if it exists, otherwise create a new model named examResults using the examResultSchema
const examResults = mongoose.models.examResults || mongoose.model<IExamResultSchema>("examResults", examResultSchema)
export default examResults;