const socket = io()

socket.emit("connection","nuevo cliente conectado")

socket.on("update-products",(data)=>{
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
          <button type="button" class="btn btn-danger" id='${producto.id}'>
          Eliminar Producto
          </button>
        </div>
      </div>`
      container.append(newDiv)
      let botonEliminar = document.getElementById(`${producto.id}`)
      botonEliminar.addEventListener("click",borrarProducto)
    })
})

let formAgregar = document.getElementById('productForm')

formAgregar.addEventListener('submit',(e)=>{
    e.preventDefault()
    let name = document.getElementById('nombre').value
    let descripcion = document.getElementById('descripcion').value
    let codigo = document.getElementById('codigo').value
    let precio = document.getElementById('precio').value
    let stock = document.getElementById('stock').value
    let categoria = document.getElementById('categoria').value
    let rutas = document.getElementById('rutas').value
    if(!name || !descripcion || !codigo || !precio || !stock || !categoria || !rutas){
        console.log(new Error("Faltan datos"))
    }else{
        let producto = {
           title : name,
           description : descripcion,
           code : codigo,
           price : precio,
           status : true,
           stock : stock,
           category : categoria,
           thumbnail : rutas
        }
        socket.emit("new-product",producto)
        console.log("Productos agregado")
    }
})

function borrarProducto(e){
    let id = e.target.id
    socket.emit("delete-product",+id)
}


