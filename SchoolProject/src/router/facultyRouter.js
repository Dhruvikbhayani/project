import express from "express";
import Controller from "../controller";
import auth from '../middleware/auth'
import adminAuth from "../middleware/admin";
const router = express.Router()

router.route('/')
    .post(auth, adminAuth, Controller.facultyController.createFaculty)
    .get(auth, adminAuth, Controller.facultyController.getAllFaculty)
router.route('/:id')
    .get(auth, Controller.facultyController.getFaculty)
    .put(auth, Controller.facultyController.updateFaculty)
    .delete(auth, adminAuth, Controller.facultyController.deleteFaculty)


export default router