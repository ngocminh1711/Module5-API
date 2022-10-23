import bcrypt from "bcrypt";
import User from "../model/userSchemas/user.js";
import jwt from 'jsonwebtoken';

export let secretKey;

class AuthController {
  register = async (req, res) => {
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    user = await User.create(user);
    res.status(201).json(user);
  };

  login = async (req, res) => {
    let loginForm = req.body;
    let user = await User.findOne({
      username: loginForm.username
    });
    if (!user) {
        res.status(401).json({
            message: 'User is not existed !'
        })
    }else{
        let comparePassword = await bcrypt.compare(loginForm.password, user.password);
        if(!comparePassword){
            res.status(401).json({
                message: "Password is wrong"
            })
        }else{
            let payload = {
                username: user.username
            }
            secretKey = 'huydo';
            let token = await jwt.sign(payload, secretKey, {
                expiresIn : 36000
            });
            res.status(200).json({
                token: token
            })
        }
    }
  };
}

export default AuthController;
