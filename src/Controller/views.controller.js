import { CARTS_DAO } from "../dao/index.js"
import ProductsModel from "../dao/mongo/models/products.js" 

async function showProducts(req,res){
   try{
    const {limit = 10, page = 1, sort, query} = req.query
    const {docs,hasPrevPage,hasNextPage,nextPage,prevPage} = await ProductsModel.paginate(query ? {category: query} : {},{limit, page, lean: true, sort: sort ? {price:1} : {price:-1}})
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
    idCart: req.user.user.cart
   })
}catch(err){
  console.log(err)
}
}

async function showRealTimeProducts(req,res){
    try{
    res.render("realTimeProducts",{title: "Productos en tiempo real", script: "realTimeProducts.js", style: "realTimeProducts.css"})
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
                res.render("carrito", { title: "Carrito", productos, script: "carrito.js", style: "carrito.css"});
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

export { showProducts, showRealTimeProducts, showCart }