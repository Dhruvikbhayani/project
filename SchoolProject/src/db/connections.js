import mongoose from "mongoose";
import models from '../models'

const insertData = async() => {
    const users = {
        roleName: "Admin"
    }
    const user = await models.Role.findOne({ roleName: "Admin" })
    if (!user) {
        await models.Role.create(users)
    }
    const data = await models.Role.findOne({ roleName: "Admin" })
    const userData = {
        firstName: "admin",
        email: "admin@test.com",
        password: "admin@123",
        roleId: data._id
    }
    const userEmail = await models.User.findOne({ email: "admin@test.com" })
    if (!userEmail) {
        await models.User.create(userData)
    }
}

mongoose.connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async() => {
    console.log('Connected to the database successfully!');
    insertData()
})

export default mongoose