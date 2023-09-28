import { USER_MODEL } from "./models/users.model.js";

export class UsersMongoDao{
    
    async getUsers(){
        return await USER_MODEL.find({});
    }

    async getUserByEmail(email){
     return await USER_MODEL.findOne({email: email})
    }

    async createUser(user){
        return await USER_MODEL.create(user)
    }

    async deleteUser(id){
        return await USER_MODEL.findByIdAndDelete(id)
    }

    async getUserById(id){
        return await USER_MODEL.findById(id)
    }
}