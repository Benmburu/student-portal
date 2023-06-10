import mongoose from "mongoose";
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
  },
  {collection: 'users'},
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

userSchema.methods.matchPassword = async function (password) {
  // Compare provided password with hashed password
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model.User || mongoose.model("User", userSchema, "users");
