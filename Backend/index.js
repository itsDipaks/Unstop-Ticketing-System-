const express=require("express")
const { Connect } = require("./src/Config/db");
const { SeatModel } = require("./src/Models/Seates.model");
const { default: mongoose } = require("mongoose");

const app=express()

app.use(express.json())

app.listen(8400,async()=>{
    try{
    console.log("Server Started At http://localhost:8400")
    await Connect
console.log("Server Connected To Database")
}catch(err){
    console.log("Something Wents Wrop Please try again",err)
}
})