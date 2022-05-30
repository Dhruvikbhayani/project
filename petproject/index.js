import express from "express";
import cors from 'cors';
import mongoose from "./src/db/conn";
import dotenv from 'dotenv';
import userrouter from "./src/router/userrouter";
import petrouter from "./src/router/petrouter";

const app = express()
app.use(express.json())

app.use(cors())
dotenv.config()

app.use('/user', userrouter)
app.use('/pets', petrouter)


const port = process.env.port || 6000
app.listen(port, () => {
    console.log('server is run' + port)
})