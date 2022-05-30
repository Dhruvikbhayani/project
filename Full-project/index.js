import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from "dotenv";
import rolerouter from "./src/router/rolerouter";
import usersrouter from "./src/router/userrouter";


const app = express()
app.use(express.json())


app.use(cors())
dotenv.config()

mongoose.connect('mongodb://localhost:27017/user')

app.use("/user", usersrouter)
app.use('/role', rolerouter)

const port = process.env.port || 3000
app.listen(port, () => {
    console.log('server is run' + port)
})