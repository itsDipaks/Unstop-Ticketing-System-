import { useEffect, useState } from 'react';
import './App.css';




// baseAPI 👍👍👍
const baseAPI = 'http://localhost:8080/api/seats';

function App() {
  const [seatsData, setSeatsData] = useState([]);
  const [numOfSeats, setNumOfSeats] = useState('');
  const [unbookSeats, setUnbookSeats] = useState('');

  const getAllSeats = async () => {
    const response = await fetch(`${baseAPI}/get/all`);
    const data = await response.json();
    setSeatsData(data.seats);
  };

  const renderSeats = () => {
    const totalSeats = seatsData.length;
    const seatsPerRow = 7;
    const seatsInLastRow = totalSeats % seatsPerRow;

    const totalRows = Math.ceil(totalSeats / seatsPerRow);
    let seatNumber = 1;

    const seatRows = [];

    for (let row = 1; row <= totalRows; row++) {
      const seatsInRow = row === totalRows ? seatsInLastRow : seatsPerRow;

      const seatRow = (
        <div key={row} className="row">
          {renderSeatDivs(seatNumber, seatsInRow)}
        </div>
      );

      seatRows.push(seatRow);
      seatNumber += seatsInRow;
    }

    return seatRows;
  };

  const renderSeatDivs = (startSeat, seatsInRow) => {
    const seatDivs = [];

    for (let seat = startSeat; seat < startSeat + seatsInRow; seat++) {
      const seatData = seatsData.find((seatData) => seatData.seatNo === seat);

      const seatDiv = (
        <div
          key={seat}
          className={`seat ${seatData && seatData.isBooked ? 'booked-seat' : 'available-seat'}`}>
          {seat}
        </div>
      );

      seatDivs.push(seatDiv);
    }

    return seatDivs;
  };


  const reserveSeats = async () => {
    if (numOfSeats > 7) {
      showToaster("You can only book up to 7 seats at once.");
    } else if (!numOfSeats) {
      showToaster("Please enter the number of seats to book.");
    } else {
      try {
        const response = await fetch(`${baseAPI}/book`, {
          method: "POST",
          body: JSON.stringify({ numSeats: numOfSeats }),
          headers: {
            'Content-Type': "application/json"
          }
        });

        const responseData = await response.json();

        if (responseData && responseData.message === "Seats booked successfully") {
          showToaster(`Successfully booked ${numOfSeats} seat(s).`);
          setTimeout(() => {
            updateSeatStatus(responseData.bookedSeats, 'booked-seat');
          }, 100);
        } else if (responseData.message === "Seats not available") {
          showToaster(responseData.message)
        } else {
          showToaster(responseData.message)
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const unBookSeatsFn = async () => {
    if (!unbookSeats) {
      showToaster("Please enter the number of seats to unbook");
      return;
    }

    const unSeatsValues = unbookSeats.trim().split(",").map(Number);
    const containsOnlyNumbers = unSeatsValues.every((seatNumber) => !isNaN(seatNumber));

    if (!containsOnlyNumbers) {
      showToaster("Only numbers are allowed for unbooking seats");
      return;
    }
    
    try {
      const response = await fetch(`${baseAPI}/unbook`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ seatNumbers: unSeatsValues })
      });

      const responseData = await response.json();

      if (responseData && responseData.message === "Invalid seat numbers or already unbooked") {
        showToaster(responseData.message);
      } else if (responseData.message === "Seats successfully unbooked") {
        const unbookedSeats = unSeatsValues;
        updateSeatStatus(unbookedSeats, 'available-seat');
        showToaster(responseData.message);
      } else {
        showToaster(responseData.message);
      }
    } catch (error) {
      console.error(error);
    }
  }



  const updateSeatStatus = (seats, status) => {
    const seatElements = document.getElementsByClassName('seat');
    Array.from(seatElements).forEach((seatElement, index) => {
      const seatNumber = index + 1;
      if (seats.includes(seatNumber)) {
        seatElement.classList.remove('booked-seat', 'available-seat');
        seatElement.classList.add(status);
      }
    });

    const rowBookedSeats = document.getElementsByClassName('row_booked_seats')[0];

    // Remove all existing seat elements
    while (rowBookedSeats.firstChild) {
      rowBookedSeats.removeChild(rowBookedSeats.firstChild);
    }

    // Add the latest booked seats
    seats.forEach((seat) => {
      const seatElement = document.createElement('div');
      seatElement.classList.add('seat_booked');
      seatElement.textContent = seat;
      rowBookedSeats.appendChild(seatElement);
    });
  }

  const showToaster = (message) => {
    const toaster = document.getElementById('toaster');
    const alertMessage = toaster.getElementsByClassName("alert_message")[0];
    alertMessage.textContent = message;
    toaster.classList.add('show');

    setTimeout(() => {
      toaster.classList.remove('show');
    }, 3500);
  };

  useEffect(() => {
    getAllSeats();
  }, []);

  return (
    <>
      <div id="toaster" className="toaster">
        <span className="alert_message"></span>
      </div>
      <h1>Seat Reservation</h1>

      <div className='main_container'>
        <div className="seat-container">{renderSeats()}</div>

        {/* <!-- Section for input box and current booked seats --> */}
        <div className="booking-section">
          {/* <!-- Color indicator message for booked and available seats --> */}
          <div className="color_indicator_message">
            <div className="_rounded_box_conatiner">
              {/* <!-- Red box for booked seats --> */}
              <div className="_rounded_box red-box"></div>
              {/* <!-- Green box for available seats --> */}
              <div className="_rounded_box green-box"></div>
            </div>
            <div className="_rounded_box_message">
              {/* <!-- Message indicating booked seats --> */}
              <p>Booked Seats</p>


              
              {/* <!-- Message indicating available seats --> */}
              <p>Available Seats</p>
            </div>
          </div>

          {/* <!-- Section displaying current booked seats --> */}
          <div id="currentBookedSeats">
            <div className="booked_seats_text">
              {/* <!-- Text indicating the current seats that are booked --> */}
              <p>Current Seats booked:</p>
            </div>
            {/* <!-- Container for displaying the booked seats in a row --> */}
            <div className="row_booked_seats">
              <div className="seat_booked">1</div>
              <div className="seat_booked">2</div>
              <div className="seat_booked">3</div>
              <div className="seat_booked">4</div>
              <div className="seat_booked">5</div>
              <div className="seat_booked">6</div>
              <div className="seat_booked">7</div>
            </div>
          </div>

          {/* <!-- Input box for selecting the number of seats and book button --> */}
          <div className="input_conatiner">
            <label htmlFor="numOfSeats">Number of Seats:</label>
            <label htmlFor="numOfSeats" className="example_un">Ex: 3</label>
            <input
              type="number"
              value={numOfSeats}
              onChange={(e) => setNumOfSeats(e.target.value)}
              id="numOfSeats"
              placeholder="Enter number 1-7 to book seats"
            />
            <button onClick={reserveSeats}>Reserve Seats</button>
          </div>

          {/* <!-- unbook seats --> */}
          <div className="input_conatiner">
            <label htmlFor="numOfSeats">Number of Seats to unBook:</label>
            <label htmlFor="numOfSeats" className="example_un">Ex: 1,2,3..80</label>
            <input
              type="text"
              value={unbookSeats}
              onChange={(e) => setUnbookSeats(e.target.value)}
              id="unBookseats"
              placeholder="Enter number 1,2,3..80 to unbook seats"
            />
            <button onClick={unBookSeatsFn}>Unbook Seats</button>
          </div>
        </div>

      </div></>
  );
}

export default App;
