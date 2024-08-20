import mongoose from 'mongoose'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


const userSchema=new mongoose.Schema({

    fullName:{
        type:String,
        required:true 
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    phoneNumber:{
        type:Number,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:['student' , 'recruiter'],
        required:true
    },

    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId , ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    }

},{timestamps:true})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password ,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password ,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this.id,
        email:this.email,
        fullName:this.fullName,
        role:this.role
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }

    )
}


export const User=mongoose.model("User",userSchema)