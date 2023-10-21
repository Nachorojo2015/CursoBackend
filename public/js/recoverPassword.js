const mail = document.getElementById("mail")
const botonMail = document.getElementById("boton-mail")

botonMail.addEventListener("click",()=>{
        fetch("/recovePassword",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({mail: mail.value})
     }).then(data=>console.log(data))
    .catch(err=>console.log(err))
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Correo Enviado',
        showConfirmButton: false,
        timer: 1500
      })
})