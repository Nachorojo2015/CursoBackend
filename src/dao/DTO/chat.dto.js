export class ChatDto{
    constructor(message){
        this.username = message.user
        this.message = message.message
    }
}