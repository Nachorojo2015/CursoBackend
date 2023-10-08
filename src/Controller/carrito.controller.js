import { CARTS_DAO } from "../dao/index.js"
import { TICKET_DAO } from "../dao/index.js"
import { CustomErrors } from "../services/errors/customErrors.js";
import { Errors } from "../services/errors/errors.js";
import { LOGGER } from "../dao/index.js";

async function createCart(req,res){
      req.logger = LOGGER
      try{
        const cart = {
          products : []
        }
        const result = await CARTS_DAO.saveCart(cart)
        res.json({status: "Success", result})
      }catch(err){
        const error = CustomErrors.generateError({
          name: "Cart Error",
          message: "Error create cart",
          cause: err,
          code: Errors.DATABASE_ERROR
      })
      req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
      res.json({status: "error", error})
      }
}

async function getCartById(req,res){
    req.logger = LOGGER
    try{
    const {cid} = req.params 
    const result = await CARTS_DAO.getCartById(cid)
    res.json({status: "Success", result})
    }catch(err){
      const error = CustomErrors.generateError({
        name: "Cart Error",
        message: "Error get cart",
        cause: err,
        code: Errors.DATABASE_ERROR
    })
    req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
    res.json({status: "error", error})
    }
}

async function saveProductInCart(req,res){
  req.logger = LOGGER
  try{
    const { cid, pid } = req.params;
    const result = await CARTS_DAO.saveProductCart(cid,pid)
    res.json({status: "Success", result})
  }catch(err){
    const error = CustomErrors.generateError({
      name: "Cart Error",
      message: "Error save product in cart",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error})
  }
}

async function updateCart(req,res){
 req.logger = LOGGER
 try{
  const {cid} = req.params
  const {cart} = req.body
  const result = await CARTS_DAO.updateCart(cid,cart)
  res.status(201).json({"message":"Carrito actualizado", result})
 }catch(err){
  const error = CustomErrors.generateError({
    name: "Cart Error",
    message: "Error update cart",
    cause: err,
    code: Errors.DATABASE_ERROR
})
req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
res.json({status: "error", error})
 }
}

async function updateQuantityProductInCart(req,res){
  req.logger = LOGGER
  try{
    const {cid,pid} = req.params
    const {quantity} = req.body
    const result = await CARTS_DAO.updateQuantityProductsCart(cid,pid,quantity)
    res.send(result)
  }catch(err){
    const error = CustomErrors.generateError({
      name: "Cart Error",
      message: "Error update quantity cart",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error})
  }
}

async function deleteProductsInCart(req,res){
  req.logger = LOGGER
  try{
  const {cid} = req.params
  const result = await CARTS_DAO.deleteProductsCart(cid)
  res.json({status: "Success", result})
  }catch(err){
    const error = CustomErrors.generateError({
      name: "Cart Error",
      message: "Error delete products in cart",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error})
  }
}

async function deleteProductInCart(req,res){
req.logger = LOGGER
try{
  const {cid, pid} = req.params
  const result = await CARTS_DAO.deleteProductCart(cid,pid)
  res.json({status: "Success", result})
}catch(err){
  const error = CustomErrors.generateError({
    name: "Cart Error",
    message: "Error delete product in cart",
    cause: err,
    code: Errors.DATABASE_ERROR
})
req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
res.json({status: "error", error})
}
}

async function purchaseProducts(req,res){
  req.logger = LOGGER
  const {totalAmount,email,code} = req.body
  try{
    const newTicket = {
        code,
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: email
    }
    const ticket = TICKET_DAO.saveTicket(newTicket)
    res.json({status: "Success", ticket})
  }catch(err){
    const error = CustomErrors.generateError({
      name: "Cart Error",
      message: "Error purchase cart",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error})
  }
}

export { createCart, getCartById, saveProductInCart, updateCart, updateQuantityProductInCart, deleteProductInCart, deleteProductsInCart, purchaseProducts }