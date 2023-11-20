import { USER_DAO } from "../dao/index.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import { CustomErrors } from "../services/errors/customErrors.js";
import { Errors } from "../services/errors/errors.js";
import { LOGGER } from "../dao/index.js";
import { __dirname } from "../utils.js";
import { transport } from "../mailler/nodemailer.js";
import fs from "fs"
import path from "path"


const userService = new UsersRepository(USER_DAO)

async function changeRoleUser(req,res){
    req.logger = LOGGER 
    const {uid} = req.params
    try{
        const user = await userService.getUserById(uid)
        const filesUser = user.documents.map(d=>d.name)
        if(user.role === "user" && !filesUser.includes("Identification") || !filesUser.includes("proof_of_address") || !filesUser.includes("proof_of_account_status")){
          const error = CustomErrors.generateError({
            name: "User Error",
            message: "Error database",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
        res.json({status: "error", error}) 
        }else{
          user.role = user.role === "premium" ? "user" : "premium"
          const response = await userService.modifyUser(uid,user)
          res.redirect("/")
        }
    }catch(err){ 
        const error = CustomErrors.generateError({
            name: "User Error",
            message: "Error database",
            cause: err,
            code: Errors.DATABASE_ERROR
        })
        req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
        res.json({status: "error", error}) 
    } 
}

async function uploadImage(req,res){
  const files = req.files;
  const {uid} = req.params
  req.logger = LOGGER 

  try{
    const user = await userService.getUserById(uid)

  // Itera sobre los archivos subidos
   files.forEach(async (file) => {
    // Obtén el nombre del archivo sin extensión
    const filenameWithoutExtension = file.fieldname;

    // Determina la carpeta de destino en función del nombre del archivo
    let destinationFolder = '';
    if (filenameWithoutExtension.toLowerCase() === 'profile') {
      destinationFolder = 'profiles';
    } else if (filenameWithoutExtension.toLowerCase() === 'product') {
      destinationFolder = 'products';
    } else {
      destinationFolder = 'documents';
    }
     // Construye la ruta completa de destino
     const destinationPath = path.join(__dirname, '../public/images', destinationFolder);

     // Crea la carpeta de destino si no existe
     if (!fs.existsSync(destinationPath)) {
       fs.mkdirSync(destinationPath, { recursive: true }); 
     }
 
     // Mueve el archivo a la carpeta de destino
     const newFilePath = path.join(destinationPath, file.originalname);
     fs.renameSync(file.path, newFilePath);

     //Filas del usuario
     user.documents.push(({name:file.originalname.split(".")[0],reference: newFilePath}))
  });

  const response = await userService.modifyUser(uid,user)

  console.log(user.documents.map(d=>d.name))

  res.json({status: "Success", message: "Files updated", response});
  }catch(err){
    const error = CustomErrors.generateError({
      name: "User Error",
      message: "Error database",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error}) 
  }
} 

async function getUsers(req,res){
  try{
     const users = await userService.getUsers()
     res.json({status: "Success",users: users.map(user=>({fullname: user.fullname, email: user.email, rol: user.role, age: user.age, id:user.id}))})
  }catch(err){
    const error = CustomErrors.generateError({
      name: "User Error",
      message: "Error database",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error}) 
  }
}

async function deleteUsers(req,res){
  try{
     const users = await userService.getUsers()
     for(let i = 0; i<users.length; i++){
      const timeDiff = Math.abs(new Date().getTime() - users[i].last_connection.getTime());
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if(daysDiff >= 2){
        await transport.sendMail({
          from: "Account deleted <coder123@gmail.com>", 
          to: users[i].email,
          subject: "User Account Deleted",
          headers: {
              'Expiry-Date': new Date(Date.now() + 3600 * 1000).toUTCString()
          },
          html:`<h1>Tu cuenta ha sido eliminada por inactividad</h1>`
         })
         await userService.deleteUser(users[i].id)
      }
     }
     res.json({status: "Success", users})
  }catch(err){
    const error = CustomErrors.generateError({
      name: "User Error",
      message: "Error database",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error}) 
  }
}

async function deleteUser(req,res){
  const {uid} = req.params
  try{
     const response = await userService.deleteUser(uid)
     res.json({status: "Success", response})
  }catch(err){
    const error = CustomErrors.generateError({
      name: "User Error",
      message: "Error database",
      cause: err,
      code: Errors.DATABASE_ERROR
  })
  req.logger.error("Error " + JSON.stringify(error) + " " + new Date().toDateString())
  res.json({status: "error", error}) 
  }
}
export {changeRoleUser, uploadImage, getUsers, deleteUsers, deleteUser}