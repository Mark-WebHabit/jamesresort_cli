import { useParams } from "react-router-dom";
import { formatDate, formatTime } from "../utilities/date";
import { useContext, useEffect, useState } from "react";
import { RoomsContext } from "../context/RoomsContext";
import { getTourTimes } from "../utilities/date";
import { generateRandomDigits } from "../utilities/number";
import { ref, set, push } from "firebase/database";
import { db } from "../../firebase";

import Summary from "../components/Summary";
import CancelBooking from "../components/CancelBooking";
import ToggleGuestNumber from "../components/ToggleGuestNumber";
import AdditionalAmmenity from "../components/AdditionalAmmenity";
import GetGuestInfo from "../components/GetGuestInfo";

function ReservationSummary() {
  const { rooms, amenities, DAYTOUR, OVERNIGHT } = useContext(RoomsContext);
  const [room, setRooms] = useState(null);
  const { id, date: reservation } = useParams();
  const [showGuestInfo, setShowGuestInfio] = useState(false);
  const [dayTour, setDaytour] = useState(true);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [addAmenities, setAddAmenities] = useState({
    bed: 0,
    pillow: 0,
    comforter: 0,
  });

  const [monthYear, setMonthYear] = useState(null);
  const [fullDate, setFullDate] = useState({
    startingDate: null,
    endingDate: null,
  });

  // fees
  const [amenitiesFee, setAmenitiesFee] = useState(0);
  const [guestFee, setGuestFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);

  // add
  const [request, setRequest] = useState("");

  // client
  const [name, setName] = useState("");
  const [reference, setReference] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [reservationId, setReservationId] = useState("");

  useEffect(() => {
    if (!room) return;

    if (parseInt(numberOfGuests) === room.pax) {
      setAddAmenities((old) => ({
        ...old,
        bed: room?.limit,
      }));
    }
  }, [numberOfGuests, room]);

  useEffect(() => {
    let sum = amenitiesFee + guestFee + room?.price;
    setTotalFee(sum);
  }, [guestFee, amenitiesFee, room, dayTour]);

  useEffect(() => {
    reservation ? setMonthYear(formatDate(reservation)) : null;
  }, [reservation]);

  useEffect(() => {
    if (!reservation) return;
    const times = getTourTimes(reservation, dayTour, DAYTOUR, OVERNIGHT);

    setFullDate({
      startingDate: times.startTime,
      endingDate: times.endTime,
    });
  }, [reservation, DAYTOUR, OVERNIGHT, dayTour]);

  useEffect(() => {
    setRooms(() => rooms?.find((rm) => rm.id == id));
  }, [id, rooms]);

  useEffect(() => {
    if (dayTour) {
      setGuestFee(numberOfGuests * 50);
    } else {
      setGuestFee(numberOfGuests * 100);
    }
  }, [dayTour, numberOfGuests]);

  useEffect(() => {
    const bedTotal = addAmenities.bed * amenities.beds;
    const pillowTotal = addAmenities.pillow * amenities.pillows;
    const comforterTotal = addAmenities.comforter * amenities.comforter;

    const total = bedTotal + pillowTotal + comforterTotal;

    setAmenitiesFee(total);
  }, [addAmenities, amenities]);

  const handleBook = () => {
    if (!reservation) {
      return alert("Choose a date first");
    }

    if (!room) {
      return;
    }

    setShowGuestInfio(true);
  };

  const handleConfirm = () => {
    if (!fullDate.startingDate || !fullDate.endingDate) return;

    const newId = generateRandomDigits();
    setReservationId(newId);

    const data = {
      startingDate: fullDate.startingDate.toString(),
      endingDate: fullDate.endingDate.toString(),
      monthYear: monthYear,
      request: request,
      dayTour: dayTour,
      room: room?.id,
      numberOfGuest: numberOfGuests,
      addAmenities: addAmenities,
      amenitiesFee: amenities,
      guestFee: guestFee,
      totalFee: totalFee,
      status: "confirmed",
      client: name,
      clientAddress: address,
      clientContact: contact,
      reference,
    };

    const notif = {
      description: `New Reservation has been made by ${name}`,
      reservationDate: fullDate.startingDate.toString(),
      room: room.name,
      title: "New Reservation",
      date: new Date().toISOString(),
      reservationId: newId,
      status: "Unread",
    };
    const notificationsRef = ref(db, "notifications");

    // Store reservation data
    set(ref(db, "reservations/" + newId), data)
      .then(() => {
        push(notificationsRef, notif)
          .then(() => {
            console.log("Notification added successfully.");
            // You can add further actions here, e.g., showing a success message
          })
          .catch((error) => {
            console.error("Error adding notification:", error);
          });
      })
      .catch((error) => {
        console.error("Failed to confirm reservation:", error);
        alert("Failed to confirm reservation.");
      });
  };

  return (
    <div className="w-screen h-screen flex flex-col items-start justify-center p-4 relative">
      <p className="text-4xl mb-4">James G Resort</p>

      <div className="border-y-2 py-4 w-full flex">
        <div className="flex-1 flex flex-col">
          <p className="text-3xl">{formatDate(reservation)}</p>

          <div className="flex-1  flex">
            <CancelBooking room={room} />
            <div className="flex-1 px-4 md:px-44">
              <div className="flex items-center justify-between">
                <p className="font-bold text-2xl">{room?.name}</p>
                <p className="text-2xl">Php {room?.price}</p>
              </div>

              <div className="flex-1 flex-col">
                <div className="flex border-b-2 border-red-900 w-fit gap-8">
                  <label htmlFor="day" className="flex items-center gap-2">
                    Daytour
                    <input
                      type="radio"
                      name="tour"
                      id="day"
                      checked={dayTour}
                      onChange={() => setDaytour(true)}
                    />
                  </label>

                  <label htmlFor="night" className="flex items-center gap-2">
                    OverNight{" "}
                    <input
                      type="radio"
                      name="tour"
                      id="night"
                      checked={!dayTour}
                      onChange={() => setDaytour(false)}
                    />{" "}
                  </label>
                </div>

                <div className="flex justify-between items-center">
                  <p>Number of Guest</p>

                  <ToggleGuestNumber
                    numberOfGuests={numberOfGuests}
                    setNumberOfGuests={setNumberOfGuests}
                    pax={room?.pax}
                  />

                  <p>Php {guestFee}</p>
                </div>
                <AdditionalAmmenity
                  addAmenities={addAmenities}
                  setAddAmenities={setAddAmenities}
                  amenitiesFee={amenitiesFee}
                  limit={room?.limit}
                />

                <div className="check flex items-center gap-8 ">
                  <div className="w-fit">
                    <button className="border px-8 py-4 rounded-full border-black">
                      {fullDate?.startingDate &&
                        formatTime(fullDate.startingDate)}
                    </button>
                    <p className="text-center">Check in</p>
                  </div>
                  <p>-----</p>
                  <div className="w-fit">
                    <button className="border px-8 py-4 rounded-full border-black">
                      {fullDate?.endingDate && formatTime(fullDate.endingDate)}
                    </button>
                    <p className="text-center">Check out</p>
                  </div>
                </div>
                <p className="flex my-4 items-center gap-4">
                  Checkout Date:
                  <p className="font-bold text-2xl">
                    {fullDate?.endingDate && formatDate(fullDate.endingDate)}
                  </p>{" "}
                </p>

                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Additional Request"
                  className="py-2 px-4 w-[350px] border border-black rounded"
                  maxLength={200}
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <Summary
          reservation={reservation}
          totalFee={totalFee}
          guestFee={guestFee}
          amenitiesFee={amenitiesFee}
          numberOfGuests={numberOfGuests}
          startingDate={fullDate.startingDate}
          endingDate={fullDate.endingDate}
          handleBook={handleBook}
        />
      </div>

      {showGuestInfo && (
        <GetGuestInfo
          name={name}
          reference={reference}
          contact={contact}
          address={address}
          setName={setName}
          setReference={setReference}
          setContact={setContact}
          setAddress={setAddress}
          setShowGuestInfio={setShowGuestInfio}
          handleConfirm={handleConfirm}
          reservationId={reservationId}
        />
      )}
    </div>
  );
}

export default ReservationSummary;
