import models from "../models"


const createFaculty = async (req, res) => {
    try {
        const data1 = await models.User.findOne({ email: req.body.email, isDeleted: false })
        if (!data1) {
            const data = req.user
            const data1 = await models.Role.findOne({ roleName: "faculty", isDeleted: false })
            const faculty = new models.User({ ...req.body, roleId: data1._id, createdBy: data._id, updatedBy: data._id })
            const result = await faculty.save()
            res.status(200).send(result)
        } else {
            res.status(401).send("Email is Already exits")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getAllFaculty = async (req, res) => {
    try {

        const result = await models.User.find({ isDeleted: false }).populate([{ path: 'roleId', select: 'roleName' }, { path: "subjectId", select: 'subjectName' }, { path: "classId", select: 'className' }])
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getFaculty = async (req, res) => {
    try {
        const data = req.user

        const _id = req.params.id
        if (data.roleId.roleName == 'Admin' || data._id == _id) {
            const result = await models.User.findOne({ _id, isDeleted: false }).populate([{ path: 'roleId', select: 'roleName' }, { path: "subjectId", select: 'subjectName' }, { path: "classId", select: 'className' }])
            res.status(200).send(result)
        } else throw new Error("you are not authenticated")

    } catch (e) {
        res.status(404).send(e.message)

    }
}
const updateFaculty = async (req, res) => {
    try {
        const data = req.user
        const _id = req.params.id
        if (data.roleId.roleName == 'Admin' || data._id == _id) {
            const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, updatedBy: data._id }, { new: true })
            res.status(200).send(result)
        } else throw new Error("you are not authenticated")

    } catch (e) {
        res.status(404).send(e.message)

    }
}

const deleteFaculty = async (req, res) => {
    try {

        const _id = req.params.id
        const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }, { new: true })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}

const facultyController = { createFaculty, getAllFaculty, getFaculty, updateFaculty, deleteFaculty }
export default facultyController