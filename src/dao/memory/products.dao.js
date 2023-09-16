export default class ProductsDao{
    constructor(){
        this.products = []
    }

    getProducts(req,res){
        return this.products
    }

    getProductById(id){
        return this.products.find(p=>p.id == id)
    }

    saveProduct(product){
        this.products.push(product)
        this.products.forEach(p=>{
            p.id = this.products.indexOf(p)+1
        })
        return "Product saved"
    }

    modifyProduct(product,id){
        let indexProduct = this.products.findIndex(p=>p.id == id)
        if(indexProduct == -1) return "Product not found"
        this.products[indexProduct] = product
        return "Success"
    }

    deleteProduct(id){
        let product = this.products.find((p) => p.id == id)
        if(product){
            let indexProduct = this.products.indexOf(product)
            this.products.splice(indexProduct,1)
            this.products.forEach(p=>{
                p.id = this.products.indexOf(p)+1
            })
            return "Success"
        }else{
            return "Product not found"
        }
    }
}