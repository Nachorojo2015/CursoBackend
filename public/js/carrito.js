const cart = document.querySelector("h1").className
const email = document.querySelector("h1").id
console.log(cart,email)
let botonesEliminar = document.getElementsByClassName("products")
    for(let i = 0; i<botonesEliminar.length; i++){
        botonesEliminar[i].addEventListener("click",eliminarDelCarrito)
    }

let formComprar = document.getElementById("comprar")

const totalProducts = [] 

async function getProductById(){
        for(let i = 0; i<botonesEliminar.length; i++){
            try{
              const response = await fetch(`/products/${botonesEliminar[i].id}`)
              const products = await response.json()
              totalProducts.push(products.product)
            }catch(err){
                console.log(err)
            }
        }  
}

getProductById()

console.log(totalProducts)

   async function eliminarDelCarrito(e){
      const idProducto = e.target.id
      const idCarrito = cart
      try {
        // Realiza una solicitud de eliminación al servidor usando Fetch API
        const response = await fetch(`/carts/${idCarrito}/products/${idProducto}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            location.reload()
        } else {
            console.error("Error al eliminar el producto del carrito");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
    }
    let botonVaciar = document.getElementById('vaciar')
    botonVaciar.addEventListener("click",vaciarCarrito)
    
   async function vaciarCarrito(){
      const idCarrito = cart
       try {
        const response = await fetch(`/carts/${idCarrito}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
        } else {
            console.error("Error al vaciar el carrito");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
    }

formComprar.addEventListener("submit",async(e)=>{
    e.preventDefault()
    try{
        totalProducts.forEach(async product=>{
            const response = await fetch(`/products/stock/${product._id}`,{
                 method: "PUT"
             })
            const dataM = await response.json()
            console.log(dataM)
         })
           const code = generateRandomPurchaseCode(10)
           const totalAmount = totalProducts.reduce((acc,product)=>acc+product.price*product.quantity,0)
           const idCarrito = cart
           const response = await fetch(`/carts/${idCarrito}/purchase`,{
            method: "POST",
            headers:{
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({totalAmount,email,code})
          })
          const data = await response.json()
          console.log(data)
          vaciarCarrito()
          setTimeout(()=>{
            window.location.href = data.links[1].href
          },1000)
    }catch(err){
        console.log(err)
    }
})

function generateRandomPurchaseCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
}
  