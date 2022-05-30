import express from "express";
import controller from "../controller";
import userAuth from "../middleware/auth";
import adminAuth from '../middleware/admin'
const router = express.Router()

router.route('/')
    .post(userAuth, adminAuth, controller.subjectController.createSubject)
    .get(userAuth, adminAuth, controller.subjectController.getAllSubject)

router.route("/:id")
    .get(userAuth, adminAuth, controller.subjectController.getSubject)
    .put(userAuth, adminAuth, controller.subjectController.updateSubject)
    .delete(userAuth, adminAuth, controller.subjectController.deleteSubject)



export default router