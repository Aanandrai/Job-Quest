import mongoose from "mongoose"

const companySchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    website:{
        type:String,
        // required:true
    },

    location:{
        type:String,
        // required:true
    },
    logo:{
        type:String //url of logo of company
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }


},{timestamps:true})

export const Company=mongoose.model("Company",companySchema)