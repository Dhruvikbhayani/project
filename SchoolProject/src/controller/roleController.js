import models from "../models"

const createRole = async (req, res) => {
    try {
        const data = req.user
        const roleName = await models.Role.findOne({ roleName: req.body.roleName })
        if (!roleName) {
            const role = new models.Role({ ...req.body, createdBy: data._id, updatedBy: data._id })
            await role.save()
            res.status(200).send(role)
        } else {
            res.status(404).send("this role is already exits")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getAllRole = async (req, res) => {
    try {
        const result = await models.Role.find()
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getRole = async (req, res) => {
    try {

        const _id = req.params.id
        const result = await models.Role.findOne({ _id, isDeleted: false })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)

    }
}
const updateRole = async (req, res) => {
    const _id = req.params.id
    try {
        const data = req.user

        const result = await models.Role.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, updatedBy: data._id }, { new: true })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}

const removeRole = async (req, res) => {
    const _id = req.params.id
    try {

        const result = await models.Role.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }, { new: true })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}

const roleController = { createRole, getAllRole, getRole, updateRole, removeRole }

export default roleController