import nodemailer from "nodemailer"
import { configuration } from "../config.js"

configuration()

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_GOOGLE,
        pass: process.env.PASS_GOOGLE
    }
})

transport.verify().then(()=>{
    console.log("Ready for send emails")
})
