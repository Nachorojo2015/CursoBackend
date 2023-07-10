import express from "express"
import productosRouter from "./Routes/productos.router.js"
import carritoRouter from "./Routes/carrito.router.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/api/products",productosRouter)
app.use("/api/carts",carritoRouter)


app.listen(PORT,()=>{
    console.log("Escuchando desde el puerto " + PORT)
})



