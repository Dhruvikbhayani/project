import express from 'express';
import usercontroller from "../controller/usercontroller"
const userrouter = express.Router()
import auth from '../middleware/auth'

userrouter.post("/signup", usercontroller.usersignup)
userrouter.post("/login", usercontroller.userlogin)
userrouter.get("/find", auth, usercontroller.userfind)
userrouter.put("/update/:id", auth, usercontroller.userupdate)
userrouter.delete("/delete/:id", auth, usercontroller.userremove)

export default userrouter