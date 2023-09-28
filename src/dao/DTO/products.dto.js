export class ProductsDTO{
    constructor(product){  
      this.title = product.title.toUpperCase(),
      this.description = product.description
      this.code = "#"+product.code
      this.price = product.price
      this.status = product.status
      this.stock =  product.stock
      this.category = product.category.toUpperCase()
      this.thumbnail = product.thumbnail
      this.quantity = product.quantity
    }
}