import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomsContext } from "../context/RoomsContext";
import { images } from "../assets/images";
import { formatDate, convertDateStandard } from "../utilities/date";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageSelection from "../components/ImageSelection";

function RoomInfo() {
  const { id } = useParams();
  const { rooms, reservations } = useContext(RoomsContext);
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    if (!reservations || reservations.length <= 0) return;
    const reserved = reservations.filter((rm) => rm.room == id);

    if (reserved?.length <= 0 || !reserved) return;

    // to cconvert date from January 1, 2025 to 2025-01-01
    const booked = reserved.map((res) => {
      const dayDeducted = new Date(res.monthYear);
      dayDeducted.setDate(dayDeducted.getDate() - 1);

      return convertDateStandard(dayDeducted);
    });

    setBookedDates(booked);
  }, [id, selectedDate, reservations]);

  const isDateBooked = (date) => {
    return bookedDates.includes(date.toISOString().split("T")[0]);
  };

  const isDayDisabled = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    return date > yesterday || isDateBooked(date);
  };

  const dayClassName = (date) => {
    return isDateBooked(date) ? "booked-date" : undefined;
  };

  useEffect(() => {
    if (rooms.length <= 0) return;
    const selectedRoom = rooms.find((room) => room.id == id);

    setRoom(selectedRoom);
  }, [id, rooms]);

  useEffect(() => {
    if (room) {
      setSelectedImage(room.images[0]);
    }
  }, [room]);

  return (
    <div className="w-screen h-screen p-5 flex flex-col">
      <hr className="border-2" />
      <h2 className="text-5xl mt-2 font-bold">{room?.category}</h2>
      <div className="wrapper flex-1 flex items-start my-4">
        <ImageSelection
          room={room}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <div className="bigImage flex-1 h-full mr-4">
          <img
            src={`..${images[selectedImage]}`}
            alt="Image"
            className="h-full object-center"
          />
        </div>
        <div className="calendar w-[500px] h-full flex flex-col py-8">
          <p className="text-3xl font-bold">{room?.name}</p>
          <p className="text-2xl">Php {room?.price}</p>
          <div className="flex justify-between text-2xl mt-2">
            <small>{selectedDate ? "Select Date" : "Select a date"}</small>{" "}
            {selectedDate && <small>{formatDate(selectedDate)}</small>}
          </div>
          <div className=" flex items-center justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              filterDate={isDayDisabled}
              dayClassName={dayClassName}
              inline
            />
          </div>
          <div className="flex-1 flex flex-col items-center justify-start">
            <button
              className="px-12 py-4 bg-black text-white mt-4 rounded-full"
              onClick={() => {
                if (!selectedDate) {
                  alert("Date Selection Required!");
                  return;
                }
                navigate(`/reservation/${id}/${selectedDate}`);
              }}
            >
              Book now
            </button>
            <p className="text-center px-4 mt-4 text-lg">
              A standard room typically includes a comfortable bed a private
              bathroom, a desk or small table, a chair, a television, and basic
              amenities such as free Wi-Fi, air conditioning, and a wardrobe or
              closet.
            </p>
          </div>
        </div>
      </div>
      <hr className="border-2" />
    </div>
  );
}

export default RoomInfo;
