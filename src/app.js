import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,

}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// app.get("/",(req,res)=>{
//     res.send("hello from app.js")
// })

//routes import 
import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users", userRouter)
//http://localhost:8000/api/v1/users /register


export { app }