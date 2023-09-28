import { PRODUCTS_DAO } from "../dao/index.js";
import { ProductsRepository } from "../dao/repository/products.repository.js";

const productsService = new ProductsRepository(PRODUCTS_DAO)

async function getProducts(req,res){
    try{
       const products = await productsService.getProducts(req,res)
       res.json({status: "Success", products})
    }catch(err){
        console.log(err)
    }
}

async function getProductById(req,res){
    try{
        const {pid} = req.params
        const product = await productsService.getProductById(pid)
        res.json({status: "Success", product})
    }catch(err){
        console.log(err)
    }
}

async function saveProduct(req,res){
    try{
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        res.status(500).json({message : "Faltan datos"})
    }else{
        const newProduct = {
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
        const result = await productsService.saveProduct(newProduct)
        res.status(201).json({status: "Success", result})
    }
    }catch(err){
        console.log(err)
    }
}

async function modifyProduct(req,res){
    try{
    const {pid} = req.params
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        return res.status(500).json({message : "Faltan datos"})
    }else{
        const updateProduct = {
         title,
         description,
         code,
         price : +price,
         status : true,
         stock : +stock,
         category,
         thumbnail
        }
        const result = await productsService.modifyProduct(pid,updateProduct)
        res.status(201).json({status: "Success", result})
    }
    }catch(err){
        console.log(err)
    }
}

async function deleteProduct(req,res){
    try{
    const {pid} = req.params
    const result = await productsService.deleteProduct(pid)
    res.status(201).json({status: "Success", result})
    }catch(err){
        console.log(err)
    }
}

async function modifyStockProduct(req,res){
  const {pid} = req.params
  try{
    const response = await productsService.modifyStockProduct(pid)
    res.json({status: "Success", response}) 
  }catch(err){
    console.log(err)
  }
}

export { getProducts, getProductById, saveProduct, modifyProduct, deleteProduct, modifyStockProduct }
