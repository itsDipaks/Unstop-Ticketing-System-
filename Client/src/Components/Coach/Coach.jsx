import React, {useState, useEffect} from "react";
import axios from "axios";
import {DatabaseUrl, GetAllData} from "../../assets/Assest";
import "./Coach.css";
import Seat from "../Seat/Seat";
const Coach = () => {
  const [allSeats, setAllSeats] = useState([]);
  let [loading, setloading] = useState(false);

  useEffect(() => {
    GetAllData(setloading, setAllSeats);
  }, []);

  console.log(allSeats);

  return (
    <div className="flex w-full  m-auto mt-32	">
      <div id="leftbox">
        <div class="mt-6 fixed left-44 border p-14 rounded  ">
          <label for="success" class="block mb-2 text-sm font-medium  ">
           Enter Number of Tickets
          </label>
          <input
            type="number"
            id="success"
            class="bg-gray-50 border border-gray-500 text-green-900 text-center   text-sm rounded-lg focus:ring-green-500 focus:border-black-100 block w-full p-2.5 "
            placeholder="Enter Tickets"
          />
          <p class="mt-2 text-sm  ">
            <span class="font-medium">Well done!</span>  
          </p>
          <button
            type="button"
            class="py-2.5  px-5  mt-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700  "
          >
            Book Ticket
          </button>
        </div>
      </div>

      <div className="Coach-box">
        {!loading && allSeats && allSeats.map((el) => <Seat SeatData={el} />)}
      </div>
    </div>
  );
};

export default Coach;
