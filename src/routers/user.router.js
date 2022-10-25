import express from "express";

import multer from 'multer' ;
import UserController from "../controller/user.controller.js";
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