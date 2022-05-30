import User from "../model/user";
import jwt from "jsonwebtoken";

const userauth = async(req, res, next) => {
    try {

        const token = req.header('Authorization').split(" ").pop()
        const data = jwt.verify(token, 'dk')
        const user = await User.findOne({
            _id: data._id,
            token
        })
        const username = user.role.rolename
        if (username == "user") {
            next()
        } else {
            res.send("your role not user")
        }
        req.user = user
        req.token = token
    } catch (e) {
        console.log(e)
    }

}

export default userauth