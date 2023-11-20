import dotenv from "dotenv"
import { Command } from "commander"
function configuration(){
    const command = new Command()
    command.option("--mode <mode>", "Modo de desarrollo", "prods") 
    command.parse()
    let mode = command.opts().mode
    dotenv.config({path: mode === "PRODUCTION" ? "../.env.sq" : "../.env"})
}

export {configuration} 