import { USER_DAO } from "../dao/index.js";
import { UsersRepository } from "../dao/repository/users.repository.js";
import { CustomErrors } from "../services/errors/customErrors.js";
import { Errors } from "../services/errors/errors.js";
import { LOGGER } from "../dao/index.js";
import { __dirname } from "../utils.js";
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
          user.role = "premium" 
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
export {changeRoleUser, uploadImage}