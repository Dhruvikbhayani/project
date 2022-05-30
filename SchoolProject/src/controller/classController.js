import models from "../models"

const createClass = async(req, res) => {
    try {
        const data = req.user
        const result = await models.Class.findOne({ className: req.body.className })

        if (!result) {
            const data1 = new models.Class({...req.body, createdBy: data._id, updatedBy: data._id })
            await data1.save()
            res.status(200).send(data1)
        } else {
            res.send("this className is already exits")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getClass = async(req, res) => {
    try {

        const _id = req.params.id
        const result = await models.Class.findOne({ _id, isDeleted: false })
        res.status(200).send(result)


    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getAllClass = async(req, res) => {
    try {
        const data = req.user
        if (['Admin'].includes(data.roleId.roleName)) {
            const data = await models.Class.find({ isDeleted: false })
            res.status(200).send(data)
        } else {
            res.status(404).send("you are not authorization")

        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const updateClass = async(req, res) => {
    try {
        const data = req.user
        const _id = req.params.id
        const data1 = await models.Class.findOneAndUpdate({ _id, isDeleted: false }, {...req.body, updatedBy: data._id }, { new: true })
        res.status(200).send(data1)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const removeClass = async(req, res) => {
    try {
        const data = req.user
        if (['Admin'].includes(data.roleId.roleName)) {
            const _id = req.params.id
            const data1 = await models.Class.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true })
            res.status(200).send(data1)
        } else {
            res.status(404).send("you are not authorization")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const classController = { createClass, getClass, getAllClass, updateClass, removeClass }

export default classController