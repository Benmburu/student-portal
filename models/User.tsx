import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

interface IUserSchema extends mongoose.Document{
  serviceNumber?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmed?: string;
  verificationCode?: string;
  class?: string;
  role: string;
}
// schema used to model the document in a mongoDB database
const userSchema: mongoose.Schema<IUserSchema> = new mongoose.Schema(
  {
    serviceNumber: {
      type: String,
      required: false,
    },
    name: {
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
    confirmed: {
      type: Boolean,
      required: false,
      default: false,
    },
    verificationCode:{
      type: Number,
      required: false,
      default: null,
    },
    class: {
      type: String,
      required: false,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: "student",
    },
  },
  { 
    collection: 'users', // the collection this schema refers to
    timestamps: true 
  }
);

userSchema.pre<IUserSchema>("save", async function (next) {
  // Hash password before saving user
  if (this.isModified("password")) {
    // salt the password making it harder to crack if the DB was ever compromised
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
  }
  next();
});

// use this model if it exists, otherwise create a new model named User using the userSchema
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;