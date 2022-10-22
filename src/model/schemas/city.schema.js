import mongoose , { Schema, model } from "mongoose";

const citySchema = new Schema(
    {
        name: String,
    }
)
const City = mongoose.model('City',citySchema)
export default City;



