import mongoose from "mongoose";

const cartsCollection = "carts"

const cartsSchema = new mongoose.Schema({
    products : {
        type : Array,
        require : true
    }
})

const CartsModel = mongoose.model(cartsCollection,cartsSchema)

export default CartsModel