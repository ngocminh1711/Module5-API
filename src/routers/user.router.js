import express from "express";

import MovieController from "../controller/movie.controller.js";
import req from "express/lib/request.js";
import res from "express/lib/response.js";
import multer from 'multer' ;
import UserController from "../controller/user.controller.js";
const upload = multer()
const userRouter = express.Router();
const userController = new UserController();


userRouter.get('/', function(req, res, next) {
    userController.getUsers(req, res).catch(() => res.status(500).json('Server error'))
})
userRouter.post('/', function(req, res, next) {
    userController.addUser(req, res).catch(() => res.status(500).json('Server error'))
})
userRouter.get('/:id', function(req, res, next) {
    userController.getUserById(req, res).catch(() => res.status(500).json)
})
userRouter.get('/cities', function(req, res, next) {
    userController.getCities(req, res).catch(() => res.status(500).json('Server error'))
})
userRouter.put('/:id', function(req, res, next) {
    userController.updateUser(req, res).catch(() => res.status(500).json('Server error'))
})
userRouter.delete('/:id', function(req, res, next) {
    userController.deleteUser(req, res).catch(() => res.status(500).json('Server error'))
    }
)



export default userRouter;