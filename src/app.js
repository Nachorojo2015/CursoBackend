import express from "express"
import { engine } from "express-handlebars"
import router from "./Routes/view.router.js"
import { Server } from "socket.io"
import productos from "./productos.json" assert {type : "json"}
import fs from "fs"

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static("../public"))

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
      let id = productos.length + 1
      data.id = id
      productos.push(data)
      fs.writeFileSync("productos.json",JSON.stringify(productos))
    });

    socket.on("delete-product",(data)=>{
        let indexProducto = productos.findIndex((producto)=>producto.id === data)
        productos.splice(indexProducto,1)
        fs.writeFileSync("productos.json",JSON.stringify(productos))
    })

    socket.emit("update-products",productos)
});








