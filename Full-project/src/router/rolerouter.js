import express from "express";
import rolecontroller from "../controller/rolecontroller";
import auth from "../middleware/authtoken";
import adminauth from "../middleware/adminauth";

const rolerouter = express.Router()


rolerouter.post('/', rolecontroller.create)
rolerouter.get('/find', auth, adminauth, rolecontroller.find)
rolerouter.get('/find/:id', auth, adminauth, rolecontroller.allfind)

rolerouter.put('/update/:id', auth, adminauth, rolecontroller.update)
rolerouter.delete('/delete/:id', auth, adminauth, rolecontroller.remove)


export default rolerouter