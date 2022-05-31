import models from "../models";

const CreateLiberal = async (req, res) => {
    try {
        const data1 = await models.User.findOne({ email: req.body.email, isDeleted: false })
        if (!data1) {
            const data = req.user
            const data1 = await models.Role.findOne({ roleName: "liberal", isDeleted: false })
            const liberal = new models.User({ ...req.body, roleId: data1._id, createdBy: data._id, updatedBy: data._id })
            await liberal.save()
            res.status(200).send(liberal)
        } else {
            res.status(401).send("Email is Already exits")
        }
    } catch (e) {
        res.send(e.message)
    }
}

const createBook = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        req.body.updatedBy = req.user._id
        const book = new models.Book(req.body)
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(404).send(e.message)
    }
}
const getAllBook = async (req, res) => {
    try {
        const result = await models.Book.find({ isDeleted: false })
        res.send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getBook = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await models.Book.findOne({ _id, isDeleted: false })
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const updateBook = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const result = await models.Book.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body }, { new: true })
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}
const removeBook = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const result = await models.Book.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }, { new: true })
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const bookController = { CreateLiberal, createBook, getAllBook, getBook, updateBook, removeBook }
export default bookController