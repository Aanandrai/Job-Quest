import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {Job} from "../models/job.model.js"


// for recruiter 
export const postJob=asyncHandler(async(req,res)=>{
    const {title, description , requirements, salary, location, jobType, experience,position, companyId}=req.body 

    const userId=req.user

    if(
        [title,description , requirements, salary, location, jobType, experience,position, companyId].some((field)=>
        field?.trim()=="" || field?.trim()==undefined)
    ){
        throw new ApiError(400, "All Fields are required")
    }

    const job=new Job({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location,
        jobType,
        experienceLevel:experience,
        position,
        company:companyId,
        createdBy:userId
    })

    

    job.save()

    return res.status(201).json(new ApiResponse(201, job , "Job is created successfully"))

})

// for student 
export const getAllJobs=asyncHandler(async(req,res)=>{
    const keyword=req.query.keyword || ""

    const query={
        $or:[
            {title:{$regex:keyword, $options:"i"}},
            {description:{$regex:keyword, $options:"i"}}
        ]
    }


    const jobs=await Job.find(query).populate({
        path:"company"
    }).sort({createdAt:-1})
    
    if(!jobs){
        throw new ApiError(404 , "Job not found")
        }

    return res.status(200).json(new ApiResponse(200,jobs,"geting job successfully"))


})

// for student 
export const getJobById=asyncHandler(async(req,res)=>{
    const jobId=req.params.id 

    const job=await Job.findById(jobId)

    if(!job){
        throw new ApiError(404, "Job with this Id not Found")
    }

    return res.status(200).json(new ApiResponse(200, job, "Get job by Id success"))
})

// for recruiter 
export const getAllJobsByRecruiter=asyncHandler(async(req,res)=>{
    const userId=req.user

    const jobs=await Job.find({createdBy:userId})

    if(!jobs){
        throw new ApiError(404, "NO job found")
    }

    return res.status(200).json(new ApiResponse(200,jobs,"geting Job successfuly"))
})