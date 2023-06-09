import React from "react";
import "./Seat.css"
const Seat = ({SeatData}) => {
  return (
    <div className='seat-box' >
      <h5>Seat  {SeatData?.SeatNumber}</h5>
     
    </div>
  );
};

export default Seat;
