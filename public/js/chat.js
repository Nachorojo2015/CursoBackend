// import MessagesModel from "../../src/dao/models/messages.js";
const socket = io()


socket.emit("connection","Nuevo cliente")

let user;

Swal.fire({
    title: 'Submit your Github username',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Look up',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: `${result.value.login}'s avatar`,
        imageUrl: result.value.avatar_url
      })
      user = result.value.login
    }
})

let chatBox = document.getElementById('chatBox')

chatBox.addEventListener('keyup',(e)=>{
    if(e.key === "Enter"){
        let mensaje = chatBox.value
        let contenedorMensajes = document.getElementById('contenedorMensajes')
        let newDiv = document.createElement('div')
        newDiv.innerHTML = ` 
        <div>
        <p><b>${user}</b></p>
        <p>${mensaje}</p>
        </div>
        `
        socket.emit("guardar-mensaje",{user: user, message: mensaje})
        contenedorMensajes.append(newDiv)
        chatBox.value = ""
    }
})

socket.on("enviar-mensajes",(data)=>{
    let contenedorMensajes = document.getElementById('contenedorMensajes')
    contenedorMensajes.innerHTML = ""
    data.forEach((mensaje)=>{
        let newDiv = document.createElement('div')
        newDiv.innerHTML =  ` 
        <div>
        <p><b>${mensaje.user}</b></p>
        <p>${mensaje.message}</p>
        </div>
        `
        contenedorMensajes.append(newDiv)
    })
    socket.emit("Nuevos-mensajes",data.length)
})

