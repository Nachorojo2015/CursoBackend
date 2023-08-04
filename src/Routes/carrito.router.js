import { Router } from "express";
import CartsModel from "../dao/models/carts.js";
import ProductsModel from "../dao/models/products.js";

const router = Router()
//Crear carrito
router.post("/",async(req,res)=>{
    const carrito = {
      products : []
    }
    let result = await CartsModel.insertMany([carrito])
    return res.json({message : "Carrito creado correctamente", data: result})
})
//Tomar carrito por id
router.get("/:cid",async(req,res)=>{
    const {cid} = req.params
    let result = await CartsModel.findById(cid)
    return res.json({message: "Carrito seleccionado", data: result})
})
//Tomar carrito por id y sumarle un producto
router.post("/:cid/product/:pid",async(req,res)=>{
  const {cid,pid} = req.params
  let carrito = await CartsModel.findById(cid)
  let producto = await ProductsModel.findById(pid)
  if(carrito){
    let productosEnCarrito = carrito.products
    if(productosEnCarrito.some((productoEnCarrito)=>productoEnCarrito.product === producto.id)){
       let producto = productosEnCarrito.find((producto)=>producto.product === pid)
       producto.quantity++
       let result = await CartsModel.findByIdAndUpdate(cid,carrito)
       return res.json({message : "Producto sumado al carrito", data: result})
    }else{
      const productoCarrito = {
         product : producto.id,
         quantity : 1
      }
      carrito.products.push(productoCarrito)
      let result = await CartsModel.findByIdAndUpdate(cid,carrito)
      return res.json({message: "Producto agregado al carrito", data: result})
    }
  }else{
   return res.status(404).json({message: "Carrito no encontrado"})
  }
})

export default router