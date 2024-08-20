import express from "express"
import { getAllCompany, getCompanyById, registerCompany, updateCompanyDetails } from "../controllers/company.controller.js"
import { isAuthenticated ,isAuthorized} from "../middlewares/auth.middleware.js"


const router=express.Router()

router.route("/register")
    .post(isAuthenticated,isAuthorized("recruiter"),registerCompany)

router.route("/getAll")
    .get(isAuthenticated,isAuthorized("recruiter"),getAllCompany)

router.route("/get/:id")
    .get(isAuthenticated, isAuthorized("recruiter"),getCompanyById)

router.route("/update/:id")
    .put(isAuthenticated, isAuthorized("recruiter"),updateCompanyDetails)

export default router