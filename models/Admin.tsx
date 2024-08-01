import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IAdmin extends mongoose.Document{
  serviceNumber?: string;
  email?: string;
  password?: string;
  verificationCode?: number;
  name?: string;
  role: string
}

// schema used to model the document in a mongoDB database
const adminSchema: mongoose.Schema<IAdmin> = new mongoose.Schema(
  {
    serviceNumber: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: false,
    },
    password: {
      type: String,
      required: false,
    },
    verificationCode:{
      type: Number,
      required: false,
      default: null,
    },
    name: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
    },
  },
  { 
    collection: 'admin', // the collection this schema refers to
    timestamps: true
  }
);

adminSchema.pre<IAdmin>("save", async function (next) {
  // Hash password before saving user
  if (this.isModified("password")) {
    // salt the password making it harder to crack if the DB was ever compromised
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
  }
  next();
});

// use this model if it exists, otherwise create a new model named Admin using the adminSchema
const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;