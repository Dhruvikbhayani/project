import Role from "../model/role";

const create = async(req, res) => {
    try {
        Role.find({ rolename: req.body.rolename, isDeleted: false }, async function(err, data) {
            if (data == '') {
                const data1 = await new Role(req.body)
                await data1.save()
                res.send(data1)

            } else {
                res.send("rolename already exits")
            }
        })
    } catch (e) {
        res.send(e)
    }
}

const find = async(req, res) => {
    try {
        const data = await Role.find({ isDeleted: false })
        res.send(data)
    } catch (e) {
        res.send(e)
    }
}

const allfind = async(req, res) => {
    try {
        const id = req.params.id
        const data = await Role.findOne({ id, isDeleted: false })
        res.send(data)
    } catch (e) {
        res.send(e)
    }
}

const update = async(req, res) => {
    try {
        // 
        const id = req.params.id
            // console.log(id)
        const data = await Role.findOne({ rolename: req.body.rolename, isDeleted: false });
        if (data) {
            res.send("datais not updated ")
        } else {
            console.log(id);
            const data1 = await Role.findByIdAndUpdate(id.trim(), { rolename: req.body.rolename }, { new: true });
            console.log("data1 ", data1)
            res.send(data1)
        }
    } catch (e) {

        console.log(e)
    }
}
const remove = async(req, res) => {
    const id = req.params.id
    try {
        await Role.findByIdAndDelete(id)
        res.status(200).send({ message: "user is delete" })

    } catch (e) {
        res.send(e)
    }
}

const roleru = { create, find, allfind, update, remove }

export default roleru