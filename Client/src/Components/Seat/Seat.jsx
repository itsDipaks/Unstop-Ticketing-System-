import React from "react";
const Seat = ({SeatData}) => {
  return (
    <div className=' border p-4' >
      <h5>Seat  {SeatData?.SeatNumber}</h5>
     
    </div>
  );
};

export default Seat;
