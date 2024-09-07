import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.js"

const router=express.Router()

router.route("/register")
        .post(upload.fields(
                [{
                    name:"file",
                    maxcount:1
                }]
            ), register)

router.route("/login")
        .post(login)

router.route("/profile/update")
        .put(isAuthenticated, upload.fields(
                [{
                    name:"file",
                    maxcount:1
                }]
            ) , updateProfile)

router.route("/logout")
        .get(isAuthenticated ,logout)

export default router