const users = document.getElementById("users")

users.addEventListener("click",async()=>{
    const response = await fetch("/api/users/")
    const users = await response.json()
    const container = document.getElementById("container")
    container.innerHTML = ""
    users.users.forEach(user=>{
        if(user.rol !== "admin"){
        let userDiv = document.createElement('div')
        userDiv.innerHTML += `
        <p><b>Fullname</b>: ${user.fullname}</p>
        <p><b>Email</b>: ${user.email}</p>
        <p><b>Rol</b>: ${user.rol}</p>
        <p><b>Age</b>: ${user.age}</p>
        <button class="btn btn-success" id=m-${user.id}>Modificar rol del usuario</button>
        <button class="btn btn-danger" id=e-${user.id}>Eliminar usuario</button>
        `
        container.appendChild(userDiv)
        document.getElementById(`m-${user.id}`).addEventListener("click",modifyUser)
        document.getElementById(`e-${user.id}`).addEventListener("click",deleteUser)
        }
    })
})

async function modifyUser(e){
   const idUser = e.target.id.split("-")[1]
   const response = await fetch(`/api/users/premium/${idUser}/`)
   setTimeout(()=>{
    location.reload()
   },1000)
}

async function deleteUser(e){
   const idUser = e.target.id.split("-")[1]
   const response = await fetch(`/api/users/${idUser}/`,{
    method: "DELETE"
   })
   const data = await response.json()
   if(data.status === "Success"){
     alert("Usuario borrado con exito!")
   }else{
     alert("Error al eliminar usuario")
   }
   setTimeout(()=>{
    location.reload()
},1000)
}