import User from "../model/user";
import moment from "moment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



moment().format("MMM Do YY")
const sign = async function(req, res) {
    req.body.age = moment(req.body.dob, "DD-MM-YYYY").fromNow()
    const users = await new User(req.body)
    await users.save()
    await users.populate("role", "rolename")
    res.send(users)
}
const login = async(req, res) => {
    const { email, password } = req.body
    try {

        const users = await User.findOne({ email })
        if (!users) {
            res.send("Email is not vaild")
        } else {
            const match = bcrypt.compare(password, users.password)
            if (!match) {
                res.send("password is in vaild")
            }
            const token = jwt.sign({
                _id: users._id.toString()
            }, "dk")


            users.token = token;
            await users.save()
            res.send({ status: 200, data: users.token })

        }

    } catch (e) {
        console.log(e)
    }
}

const restpass = async(req, res) => {

    let validatss = await req.user.validationspassword(req.body.password)
    console.log(validatss)
    if (!validatss) {
        res.send("password is invaild")
    } else {
        User.findById(req.user._id, async function(err, user) {
            user.password = req.body.restpassword;
            await user.save();
            res.send("your pasword is update")

        })
    }
}

const find = async(req, res) => {
    try {
        const user = await User.find()
        res.send({ status: 200, data: user })

    } catch (e) {
        console.log(e)
    }
}

const allfind = async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.find({ id })
        res.send({ status: 200, data: user })

    } catch (e) {
        console.log(e)
    }

}
const update = async(req, res) => {
    try {
        const user = req.user
        const result = await User.findByIdAndUpdate(user._id, req.body, { new: true })
        res.send({ status: 200, data: result })
    } catch (e) {
        console.log(e)
    }
}
const remove = async(req, res) => {
    const id = req.params.id
    try {
        const usres = await User.findByIdAndDelete(id)
        res.send({ status: 200, message: "User is deleted" })

    } catch (e) {
        console.log(e)
    }

}

const usersconstroller = { sign, login, find, allfind, update, remove, restpass }

export default usersconstroller