import models from '../models';
import { v4 as uuid } from 'uuid'
import User from '../models/User';
import { mongo } from 'mongoose';


const createStudent = async (req, res) => {
    try {
        const result = await User.findOne({ email: req.body.email })
        if (!result) {
            const data = req.user
            req.body.enrollmentNo = uuid()
            const role = await models.Role.findOne({ roleName: "student", isDeleted: false })
            const student = new models.User({ ...req.body, roleId: role._id, createdBy: data._id, updatedBy: data._id })
            const data1 = await student.save()
            res.status(200).send(data1)
        } else {
            res.status(401).send("Email is Already exits")
        }

    } catch (e) {
        res.status(404).send(e.message)
    }
}

// const createDuplicateStudent = async(req, res) => {
//     try {
//         const _id = req.params.id
//         const result = await models.User.findOne({ _id, isDeleted: false })
//         delete result._doc._id
//         const data = await models.User.create(result._doc)
//             // await data.save()

//         res.send(data)
//     } catch (e) {
//         res.status(404).send(e.message)
//     }
// }
const getAllStudent = async (req, res) => {
    try {
        const data = req.user
        if (['faculty', 'student'].includes(data.roleId.roleName)) {
            const result = await models.User.find({ isDeleted: false }).populate([{ path: 'roleId', select: 'roleName' }, { path: 'classId', select: 'className' }, { path: 'subjectId', select: 'subjectName' }])
            res.status(200).send(result)
        } else {
            res.send("you are not authorizations")
        }

    } catch (e) {
        res.status(404).send(e.message)

    }
}
// const findFaculty = async(req, res) => {
//     try {
//         const data = req.user

//         const result = await User.find({ createdBy: data._id, isDeleted: false })
//         res.send(result)
//     } catch (e) {
//         res.status(404).send(e.message)
//     }
// }
const getStudent = async (req, res) => {
    try {
        const data = req.user
        if (['faculty', 'student'].includes(data.roleId.roleName)) {
            const _id = req.params.id
            const result = await models.User.findOne({ _id, isDeleted: false }).populate([{ path: 'roleId', select: 'roleName' }, { path: 'classId', select: 'className' }, { path: 'subjectId', select: 'subjectName' }])
            res.status(200).send(result)
        } else {
            res.send("you are not authorizations")
        }

    } catch (e) {
        res.status(404).send(e.message)

    }
}
const updateStudent = async (req, res) => {
    try {
        const data = req.user
        if (['student'].includes(data.roleId.roleName)) {
            const _id = req.params.id
            const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, updatedBy: data._id }, { new: true })
            res.status(200).send(result)
        } else {
            res.status(404).send("your are not authorization")
        }

    } catch (e) {
        res.status(404).send(e.message)

    }
}

const deleteStudent = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }, { new: true })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}
const studentController = { createStudent, getStudent, getAllStudent, updateStudent, deleteStudent }

export default studentController