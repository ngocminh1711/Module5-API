import mongoose , { Schema, model } from "mongoose";

const genreSchema = new Schema(
    {
        id: Number,
        name: String,
    }
)
const Genre = mongoose.model('Movie',genreSchema)
export default Genre;