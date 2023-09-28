//Config dotenv
import { configuration } from "../config.js"
configuration()

//Memory
import {ProductsMemoryDao} from "./memory/products.dao.js"
import {CarritoMemoryDao} from "./memory/carrito.dao.js"
import { UsersMemoryDao } from "./memory/users.dao.js"
import { ChatMemoryDao } from "./memory/chat.dao.js"
import { TicketMemoryDao } from "./memory/ticket.dao.js"

//Mongo
import {ProductsMongoDao} from "./mongo/products.dao.js"
import {CarritoMongoDao} from "./mongo/carrito.dao.js"
import { UsersMongoDao } from "./mongo/users.dao.js"
import { ChatMongoDao } from "./mongo/chat.dao.js"
import { TicketMongoDao } from "./mongo/ticket.dao.js"

export const PRODUCTS_DAO = process.env.PERSISTENCE === "MONGO" ?  new ProductsMongoDao() : new ProductsMemoryDao()
export const CARTS_DAO = process.env.PERSISTENCE === "MONGO" ?  new CarritoMongoDao() : new CarritoMemoryDao()
export const USER_DAO = process.env.PERSISTENCE === "MONGO" ? new UsersMongoDao() : new UsersMemoryDao()
export const MESSAGES_DAO = process.env.PERSISTENCE === "MONGO" ?  new ChatMongoDao() : new ChatMemoryDao()
export const TICKET_DAO = process.env.PERSISTENCE === "MONGO" ? new TicketMongoDao() : new TicketMemoryDao()
