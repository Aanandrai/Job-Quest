import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/auth.middleware.js"

const router=express.Router()

router.route("/register")
        .post(register)

router.route("/login")
        .post(login)

router.route("/profile/update")
        .put(isAuthenticated ,updateProfile)

router.route("/logout")
        .get(isAuthenticated ,logout)

export default router