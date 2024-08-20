import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(cors({
    origin:"*",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true, limit: "16kb"}))


// app.get("/home",(req,res)=>{
//     res.send("App is testing")
// })

import userRouter from "./routes/user.route.js"
import companyRouter from "./routes/company.route.js"
import jobRouter from "./routes/job.route.js"
import applicationRouter from "./routes/application.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/company",companyRouter)
app.use("/api/v1/job",jobRouter)

// abhi test nahi kiay hai ye route 
app.use("/api/v1/application",applicationRouter)

export default app