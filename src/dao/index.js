//Clases locales
import productsLocal from "./memory/products.dao.js"
import cartsLocal from "./memory/carrito.dao.js"

//Clases con mongo
import productsMongo from "./mongo/products.dao.js"
import cartsMongo from "./mongo/carrito.dao.js"

export const PRODUCTS_DAO = process.env.PERSISTENCE === "MONGO" ?    new productsLocal() : new productsMongo()
export const CARTS_DAO = process.env.PERSISTENCE === "MONGO" ?    new cartsLocal() : new cartsMongo()
