import express from "express"
import liberal from '../middleware/liberal'
import controller from '../controller'
import auth from "../middleware/auth"
const router = express.Router()

router.route("/")
    .post(auth, liberal, controller.BookIssuerController.createBookIssuer)
    .get(auth, liberal, controller.BookIssuerController.getAllBookIssuer)

router.route(":id")
    .get(auth, liberal, controller.BookIssuerController.getBookIssuer)
    .put(auth, liberal, controller.BookIssuerController.updateBookIssuer)
    .delete(auth, liberal, controller.BookIssuerController.removeBookIssuer)
export default router