import { Router } from "express";
import { getMessages } from "../Controller/chat.controller.js";

const router = Router()

router.get("/",getMessages)

export default router