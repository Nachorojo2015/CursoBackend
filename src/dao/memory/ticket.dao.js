export class TicketMemoryDao{
    constructor(){
        this.tickets = []
    }

   async getTickets(){
        return this.tickets
    }

   async getTicketById(tid){
        return this.tickets.find(ticket=>ticket._id === tid)
    }

   async saveTicket(ticket){
        this.tickets.push(ticket)
        this.tickets.forEach(ticket=>{
            ticket._id = this.tickets.indexOf(ticket)+1
        })
        return ticket
   }
}