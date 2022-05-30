import express from "express"
import adminAuth from '../middleware/admin'
import controller from '../controller'
import userAuth from "../middleware/auth"
const router = express.Router()

router.route("/")
    .post(userAuth, adminAuth, controller.classController.createClass)
    .get(userAuth, adminAuth, controller.classController.getAllClass)

router.route("/:id")
    .get(userAuth, adminAuth, controller.classController.getClass)
    .put(userAuth, adminAuth, controller.classController.updateClass)
    .delete(userAuth, adminAuth, controller.classController.removeClass)



export default router