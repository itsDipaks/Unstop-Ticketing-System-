const mongoose = require("mongoose");

let SeatsSchema = new mongoose.Schema({
  SeatNumber: {
    type: Number,
  },
  Isbooked: {
    type: Boolean,
    default: false,
  },
  BookinTime: {type:Date, default :Date.now(),}
});

let SeatModel = mongoose.model("Seat", SeatsSchema);

module.exports = {SeatModel};
