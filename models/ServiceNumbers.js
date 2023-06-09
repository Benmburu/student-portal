import mongoose from "mongoose";

const serviceNumberSchema = new mongoose.Schema(
    {}
)

export default mongoose.model.serviceNumber || mongoose.model("serviceNumber", serviceNumberSchema, "reg_number")