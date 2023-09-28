import {PRODUCTS_MODEL} from "./models/products.js"

export class ProductsMongoDao{

   async getProducts(req,res){
            const {limit = 10, page = 1, sort, query} = req.query
            const results = await PRODUCTS_MODEL.paginate(query ? {category: query} : {},{limit, page, lean: true, sort: sort ? {price:1} : {price:-1}})
            let prevLink = results.hasPrevPage ? `http://localhost:8080/productos/?page=${+page-1}&limit=${limit}&query=${query}&sort=${sort}` : null
            let nextLink = results.hasNextPage ? `http://localhost:8080/productos/?page=${+page+1}&limit=${limit}&query=${query}&sort=${sort}` : null
            results.prevLink = prevLink
            results.nextLink = nextLink
            return results
    }

   async getProductById(id){
           return await PRODUCTS_MODEL.findById(id)
    }

   async saveProduct(product){
        return await PRODUCTS_MODEL.create(product)
    }

   async modifyProduct(id,product){
        return await PRODUCTS_MODEL.findByIdAndUpdate(id,product)
    }

   async deleteProduct(id){
        return await PRODUCTS_MODEL.findByIdAndDelete(id)
    }

   async modifyStockProduct(pid){
        const product = await PRODUCTS_MODEL.findById(pid)
        product.stock -= product.quantity
        await product.save()
        return product
   }
} 