let form = document.getElementById("signupForm")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let first_name = document.getElementById("first_name").value
    let last_name = document.getElementById("last_name").value
    let email = document.getElementById("email").value
    let age = parseInt(document.getElementById("age").value)
    let password = document.getElementById("password").value
    register(first_name,last_name,email,age,password)
})

const register = async (first_name,last_name,email,age,password)=>{
    const response = await fetch("/register",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({first_name,last_name,email,age,password})
    })
    const data = await response.json()
    console.log(data)
    if(data.status === "success"){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registrado con exito!',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout(()=>{
            window.location.href = "http://localhost:8080/"
         },2000)
    }
    return data
}