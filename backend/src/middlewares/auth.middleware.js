import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const isAuthenticated= asyncHandler(async(req,res,next)=>{
    try{
        const token=req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new ApiError(401 , "Unauthorized request")
        }

        const decodedToken=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedToken?._id).select("-password")

        if(!user){
            throw new ApiError(401, "Invalid Token")
        }

        req.user=user._id
        req.userRole=user.role

        next()
    }catch(err){
        throw new ApiError(401,err?.message || "Invalid access Token")
    }
})

export const isAuthorized=(roles)=>asyncHandler(async(req,res,next)=>{
    if(roles!=req.userRole){
        throw new ApiError(401 , "unAuthorized access for this role")
    }
    next()
})