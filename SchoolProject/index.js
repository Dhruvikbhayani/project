import 'dotenv/config'
import express from "express"
import cors from 'cors'
import mongoose from './src/db/connections'
import router from './src/router/'

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", router)



const PROT = process.env.PROT || 9000
app.listen(PROT, () => {
    console.log("server is run" + PROT)
})