import express from "express";
import auth from "../middleware/auth";
import faculty from '../middleware/faculty'
import controller from '../controller'

const router = express.Router()

router.route("/")
    .post(auth, faculty, controller.resultController.createResult)
    .get(auth, controller.resultController.getAllResult)

router.route("/:id")
    .put(auth, faculty, controller.resultController.updateMarks)
    .delete(auth, faculty, controller.resultController.removeResult)

router.get('/:classId', auth, controller.resultController.getResult)
router.put('/updateResult/:id', auth, faculty, controller.resultController.updateResult)
export default router