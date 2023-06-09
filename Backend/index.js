const express=require("express")
const { Connect } = require("./src/Config/db");
const { SeatModel } = require("./src/Models/Seates.model");
const { default: mongoose } = require("mongoose");

const app=express()

app.use(express.json())

const seats = [];
for (let i = 1; i <= 80; i++) {
  seats.push({
    SeatNumber: i,
    Isbooked: false,
    BookinTime: Date.now(),
  });
}

SeatModel.insertMany(seats)
  .then(() => {
    console.log("Seats added to the database successfully!");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error adding seats to the database:", error);
    mongoose.disconnect();
  });

app.listen(8400,async()=>{
    try{
    console.log("Server Started At http://localhost:8400")
    await Connect
console.log("Server Connected To Database")
}catch(err){
    console.log("Something Wents Wrop Please try again",err)
}
})