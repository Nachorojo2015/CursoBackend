import express from "express"
import productos from "./productos.json" assert { type: "json" }


const app = express()

app.get("/products",async (req,res)=>{
    const {limit} = req.query
    try{
        if(limit){
            let productosLimite = []
            for(let i=0;i<limit;i++){
               productosLimite.push(productos[i])
            }
            res.send(productosLimite)
        }else{
           res.send(productos)
        }
    }catch(error){
        res.status(500).send("Error al obtener los productos")
    }
    
})

app.get("/products/:pid",async (req,res)=>{
    const {pid} = req.params
    try{
        let producto = productos.find((producto)=>producto.id === +pid)
        producto ? res.send(producto) : res.status(404).send("Producto no encontrado")
    }catch(error){
        res.status(500).send("Error al obtener el producto")
    }
    
})

app.listen(8080,()=>{
    console.log("Escuchando desde el puerto 8080")
})



