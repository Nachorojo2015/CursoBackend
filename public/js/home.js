let carrito = document.getElementById("id-carrito").href.split("/")[5]

let buttons = document.querySelectorAll("button")
let botonCerrarSesion = document.getElementById("cerrarSesion")

buttons.forEach((button)=>{
    button.addEventListener('click',(agregarAlCarrito))
})

function agregarAlCarrito(e){
   const pid = e.target.id
   fetch(`/carrito/${carrito}/product/${pid}`, {
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

botonCerrarSesion.addEventListener("click",async(e)=>{
   e.preventDefault()
   let response = await fetch("/logout")
   let data = await response.json()
   setTimeout(()=>{
      window.location.href = "http://localhost:8080"
   },2000)
   console.log(data)
})

