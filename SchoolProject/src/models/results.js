import mongoose from "mongoose";
const Id = mongoose.Schema.Types.ObjectId

const resultSchema = new mongoose.Schema({
    facultyId: {
        type: Id,
        ref: "User"
    },
    studentId: {
        type: Id,
        ref: "User"
    },
    classId: {
        type: Id,
        ref: "Class"
    },
    score: [{
        subjectId: {
            type: Id,
            ref: "Subject"
        },
        total: {
            type: Number,
            required: true
        },
        marksObtain: {
            type: Number,
            required: true
        }
    }],
    totalSubjectMarks: {
        type: Number,
    },
    totalObtainMarks: {
        type: Number
    },
    result: {
        type: String,
        enum: ['pass', 'fail']
    },
    grade: {
        type: String
    },
    percentage: {
        type: Number
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
const Result = mongoose.model("Result", resultSchema)
export default Result