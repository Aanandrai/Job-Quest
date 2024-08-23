import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"

export const register= asyncHandler(async (req,res)=>{
    const {fullName ,email, phoneNumber , password , role }=req.body 
 
    if(
        [fullName, email, phoneNumber, password ,role].some((field)=>
        field?.trim()=="" || field?.trim()==undefined)
    ){
        throw new ApiError(400,"All Fields are required")
    }
   

    const existUser= await User.findOne({email})
  
    if(existUser){
        throw new ApiError(400,"User already exist")
    }
   
    const user=new User({
        fullName,
        email,
        phoneNumber,
        password,
        role
    })
    user.save()

    return res.status(201).json(new ApiResponse(201, user, "User registered successfully"))


})


export const login =asyncHandler(async(req,res)=>{
    const {email, password, role}=req.body

 
    if(
        [email , password ,role ].some((field)=>
            field?.trim()==""|| field?.trim()==undefined
        )
    )
    {

        throw new ApiError(400, "Some fields are missing")
    }

    const user=await User.findOne({email})
    if(!user){
        throw new ApiError(404,"User not found" )
    }

    if(role!=user.role){
        throw new ApiError(403, "Invalid role for this account")
    }

    const isPasswordValid= await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(401 , "Password is incorrect")
    }

    const token=await user.generateAccessToken()

    user.password = undefined

    const options={
        httpOnly:true,
        secure:false
    }
    return res.status(200).cookie("token",token , options).json(new ApiResponse(200,user , "User login successfully"))

})


export const logout=asyncHandler(async(req,res)=>{
    return res.status(200).cookie("token","",{maxAge:0}).json(new ApiResponse(200,"","User logout successfull"))
})


export const updateProfile=asyncHandler(async(req,res)=>{
    const file=req.file


    // here cloudinary for photo upload 
    const {skills , ...restOfBody}=req.body
    const userId=req.user // by middleware authentication
   

    if(skills){
        const skillsArray = skills.split(",").map(skill => skill.trim());
       
        restOfBody.profile = restOfBody.profile || {};
        restOfBody.profile.skills = skillsArray;
    }

    

   

    // updating data 
    const updatedUser=await User.findByIdAndUpdate(
        userId,
        {
            $set:restOfBody
        },{new:true})

    if(!updatedUser){
        throw new ApiError(404, "User not found")
    }

    

    // resume implement here 
    return res.status(200).json(new ApiResponse(200, updatedUser , "User is updated successfully"))

    
})