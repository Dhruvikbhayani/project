import User from '../model/usermodel'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const usersignup = async(req, res) => {
    try {
        const users = await User.findOne({ email: req.body.email, isDeleted: false })
        if (!users) {
            const user = new User(req.body)
            await user.save()
            console.log(user);
            res.status(200).send(user)

        } else {
            res.status(400).send("Email is already extis")

        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}

const userlogin = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email, isDeleted: false })
        if (!user) {
            res.send("Email is not vaild")
        } else {
            const match = bcrypt.compare(password, user.password)
            if (!match) {
                res.send("password isnot vaild")
            }
            const token = jwt.sign({
                _id: user._id.toString()
            }, 'key')
            res.send({ status: 200, data: "login success", data: token })
        }
    } catch (e) {
        console.log(e)
    }

}

const userfind = async(req, res) => {
    try {
        const user = await User.find({ isDeleted: false })
        res.send({ status: 200, data: user })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

const userupdate = async(req, res) => {
    try {
        const result = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e)
    }
}

const userremove = async(req, res) => {
    const id = req.params.id
    try {
        const data = await User.findByIdAndDelete({ _id: id }, { isDeleted: false })
        res.send({ status: 200, message: "User is deleted" })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}
const usercontroller = { usersignup, userlogin, userupdate, userremove, userfind }
export default usercontroller