import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt"

export const createHash = password => bcrypt.hashSync(password,bcrypt.genSaltSync(10))

export const isValidPassword = (savedPassword,password) =>{
    console.log("Saved password: " + savedPassword, "Password: " + password)
    return bcrypt.compareSync(savedPassword,password)
} 

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);