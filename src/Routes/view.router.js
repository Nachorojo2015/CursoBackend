import { Router } from "express";
import fs from "fs"

const router = Router()

router.get("/",(req,res)=>{
    let productos = JSON.parse(fs.readFileSync("productos.json","utf-8"))
    res.render("home",{title: "Productos agregados", productos: productos})
})

router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{title: "Productos en tiempo real"})
})

router.post("/agregarProducto",(req,res)=>{
    let productos = JSON.parse(fs.readFileSync("productos.json","utf-8"))
    let id = productos.length +1
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category){
        return res.status(500).json({message : "Faltan datos"})
    }else{
        let productoNuevo = {
            id : id,
            title : title,
            description : description,
            code : code,
            price : price,
            status : true,
            stock : stock,
            category : category,
            thumbnail : thumbnail
        }
        let idRepetido = productos.find((producto)=>producto.id === productoNuevo.id)
        if(idRepetido){
            productoNuevo.id++
        }
        productos.push(productoNuevo)
        fs.writeFileSync("productos.json",JSON.stringify(productos))
        return res.status(201).json({message: "Producto agregado exitosamente", data : productoNuevo})
    }
})


export default router