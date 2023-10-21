const newPassword = document.getElementById("new-password")
const botonPassword = document.getElementById("boton-password")

const loc = window.location.href.split("/")[0]

botonPassword.addEventListener("click",async()=>{
   const response = await fetch("/replace",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({pass: newPassword.value})
    })

    const data = await response.json()

    if(data.status === "error"){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Contraseña en uso',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Contraseña cambiada',
            showConfirmButton: false,
            timer: 1500
          })
            setTimeout(()=>{
            window.location.href = loc + "/"
            },1000)
    } 
})