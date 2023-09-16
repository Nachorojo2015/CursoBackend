import dotenv from "dotenv"
import { Command } from "commander"
function configuration(){
    const command = new Command()
    command.option("--mode <mode>", "Modo de desarrollo", "prods") 
    command.parse()
    let m = command.opts().mode
    dotenv.config({path: m === "PRODUCTION" ? "./.env.sq" : "./.env"})
}

export {configuration} 