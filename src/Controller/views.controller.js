import { CARTS_DAO } from "../dao/index.js"
import {PRODUCTS_MODEL} from "../dao/mongo/models/products.js" 
import { ProductsRepository } from "../dao/repository/products.repository.js"
import { PRODUCTS_DAO } from "../dao/index.js"

const productsService = new ProductsRepository(PRODUCTS_DAO)

async function showProducts(req,res){
   try{
    if(process.env.PERSISTENCE === "MONGO"){
    const {limit = 10, page = 1, sort, query} = req.query
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = await PRODUCTS_MODEL.paginate(query ? {category: query} : {},{limit, page, lean: true, sort: sort ? {price:1} : {price:-1}})
    res.render("home",{title: "Productos", 
    productos: docs,  
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
    limit,
    sort,
    query,
    script: "home.js", 
    style: "home.css",
    nombre: req.user.user.first_name,
    apellido: req.user.user.last_name,
    email: req.user.user.email,
    rol: req.user.user.role,
    idCart: req.user.user.cart,
    PORT: process.env.PORT
   })
  }else{
   res.render("home",{
    title: "Productos", 
    script: "home.js",    
    style: "home.css",
    fullname: req.user.user.fullname,
    email: req.user.user.email,
    rol: req.user.user.role, 
    idCart: req.user.user.cart, 
    productos: await productsService.getProducts(req,res),
    PORT: process.env.PORT,
    MONGO: process.env.PERSISTENCE === "MONGO"
   })
  }
}catch(err){
  console.log(err)
}
}

async function showRealTimeProducts(req,res){
    try{
    res.render("realTimeProducts",{title: "Productos en tiempo real", script: "realTimeProducts.js", style: "realTimeProducts.css", user: req.user.user.email, role: req.user.user.role})
    }catch(err){
        console.log(err)
    }
}
 
async function showCart(req,res){
  try{
    const { cid } = req.params;
    try {
        let carrito = await CARTS_DAO.getCartById(cid)
        if (carrito) { 
            let productos = carrito.products.map(p=>p.product);
            if(productos.length === 0){
                res.send("El carrito está vacio")
            }else{
                res.render("carrito", { title: "Carrito", productos, script: "carrito.js", style: "carrito.css", MONGO: process.env.PERSISTENCE === "MONGO", purchaser: req.user.user.email, idC: req.user.user.cart}); 
            }
        } else {
            res.send("Carrito no encontrado");
        }
    } catch (err) {  
        console.log(err); 
        res.send("Error al cargar el carrito");
    }     
  }catch(err){
    console.log(err)  
  }
} 

async function showUsers(req,res){
  try{
    res.render("users",{title: "Users", script: "users.js", style: "users.css"})
  }catch(err){
    console.log(err)
  }
}

export { showProducts, showRealTimeProducts, showCart, showUsers } 