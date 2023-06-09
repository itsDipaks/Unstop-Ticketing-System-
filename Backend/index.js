const express = require("express");
const {Connect} = require("./src/Config/db");
const { SeatsRouter } = require("./src/Routes/Seats.Route");
const cors=require("cors")
const app = express();
app.use(express.json());
app.use(cors())
app.use("/",SeatsRouter)
app.listen(8400, async () => {
  try {
    console.log("Server Started At http://localhost:8400");
    await Connect;
    console.log("Server Connected To Database");
  } catch (err) {
    console.log("Something Wents Wrop Please try again", err);
  }
});
