const socket = io()

socket.emit("connection","nuevo cliente conectado")

const emailUser = document.querySelector("h1").id

socket.on("update-products",(data)=>{
    let container = document.getElementById('contenedor')
    container.innerHTML = ""
    data.forEach((producto)=>{
        let newDiv = document.createElement('div')
        if(producto.owner === emailUser){
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
        }else{
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
          </div>
        </div>`
        container.append(newDiv)
        }
    })
})

let formAgregar = document.getElementById('productForm')

formAgregar.addEventListener('submit',(e)=>{
    e.preventDefault()
    const emailUser = document.querySelector("h1").id
    let title = document.getElementById('nombre').value
    let description = document.getElementById('descripcion').value
    let code = document.getElementById('codigo').value
    let price = document.getElementById('precio').value
    let stock = document.getElementById('stock').value
    let category = document.getElementById('categoria').value
    let thumbnail = document.getElementById('rutas').value
    socket.emit("new-product",{title,description,code,price,stock,category,thumbnail,status: true, quantity: 1, owner:emailUser})
  }
)

function borrarProducto(e){
    let id = e.target.id
    socket.emit("delete-product",id)
}


