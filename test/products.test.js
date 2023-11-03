import chai from "chai"
import supertest from "supertest"
import mongoose from "mongoose"
const expect = chai.expect
const requester = supertest(`http://localhost:PORT`)
mongoose.connect("URL DE MONGO");
let idProduct = ""
describe("Test de los endpoints de la ruta products",()=>{
    describe("/products GET", () => {
        it("Deberia listar todos los productos", async() => {
           const {statusCode,ok,_body} = await requester.get("/products").send()
           expect(statusCode).to.be.equal(200)
           expect(ok).to.be.true
           expect(_body.products.docs).to.be.an("array")
        })
    })
    describe("/products POST",()=>{
        it("Deberia crear un producto" ,async()=>{
            let code = ""
            const lettersCode = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
            for(let i = 0; i<5; i++){
              code += lettersCode[Math.floor(Math.random()*lettersCode.length)]
            }
            const product = {
                  title: "Bajo",
                  description: "Bajo 4 cuerdas",
                  code,
                  price : Math.round(Math.random()*100+1),
                  status : true,
                  stock : Math.round(Math.random()*10+1),
                  category: "Music",
                  thumbnail: "https://bairesrocks.vteximg.com.br/arquivos/ids/225690/gsr180bk.jpg?v=637564271444530000",
                  quantity : 1,
            }
            const {statusCode,ok,_body} = await requester.post("/products").send(product)
            idProduct = _body.result._id
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body.result).to.have.property("_id")
          })
    })
    describe("/products/:pid DELETE",()=>{
        it("Deberia eliminar el producto con el pid correspondiente", async()=>{
            const {statusCode,ok,_body} = await requester.delete(`/products/${idProduct}`)
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body.result).to.be.an("object").and.property("_id").to.be.equal(idProduct)
        })
    })
})