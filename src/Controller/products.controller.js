import { PRODUCTS_DAO } from "../dao/index.js";

async function getProductos(req,res){
    try{
       const result = await PRODUCTS_DAO.getProducts(req,res)
       res.send(result)
    }catch(err){
        console.log(err)
    }
}

async function getProductByID(req,res){
    try{
        const {pid} = req.params
        const producto = await PRODUCTS_DAO.getProductById(pid)
        res.json({message: "Producto seleccionado", producto : producto})
    }catch(err){
        console.log(err)
    }
}

async function modifyProducto(req,res){
    try{
    const {pid} = req.params
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        return res.status(500).json({message : "Faltan datos"})
    }else{
        const producto = {
         title : title,
         description: description,
         code : code,
         price : +price,
         status : true,
         stock : +stock,
         category : category,
         thumbnail : thumbnail
        }
        const data = await PRODUCTS_DAO.modifyProduct(producto,pid)
        res.json({message : "Producto modificado correctamente", data})
    }
    }catch(err){
        console.log(err)
    }
}

async function deleteProducto(req,res){
    try{
    const {pid} = req.params
    const data = await PRODUCTS_DAO.deleteProduct(pid)
    res.send(data)
    }catch(err){
        console.log(err)
    }
}

async function saveProducto(req,res){
    try{
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        res.status(500).json({message : "Faltan datos"})
    }else{
        const productoNuevo = {
            title,
            description,
            code,
            price : +price,
            status : true,
            stock : +stock,
            category,
            thumbnail,
            quantity : 1
        }
        console.log(productoNuevo)
        const data = await PRODUCTS_DAO.saveProduct(productoNuevo)
        res.status(201).json({message: "Producto agregado exitosamente", status: data})
    }
    }catch(err){
        console.log(err)
    }
}

export { getProductos, getProductByID, modifyProducto, deleteProducto, saveProducto }
