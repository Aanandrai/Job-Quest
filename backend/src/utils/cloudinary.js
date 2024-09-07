import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"

import path from "path"
import DataURIParser from "datauri/parser.js"


dotenv.config({ path: "./.env" })

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async(localFilePath,folderName = 'default')=>{
  
  
    try{
        if(!localFilePath) return null

        const parser=new DataURIParser()

        const fileBuffer=fs.readFileSync(localFilePath)
        const ext=path.extname(localFilePath)
        
        const fileName = path.basename(localFilePath)
        const dataUri=parser.format(ext,fileBuffer.buffer).content


        const resourceType = ext === '.pdf' ? 'raw' : 'auto';

        const response=await cloudinary.uploader.upload(dataUri ,{
            resource_type:resourceType,
            folder:`JobQuest/${folderName}`
            
        })
  

        fs.unlinkSync(localFilePath)

        return {
            url: response.secure_url,
            originalName: fileName // Return original file name alongside URL
          }

    }catch(err){
        console.log(err.message)
        console.log("heee")
        fs.unlinkSync(localFilePath)
        return null
    }
}

export {uploadOnCloudinary}