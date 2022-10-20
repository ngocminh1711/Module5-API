import Movie from "../model/schemas/movies.schemas.js";
import mongoose, {Schema} from "mongoose";

class MovieController {
    async add(req, res) {
        try {
            let data = {
                backdrop_path: req.body.backdrop_path,
                original_language: req.body.original_language,
                original_title: req.body.original_title,
            }

            let movie = new Movie(data)
            await movie.save();
            return res.status(200).json({
                status: 'success',
                message: 'Movie saved successfully'
            })

        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Movie saved error'
            })
        }
    }

    async getMovies(req, res) {
        try {
            let movies = await Movie.find()
            // res.header("Access-Control-Allow-Origin", "*");
            // res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return res.status(200).send({
                status: 'success',
                message: 'Get movies successfully',
                movies: movies
            })
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Error getting movies'
            })
        }
    }

    async getMovieById(req, res) {
        try {
            let movie_id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(movie_id)) {
                return res.status(404).send({message: 'Movie_id not found'})
            }
            let movie = await Movie.findOne({_id: movie_id})
            return res.status(200).send({
                status: 'success',
                message: 'Get movie by Id successfully',
                movie: movie
            })
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'error'
            })
        }
    }

    async deleteMovie(req, res) {
        try {
            let movie_id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(movie_id)) {
                return res.status(404).send({message: 'Movie_id not found'})
            }
            let movie = await Movie.findOneAndDelete({_id: movie_id})
            if (movie) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Movie deleted successfully'
                })

            } else {
                res.status(404).json({message: "Movie not found"})
            }
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'error delete'
            })
        }
    }

    async updateMovie(req, res) {
        try {
            let movie_id = req.params.id;
            let data = {
                backdrop_path: req.body.backdrop_path,
                original_language: req.body.original_language,
                original_title: req.body.original_title,
                markIMDB: req.body.markIMDB,
                video: req.body.video,
                trailer: req.body.trailer,
            }
            if (!mongoose.Types.ObjectId.isValid(movie_id)) {
                return res.status(404).send({message: 'Movie_id not found'})
            }
            let movie = await Movie.findOneAndUpdate({_id: movie_id}, data)
            if (movie) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Update movie successfully'
                })
            }
            else {
                res.status(404).json({message: "Movie not found"})
            }
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Update Movie error'
            })
        }
    }
}
export default MovieController;