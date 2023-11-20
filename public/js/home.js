let carrito = document.getElementById("id-carrito").href.split("/")[5]
const emailUser = document.querySelector("h1").id
const rolUser = document.querySelector("b").id

const loc = window.location.href.split(":")

let buttons = document.querySelectorAll("button")
let botonCerrarSesion = document.getElementById("cerrarSesion")

buttons.forEach((button)=>{
    button.addEventListener('click',agregarAlCarrito)
})

async function agregarAlCarrito(e){
   if(rolUser === "admin"){
      Swal.fire({
         position: 'top-end',
         icon: 'error',
         title: 'No podes comprar productos como administrador',
         showConfirmButton: false,
         timer: 1500
       })
   }else{
      const pid = e.target.id 
      const response = await fetch(`/products/${pid}`)
      const dates = await response.json()
      const product = dates.product
      console.log(emailUser)
      console.log(product.owner)
      if(product.owner === emailUser && rolUser === "premium"){
         Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'No podes comprar tus propios productos',
            showConfirmButton: false,
            timer: 1500
          })
      }else{
         if(product.stock <= 0){
            Swal.fire({
               position: 'top-end',
               icon: 'error',
               title: 'Producto sin stock',
               showConfirmButton: false,
               timer: 1500
             })
         }else{
            fetch(`/carts/${carrito}/product/${pid}`, {
               method: 'POST',
             })
            .then(response => response.json())
            .then(data => {
               Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   title: 'Producto agregado correctamente',
                   showConfirmButton: false,
                   timer: 1500
                 })
            })
            .catch(error => {
               console.log('Error:', error);
            });
           }
      }
   }
}

botonCerrarSesion.addEventListener("click",async(e)=>{
   e.preventDefault()
   let response = await fetch("/logout",{
      method: "POST",
      headers:{
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:emailUser})
   })
   let data = await response.json()
   setTimeout(()=>{
      window.location.href = loc[0]+":"+loc[1]+":"+loc[2].split("/")[0]
   },2000)
   console.log(data)
})

