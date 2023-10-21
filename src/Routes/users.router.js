import { Router } from "express";
import { changeRoleUser } from "../Controller/users.controller.js";

const usersRouter = Router()

usersRouter.get("/premium/:uid",changeRoleUser)

export {usersRouter}