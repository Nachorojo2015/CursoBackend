import { Router } from "express";
import { isValidPassword } from "../utils.js";
import passport from "passport";
import { generateToken, passportCall, authorization } from "../utils.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import { USER_DAO } from "../dao/index.js";

const userService = new UsersRepository(USER_DAO)

const sessionRouter = Router()

//Vista del formulario de registro
sessionRouter.get("/session/signup",(req,res)=>{
    res.render("signup",{title: "Registrarse", style: "signup.css", script: "signup.js", PORT: process.env.PORT})
})
//Vista del formulario de login
sessionRouter.get("/",(req,res)=>{
    res.render("login",{title: "Login", style: "login.css", script: "login.js", PORT: process.env.PORT})
})

//Registro con passport
sessionRouter.post("/register",passport.authenticate("register",{
    failureRedirect: "/failRegister"}),async(req,res)=>{
        res.json({status: "success", message: "Usuario registrado"})
})

//Ruta por si falla el registro
sessionRouter.get("/failRegister",(req,res)=>{
    res.send({error:"Error register"})
})

//Login con jwt   
sessionRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await userService.getUserByEmail(email)
    if(!user){
       return res.json({status: "error", message: "User not found"})
    }else{
        if(!isValidPassword(password,user.password)){
           return res.json({status: "error", message: "Invalid password"})
        }else{
            const myToken = generateToken(user)
            res.cookie("coderCookieToken",myToken,{ 
               maxAge: 60 * 60 * 1000,
               httpOnly: true
            })
             res.json({status: "success"})  
        }
    }
})

sessionRouter.get("/current",passportCall("jwt"),authorization("user"),(req,res)=>{
    res.send({fullname: req.user.user.fullname, age: req.user.user.age, role: req.user.user.role}) 
})

//Ruta si falla el login
sessionRouter.get("/failLogin",(req,res)=>{
    res.send({error: "Error login"})
})

//Cerrar sesión
sessionRouter.get("/logout",(req,res)=>{
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
sessionRouter.get("/github",passport.authenticate("github",{scope:["user:email"]}),async(req,res)=>{})

sessionRouter.get("/githubcallback",passport.authenticate("github",{failureRedirect: "/"}),async(req,res)=>{
    res.redirect("/views")
})

export {sessionRouter}