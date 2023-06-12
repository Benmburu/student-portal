import mongoose, { model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
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
  },
  { collection: 'users' },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash password before saving user
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

export default mongoose.models.User || mongoose.model("User", userSchema);
