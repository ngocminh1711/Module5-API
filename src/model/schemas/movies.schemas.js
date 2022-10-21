import mongoose , { Schema, model } from "mongoose";

const movieSchema = new Schema(
    {
        backdrop_path: String,
        detail_image: String,
        original_language: String,
        original_title: String,
        overview: String,
        release_date: Date,
        genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
        popularity: Number,
        markIMDB: Number,
        video: String,
        trailer: String,
    }
)
const Movie = mongoose.model('Movie',movieSchema)
export default Movie;


