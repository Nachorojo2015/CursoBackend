import { Router } from "express";
import fs from "fs"
import productos from "../productos.json" assert {type : "json"}

const router = Router()

router.post("/",(req,res)=>{
    if(!fs.existsSync("carrito.json")){
        fs.writeFileSync("carrito.json",JSON.stringify([]))
        return res.json({message: "Carrito creado"})
    }else{
      let arrayCarrito = fs.readFileSync("carrito.json","utf-8")
      let carrito = JSON.parse(arrayCarrito)
      let id = carrito.length + 1
      carrito.push({id: id, products : []})
      fs.writeFileSync("carrito.json",JSON.stringify(carrito))
      return res.json({message: "Carrito creado", id:id, products : []})
    }
})

router.get("/:cid",(req,res)=>{
     const {cid} = req.params
     let carritos = fs.readFileSync("carrito.json","utf-8")
     let arrayCarritos = JSON.parse(carritos)
     let carrito = arrayCarritos.find((carrito)=>carrito.id === +cid)
     if(carrito){
        let productos = carrito.products
        res.json({message: "Estos son los productos del carrito", id: carrito.id, products : productos})
     }else{
        res.status(404).json({message: "Carrito no encontrado"})
     }
})

router.post("/:cid/product/:pid",(req,res)=>{
  const {cid,pid} = req.params
  let carritos = fs.readFileSync("carrito.json","utf-8")
  let arrayCarritos = JSON.parse(carritos)
  let carrito = arrayCarritos.find((carrito)=>carrito.id === +cid)
  let carritoArray = carrito.products
  if(carrito){
      let productoSeleccionado = productos.find((producto)=>producto.id === +pid)
      if(productoSeleccionado){
          if(carritoArray.some((productoCarrito)=>productoCarrito.product === productoSeleccionado.id)){
             let productoCarrito = carritoArray.find((productoCarrito)=>productoCarrito.product === productoSeleccionado.id)
             productoCarrito.quantity++
             fs.writeFileSync("carrito.json",JSON.stringify(arrayCarritos))
             return res.json({message : "Producto sumado correctamente", data: productoCarrito})
          }else{
             let productoCarrito = {
                product : productoSeleccionado.id,
                quantity : 1
             }
             carritoArray.push(productoCarrito)
             fs.writeFileSync("carrito.json",JSON.stringify(arrayCarritos))
             return res.json({message: "Producto agregado correctamente"})
          }
      }else{
        return res.status(404).json({message: "Producto no encontrado"})
      }
  }else{
    return res.status(404).json({message: "Carrito no encontrado"})
  }
})

export default router