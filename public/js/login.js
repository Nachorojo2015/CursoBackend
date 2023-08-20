let form = document.getElementById("loginForm")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let mail = document.getElementById("mail").value
    let password = document.getElementById("password").value
    console.log(mail,password)
    login(mail,password)
})

const login = async (mail,password)=>{
    const response = await fetch("/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({mail,password})
    })
    const data = await response.json()
    console.log(data)
    if(data.status === "OK"){
        setTimeout(()=>{
            window.location.href = "http://localhost:8080/views"
         },2000)
    }else{
        alert("Usuario no válido")
    }
}