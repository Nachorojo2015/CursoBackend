import passport from "passport";
import local from "passport-local"
import { UserModel } from "../dao/mongo/models/users.model.js";
import { createHash } from "../utils.js";
import GithubStrategy from "passport-github2"
import * as dotenv from "dotenv"
import crypto from "crypto"
import CartsModel from "../dao/mongo/models/carts.js"
import jwt, {ExtractJwt} from "passport-jwt"

dotenv.config()

const LocalStrategy = local.Strategy
const JwtStrategy = jwt.Strategy
const GithubClientId = process.env.GITHUB_CLIENT_ID
const GithubClientSecret = process.env.GITHUB_CLIENT_SECRET
const GithubURL = process.env.GITHUB_URL_CALLBACK

const intializePassport = async()=>{
    passport.use("register",new LocalStrategy({
        passReqToCallback: true,
        usernameField: "email"},async(req,mail,pass,done)=>{
            const {first_name,last_name,email,age,password} = req.body
            try{
                const userAccount = await UserModel.findOne({email: email})
                if(userAccount){
                    return done(null,false,{message: "Tu usuario ya existe"})
                }else{
                    const carrito = {
                        products : []
                    }
                    let cart = await CartsModel.create(carrito)
                    const newUser = { 
                        first_name,
                        last_name,
                        email,
                        age,
                        cart: cart.id,
                        role: "user",
                        password: createHash(password)
                    }
                    const result = await UserModel.create(newUser)
                    console.log(result)
                    return done(null,result)
                }
            }catch(err){
                return done(err)
            }
        }))

    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "CoderKeySecreta"
    },async(jwt_payload,done)=>{
        try{
            return done(null,jwt_payload)
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
           const user = await UserModel.findOne({email: profile?.emails[0]?.value})
           if(!user){ 
            const newUser = {
                name: profile.displayName,
                last_name: profile.displayName,
                email: profile?.emails[0]?.value,
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

const cookieExtractor = (req)=>{
    let token = null
    if(req && req.cookies){
        token = req.cookies["coderCookieToken"]
    }
    return token
}

export default intializePassport