import { CARTS_DAO } from "../dao/index.js"
import { TICKET_DAO } from "../dao/index.js"

async function createCart(req,res){
      const cart = {
        products : []
      }
      const result = await CARTS_DAO.saveCart(cart)
      res.json({status: "Success", result})
}

async function getCartById(req,res){
    try{
    const {cid} = req.params 
    const result = await CARTS_DAO.getCartById(cid)
    res.json({status: "Success", result})
    }catch(err){
        console.log(err)
    }
}

async function saveProductInCart(req,res){
  try{
    const { cid, pid } = req.params;
    const result = await CARTS_DAO.saveProductCart(cid,pid)
    res.json({status: "Success", result})
  }catch(err){
    console.log(err)
  }
}

async function updateCart(req,res){
 try{
  const {cid} = req.params
  const {cart} = req.body
  const result = await CARTS_DAO.updateCart(cid,cart)
  res.status(201).json({"message":"Carrito actualizado", result})
 }catch(err){
  console.log(err)
 }
}

async function updateQuantityProductInCart(req,res){
  try{
    const {cid,pid} = req.params
    const {quantity} = req.body
    const result = await CARTS_DAO.updateQuantityProductsCart(cid,pid,quantity)
    res.send(result)
  }catch(err){
    console.log(err)
  }
}

async function deleteProductsInCart(req,res){
  try{
  const {cid} = req.params
  const result = await CARTS_DAO.deleteProductsCart(cid)
  res.json({status: "Success", result})
  }catch(err){
    console.log(err)
  }
}

async function deleteProductInCart(req,res){
try{
  const {cid, pid} = req.params
  const result = await CARTS_DAO.deleteProductCart(cid,pid)
  res.json({status: "Success", result})
}catch(err){
  console.log(err)
}
}

async function purchaseProducts(req,res){
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
    console.log(err)
  }
}

export { createCart, getCartById, saveProductInCart, updateCart, updateQuantityProductInCart, deleteProductInCart, deleteProductsInCart, purchaseProducts }



