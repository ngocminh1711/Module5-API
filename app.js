import express from 'express';
import  DBconnect  from "./src/model/DBconnect.js";
import movieRouter from "./src/routers/movie.router.js";
import cors from "cors"
import bodyParser from "express";
import userRouter from "./src/routers/user.router.js";

const app = express();
app.use(cors());

const PORT = 8000;

const db = new DBconnect();
app.use(bodyParser.json());



app.use('/api', movieRouter)
app.use('/api/user', userRouter )



db.connect().then( () => {
    console.log('DB connected')
}).catch(err => err.message)







app.listen(8000, function () {
    console.log('listening on port ' + PORT);
});
