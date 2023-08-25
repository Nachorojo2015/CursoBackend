import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    }
})

export const UserModel = mongoose.model(userCollection,userSchema)