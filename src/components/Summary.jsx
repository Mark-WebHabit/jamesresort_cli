import { formatDate, formatTime } from "../utilities/date";
import PropTypes from "prop-types";
function Summary({
  reservation,
  totalFee,
  guestFee,
  amenitiesFee,
  numberOfGuests,
  startingDate,
  endingDate,
  handleBook,
}) {
  return (
    <div className="w-[300px] mx-4">
      <p className="text-xl font-bold">Summary</p>
      <ul>
        <li className="flex justify-between items-center text-lg">
          Guest
          <span>Php {guestFee}</span>
        </li>
        <li className="flex justify-between items-center text-lg">
          Amenities
          <span>Php {amenitiesFee}</span>
        </li>
        <hr className="border" />
        <li className="flex justify-between items-center text-lg">
          Total
          <span className="font-bold">Php {totalFee}</span>
        </li>
      </ul>

      <p className="text-xl mt-4 font-bold">Details</p>
      <ul>
        <li className="flex justify-between items-center text-lg">
          Reservation
          <span className="text-sm">{formatDate(reservation)}</span>
        </li>
        <li className="flex justify-between items-center text-lg">
          Number of Guest
          <span>{numberOfGuests}</span>
        </li>
        <li className="flex justify-between items-center text-lg">
          Check-in
          {startingDate && <span>{formatTime(startingDate)}</span>}
        </li>
        <li className="flex justify-between items-center text-lg">
          Check-out
          {endingDate && <span>{formatTime(endingDate)}</span>}
        </li>
        <li className="flex justify-between items-center text-lg">
          Date booked
          <span className="text-sm">{formatDate(new Date())}</span>
        </li>
      </ul>

      <button
        className="px-8 py-2 block mx-auto bg-black text-white rounded-full mt-4"
        onClick={handleBook}
      >
        Book Reservation
      </button>
    </div>
  );
}

Summary.propTypes = {
  reservation: PropTypes.string,
  totalFee: PropTypes.number,
  guestFee: PropTypes.number,
  amenitiesFee: PropTypes.number,
  numberOfGuests: PropTypes.number,
  endingDate: PropTypes.string,
  startingDate: PropTypes.string,
  handleBook: PropTypes.func,
};

export default Summary;
