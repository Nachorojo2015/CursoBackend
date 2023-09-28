import { Router } from "express";
import { showProducts, showRealTimeProducts, showCart } from "../Controller/views.controller.js"
import { authAdmin } from "../utils.js";

const viewsRouter = Router()

viewsRouter.get("/",showProducts)

viewsRouter.get("/realTimeProducts",authAdmin,showRealTimeProducts)

viewsRouter.get("/carts/:cid",showCart) 

export {viewsRouter} 