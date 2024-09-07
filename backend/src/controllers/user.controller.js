import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

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

    let photoLocalPath=null
  

    if(req.files && Array.isArray(req.files.file)&& (req.files.file.length > 0)){
       
        photoLocalPath=req.files.file[0].path
    }
   

    let p=null
    if(photoLocalPath!=null){
        p=await uploadOnCloudinary(photoLocalPath,"profilePhoto")
    }
    
   
    const userData={
        fullName,
        email,
        phoneNumber,
        password,
        role,
        profile:{}
    }

    if(p){
        userData.profile.profilePhoto=p.secure_url
    }


    // const user=new User({
    //     fullName,
    //     email,
    //     phoneNumber,
    //     password,
    //     role
    // })

    const user=new User(userData)
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
    const {skills,bio , ...restOfBody}=req.body
    const userId=req.user // by middleware authentication

    const existingUser = await User.findById(userId);
    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

   
   

    if(skills){
        const skillsArray = skills.split(",").map(skill => skill.trim());

        restOfBody.profile = existingUser.profile || {}
        restOfBody.profile.skills = skillsArray
        restOfBody.profile.bio=bio
    }

    let photoLocalPath=null
  

    if(req.files && Array.isArray(req.files.file)&& (req.files.file.length > 0)){
       
        photoLocalPath=req.files.file[0].path
    }
   

    let p=null
    if(photoLocalPath!=null){
        p=await uploadOnCloudinary(photoLocalPath,"resume",)
       
        restOfBody.profile = restOfBody.profile || existingUser.profile || {}
        restOfBody.profile.resume=p.url
        console.log(restOfBody)
        restOfBody.profile.resumeOriginalName=p.originalName
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

    updatedUser.password=undefined

    

    // resume implement here 
    return res.status(200).json(new ApiResponse(200, updatedUser , "User is updated successfully"))

    
})