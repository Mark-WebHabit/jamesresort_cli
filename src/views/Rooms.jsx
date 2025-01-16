import { useContext } from "react";

import { RoomsContext } from "../context/RoomsContext";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";

function Rooms() {
  const { demoRooms } = useContext(RoomsContext);
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="border-2 mt-4 w-9/12 mx-auto" />
      <div className="flex-1 mt-2 overflow-hidden px-4 flex flex-col">
        <h1 className="text-xl mb-2">James G Resort and Hotel</h1>
        <div className="flex-1 flex overflow-y-scroll gap-x-4 flex-wrap items-start justify-center pb-5">
          {demoRooms.length > 0 &&
            demoRooms.map((room) => {
              return (
                <RoomCard
                  image={room.images[0]}
                  key={room.id}
                  category={room.category}
                  pax={room.pax}
                  inclutions={room.inclutions}
                  price={room.price}
                  func={() => navigate(`/category/${room.category}`)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
console.log();

export default Rooms;
