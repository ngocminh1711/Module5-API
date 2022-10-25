import mongoose , { Schema } from "mongoose";

const genreSchema = new Schema(
    {
        name: String,
    }
)
const Genre = mongoose.model('Genre',genreSchema)
export default Genre;



