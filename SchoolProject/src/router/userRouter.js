import express from "express";
import controllers from "../controller";
import auth from '../middleware/auth'
import adminAuth from "../middleware/admin";
const router = express.Router()

router.route("/")
    .post(controllers.userController.userLogin)
    .get(auth, adminAuth, controllers.userController.getUser)

router.route("/:id")
    .put(auth, adminAuth, controllers.userController.userUpdate)
    .delete(auth, adminAuth, controllers.userController.userRemove)

export default router