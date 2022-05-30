import mongoose from "mongoose";

const id = mongoose.Schema.Types.ObjectId

const attendanceSchema = new mongoose.Schema({
    facultyId: {
        type: id,
        ref: 'User'
    },
    student: [{
        studentId: {
            type: id,
            ref: 'User'
        },
        status: {
            type: Boolean,
            default: false
        }
    }],
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

const Attendance = mongoose.model('Attendance', attendanceSchema)

export default Attendance