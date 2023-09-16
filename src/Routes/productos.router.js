import { Router } from "express";
import { getProductos, getProductByID, modifyProducto, deleteProducto, saveProducto } from "../Controller/products.controller.js"

const router = Router()

//Tomar productos
router.get("/",getProductos)
//Tomar producto por id
router.get("/:pid",getProductByID)
//Modificar un producto
router.put("/:pid",modifyProducto)
//Borrar un producto
router.delete("/:pid",deleteProducto)
//Agregar un producto
router.post("/agregarProducto",saveProducto)

export default router