import { Router } from "express";
import { changeRoleUser, uploadImage, getUsers, deleteUsers, deleteUser } from "../Controller/users.controller.js";
import multer from "multer";

const upload = multer({dest: "../public/images/"})

const usersRouter = Router()

usersRouter.get("/premium/:uid",changeRoleUser)
usersRouter.post("/:uid/documents",upload.any(),uploadImage)
usersRouter.get("/",getUsers)
usersRouter.delete("/",deleteUsers)
usersRouter.delete("/:uid",deleteUser)

export {usersRouter}