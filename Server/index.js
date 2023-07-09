import cors from 'cors';
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

const app=express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import adminRouter from './routes/admin.js'
import userRouter from './routes/users.js'

app.use('/',userRouter)
app.use('/admin',adminRouter)
app.use(express.static('public'));

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