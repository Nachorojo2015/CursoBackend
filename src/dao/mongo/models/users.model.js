import mongoose from "mongoose";

const userCollection = "users"

const userSchema = new mongoose.Schema({
   fullname: String,
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
   },
   documents: [
      {
       name: {
         type: String,
         required: true
       },
       reference: {
         type: String,
         required: true
       }
      }
   ],
   last_connection:{
      type: Date,
      default: null
   }
})

export const USER_MODEL = mongoose.model(userCollection,userSchema)