import { Router } from "express";
import fs from "fs"
import productos from "../productos.json" assert {type : "json"}

const router = Router()

let idCarrito = 0
router.post("/",(req,res)=>{
    fs.writeFileSync("carrito.json",JSON.stringify([]))
    let carrito = fs.readFileSync("carrito.json","utf-8")
    return res.json({message: "Carrito creado" , id: idCarrito, products : JSON.parse(carrito)})
})

router.get("/:cid",(req,res)=>{
     const {cid} = req.params
     if(+cid === idCarrito){
        let arrayCarrito = fs.readFileSync("carrito.json","utf-8")
        let carrito = JSON.parse(arrayCarrito)
        res.json({message: "Carrito seleccionado", data : carrito})
     }else{
       res.status(404).json({message: "Carrito no existente"})
     }
})

router.post("/:cid/product/:pid",(req,res)=>{
      const {cid,pid} = req.params
      if(+cid === idCarrito){
         let producto = productos.find((producto)=>producto.id === +pid)
         if(producto){
             let arrayCarrito = fs.readFileSync("carrito.json","utf-8")
             let carrito = JSON.parse(arrayCarrito)
             if(carrito.some((productoCarrito)=>productoCarrito.product === producto.id)){
                 let productoCarrito = carrito.find((productoCarrito)=>productoCarrito.product === producto.id)
                 productoCarrito.quantity++
                 fs.writeFileSync("carrito.json",JSON.stringify(carrito))
                 res.json({message: "Producto sumado", data: productoCarrito})
             }else{
                let productoCarrito = {
                    product : producto.id,
                    quantity : 1
               }
               carrito.push(productoCarrito)
               fs.writeFileSync("carrito.json",JSON.stringify(carrito))
               return res.json({message: "Producto agregado correctamente", data: productoCarrito})
             }
         }else{
            res.status(404).json({message: "Producto no encontrado"})
         }
      }else{
        return res.status(404).json({message: "Carrito no encontrado", id: idCarrito})
      }
})

export default router