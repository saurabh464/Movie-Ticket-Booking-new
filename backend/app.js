import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user-routes';
dotenv.config();
const app = express();

app.use(express.json());
app.use("/user" , userRouter);

mongoose.connect(
    `mongodb+srv://saurabhkumar46485:${process.env.MONGODB_PASSWORD}@cluster0.ftqmwpc.mongodb.net/?retryWrites=true&w=majority`
)
.then(
    () => app.listen(5000 , ()=> console.log("Connected to database and server started at 5000"))
)
.catch(err => console.log(err));
