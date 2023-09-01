import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
   first_name: String,
   last_name: String,
   email: {
      type: String,
      require: true
   },
   age: Number,
   password: {
      type: String,
      require: true
   },
   cart: mongoose.Schema.Types.ObjectId,
   role: {
    type: String,
    default: "user"
   }
})

export const UserModel = mongoose.model(userCollection,userSchema)