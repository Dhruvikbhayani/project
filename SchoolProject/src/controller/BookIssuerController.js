import models from "../models";
import moment from "moment";


const today = moment()
const createBookIssuer = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        req.body.updatedBy = req.user._id
        const result = await models.BookIssuer(req.body)
        await result.save()
        const issueDate = moment(result.createdAt).format('DD-MM-YYYY')
        const returnDate1 = today.add(result.returnDays, 'days').format('DD-MM-YYYY')
        res.send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getAllBookIssuer = async (req, res) => {
    try {
        const result = await models.BookIssuer.find({ isDeleted: false }).populate([{ path: 'bookId', select: 'title author' }, { path: 'studentId', select: 'firstName lastName' }])
        res.send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getBookIssuer = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await models.BookIssuer.findOne({ _id, isDeleted: false })
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const updateBookIssuer = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const result = await models.BookIssuer.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body }, { new: true })
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const removeBookIssuer = async (req, res) => {
    try {
        req.body.updatedBy = req.user._id
        const _id = req.params.id
        const result = await models.BookIssuer.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }, { new: true })
        res.status(200).send(result)
    } catch (e) {
        res.status(404).send(e.message)
    }

}
const BookIssuerController = { createBookIssuer, getAllBookIssuer, getBookIssuer, updateBookIssuer, removeBookIssuer }

export default BookIssuerController