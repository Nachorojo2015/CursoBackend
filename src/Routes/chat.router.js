import { Router } from "express";
import { getMessages } from "../Controller/chat.controller.js";

const chatRouter = Router()

chatRouter.get("/",getMessages)

export {chatRouter}