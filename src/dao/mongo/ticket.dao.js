import { TICKET_MODEL } from "./models/ticket.model.js"

export class TicketMongoDao{
    async getTickets(){
        return await TICKET_MODEL.find({})
    }

   async getTicketById(tid){
        return TICKET_MODEL.findById(tid)
    }

   async saveTicket(ticket){
       return await TICKET_MODEL.create(ticket)
   }
}