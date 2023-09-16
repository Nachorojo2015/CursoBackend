import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products"

const productsSchema = new mongoose.Schema({
    title : {
        type: String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    code : {
        type : String,
        require : true,
        unique : true
    },
    price : {
        type : Number,
        require : true
    },
    status : {
        type : Boolean
    },
    stock : {
        type : Number,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    thumbnail : {
        type : String,
        require : true
    },
    quantity :{
        type: Number,
        require: true,
        default: 1
    }
})

productsSchema.plugin(mongoosePaginate)

const ProductsModel = mongoose.model(productsCollection,productsSchema)

export default ProductsModel