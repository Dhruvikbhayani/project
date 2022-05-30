import models from "../models"

const createSubject = async(req, res) => {
    try {
        const result = await models.Subject.findOne({ subjectName: req.body.subjectName })
        if (!result) {
            const data = req.user
            const result = new models.Subject({...req.body, createdBy: data._id, updatedBy: data._id })
            await result.save()
            res.status(200).send(result)
        } else {
            res.send("subject already exits ")
        }

    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getAllSubject = async(req, res) => {
    try {

        const result = await models.Subject.find({ isDeleted: false })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getSubject = async(req, res) => {
    try {

        const _id = req.params.id
        const result = await models.Subject.findOne({ _id, isDeleted: false })
        res.status(200).send(result)

    } catch (e) {
        res.status(404).send(e.message)
    }
}
const updateSubject = async(req, res) => {
    try {
        const data = req.user
        const _id = req.params.id
        const data1 = await models.Subject.findOneAndUpdate({ _id, isDeleted: false }, {...req.body, updatedBy: data._id }, { new: true })
        res.status(200).send(data1)

    } catch (e) {
        res.status(404).send(e.message)
    }
}

const deleteSubject = async(req, res) => {
    try {

        const _id = req.params.id
        const data1 = await models.Subject.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true })
        res.status(200).send(data1)

    } catch (e) {
        res.status(404).send(e.message)
    }
}
const subjectController = { createSubject, getAllSubject, getSubject, updateSubject, deleteSubject }

export default subjectController