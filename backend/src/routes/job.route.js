import express from "express"
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js"
import { getAllJobs, getAllJobsByRecruiter, getJobById, postJob } from "../controllers/job.controller.js"

const router=express.Router()


router.route("/post")
    .post(isAuthenticated,isAuthorized("recruiter"), postJob)


router.route("/get")
    .get(isAuthenticated,getAllJobs)


router.route("/getAllRecruiterJob")
    .get(isAuthenticated,isAuthorized("recruiter"), getAllJobsByRecruiter)


router.route("/get/:id")
    .get(isAuthenticated,getJobById)


export default router