import { Router } from "express";
import { showProducts, showRealTimeProducts, showCart } from "../Controller/views.controller.js"

const router = Router()

router.get("/",showProducts)

router.get("/realTimeProducts",showRealTimeProducts)

router.get("/carts/:cid",showCart)

export default router 