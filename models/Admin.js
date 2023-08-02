import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// schema used to model the document in a mongoDB database
const adminSchema = new mongoose.Schema(
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
  },
  { collection: 'admin' }, // the collection this schema refers to
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  // Hash password before saving user
  if (this.isModified("password")) {
    // salt the password making it harder to crack if the DB was ever compromised
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
