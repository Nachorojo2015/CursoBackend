import { UsersDto } from "../DTO/users.dto.js"

export class UsersRepository{
    constructor(dao){
        this.dao = dao
    }

    async getUsers(){
        return await this.dao.getUsers()
    }

    async getUserByEmail(email){
        return await this.dao.getUserByEmail(email)
    }

    async createUser(user){
        const userDto = new UsersDto(user)
        return await this.dao.createUser(userDto)
    }

    async deleteUser(id){
        return await this.dao.deleteUser(id)
    }

    async getUserById(id){
        return await this.dao.getUserById(id)
    }
}