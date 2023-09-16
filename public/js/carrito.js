let botonesEliminar = document.querySelectorAll("button")
    botonesEliminar.forEach(function(boton){
        boton.addEventListener("click",eliminarDelCarrito)
    })

   async function eliminarDelCarrito(e){
      const idProducto = e.target.id
      const currentURL = window.location.href;
      const parts = currentURL.split('/');
      const idCarrito = parts[parts.length - 1];
      console.log(idProducto)
      try {
        // Realiza una solicitud de eliminación al servidor usando Fetch API
        const response = await fetch(`/carrito/${idCarrito}/products/${idProducto}`, {
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
      const currentURL = window.location.href;
      const parts = currentURL.split('/');
      const idCarrito = parts[parts.length - 1];
       try {
        const response = await fetch(`/carrito/${idCarrito}`, {
            method: "DELETE",
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            location.reload()
        } else {
            console.error("Error al vaciar el carrito");
        }
    } catch (error) {
        console.error("Error de red:", error);
    }
    }