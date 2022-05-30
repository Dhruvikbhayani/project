import mongoose from "mongoose";
import User from "../model/usermodel";

const insertdata = async() => {
    const userinput = {
        email: 'admin@test.com',
        password: "admin@123",
        username: "admin",
        isAdmin: true
    };
    const user = await User.findOne({ username: userinput.username })
    if (!user) {
        await User.create(userinput)
    }
}

mongoose.connect('mongodb://localhost:27017/Pet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async() => {
    console.log('Connected to the database successfully!');
    insertdata()
})

export default mongoose