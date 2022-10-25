import express from 'express';
import  DBconnect  from "./src/model/DBconnect.js";
import movieRouter from "./src/routers/movie.router.js";
import cors from "cors"
import bodyParser from "express";
import authRouter from './src/routers/auth.router.js';
import userRouter from "./src/routers/user.router.js";
import AuthMiddleware from './src/middleware/auth.middleware.js';


const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;
const authMiddleware = new AuthMiddleware();
const db = new DBconnect();
app.use(bodyParser.json());


app.use('/api',authMiddleware.verifyToken, movieRouter);
app.use('', authRouter);
app.use('/api/user', userRouter )



db.connect().then( () => {
    console.log('DB connected')
}).catch(err => err.message)



app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});
