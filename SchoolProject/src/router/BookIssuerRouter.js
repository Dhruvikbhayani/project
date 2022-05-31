import express from "express"
import liberal from '../middleware/liberal'
import controller from '../controller'
import auth from "../middleware/auth"
const router = express.Router()

router.route("/")
    .post(auth, liberal, controller.BookIssuerController.createBookIssuer)

export default router