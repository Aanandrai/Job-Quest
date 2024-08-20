import mongoose from "mongoose"


const connectDB=async()=>{
    try{
        const connectionInstance=await mongoose.connect(process.env.DB_URI)
        console.log(`Database is connected at host ${connectionInstance.connection.host}`)
    }catch(err){
        console.log("Database connection error :",err)
        process.exit(1)
    }
}

export default connectDB