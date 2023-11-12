import { Router } from "express";
import { isValidPassword } from "../utils.js";
import passport from "passport";
import { generateToken, passportCall, authorization } from "../utils.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import { USER_DAO } from "../dao/index.js";
import { transport } from "../mailler/nodemailer.js";
import { createHash } from "../utils.js";

const userService = new UsersRepository(USER_DAO)

let userTemp = ""

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
sessionRouter.post("/logout",(req,res)=>{
    req.session.destroy(async err=>{
        if(!err){
           const {email} = req.body
           const user = await userService.getUserByEmail(email)
           user.last_connection = new Date()
           const response = await userService.modifyUser(user.id,user)
           return res.json({
            message: "Sesión cerrada",response
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

//Recuperar contraseña
sessionRouter.get("/recover",(req,res)=>{
    res.render("recoverPassword", {title: "Recover password", script: "recoverPassword.js", style: "recoverPassword.css", PORT: process.env.PORT})
})

sessionRouter.post("/recovePassword",async(req,res)=>{
    const {mail} = req.body
    try{
      await transport.sendMail({
        from: "Forgot password <coder123@gmail.com>", 
        to: mail,
        subject: "Forgot password",
        headers: {
            'Expiry-Date': new Date(Date.now() + 3600 * 1000).toUTCString()
        },
        html: `
            <h1>Forgot password</h1>
         <a href="http://localhost:${process.env.PORT}/replacePassword"><button>Recuperar contraseña</button></a>
        `
       })
       userTemp = await userService.getUserByEmail(mail)
       res.json({status: "success", message: "Mail sended"})
    }catch(err){
        console.log(err)
    }
})

sessionRouter.get("/replacePassword",(req,res)=>{
    res.render("replacePassword", {title: "Replace Password", style: "replacePassword.css", script: "replacePassword.js"})
})

sessionRouter.post("/replace",async(req,res)=>{
    try{
    const {pass} = req.body
    const user = await userService.getUserByEmail(userTemp.email)
    console.log(user.password)
    if(isValidPassword(pass,user.password)){
        return res.json({status: "error", message: "same password"})
    }else{
        user.password = createHash(pass)
        const data = await userService.modifyUser(user.id,user)
        res.json({status: "Success", message: "Password replaced", data})
    }
    }catch(err){
        console.log(err)
    }
})

export {sessionRouter}