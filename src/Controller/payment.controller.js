import axios from "axios"
import { configuration } from "../config.js"

configuration()

export const captureOrder = async (req, res) => {
    const {token} = req.query
    const response = await axios.post(`${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,{},{
        auth:{
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_KEY,
        }
    })

    res.render("payed",{title: "Success!", style: "payed.css", script: "payed.js", PORT: process.env.PORT})
}

export const cancelOrder = (req, res) => {
    res.send("cancel-order")
}