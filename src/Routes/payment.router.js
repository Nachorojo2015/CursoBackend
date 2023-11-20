import { Router } from "express";
import { captureOrder, cancelOrder } from "../Controller/payment.controller.js";

const paymentsRouter = Router()

paymentsRouter.get("/capture-order",captureOrder)
paymentsRouter.get("/cancel-order",cancelOrder)

export {paymentsRouter}