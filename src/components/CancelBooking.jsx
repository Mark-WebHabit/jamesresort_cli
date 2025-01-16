import { images } from "../assets/images";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CancelBooking({ room }) {
  const navigate = useNavigate();
  return (
    <div className="w-[200px] ">
      {room && <img src={`/../${images[room.images[0]]}`} alt="Images" />}
      <button
        className="px-4 py-2 text-white bg-black block mx-auto mt-2 rounded-full text-sm"
        onClick={() => {
          navigate("/");
        }}
      >
        Cancel Booking
      </button>
    </div>
  );
}

CancelBooking.propTypes = {
  room: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.number),
  }),
};

export default CancelBooking;
