import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    products : [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products"
            },
        },
    ],
})

cartsSchema.pre("findOne",function(next){
    this.populate("products.product")
    next()
})

export const CARTS_MODEL = mongoose.model(cartsCollection,cartsSchema)
