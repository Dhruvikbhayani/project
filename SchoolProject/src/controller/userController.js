import models from "../models";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await models.User.findOne({ email, isDeleted: false })
        if (!data) {
            res.send("Email is Not valid")
        } else {
            const match = await bcrypt.compare(password, data.password)
            if (!match) {
                res.send("password is not valid ")
            }
            const token = jwt.sign({
                _id: data._id
            }, process.env.KEY)
            res.send({ status: 200, statu: 'login done', data: token })
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

const getUser = async (req, res) => {
    try {

        const user = await models.User.find({ isDeleted: false }).populate({ path: 'roleId', select: 'roleName' })
        res.send({ status: 200, data: user })

    } catch (e) {
        res.status(400).send(e.message)
    }
}

const userUpdate = async (req, res) => {
    try {
        const data = req.user
        const _id = req.params.id
        const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { ...req.body, updatedBy: data._id }, { new: true })
        res.status(200).send(result)
    } catch (e) {
        res.status(400).send(e.message)
    }
}

const userRemove = async (req, res) => {
    try {
        const _id = req.params.id
        const result = await models.User.findOneAndUpdate({ _id, isDeleted: false }, { isDeleted: true }, { new: true })
        res.send({ status: 200, message: "User is deleted" })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}
const userController = { userLogin, getUser, userUpdate, userRemove }
export default userController