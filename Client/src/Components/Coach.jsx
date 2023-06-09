import React, {useState, useEffect} from "react";
import axios from "axios";
import {DatabaseUrl, GetAllData} from "../assets/Assest";
import "./Coach.css";
import Seat from "./Seat";
const Coach = () => {
  const [allSeats, setAllSeats] = useState([]);
  let [loading, setloading] = useState(false);

  useEffect(() => {
    GetAllData(setloading,setAllSeats)
  }, []);

  console.log(allSeats);

  return (
    <div>
      <div className="Coach-box">
        {!loading && allSeats && allSeats.map((el) => <Seat SeatData={el} />)}
      </div>
    </div>
  );
};

export default Coach;
