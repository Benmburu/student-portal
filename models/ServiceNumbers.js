import mongoose, { model } from "mongoose";

const serviceNumberSchema = new mongoose.Schema(
    {serviceNumber: {
        type: String,    }
    },
    {collection: 'serviceNumbers'}
);

// use this model if it exists, otherwise create a new model named User using the userSchema
export default mongoose.models.serviceNumbers || mongoose.model("serviceNumbers", serviceNumberSchema)