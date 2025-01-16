import PropTypes from "prop-types";
import { images } from "../assets/images";
import { useNavigate } from "react-router-dom";

const RoomCardOption = ({ room }) => {
  const navigate = useNavigate();
  return (
    <div className="card basis-1/3 max-w-[400px] ">
      <img
        src={`..${images[room.images[0]]}`}
        alt="Image"
        className="w-full ease-in-out duration-200 hover:scale-110"
      />
      <button
        className="border px-6 py-4 border-black mt-4 block mx-auto rounded-2xl"
        onClick={() => navigate(`/room/${room.id}`)}
      >
        {room.name}
      </button>
    </div>
  );
};

RoomCardOption.propTypes = {
  room: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.number),
    name: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default RoomCardOption;
