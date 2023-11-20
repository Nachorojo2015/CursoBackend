import { CARTS_DAO } from "../dao/index.js"
import { TICKET_DAO } from "../dao/index.js"
import { CustomErrors } from "../services/errors/customErrors.js";
import { Errors } from "../services/errors/errors.js";
import { LOGGER } from "../dao/index.js";
import { configuration } from "../config.js";
import axios from "axios"

configuration()

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
  const {cart} = req.body
  const {cid} = req.params
  const result = await CARTS_DAO.updateCart(cid,cart)
  res.status(200).json({"message":"Carrito actualizado", result})
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
  const {totalAmount,email,code} = req.body
  try{
    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalAmount.toString(),
          },
        },
      ],
      application_context: {
        brand_name: "ecommerce.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `http://localhost:8080/capture-order`,
        cancel_url: `http://localhost:8080/cancel-order`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_API_CLIENT,
          password: process.env.PAYPAL_API_KEY,
        },
      }
    );

     // make a request
     const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const newTicket = {
      code,
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: email
  }
   await TICKET_DAO.saveTicket(newTicket)

  res.json(response.data)
  }catch(err){
    console.log(err)
    res.json({message: "Something goes wrong"})
  }
}

export { createCart, getCartById, saveProductInCart, updateCart, updateQuantityProductInCart, deleteProductInCart, deleteProductsInCart, purchaseProducts }