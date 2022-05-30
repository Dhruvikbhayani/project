import models from "../models";

const createAttendance = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        req.body.updatedBy = req.user._id
        const attendanceData = new models.Attendance({ ...req.body, facultyId: req.user._id })
        await attendanceData.save()
        res.status(200).send(attendanceData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getAllAttendance = async (req, res) => {
    try {
        const attendanceData = await models.Attendance.find({ isDeleted: false }).populate([{ path: 'facultyId', select: ['firstName', 'lastName'] }, { path: 'student', select: "firstName" }])
        res.status(200).send(attendanceData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getAttendance = async (req, res) => {
    try {
        const _id = req.params.id
        const attendanceData = await models.Attendance.findOne({ _id, isDeleted: false }).populate([{ path: 'facultyId', select: ['firstName', 'lastName'] }, { path: 'student', select: "firstName" }])
        res.status(202).send(attendanceData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const updateStudentAttendance = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const attendanceData = await models.Attendance.findOneAndUpdate({ _id, isDeleted: false }, {
            $addToSet: {
                student: req.body.student
            }
        })
        res.send(attendanceData)

    } catch {
        res.status(404).send(e.message)
    }
}

const removeAttendance = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id;
        const _id = req.params.id
        const attendanceData = await models.Attendance.findOneAndUpdate({ _id, isDeleted: true })
        res.status(200).send(attendanceData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const updateAttendance = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id;
        const _id = req.params.id
        const attendanceData = await models.Attendance.findOneAndUpdate({ _id, "student._id": req.body._id, isDeleted: false }, {
            'student.$.studentId': req.body.studentId,
        }, { new: true })

        res.status(200).send(attendanceData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const removeStudentAttendance = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id;
        const _id = req.params.id
        const attendanceData = await models.Attendance.findOneAndUpdate({ _id, isDeleted: false }, {
            $pull: { student: { _id: req.body._id } },
        }, { new: true })
        res.status(200).send(attendanceData)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const AttendanceController = { createAttendance, getAllAttendance, getAttendance, updateStudentAttendance, updateAttendance, removeStudentAttendance, removeAttendance }
export default AttendanceController