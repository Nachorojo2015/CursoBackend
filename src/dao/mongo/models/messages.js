import mongoose from "mongoose";

const messagesCollection = "messages"

const messagesSchema = new mongoose.Schema({
    user : {
        type : String,
        require : true
    },
    message : String
})

const MessagesModel = mongoose.model(messagesCollection,messagesSchema)

export default MessagesModel