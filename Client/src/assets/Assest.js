import axios from "axios";

export let DatabaseUrl="http://localhost:8400"

export let GetAllData=async(setloading,setAllSeats)=>{
    try {
        setloading(true);
        const response = await axios.get(`${DatabaseUrl}/allseats`);
        if (response.data) {
          setAllSeats(response.data);
          setloading(false);
        } else {
          setAllSeats([]);
          setloading(false);
        }
      } catch (error) {
        alert("Something went wrong");
        setloading(false);
      }
}