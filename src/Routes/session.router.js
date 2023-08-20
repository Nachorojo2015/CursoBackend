import { Router } from "express";
import { UserModel } from "../dao/models/users.model.js";

const router = Router()

router.get("/session/signup",(req,res)=>{
    res.render("signup",{title: "Registrarse", style: "signup.css", script: "signup.js"})
})

router.get("/",(req,res)=>{
    res.render("login",{title: "Login", style: "login.css", script: "login.js"})
})

router.post("/signup",async(req,res)=>{
    const {name,last_name,mail,user,password} = req.body
    const result = await UserModel.create({
        name,
        last_name,
        mail,
        user,
        password
    })
    if(result){
        return res.json({
            status: "Ok",
            message: "Registrado con exito"
        })
    }else{
        return res.json({
            status: "Error",
            messgae: "Hubo un error"
        })
    }
})

router.post("/login",async(req,res)=>{
    const {mail,password} = req.body
    const user = await UserModel.findOne({mail: mail, password: password})
    console.log(user)
    if(mail === "adminCoder@coder.com" && password === "adminCod3r123"){
        req.session.name = "Admin"
        req.session.last_name = "Coder"
        req.session.user = "AdminCoder"
        req.session.mail = "adminCoder@coder.com"
        req.session.password = "adminCod3r123"
        req.session.rol = "admin"
        return res.json({
            status: "Ok",
            message: "Es Admin"
        })
    }else{
        if(user){
        req.session.name = user.name
        req.session.last_name = user.last_name
        req.session.user = user.user
        req.session.mail = user.mail
        req.session.password = user.password
        req.session.rol = "user"
            return res.json({
                status: "OK",
                message: "Inicio exitoso"
            })
        }else{
            req.session.rol = false
            return res.json({
                status: "Error", 
                message: "Error de inicio de sesión"
            })
        }
    }
})

router.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(!err){
           return res.json({
            message: "Sesión cerrada"
           })
        }else{
           return res.json({
            message: "Error al cerrar sesión"
           }) 
        }
    })
})


export default router