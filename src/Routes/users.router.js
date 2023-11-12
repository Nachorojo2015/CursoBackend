import { Router } from "express";
import { changeRoleUser, uploadImage } from "../Controller/users.controller.js";
import multer from "multer";

const upload = multer({dest: "../public/images/"})

const usersRouter = Router()

usersRouter.get("/premium/:uid",changeRoleUser)
usersRouter.post("/:uid/documents",upload.any(),uploadImage)

export {usersRouter}