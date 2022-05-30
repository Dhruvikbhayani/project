import User from "../model/user";

const adminauth = async(req, res, next) => {
    try {

        const username = req.user.role.rolename
        if (username == "admin") {
            next()
        } else {
            res.send("your role not admin")
        }
    } catch (e) {
        console.log(e)
    }

}

export default adminauth