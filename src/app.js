import express from "express"
import { engine } from "express-handlebars"
import router from "./Routes/view.router.js"
import { Server } from "socket.io"
import productos from "./productos.json" assert {type : "json"}
import fs from "fs"
import path from "path"
import { __dirname } from "./utils.js"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "./views"));

app.use(express.static(path.join(__dirname , "../public")))

app.use("/",router)


const server = app.listen(PORT,()=>{
    console.log("Escuchando desde el puerto " + PORT)
})

server.on("error",(err)=>{
    console.log(err)
})

const ioServer = new Server(server)


ioServer.on("connection", (socket) => {
    console.log("Nueva conexión establecida");

    socket.on("disconnect",()=>{
        console.log("Usuario desconectado")
    })

    socket.on("new-product", (data) => {
      let title = data.title
      let description = data.description
      let code = data.code
      let price = +data.price
      let stock = +data.stock
      let category = data.category
      let thumbnail = data.thumbnail
      console.log(title,description,code,price,stock,category,thumbnail)
      console.log("Producto agregado correctamente")
      socket.emit("nuevoProductoAgregado",data)
    });

    socket.on("delete-product",(data)=>{
        let indexProducto = productos.findIndex((producto)=>producto.id === data)
        productos.splice(indexProducto,1)
        fs.writeFileSync("productos.json",JSON.stringify(productos))
    })

    socket.emit("update-products",productos)
});








