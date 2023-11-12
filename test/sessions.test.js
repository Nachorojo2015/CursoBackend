import chai from "chai"
import supertest from "supertest"
import mongoose from "mongoose"

const expect = chai.expect
const requester = supertest(`http://localhost:PORT`)
mongoose.connect("URL DE MONGO");
let emailUser = ""
let passwordUser = ""
describe("Tests de los endpoints de la ruta sessions",()=>{
    describe("/register POST",()=>{
        it("Debe registrar un usuario",async()=>{
            const randomNumber = Math.round(Math.random()*100)
            emailUser = `juan${randomNumber}@gmail.com`
            passwordUser = (Math.floor(Math.random()*100000)).toString()
            const usuario = {
                first_name:"Juan",
                last_name:"Gonzalez",
                email: emailUser,
                age: Math.floor(Math.random()*50),
                password: passwordUser
            }
            const {statusCode,ok,_body} = await requester.post("/register").send(usuario)
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body.status).to.be.equal("success")
        })
    })
    describe("/login POST",()=>{
        it("Deberia loguear al usuario",async()=>{
            const user = {
                email: emailUser,
                password: passwordUser
            }
            const {statusCode,ok,_body} = await requester.post("/login").send(user)
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body.status).to.be.equal("success")
        })
    })
    describe("/logout GET",()=>{
        it("Deberia cerrar la sesión del usuario",async()=>{
            const {statusCode,ok,_body} = await requester.get("/logout").send()
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            expect(_body.message).to.be.equal("Sesión cerrada")
        })
    })
})