export class ProductsMemoryDao{
    constructor(){
        this.products = []
    }

   async getProducts(req,res){
        return this.products
    }

   async getProductById(id){
        return this.products.find(p=>p._id === +id)
    }

   async saveProduct(product){
        this.products.push(product)
        this.products.forEach(p=>{
            p._id = this.products.indexOf(p)+1
        })
        return product
    }
 
   async modifyProduct(id,product){
        let indexProduct = this.products.findIndex(p=>p._id === +id)
        const quantity = this.products[indexProduct].quantity
        if(indexProduct === -1) return "Product not found"
        product.quantity = quantity
        this.products[indexProduct] = product
        return product
    }

   async deleteProduct(id){
        let product = this.products.find((p) => p._id === +id)
        if(product){
            let indexProduct = this.products.indexOf(product)
            this.products.splice(indexProduct,1)
            this.products.forEach(p=>{
                p.id = this.products.indexOf(p)+1
            })
            return id
        }else{
            return "Product not found"
        }
    }

   async modifyStockProduct(pid){
        const product = this.products.find(product => product._id === pid)
        product.stock -= product.quantity
        return product
   }
}