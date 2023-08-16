//IMPORTACIONES
import express from "express"
import { engine } from "express-handlebars"
import Viewrouter from "./Routes/view.router.js"
import { Server } from "socket.io"
import ProductsModel from "./dao/models/products.js"
import path from "path"
import { __dirname } from "./utils.js"
import * as dotenv from "dotenv"
import mongoose from "mongoose"
import Productosrouter from "./Routes/productos.router.js"
import Carritorouter from "./Routes/carrito.router.js"
import Chatrouter from "./Routes/chat.router.js"
import MessagesModel from "./dao/models/messages.js"
//Configuración del dotenv
dotenv.config()

//Inicializar express
const app = express()
//Guardar el puerto
const PORT = process.env.PORT || 8080
//Guardar la direccion de la base de Mongo
const MONGO_URL = process.env.URL_MONGOOSE
//Conectar con mongo
const connection = mongoose.connect(MONGO_URL)

//Configuración del express
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Configuración del handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./views"));


//Uso de la carpeta public para ver el contenido / comunicación cliente servidor
app.use(express.static("../public"))

//Rutas
app.use("/productos",Productosrouter)
app.use("/carrito",Carritorouter)
app.use("/",Viewrouter)
app.use("/chat",Chatrouter)



//Inicializar el servidor con socket
const server = app.listen(PORT,()=>{
    console.log("Escuchando desde el puerto " + PORT)
})

server.on("error",(err)=>{
    console.log(err)
})


const ioServer = new Server(server)

ioServer.on("connection", async (socket) => {
    console.log("Nueva conexión establecida");

    socket.on("disconnect",()=>{
        console.log("Usuario desconectado")
    })

    socket.on("new-product", async (data) => {
      let title = data.title
      let description = data.description
      let code = data.code
      let price = +data.price
      let stock = +data.stock
      let category = data.category
      let thumbnail = data.thumbnail
      console.log(title,description,code,price,stock,category,thumbnail)
      console.log("Producto agregado correctamente")
    });

    socket.on("delete-product",async(data)=>{ 
        let id = data;
        let result = await ProductsModel.findByIdAndDelete(id);
        console.log("Producto eliminado", result);
    })
    

    const productos = await ProductsModel.find({}).lean()
    socket.emit("update-products", productos)

    socket.on("guardar-mensaje",(data)=>{
        MessagesModel.insertMany([data])
    })

    const mensajes = await MessagesModel.find({}).lean()
    socket.emit("enviar-mensajes",mensajes)
    socket.on("Nuevos-mensajes",(data)=>{
        console.log(data + " nuevos mensajes")
    })
});








