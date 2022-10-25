import Movie from "../model/schemas/movies.schemas.js";
import mongoose from "mongoose";
import Genre from "../model/schemas/genre.schema.js";


class MovieController {  

    async add(req, res) {
        try {
            const data = {
                backdrop_path: req.body.backdrop_path,
                detail_image: req.body.detail_image,
                original_language: req.body.original_language,
                original_title: req.body.original_title,
                overview: req.body.overview,
                release_date: req.body.release_date,
                genre: req.body.genre,
                popularity: req.body.popularity,
                markIMDB: req.body.markIMDB,
                video: req.body.videoLink,
                trailer: req.body.trailer,
            }

            let movie = new Movie(data)
            console.log(movie)
            await movie.save();

            return res.status(200).json({
                status: 'success',
                message: 'Movie saved successfully'
            })

        }
        catch (err) {
            return res.json({
                status: 'error',
                message: 'Movie saved error'
            })
        }
    }

    async getMovies(req, res) {
        try {
            let movies = await Movie.find().populate('genre')
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return res.status(200).send({
                status: 'success',
                message: 'Get movies successfully',
                movies: movies,
            })
            
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Error getting movies'
            })
        }
    }

    async getMovieTopTrending(req, res) {
        try {
            console.log(1)
            let movies = await Movie.find({ markIMDB : { $gte: 6}})
            console.log(movies)
            if (movies) {
                return res.json({
                    status: 'success',
                    message: 'get movies successfully',
                    movies: movies
                })
            }
            else {
                return res.json({
                    status: 'error',
                    message: 'get movies error',
                })
            }
        }
        catch (err) {
            return res.json({ status: 'error', message: err.message })
        }
    }

    async getMovieTopRated(req, res) {
        try {
            let movies = await Movie.find({ popularity : { $gte: 10}})
            if (movies) {
                return res.json({
                    status: 'success',
                    message: 'get movies successfully',
                    movies: movies
                })
            }
            else {
                return res.json({
                    status: 'error',
                    message: 'get movies error',
                })
            }
        }
        catch (err) {
            return res.json({ status: 'error', message: err.message })
        }


    }


    async getGenre(req, res) {
        try {
            let genres = await Genre.find()
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return res.status(200).send({
                status: 'success',
                message: 'Get genres successfully',
                genres: genres
            })
        } catch (err) {
            return res.json({
                status: 'error',
                message:  'Error getting genres'

            })
        }

    }

    async getMovieByGenre (req, res) {
        try {
            let movie_name = req.params.name
            if (!movie_name) {
                return res.status(404).send({message: 'Movie_name not found'})
            }
            else {
                let genreFind = await Genre.find({ name: movie_name})
                let movie = await Movie.find({genre: genreFind}).populate('genre')
                return res.status(200).send({
                    status: 'success',
                    message: 'Get movie successfully',
                    movie: movie
                })
            }

        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Error getting movie'
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
    async searchMovie(req, res) {
        try {
            let keyword = req.params.keyword;
            let genres = await Genre.find({$or: [{name: {$regex: `${keyword}`, $options: 'i'}}]})
            let movie = await Movie.find( {$or: [{original_title: {$regex: `${keyword}`, $options: 'i'}},
                    {original_language: {$regex: `${keyword}`, $options: 'i'}},
                    { genre : genres }
                ]}).populate('genre')
            if (!movie) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Movie not found'
                })
            }
            else {

                return res.status(200).send({
                    status: 'success',
                    message: 'Search movie successfully',
                    movie: movie
                })
            }
        }
        catch (err) {
            return res.status(404).send({
                status: 'error',
                message: 'Movie not found'
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
                detail_image: req.body.detail_image,
                original_language: req.body.original_language,
                original_title: req.body.original_title,
                overview: req.body.overview,
                release_date: req.body.release_date,
                genre: req.body.genre,
                popularity: req.body.popularity,
                markIMDB: req.body.markIMDB,
                videoLink: req.body.videoLink,
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
            } else {
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