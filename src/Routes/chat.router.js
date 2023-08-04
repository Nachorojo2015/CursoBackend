import MessagesModel from "../dao/models/messages.js";
import { Router } from "express";

const router = Router()

router.get("/",(req,res)=>{
    res.render("chat",{title:"Chat", script: "chat.js"})
})

export default router