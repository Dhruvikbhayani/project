const facultyAuth = async(req, res, next) => {

    const data = req.user
    if (data.roleId.roleName == 'faculty') {
        next()
    } else {
        res.status(200).send("you are not authorizations")
    }

}
export default facultyAuth