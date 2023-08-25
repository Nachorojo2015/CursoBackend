let form = document.getElementById("signupForm")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let name = document.getElementById("name").value
    let last_name = document.getElementById("last_name").value
    let email = document.getElementById("mail").value
    let user = document.getElementById("user").value
    let password = document.getElementById("password").value
    signup(name,last_name,email,user,password).then(data=>console.log(data))
})

const signup = async (name,last_name,email,user,password)=>{
    const response = await fetch("/register",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name,last_name,email,user,password})
    })
    const data = response.json()
    return data
}