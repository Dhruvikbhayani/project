import mongoose from "mongoose";

const objId = mongoose.Schema.Types.ObjectId

const bookIssuerSchema = new mongoose.Schema({
    bookId: {
        type: objId,
        ref: 'Book'
    },
    studentId: {
        type: objId,
        ref: 'User'
    },
    returnDays: {
        type: Number
    },
    returnDate: {
        type: Date
    },
    isReturn: {
        type: Boolean,
        default: false
    },
    penalty: {
        type: Number,
        default: 5
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: objId,
        ref: 'User'
    },
    updatedBy: {
        type: objId,
        ref: 'User'
    }

}, { timestamps: true })

const BookIssuer = mongoose.model('BookIssuer', bookIssuerSchema)
export default BookIssuer