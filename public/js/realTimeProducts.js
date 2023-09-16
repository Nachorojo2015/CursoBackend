const socket = io()

socket.emit("connection","nuevo cliente conectado")

socket.on("update-products",(data)=>{
  console.log(data)
    let container = document.getElementById('contenedor')
    container.innerHTML = ""
    data.forEach((producto)=>{
        let newDiv = document.createElement('div')
        newDiv.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${producto.thumbnail}" className="card-img-top" alt="${producto.title}">
        <div class="card-body">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text">${producto.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${producto.code}</li>
          <li class="list-group-item">${producto.price}</li>
          <li class="list-group-item">Stock: ${producto.stock}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">${producto.status}</a>
          <a href="#" class="card-link">${producto.category}</a>
          <button type="button" class="btn btn-danger" id='${producto._id}'>
          Eliminar Producto
          </button>
        </div>
      </div>`
      container.append(newDiv)
      let botonEliminar = document.getElementById(`${producto._id}`)
      botonEliminar.addEventListener("click",borrarProducto)
    })
})

let formAgregar = document.getElementById('productForm')

formAgregar.addEventListener('submit',(e)=>{
    e.preventDefault()
    let title = document.getElementById('nombre').value
    let description = document.getElementById('descripcion').value
    let code = document.getElementById('codigo').value
    let price = document.getElementById('precio').value
    let stock = document.getElementById('stock').value
    let category = document.getElementById('categoria').value
    let thumbnail = document.getElementById('rutas').value
    fetch("/productos/agregarProducto",{
      method : "POST",
      headers : {
          "Content-Type" : "application/json",
      },
      body : JSON.stringify({title,description,code,price,stock,category,thumbnail})
  })
    socket.emit("new-product",{title,description,code,price,stock,category,thumbnail})
    location.reload()
  }
)

function borrarProducto(e){
    let id = e.target.id
    socket.emit("delete-product",id)
    location.reload()
}


