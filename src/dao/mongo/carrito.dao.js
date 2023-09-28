import {CARTS_MODEL} from "./models/carts.js"
import {PRODUCTS_MODEL} from "./models/products.js"

export class CarritoMongoDao{

    async getCartById(id){
        return await CARTS_MODEL.findById(id).lean({})
    }

    async saveCart(cart){
       return await CARTS_MODEL.create(cart) 
    }

   async saveProductCart(cid,pid){
        let carrito = await CARTS_MODEL.findById(cid)
        const productoEnCarrito = carrito.products.find(product => product.product.id === pid);
        if (carrito) {
            if (productoEnCarrito) {
                const product = await PRODUCTS_MODEL.findById(pid)
                product.quantity++
                let result = await product.save()
                return result
            } else { 
                const product = await PRODUCTS_MODEL.findById(pid)
                product.quantity = 1
                let result = await product.save()
                carrito.products.push({
                    product: product.id,
                });
            }
            const result = await carrito.save();
            return result
        } else {
            return "Cart not found";
        }
    }

    async deleteProductCart(cid,pid){
            const carrito = await CARTS_MODEL.findById(cid)
            const indexProduct = carrito.products.findIndex(p=> p.product.id == pid)
            if(indexProduct !== -1){
                carrito.products.splice(indexProduct,1)
                await carrito.save()
                return carrito
            }else{
                return "Cart not found"
            }
    }

    async updateCart(id,data){
        const carrito = await CARTS_MODEL.findById(id)
        if(carrito){
            carrito.products = data
            carrito.save()
            return carrito
        }else{
            return "Cart not found"
        }
    }

    async updateQuantityProductsCart(cid,pid,quantity){
             const carrito = await CARTS_MODEL.findById(cid)
             const productoEnCarrito = carrito.products.findIndex(c => c.product.id === pid)
             if(carrito){
                if(productoEnCarrito !== -1){
                    const product = await PRODUCTS_MODEL.findById(pid)
                    product.quantity = quantity
                    await product.save()
                    return carrito
                 }else{
                    return "Product not found"
                 }
             }else{
                return "Cart not found"
             }
    }

    async deleteProductsCart(cid){
         const carrito = await CARTS_MODEL.findById(cid)
         if(carrito){
            carrito.products = []
            await carrito.save()
            return carrito
         }else{
            return "Cart not found"
         }
    }
}
