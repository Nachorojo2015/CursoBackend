function getMessages(req,res){
    res.render("chat",{title:"Chat", script: "chat.js", style: "chat.css"})
}

export {getMessages}