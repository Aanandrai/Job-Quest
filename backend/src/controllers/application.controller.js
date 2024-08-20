import { Job } from "../models/job.model.js";
import {Application} from "../models/application.model.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const applyJob=asyncHandler(async(req,res)=>{
    const userId=req.user

    const jobId=req.params.id 

    if(!jobId){
        throw new ApiError(404, "Job Id not found")
    }

    // check user already applied or not 
    const existingApplication=await Application.findOne({job:jobId, applicant:userId})

    if(existingApplication){
        throw new ApiError(400, "User Already Applied to this job")
    }

    // const job=await Job.findById(jobId)
    // if(!job){
    //     throw new ApiError(404, "Job not found")
    // }

    const newApplication=await Application.create({
        job:jobId ,
        applicant:userId

    })

    const job=await Job.findByIdAndUpdate(
        jobId,
        {$push: {applications:newApplication._id}},
        {new:true}
    )
    if(!job){
        throw new ApiError(404, "Job not found")
    }

    // job.applications.push(newApplication._id)
    // await job.save()

    return res.status(200).json(new ApiResponse(200, job,"Successfully create from job"))
})

export const getAppliedJobs=asyncHandler(async(req,res)=>{
    const userId=req.user

    const applications=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}}
        }
    })

    return res.status(200).json(new ApiResponse(200, applications,"geting applications success"))
})


export const getApplicants=asyncHandler(async(req,res)=>{
    const jobId=req.params.id

    const job=await Job.findById(jobId).populate({
        path:'applications',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'applicant'
        }
    })

    if(!job){
        throw new ApiError(404,"No job found")
    }

    return res.status(200).json(new ApiResponse(200, job, "get job success"))
})



export const updateStatus=asyncHandler(async(req,res)=>{
    const {status}=req.body 
    const applicationId=req.params.id 

    if(!status){
        throw new ApiError(400, "Status is required")
    }

    const application = await Application.findById(applicationId)

    if(!application){
        throw new ApiError(404, "This application does not exist")
    }

    application.status=status.toLowerCase()
    application.save()

    return res.status(200).json(new ApiResponse(200, application, "updated status success"))


})