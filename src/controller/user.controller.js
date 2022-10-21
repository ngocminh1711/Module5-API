import User from "../model/schemas/user.schemas.js";
import Movie from "../model/schemas/movies.schemas.js";
import Genre from "../model/schemas/genre.schema.js";
import mongoose from "mongoose";


class UserController {

    async getUsers(req, res) {
        try {
            let users = await User.find()
            if (!users) {
                return res.status(404).json({
                    status: 'error',
                    message: "No users found"
                })
            } else {
                return res.status(200).json({
                    status: 'success',
                    message: "Get users successfully",
                    users: users
                })
            }


        } catch (err) {
            return res.status(500).json({
                status: 'error',
                message: "No users found"
            })
        }
    }

    async addUser(req, res) {
        try {
            const data = req.body

            let user = new User(data)
            await user.save();

            return res.status(200).json({
                status: 'success',
                message: 'User saved successfully'
            })

        } catch (err) {
            return res.json({
                status: 'error',
                message: 'User saved error'
            })
        }

    }

    async getCities(req, res) {
        try {
            let cities = await City.find()
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            return res.status(200).send({
                status: 'success',
                message: 'Get genres successfully',
                cities: cities
            })
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Error getting cities'
            })
        }
    }
   async updateUser(req, res ) {
        try {
            let user_id = req.params.id;
            let data = req.body;
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                return res.status(404).send({message: 'User_id not found'})
            }
            let user = await User.findOneAndUpdate({_id: user_id}, data)
            if (user) {
                return res.status(200).json({
                    status: 'success',
                    message: 'Update user successfully'
                })
            } else {
                res.status(404).json({message: "User not found"})
            }
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'Update User error'
            })
        }
    }
    async deleteUser(req, res) {
        try {
            let user_id = req.params.id;
            console.log(user_id)
            if (!mongoose.Types.ObjectId.isValid(user_id)) {
                return res.status(404).send({message: 'User_id not found'})
            }
            let user = await User.findOneAndDelete({_id: user_id})
            if (user) {
                return res.status(200).json({
                    status: 'success',
                    message: 'User deleted successfully'
                })

            } else {
                res.status(404).json({message: "User not found"})
            }
        } catch (err) {
            return res.json({
                status: 'error',
                message: 'error delete'
            })
        }
    }
}
export default UserController;