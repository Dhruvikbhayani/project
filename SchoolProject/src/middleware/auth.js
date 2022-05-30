import models from '../models'
import Jwt from 'jsonwebtoken'

const userAuth = async(req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ").pop()

        if (token) {
            const data = Jwt.verify(token, process.env.KEY)
            const user = await models.User.findOne({
                _id: data._id
            }).populate({ path: 'roleId' })
            req.user = user

            next()
        } else {
            res.status(404).send("you are not authorization")
        }
    } catch (e) {
        res.status(404).send(e.message)
    }
}

export default userAuth