export class UsersMemoryDao{
    constructor(){
        this.users = []
    }

    async getUsers(){
        return this.users
    }

    async getUserByEmail(email){
        return this.users.find(user=>user.email === email)
    }

    async createUser(user){
        this.users.push(user)
        this.users.forEach(user=>{
            user.id = this.users.indexOf(user)+1
        })
        return user
    }

    async deleteUser(id){
       const indexUser = this.users.findIndex(user=>user.id === +id)
       if(indexUser === -1) return "User not found"
       this.users.splice(indexUser,1)
       return +id
    }

    async getUserById(id){
        return this.users.find(user=> user.id === +id)
    }
}