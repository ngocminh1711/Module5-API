import mongoose , { Schema, model } from "mongoose";

const movieSchema = new Schema(
    {
        id: Number,
        backdrop_path: String,
        original_language: String,
        original_title: String,
        genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
        markIMDB: Number,
        video: String,
        trailer: String,
    }
)
const Movie = mongoose.model('Movie',movieSchema)
export default Movie;