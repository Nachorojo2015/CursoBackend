import mongoose from "mongoose";
import chai from "chai";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest(`http://localhost:PORT`)
mongoose.connect("URL DE MONGO");
let idCart = ""
describe("Tests de los endpoints de la ruta carts",()=>{
    describe("/carts POST",()=>{
        it("Deberia crear un carrito",async()=>{
            const {statusCode,ok,_body} = await requester.post("/carts").send()
            idCart = _body.result._id
            expect(statusCode).to.equal(200)
            expect(ok).to.be.true
            expect(_body.result.products).to.be.an("array")
        })
    })
    describe("/carts PUT",()=>{
        it("Deberia modificar un carrito con un arreglo de productos especifico",async()=>{
            const newCart = {
               cart: [{product : "64cd4b4bc22cd4694377995e"},{product : "64d7ec6065148154c140aaa7"}]
            } 
            const {statusCode,ok,_body} = await requester.put(`/carts/${idCart}`).send(newCart)
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body.result.products).to.be.an("array")
            expect(_body.result).to.have.property("_id")
            expect(_body.result._id).to.be.equal(idCart)
        })
    })
    describe("/carts/:cid DELETE",()=>{
        it("Deberia vaciar el carrito que se le pasa como parametro", async () => {
           const {statusCode,ok,_body} = await requester.delete(`/carts/${idCart}`).send()
           expect(statusCode).to.be.equal(200)
           expect(ok).to.be.true
           expect(_body.result.products.length).to.be.equal(0);

        })
    })
})