import { PRODUCTS_DAO } from "../index.js"

export class CarritoMemoryDao{
    constructor(){
        this.carritos = []
    }

   async getCarts(){
        return this.carritos
    }

   async getCartById(cid){
    const productPromises = this.carritos.find(c => c.id === +cid).products.map(async (p) => {
        const product = await PRODUCTS_DAO.getProductById(p.product);
        return {product: product};
      });
      
      const products = await Promise.all(productPromises);
      
      return { id: this.carritos.find(c => c.id === +cid).id, products };      
    }

   async saveCart(cart){
        this.carritos.push(cart)
        this.carritos.forEach(c=>{
            c.id = this.carritos.indexOf(c)+1
        })
        return cart
    }

   async saveProductCart(cid,pid){
        const carrito = this.carritos.find(c=> c.id === +cid)
        const product = await PRODUCTS_DAO.getProductById(pid)
        if(carrito){
            if(carrito.products.some(p=> p.product === product.id)){
                const productoEnCarrito = carrito.products.find(p => p.product === product._id)
                productoEnCarrito.quantity++
            }else{
                carrito.products.push({product:product._id,quantity:1})
            }
            return carrito
        }else{
            return "Cart not found"
        }
    }

   async deleteProductCart(cid,pid){
        const carrito = this.carritos.find(c=>c.id === +cid)
        if(carrito){
            const indexProduct = carrito.products.findIndex(p=> p.product === +pid)
            if(indexProduct === -1) return "Product not found"
            carrito.products.splice(indexProduct,1)
            return carrito
        }else{
            return "Cart not found"
        }
    }

   async updateCart(cid,data){
        const carrito = this.carritos.find(c=> c.id === +cid)
        if(carrito){
            carrito.products = data
            return carrito
        }else{
            return "Cart not found"
        }
    }

   async updateQuantityProductsCart(cid,pid,quantity){
         const carrito = this.carritos.find(c => c.id === +cid)
         if(carrito){
            const productoEnCarrito = carrito.products.findIndex(p => p.product === +pid)
            if(productoEnCarrito !== -1){
                const product = carrito.products[productoEnCarrito]
                product.quantity = quantity
                return carrito
            }else{ 
                return "Product not found"
            }
         }else{ 
            return "Cart not found"
         }
    }

   async deleteProductsCart(cid){
        const carrito = this.carritos.find(c => c.id === +cid)
        if(carrito){
            carrito.products = []
            return carrito
        }else{
            return "Cart not found"
        }
    }
}