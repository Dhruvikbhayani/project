import models from "../models";
import moment from "moment";



const createBookIssuer = async (req, res) => {
    try {
        req.body.createdBy = req.user._id
        req.body.updatedBy = req.user._id
        const result = await models.BookIssuer(req.body)
        await result.save()
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
        const result = await models.BookIssuer.findOne({ _id, isDeleted: false })

        const issueDate = moment(result.createdAt)
        const actualReturnDate = moment(result.createdAt).add(result.returnDays, 'days')
        const days = moment(result?.returnDate).diff(actualReturnDate, 'day')
        const penalty = days * result.penalty

        if (moment(actualReturnDate).isBefore(result?.returnDate, 'days')) {
            const result = await models.BookIssuer.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, penalty: penalty, isReturn: true }, { new: true })
            res.status(200).send(result)
        }
        if (moment(actualReturnDate).isSameOrAfter(result?.returnDate, 'days')) {
            const result = await models.BookIssuer.findOneAndUpdate({ _id, isDeleted: false }, { isReturn: true }, { new: true })
            res.status(200).send(result)
        }
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