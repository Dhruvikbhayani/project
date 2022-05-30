import Pets from '../model/petmodel'


const petcreate = async(req, res) => {
    try {
        const data = req.user
        const pet = Pets({
            name: req.body.name,
            color: req.body.color,
            favouriteFood: req.body.favouriteFood,
            owner: data._id,
            createdBy: data._id,
            updatedBy: data._id
        })
        await pet.save()
        res.send(pet)
    } catch (e) {
        res.status(500).send(e)
    }
}
const allpetsfind = async(req, res) => {
    try {
        const data = await Pets.find({ isDeleted: false }).populate({ path: "owner", select: "username" })
        res.status(200).send(data)

    } catch (e) {
        res.status(500).send(e)
    }
}

const petfind = async(req, res) => {
    const owner = req.params.owner
    try {
        const data = await Pets.findOne({ owner: owner, isDeleted: false }).populate({ path: 'owner', select: 'username' })

        res.status(200).send(data)

    } catch (e) {
        res.status(500).send(e)
    }
}
const petsupdate = async(req, res) => {
    try {
        const _id = req.params.id
        const data = await Pets.findOneAndUpdate({ _id, isDeleted: false }, req.body, { new: true })
        if (!data) {
            res.send("record is not found")
        } else {
            res.send(data)
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

const petsremove = async(req, res) => {
    try {
        const id = req.params.id
        const data = await Pets.findByIdAndUpdate({ _id: id }, { isDeleted: true })
        res.send(data)

    } catch (e) {
        res.status(500).send(e)
    }
}

const petcontroller = { petcreate, allpetsfind, petfind, petsupdate, petsremove }

export default petcontroller