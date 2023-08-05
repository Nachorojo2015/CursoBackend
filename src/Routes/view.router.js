import { Router } from "express";
import ProductsModel from "../dao/models/products.js";

const router = Router()

router.get("/",async (req,res)=>{
    const productos = await ProductsModel.find({}).lean()
    res.render("home",{title: "Productos agregados", productos: productos})
})

router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{title: "Productos en tiempo real", script: "index.js"})
})

router.post("/agregarProducto",async(req,res)=>{
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        return res.status(500).json({message : "Faltan datos"})
    }else{
        const productoNuevo = {
            title : title,
            description : description, 
            code : code,
            price : +price,
            status : true,
            stock : +stock,
            category : category,
            thumbnail : thumbnail
        }
        let result = await ProductsModel.insertMany([productoNuevo])
        return res.status(201).json({message: "Producto agregado exitosamente", data : result})
    }
})

export default router