const {Router} = require("express");
const {SeatModel} = require("../Models/Seates.model");

const SeatsRouter = Router();
 
SeatsRouter.get("/allseats", async (req, res) => {
  try {
    let Seats = await SeatModel.find();
    res.status(200).send(Seats);
  } catch (err) {
    res
      .statusCode(204)
      .send({msg: "No Seats Data Present in Database Please add Data"});
  }
});

module.exports={SeatsRouter}
