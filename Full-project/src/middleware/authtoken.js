import jwt from "jsonwebtoken";
import User from "../model/user";

const auth = (async(req, res, next) => {
    try {
        let token = req.headers["authorization"]

        if (token) {
            token = token.split(" ")[1]

            const data = jwt.verify(token, "dk")

            const users = await User.findOne({
                _id: data._id,
            }).populate("role")
            if (!users) {
                res.send("User is not found")
            }
            req.user = users
            req.token = token
            next()
        } else {
            res.send("User====================== is not found")
        }


    } catch (e) {
        console.log(e)
    }

})

export default auth