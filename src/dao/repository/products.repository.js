import { ProductsDTO } from "../DTO/products.dto.js"

export class ProductsRepository{
    constructor(dao){
        this.dao = dao
    }

    async getProducts(req,res){
        return await this.dao.getProducts(req,res)
    }

    async getProductById(id){
        return await this.dao.getProductById(id)
    }

    async saveProduct(product){
        const productDto = new ProductsDTO(product)
        return await this.dao.saveProduct(productDto)
    }

    async modifyProduct(pid,product){
        const productDto = new ProductsDTO(product)
        productDto._id = !isNaN(pid) ? +pid : pid
        return await this.dao.modifyProduct(pid,productDto);
    }

    async deleteProduct(pid){
        return await this.dao.deleteProduct(pid)
    }

    async modifyStockProduct(pid){
        return await this.dao.modifyStockProduct(pid)
    }
}