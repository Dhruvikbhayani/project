import express from "express"
import liberal from '../middleware/liberal'
import adminAuth from '../middleware/admin'
import controller from '../controller'
import auth from "../middleware/auth"
const router = express.Router()

router.route("/")
    .post(auth, liberal, controller.bookController.createBook)
    .get(auth, liberal, controller.bookController.getAllBook)

router.route("/:id")
    .get(auth, liberal, controller.bookController.getBook)
    .put(auth, liberal, controller.bookController.updateBook)
    .delete(auth, liberal, controller.bookController.removeBook)

router.route("/liberal", auth, adminAuth, controller.bookController.CreateLiberal)

export default router