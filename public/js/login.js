let form = document.getElementById("loginForm")

const loc = window.location.href.split(":")

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let email = document.getElementById("mail").value
    let password = document.getElementById("password").value
    login(email,password)
})

const login = async (email,password)=>{
    const response = await fetch("/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,password})
    })
    const data = await response.json()
    console.log(data)
    if(data.status === "success"){
        setTimeout(()=>{
            window.location.href = loc[0]+":"+loc[1]+":"+loc[2].split("/")[0]+"/views"
         },1000)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
    }
}