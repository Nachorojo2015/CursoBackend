import { Router } from "express";
import { UserModel } from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router()
//Vista del formulario de registro
router.get("/session/signup",(req,res)=>{
    res.render("signup",{title: "Registrarse", style: "signup.css", script: "signup.js"})
})
//Vista del formulario de login
router.get("/",(req,res)=>{
    res.render("login",{title: "Login", style: "login.css", script: "login.js"})
})

//Registro con passport
router.post("/register",passport.authenticate("register",{
    failureRedirect: "/failRegister"}),async(req,res)=>{
        return res.json({status: "success", message: "Usuario registrado"})
})

//Ruta por si falla el registro
router.get("/failRegister",(req,res)=>{
    res.send({error:"Error register"})
})

//Login con passport   
router.post("/login",passport.authenticate("login",{
    failureRedirect: "/failLogin"}),async(req,res)=>{
        if(!req.user){
            return res.status(401).json({status: "Error", message: "Error de autenticación"})
        }else{
            req.session.name = req.user.name
            req.session.last_name = req.user.last_name
            req.session.user = req.user.user
            req.session.email = req.user.email
            req.session.password = req.user.password
            req.session.rol = "user"
            return res.json({
                status: "OK",
                message: "Logueado con exito"
            })
        }
    })

//Ruta si falla el login
router.get("/failLogin",(req,res)=>{
    res.send({error: "Error login"})
})

//Cerrar sesión
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

//Registro con github
router.get("/github",passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})

router.get("/githubcallback",passport.authenticate("github",{failureRedirect: "/"}),async(req,res)=>{
    req.session.name = req.user.name
    req.session.last_name = req.user.last_name
    req.session.user = req.user.user
    req.session.email = req.user.email
    req.session.password = req.user.password
    req.session.rol = "user"
    console.log(req.user)
    req.session.rol = "user"
    res.redirect("/views")
})

export default router