import fs from "fs"


class ProductManager{
    constructor(path){
        this.path = path
        if(!fs.existsSync(this.path)){
            fs.writeFileSync(this.path,JSON.stringify([]))
        }
    }

    static id = 0

   async addProduct(product){
        try{
            if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
                throw new Error("Todos los campos deben ser obligatorios")
            }else{
                ProductManager.id++
                product.id = ProductManager.id
            }
            let arrProductos = fs.readFileSync(this.path,"utf-8")
            let productos = JSON.parse(arrProductos)
            productos.push(product)
            fs.writeFileSync(this.path,JSON.stringify(productos))
            console.log("Producto agregado")
        }catch(error){
            console.log(error)
        }
    }

    async getProductos(){
        try{
        let arrProductos = await fs.promises.readFile(this.path,"utf-8")
        let productos = JSON.parse(arrProductos)
        return productos
        }catch(error){
            return error
        }
    }

    async getProductById(id){
        try{
            let arrProductos = await fs.promises.readFile(this.path,"utf-8")
            let productos = JSON.parse(arrProductos)
            return productos.find((product)=>product.id===id) || "Not found"
            }catch(error){
            return error
        }
    }

    async updateProduct(id,campo,dato){
        try{
            let arrProductos = await fs.promises.readFile(this.path,"utf-8")
            let productos = JSON.parse(arrProductos)
            let productoIndice = productos.findIndex((product)=>product.id===id)
            if(productoIndice === -1){
                return new Error("Producto no encontrado")
            }else{
               productos[productoIndice][campo] = dato
               await fs.promises.writeFile(this.path,JSON.stringify(productos))
            }
            }catch(error){
            return error
        }
    }

    async deleteProduct(id){
        try{
        let arrProductos = await fs.promises.readFile(this.path,"utf-8")
        let productos = JSON.parse(arrProductos)
        let producto = productos.find((product)=>product.id===id)
        if(producto == undefined){
           console.log(new Error("Producto no encontrado"))
        }else{
            let newProductos = productos.filter((product)=>product.id!==producto.id)
            await fs.promises.writeFile(this.path,JSON.stringify(newProductos))
            console.log("Producto eliminado")
        }
        }catch(error){
            console.log(error)
        }
    }
}

const ListaProductos = new ProductManager("productos.json")

let producto1 = {
    title : "Pantalon Nike",
    description : "Pantalon largo marca Nike",
    price : 1000,
    thumbnail : "https://essential.vtexassets.com/arquivos/ids/600520-800-auto?v=637955828988530000&width=800&height=auto&aspect=true",
    code : "PANTALON001",
    stock : 10,
}

let producto2 = {
    title : "Buzo ESSENTIALS",
    description : "Buzo gris marca ESSENTIALS",
    price : 2000,
    thumbnail : "https://essentialhoodie.net/wp-content/uploads/2022/04/ESSENTIALS-Men-Women-Oversize-Hoodie-1.jpg",
    code : "BUZO001",
    stock : 5
}

let producto3 = {
    title : "Remera Oversize",
    description : "Remera blanca oversize marca ESSENTIALS",
    price : 1500,
    thumbnail : "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/932/403/products/frente-white1-f2196ca3356c8e08cf16665272473427-640-0.png",
    code : "REMERA001",
    stock : 9
}

ListaProductos.addProduct(producto1)
ListaProductos.addProduct(producto2)
ListaProductos.addProduct(producto3)
// ListaProductos.getProductos()
// .then((data)=>console.log(data))
// .catch((error)=>console.log(error))
// ListaProductos.getProductById(2)
// .then((data)=>console.log(data))
// .catch((error)=>console.log(error))
// ListaProductos.updateProduct(1,"title","Pulover")
// ListaProductos.deleteProduct(1)

export default ProductManager