import models from "../models";
import moment from "moment";


const penaltyCount = (result) => {

    const issueDate = moment(result.createdAt)
    const actualReturnDate = moment(result.createdAt).add(result.returnDays, 'days')
    const days = moment(result?.returnDate).diff(actualReturnDate, 'day')

    return days
}

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
        const result = await models.BookIssuer.find({ isDeleted: false })
        result.map((element) => {
            const days = penaltyCount(element)
            if (days > 0) {
                const penalty = days * 5
                element.penalty = penalty
                return element
            }
            return element
        })
        return res.send(result)
    } catch (e) {
        return res.send(e.message)
    }
}

const getBookIssuer = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await models.BookIssuer.findOne({ _id, isDeleted: false })
        const days = penaltyCount(result)
        if (days > 0) {
            const penalty = days * 5
            result.penalty = penalty
        }
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
        const days = penaltyCount(result)
        if (days > 0) {
            const penalty = days * 5
            const result = await models.BookIssuer.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, penalty: penalty, }, { new: true })
            res.status(200).send(result)
        }
        res.send(result)
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