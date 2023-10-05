import { Router } from "express";
import { getProducts, getProductById, saveProduct, modifyProduct, deleteProduct, modifyStockProduct, createProducts } from "../Controller/products.controller.js"

const productsRouter = Router()

//Tomar productos
productsRouter.get("/",getProducts)
//Tomar producto por id
productsRouter.get("/:pid",getProductById)
//Agregar un producto
productsRouter.post("/",saveProduct)
//Modificar un producto
productsRouter.put("/:pid",modifyProduct)
//Borrar un producto
productsRouter.delete("/:pid",deleteProduct)
//Modificar producto stock
productsRouter.put("/stock/:pid", modifyStockProduct)
//Crear productos
productsRouter.post("/mockingproducts",createProducts)

export {productsRouter}