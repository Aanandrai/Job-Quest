import dotenv from "dotenv"
import app from "./src/app.js"
import connectDB from "./src/db/dbConnection.js"


dotenv.config({
    path:"./.env"
})

const PORT=process.env.PORT || 7000


connectDB()
    .then(()=>{
        app.listen(PORT),
        app.on("error",(error)=>{
            console.log("error : ",error)
        }),
        console.log(`App is running at ${PORT || 7000}`)

    })
    .catch((err)=>{
        console.log("Failed to connect database :" , err)
    })