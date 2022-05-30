import userAuth from "./auth"

const adminAuth = async (req, res, next) => {

    const data = req.user
    if (data.roleId.roleName == 'Admin') {
        next()
    } else {
        res.status(200).send("you are not authorizations")
    }

}
export default adminAuth