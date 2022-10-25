import express from "express";

import MovieController from "../controller/movie.controller.js";

import multer from 'multer' ;
const upload = multer()
const movieRouter = express.Router();
const movieController = new MovieController();

movieRouter.get('/movie', async function(req, res) {
   movieController.getMovies(req, res).catch(() => res.status(500).json('Server error') )
})

movieRouter.get('/movie/:id', async function(req, res) {
   movieController.getMovieById(req, res).catch(() => res.status(500).json('Server error') )
})

movieRouter.post('/movie',upload.none(), async (req, res) => {
    movieController.add(req, res).catch(() => res.status(500).json('Server error'))
    })
movieRouter.delete('/movie/:id', async (req, res) => {
    movieController.deleteMovie(req, res).catch(() => res.status(500).json('Server error'))
})
movieRouter.put('/movie/:id', async (req, res) => {
    movieController.updateMovie(req, res).catch(() => res.status(500).json('Server error'))
})

movieRouter.get('/genre', async (req, res) => {
    movieController.getGenre(req, res).catch(() => res.status(500   ).json('Server error'))
})
movieRouter.get('/movie/genre/:name', async (req, res) => {
    movieController.getMovieByGenre(req, res).catch(() => res.status(   500).json('Server error'))
})
movieRouter.get('/movie/search/:keyword', async (req, res) => {
    movieController.searchMovie(req, res).catch(() => res.status(500).json('Server error'))
})
movieRouter.get('/trendy', async (req, res) => {
    movieController.getMovieTopTrending(req, res).catch(() => res.status(500).json('Server error'));
})
movieRouter.get('/rating', async (req, res) => {
    movieController.getMovieTopRated(req, res).catch(() => res.status(500).json('Server error'))
})




export default movieRouter;