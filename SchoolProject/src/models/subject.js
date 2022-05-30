import mongoose from "mongoose"

const subjectSchema = new mongoose.Schema({
    subjectName: {
        type: String,

    },
    subjectCode: {
        type: String,

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

const Subject = mongoose.model("Subject", subjectSchema)

export default Subject