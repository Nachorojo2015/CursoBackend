import { Router } from "express";
import productos from "../productos.json" assert {type : "json"}

const router = Router()

router.get("/",(req,res)=>{
    res.render("home",{title: "Productos agregados", productos: productos})
})

router.get("/realTimeProducts",(req,res)=>{
    res.render("realTimeProducts",{title: "Productos en tiempo real", style : "timeProducts.css", productos : productos, })
})



export default router