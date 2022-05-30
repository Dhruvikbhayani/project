import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const schema = new mongoose.Schema({
    name: {
        type: String,

    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String
    },
    age: {
        type: String
    },
    mobileno: {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    image: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    country: {
        type: String,
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }


}, { timestamps: true })

schema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    delete userObject.token;
    delete userObject.password;
    delete userObject.__v;

    return userObject;
};


schema.pre("save", async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

schema.methods.validationspassword = async function(password) {
    return await bcrypt.compare(password, this.password)

}

const User = mongoose.model('user', schema)

export default User