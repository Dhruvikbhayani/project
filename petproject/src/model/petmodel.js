import mongoose from "mongoose";

const petschema = new mongoose.Schema({
    name: {
        type: String
    },
    color: {
        type: String
    },
    favouriteFood: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

const pets = mongoose.model('Pet', petschema)

export default pets