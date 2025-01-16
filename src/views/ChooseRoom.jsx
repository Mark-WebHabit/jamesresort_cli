import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomsContext } from "../context/RoomsContext";
import RoomCardOption from "../components/RoomCardOption";
function ChooseRoom() {
  const [roomOption, setRoomOption] = useState([]);
  const { category } = useParams();
  const { rooms } = useContext(RoomsContext);

  useEffect(() => {
    if (rooms.length <= 0) return;

    const macthedRoom = rooms.filter((room) => room.category == category);

    setRoomOption(macthedRoom);
  }, [rooms, category]);

  return (
    <div className="w-screen h-screen flex flex-col py-5 px-4">
      <hr className="border-2" />

      <h2 className="text-xl mb-2">James G Resort and Hotel</h2>
      <div className="flex justify-between">
        <p className="font-bold text-6xl">{category}</p>
        {roomOption.length > 0 && (
          <p className="text-3xl mx-10">Php {roomOption[0].price}</p>
        )}
      </div>

      <div className={`flex flex-wrap  justify-center gap-12 mt-8`}>
        {roomOption.length > 0 &&
          roomOption.map((room) => (
            <RoomCardOption room={room} key={room.id} />
          ))}
      </div>
    </div>
  );
}

export default ChooseRoom;
