import CartsModel from "./models/carts.js"
import ProductsModel from "./models/products.js"

export default class CarritoDao{

    async getCarts(){
        try{
            return await CartsModel.find({})
        }catch(err){
            console.log(err)
        }
    }

    async getCartById(id){
        try{
            return await CartsModel.findById(id).lean({})
        }catch(err){
            console.log(err)
        }
    }

    async saveCart(cart){
        try{
            return await CartsModel.create(cart)
        }catch(err){
            console.log(err)
        }
    }

   async saveProductCart(id,pid){
      try{
        let carrito = await CartsModel.findById(id)
        const productoEnCarrito = carrito.products.find(product => product.product.id == pid);
        if (carrito) {
            if (productoEnCarrito) {
                const product = await ProductsModel.findById(pid)
                product.quantity++
                let result = await product.save()
                return "Success"
            } else { 
                const product = await ProductsModel.findById(pid)
                product.quantity = 1
                let result = await product.save()
                carrito.products.push({
                    product: product.id,
                });
            }
            const result = await carrito.save();
            return "Success"
        } else {
            return "Cart not found";
        }
      }catch(err){
        console.log(err)
      }
    }

    async deleteProductCart(cid,pid){
        try{
            const carrito = await CartsModel.findById(cid)
            const indexProduct = carrito.products.findIndex(p=> p.product.id == pid)
            if(indexProduct !== -1){
                carrito.products.splice(indexProduct,1)
                await carrito.save()
                return "Success"
            }else{
                return "Cart not found"
            }
        }catch(err){
            console.log(err)
        }
    }

    async updateCart(id,data){
       try{
        const carrito = await CartsModel.findById(id)
        if(carrito){
            carrito.products = data
            carrito.save()
            return "Success"
        }else{
            return "Cart not found"
        }
       }catch(err){
        console.log(err)
       }
    }

    async updateQuantityProductsCart(cid,pid,cantidad){
        try{
             const carrito = await CartsModel.findById(cid)
             const productoEnCarrito = carrito.products.findIndex(c => c.product.id == pid)
             if(carrito){
                if(productoEnCarrito !== -1){
                    const product = await ProductsModel.findById(pid)
                    product.quantity = cantidad
                    await product.save()
                    return "Success"
                 }else{
                    return "Product not found"
                 }
             }else{
                return "Cart not found"
             }
        }catch(err){
            console.log(err)
        }
    }

    async deleteProductsCart(cid){
         try{
         const carrito = await CartsModel.findById(cid)
         if(carrito){
            carrito.products = []
            await carrito.save()
            return "Success"
         }else{
            return "Cart not found"
         }
         }catch(err){
            console.log(err)
         }
    }
}
