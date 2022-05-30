import jwt from "jsonwebtoken";
import User from '../model/usermodel'

const userauth = async(req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (token) {
            let xyz = token.split(" ")[1]
            const data = jwt.verify(xyz, 'key')
            const users = await User.findOne({
                _id: data._id
            })
            req.user = users
            next()
        } else {
            res.send('user -------------------')
        }
    } catch (e) {
        res.send(" you are not authentiated")
    }
}


export default userauth