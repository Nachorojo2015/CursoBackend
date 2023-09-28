export class UsersDto{
    constructor(user){
        this.fullname = user.first_name + " " + user.last_name
        this.email = user.email
        this.age = user.age
        this.password = user.password
        this.cart = user.cart
        this.role = user.role
    }
}