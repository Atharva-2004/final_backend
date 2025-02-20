import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})

import { app } from './app.js';
import connectDB from './db/index.js';

connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("app is listening on:",process.env.PORT);
    })
})
.catch((error)=>{
    console.log("mongodb connection error: ",error);
})




/*
import express from "express";

const app = express();

( async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("error:",error);
        })
        app.listen(process.env.PORT, ()=>{
            console.log("app is listening on: ",process.env.PORT);
        })
    }
    catch(error){
        console.error("ERROR: ",error);
        throw err
    }
})()
*/