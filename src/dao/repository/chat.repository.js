import { ChatDto } from "../DTO/chat.dto.js";

export class ChatRepository{
    constructor(dao){
        this.dao = dao
    }

    async getMessages(){
        return await this.dao.getMessages()
    }

    async createMessage(message){
        const messageDto = new ChatDto(message)
        return await this.dao.createMessage(messageDto)
    }
}