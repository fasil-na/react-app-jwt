import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors';

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

import adminRouter from './routes/admin.js'
import userRouter from './routes/users.js'

app.use('/admin',adminRouter)
app.use('/',userRouter)

const PORT = 4000;

mongoose
    .connect('mongodb://127.0.0.1:27017/react-auth', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));