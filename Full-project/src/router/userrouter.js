import express from "express";
import usercontroller from '../controller/usercontroller';
import auth from "../middleware/authtoken";
import adminauth from "../middleware/adminauth";
const usersrouter = express.Router()

usersrouter.post('/sign', usercontroller.sign)
usersrouter.post('/login', usercontroller.login)
usersrouter.post('/restpass', auth, usercontroller.restpass)
usersrouter.get('/find', auth, usercontroller.find)
usersrouter.get('/find/:id', auth, adminauth, usercontroller.allfind)
usersrouter.put('/updates', auth, adminauth, usercontroller.update)
usersrouter.delete('/delete/:id', auth, adminauth, usercontroller.remove)


export default usersrouter