import mongoose from "mongoose";

const serviceNumberSchema = new mongoose.Schema(
    {serviceNumber: {
        type: String,    }
    },
    {collection: 'serviceNumbers'}
);

export default mongoose.model.serviceNumbers || mongoose.model("serviceNumbers", serviceNumberSchema)