import { Router } from "express";
import { showProducts, showRealTimeProducts, showCart, showUsers } from "../Controller/views.controller.js"
import { authAdmin, authOnlyAdmin } from "../utils.js";

const viewsRouter = Router()

viewsRouter.get("/",showProducts)

viewsRouter.get("/realTimeProducts",authAdmin,showRealTimeProducts)

viewsRouter.get("/carts/:cid",showCart) 

viewsRouter.get("/users",authOnlyAdmin,showUsers)

export {viewsRouter} 