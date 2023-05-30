import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please provide an email'],
        unique: [true,"Email already exists"]
    },
    password:{
        type:String,
        required:[true,"Please Enter a valid password"]

    }
})

const user = mongoose.model("User",UserSchema)

export default user;