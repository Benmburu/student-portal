import mongoose, { model } from "mongoose";

interface IServiceNumberSchema extends mongoose.Document{
    serviceNumber?: string;
}

const serviceNumberSchema: mongoose.Schema<IServiceNumberSchema> = new mongoose.Schema(
    {
        serviceNumber: {
            type: String
        }
    },
    {
        collection: 'serviceNumbers'
    }
);

// use this model if it exists, otherwise create a new model named serviceNumbers using the serviceNumberSchema
const serviceNumbers = mongoose.models.serviceNumbers || mongoose.model<IServiceNumberSchema>("serviceNumbers", serviceNumberSchema)
export default serviceNumbers;