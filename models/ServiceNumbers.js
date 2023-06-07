import mongoose from "mongoose";

const serviceNumberSchema = new mongoose.Schema(
    {
        serviceNumber: {
            _id: new mongoose.Types.ObjectId(),
            type: String,
        },
    }
)

export default mongoose.model("reg_number", serviceNumberSchema)