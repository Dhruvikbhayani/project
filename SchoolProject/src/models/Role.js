import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    roleName: {
        type: String,
        enum: ['Admin', 'faculty', 'student']
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

const Role = mongoose.model('Role', roleSchema)
export default Role