import { PRODUCTS_DAO } from "../index.js"

export default class CarritoDao{
    constructor(){
        this.carritos = []
    }

    getCarts(){
        return this.carritos
    }

    getCartById(id){
        return this.carritos.find(c=>c.id == id)
    }

    saveCart(cart){
        this.carritos.push(cart)
        this.carritos.forEach(c=>{
            c.id = this.carritos.indexOf(c)+1
        })
        return "Success"
    }

    saveProductCart(id,pid){
        const carrito = this.carritos.find(c=> c.id == id)
        const product = PRODUCTS_DAO.getProductById(pid)
        if(carrito){
            if(carrito.products.some(p=> p.id == product.id)){
                const productoEnCarrito = carrito.products.find(p => p.id == product.id)
                productoEnCarrito.quantity++
            }else{
                product.quantity = 1
                carrito.products.push(product)
            }
            return "Success"
        }else{
            return "Cart not found"
        }
    }

    deleteProductCart(id,pid){
        const carrito = this.carritos.find(c=>c.id == id)
        if(carrito){
            const indexProduct = carrito.products.findIndex(p=>p.id == pid)
            if(indexProduct === -1) return "Product not found"
            carrito.products.splice(indexProduct,1)
            return "Success"
        }else{
            return "Cart not found"
        }
    }

    updateCart(id,data){
        const carrito = this.carritos.find(c=> c.id == id)
        if(carrito){
            carrito.products = data
            return "Success"
        }else{
            return "Cart not found"
        }
    }

    updateQuantityProductsCart(cid,pid,cantidad){
         const carrito = this.carritos.find(c => c.id == cid)
         if(carrito){
            const productoEnCarrito = carrito.products.findIndex(p => p.id == pid)
            if(productoEnCarrito !== -1){
                const product = carrito.products[productoEnCarrito]
                product.quantity = cantidad
                return "Success"
            }else{ 
                return "Product not found"
            }
         }else{ 
            return "Cart not found"
         }
    }

    deleteProductsCart(cid){
        const carrito = this.carritos.find(c => c.id == cid)
        if(carrito){
            carrito.products = []
            return "Success"
        }else{
            return "Cart not found"
        }
    }
}