import { Router } from "express";
import { createCart, getCartById, saveProductInCart, updateCart, updateQuantityProductInCart, deleteProductInCart, deleteProductsInCart, purchaseProducts} from "../Controller/carrito.controller.js"

const cartsRouter = Router()

//Crear carrito
cartsRouter.post("/",createCart)
//Tomar carrito por id
cartsRouter.get("/:cid",getCartById)
//Tomar carrito por id y sumarle un producto 
cartsRouter.post("/:cid/product/:pid",saveProductInCart)
//Eliminar del carrito el producto seleccionado
cartsRouter.delete("/:cid/products/:pid",deleteProductInCart)
//Actualizar el carrito con un arreglo de productos especificado
cartsRouter.put("/:cid",updateCart)
//Actualizar cantidad de ejemplares del producto seleccionado, del carrito especificado
cartsRouter.put("/:cid/products/:pid",updateQuantityProductInCart)
//Eliminar todos los productos del carrito
cartsRouter.delete("/:cid",deleteProductsInCart)
// Comprar productos del carrito
cartsRouter.post("/:cid/purchase",purchaseProducts)

export {cartsRouter}