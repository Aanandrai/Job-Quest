import {Company} from "../models/company.model.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const registerCompany=asyncHandler(async(req,res)=>{
    const {companyName}=req.body 

    if(!companyName){
        throw new ApiError(400, "Company Name can't be empty")
    }

    const company=await Company.findOne({name:companyName})

    if(company){
        throw new ApiError(400, "This company already exist")
    }

    const newCompany=new Company({
        companyName:companyName,
        userId:req.user
    })

    newCompany.save()

    return res.status(201).json(new ApiResponse(201, newCompany ,"Company is registered successfully"))
})


export const getAllCompany=asyncHandler(async(req,res)=>{
    const userId=req.user

    const companies= await Company.find({userId:userId})

    return res.status(200).json(new ApiResponse(200,companies, "getting All companies successfully"))
})


export const getCompanyById=asyncHandler(async(req,res)=>{
    const companyId=req.params.id
    // console.log(companyId)
    const userId=req.user

    const company=await Company.findById(companyId)
    
    if(!company){
        throw new ApiError(404, "Company not found")
    }


    if(!company.userId.equals(userId)){
        throw new ApiError(401 , "Unauthorized Access")
    }

    return res.status(200).json(new ApiResponse(200, company , "getting Company with Id successfully"))
})

export const updateCompanyDetails=asyncHandler(async(req,res)=>{
    const companyId=req.params.id
    const file=res.file

    const company=await Company.findById(companyId)

    if(!company){
        throw new ApiError(404, "No company found ")
    }

   
    const userId=req.user
    if(!company.userId.equals(userId)){
        throw new ApiError("403", "Unauthorizes request")
    }

    
   
    const updatedCompany=await Company.findByIdAndUpdate(
        companyId,
        {
            $set:req.body
        },{new:true})

        if(!updatedCompany){
            throw new ApiError(404, "Company not found")
        }

        return res.status(200).json(new ApiResponse(200, updatedCompany, "Company details updated successfully"))
})