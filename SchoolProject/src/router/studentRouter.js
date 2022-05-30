import express from 'express'
import controller from '../controller/'
import auth from '../middleware/auth'
import facultyAuth from '../middleware/faculty'
const router = express.Router()

router.route("/")
    .post(auth, facultyAuth, controller.studentController.createStudent)
    .get(auth, controller.studentController.getAllStudent)
// .get("/findStudent", auth, facultyAuth, controller.studentController.findFaculty)

router.route("/:id")
    .get(auth, controller.studentController.getStudent)
    // .post("/createDublicate/:id", auth, facultyAuth, controller.studentController.createDublicateStudent)
    .put(auth, facultyAuth, controller.studentController.updateStudent)
    .delete(auth, facultyAuth, controller.studentController.deleteStudent)

export default router