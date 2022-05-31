import express from "express";
const router = express.Router()

import userRouter from "./userRouter";
import classRouter from './classRouter'
import roleRouter from './roleRouter'
import facultyRouter from './facultyRouter'
import subjectRouter from './subjectRouter'
import studentRouter from './studentRouter'
import attendance from './Attendance'
import result from './resultRouter'
import book from './bookRouter'
import BookIssuer from './BookIssuerRouter'


router.use("/user", userRouter)
router.use("/subject", subjectRouter)
router.use("/faculty", facultyRouter)
router.use("/class", classRouter)
router.use("/student", studentRouter)
router.use("/role", roleRouter)
router.use("/attendance", attendance)
router.use("/result", result)
router.use("/book", book)
router.use("/bookIssuer", BookIssuer)


export default router