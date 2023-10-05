import { PRODUCTS_DAO } from "../dao/index.js";
import { ProductsRepository } from "../dao/repository/products.repository.js";
import { faker } from "@faker-js/faker";
import { generateUserErrorInfo } from "../services/errors/info.js";
import { CustomErrors } from "../services/errors/customErrors.js";
import { Errors } from "../services/errors/errors.js";

const productsService = new ProductsRepository(PRODUCTS_DAO)

async function getProducts(req,res){
    try{
       const products = await productsService.getProducts(req,res)
       res.json({status: "Success", products})
    }catch(err){
        const error = CustomErrors.generateError({
            name: "Products Error",
            message: "Error get products",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        console.log(error)
        res.json({status: "error", error})
    }
}

async function getProductById(req,res){
    try{
        const {pid} = req.params
        const product = await productsService.getProductById(pid)
        res.json({status: "Success", product})
    }catch(err){
        const error = CustomErrors.generateError({
            name: "Product Error",
            message: "Error get product",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        console.log(error)
        res.json({status: "error", error})
    }
}

async function saveProduct(req,res){
    try{
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        const error = CustomErrors.generateError({
            name: "Faltan datos",
            message: "Invalid types",
            cause: generateUserErrorInfo({title,description,code,price,stock,category,thumbnail}),
            code: Errors.INCOMPLETE_DATA
        })
        console.log(error)
        res.json({status: "error", error})
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
        const error = CustomErrors.generateError({
            name: "Products Error",
            message: "Error save product",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        console.log(error)
        res.json({status: "error", error})
    }
}

async function modifyProduct(req,res){
    try{
    const {pid} = req.params
    const {title,description,code,price,stock,category,thumbnail} = req.body
    if(!title || !description || !code || !price || !stock || !category || !thumbnail){
        const error = CustomErrors.generateError({
            name: "Faltan datos",
            message: "Invalid types",
            cause: generateUserErrorInfo({title,description,code,price,stock,category,thumbnail}),
            code: Errors.INCOMPLETE_DATA
        })
        console.log(error)
        res.json({status: "error", error})
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
        const error = CustomErrors.generateError({
            name: "Products Error",
            message: "Error modify product",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        console.log(error)
        res.json({status: "error", error})
    }
}

async function deleteProduct(req,res){
    try{
    const {pid} = req.params
    const result = await productsService.deleteProduct(pid)
    res.status(201).json({status: "Success", result})
    }catch(err){
        const error = CustomErrors.generateError({
            name: "Products Error",
            message: "Error delete product",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        console.log(error)
        res.json({status: "error", error})
    }
}

async function modifyStockProduct(req,res){
  const {pid} = req.params
  try{
    const response = await productsService.modifyStockProduct(pid)
    res.json({status: "Success", response}) 
  }catch(err){
    const error = CustomErrors.generateError({
        name: "Products Error",
        message: "Error modify stock product",
        cause: err,
        code: Errors.DATABASE_ERROR
    })
    console.log(error)
    res.json({status: "error", error})
  }
}

async function createProducts(req,res){
    try{
        for(let i = 0; i<100; i++){
            const newProductRandom = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.string.alphanumeric(),
                price: faker.commerce.price(),
                status: faker.datatype.boolean(),
                stock: +faker.string.numeric(),
                category: faker.commerce.product(),
                thumbnail: faker.image.url(),
                quantity: 1
            }
            const response = await productsService.saveProduct(newProductRandom)
            console.log(response)
        }
        res.json({status: "Success", message: "All products inserted"})
    }catch(err){
        const error = CustomErrors.generateError({
            name: "Products Error",
            message: "Error create products",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        console.log(error)
        res.json({status: "error", error})
    }
}

export { getProducts, getProductById, saveProduct, modifyProduct, deleteProduct, modifyStockProduct, createProducts }
