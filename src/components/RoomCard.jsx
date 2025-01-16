import PropTypes from "prop-types";
import { images } from "../assets/images";
const RoomCard = ({ category, pax, inclutions, price, image, func }) => {
  return (
    <div
      className="card w-[30%] max-w-[300px] basis-1/3 cursor-pointer ease-in-out duration-200 hover:scale-110 border shadow-md p-2"
      onClick={() => {
        func();
      }}
    >
      <img
        src={`..${images[image]}`}
        alt="Image"
        className="h-[300px] w-full"
      />
      <div className="pl-2">
        <h2 className="font-bold">{category}</h2>
        <p>{pax > 1 ? `1 - ${pax} pax` : "1 pax"}</p>
        <ul className="">
          {inclutions && inclutions.map((inc, i) => <li key={i}>{inc}</li>)}
        </ul>
        <h2 className="font-bold">Php {price}</h2>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  category: PropTypes.string,
  pax: PropTypes.number,
  inclutions: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number,
  image: PropTypes.number,
  func: PropTypes.func,
};

export default RoomCard;
