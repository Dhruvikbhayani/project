import express from "express";
import faculty from '../middleware/faculty'
import auth from "../middleware/auth";
import controller from '../controller'

const router = express.Router()

router.route('/')
    .post(auth, faculty, controller.AttendanceController.createAttendance)
    .get(auth, faculty, controller.AttendanceController.getAllAttendance)

router.route('/:id')
    .get(auth, faculty, controller.AttendanceController.getAttendance)
    .put(auth, faculty, controller.AttendanceController.updateAttendance)
    .delete(auth, faculty, controller.AttendanceController.removeAttendance)

router.put("/update/:id", auth, faculty, controller.AttendanceController.updateStudentAttendance)
router.delete("/delete/:id", auth, faculty, controller.AttendanceController.removeStudentAttendance)

export default router