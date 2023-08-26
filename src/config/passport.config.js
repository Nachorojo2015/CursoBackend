import passport from "passport";
import local from "passport-local"
import { UserModel } from "../dao/models/users.model.js";
import { createHash, isValidPassword } from "../utils.js";
import GithubStrategy from "passport-github2"
import * as dotenv from "dotenv"
import crypto from "crypto"

dotenv.config()

const LocalStrategy = local.Strategy
const GithubClientId = process.env.GITHUB_CLIENT_ID
const GithubClientSecret = process.env.GITHUB_CLIENT_SECRET
const GithubURL = process.env.GITHUB_URL_CALLBACK

const intializePassport = async()=>{
    passport.use("register",new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"},async(req,mail,pass,done)=>{
            const {name,last_name,email,user,password} = req.body
            try{
                const userAccount = await UserModel.findOne({email: email})
                if(userAccount){
                    return done(null,false,{message: "Tu usuario ya existe"})
                }else{
                    const newUser = {
                        name,
                        last_name,
                        email,
                        user,
                        password: createHash(password)
                    }
                    const result = await UserModel.create(newUser)
                    return done(null,result)
                }
            }catch(err){
                return done(err)
            }
        }))

    passport.use("login",new LocalStrategy({
        usernameField: "email"},async(email,password,done)=>{
            try{
                const user = await UserModel.findOne({email: email})
                if(!user){
                    return done(null,false,{message: "Tu usuario no existe"})
                }else{
                    if(!isValidPassword(password,user.password)){
                        return done(null,false,{message: "Contraseña incorrecta"})
                    }else{
                        return done(null,user)
                    }
                }
            }catch(err){
                return done(err)
            }
        }))

    passport.use("github",new GithubStrategy({
        clientID : GithubClientId,
        clientSecret: GithubClientSecret,
        callbackURL: GithubURL
    },async(accessToken,refreshToken,profile,done)=>{
          try{
            console.log(profile)
           const user = await UserModel.findOne({email: profile.login+"@gmail.com"})
           if(!user){ 
            const newUser = {
                name: profile.name,
                last_name: profile.displayName,
                email: profile.login+"@gmail.com",
                user: profile.username,
                password: crypto.randomUUID()
            }
            const result = await UserModel.create(newUser)
            done(null,result)
           }else{
            done(null,user)
           }
          }catch(err){
            done(err,null)
          }
    }))
 
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    
    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id)
        done(null, user) 
    })
}

export default intializePassport