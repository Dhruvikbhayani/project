import express from 'express'
import petcontroller from '../controller/petcontroller'
import auth from '../middleware/auth'
const petrouter = express.Router()

petrouter.post("/signup", auth, petcontroller.petcreate)
petrouter.get("/allfind", auth, petcontroller.allpetsfind)
petrouter.get("/find/:owner", auth, petcontroller.petfind)
petrouter.put("/update/:id", auth, petcontroller.petsupdate)
petrouter.delete("/delete/:id", auth, petcontroller.petsremove)




export default petrouter