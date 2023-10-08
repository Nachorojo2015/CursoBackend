import Router from "express"
import { getLogger } from "../Controller/logger.controller.js"

const loggerRouter = Router()

loggerRouter.get("/",getLogger)

export {loggerRouter}