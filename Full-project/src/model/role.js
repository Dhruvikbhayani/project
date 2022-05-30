import mongoose, { Mongoose } from "mongoose";

const schema = new mongoose.Schema({
    rolename: {
        type: String

    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })



const users = mongoose.model("role", schema)

export default users