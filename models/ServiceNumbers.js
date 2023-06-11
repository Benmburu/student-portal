import mongoose, { model } from "mongoose";

const serviceNumberSchema = new mongoose.Schema(
    {serviceNumber: {
        type: String,    }
    },
    {collection: 'serviceNumbers'}
);

export default mongoose.models.serviceNumbers || mongoose.model("serviceNumbers", serviceNumberSchema)