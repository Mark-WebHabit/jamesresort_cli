import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { off, ref, onValue } from "firebase/database";
import { db } from "../../firebase"; // Adjust the import path as necessary

import { RoomsContext } from "./RoomsContext";

const DataContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [demoRooms, setDemoRooms] = useState([]);
  const amenities = {
    beds: 100,
    pillows: 50,
    comforter: 50,
  };

  const DAYTOUR = {
    startingDate: 8,
    endDate: 16,
  };

  const OVERNIGHT = {
    startingDate: 20,
    endDate: 8,
  };

  useEffect(() => {
    const roomsRef = ref(db, "rooms");

    // Listen for data changes using snapshot and dot notation
    onValue(roomsRef, (snapshot) => {
      const data = snapshot.val();
      const itemsArray = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setRooms(itemsArray);
    });

    // Clean up the listener on unmount
    return () => off(roomsRef); // Proper cleanup for Firebase listener
  }, []);

  const getOneRoomPerCategory = useCallback(() => {
    if (rooms.length <= 0) return [];
    const uniqueCateg = [];
    const seenCateg = new Set();
    rooms.forEach((room) => {
      if (!seenCateg.has(room.category)) {
        uniqueCateg.push(room);
        seenCateg.add(room.category);
      }
    });

    return uniqueCateg;
  }, [rooms]);
  useEffect(() => {
    const demoRoomsPerCategory = getOneRoomPerCategory();
    setDemoRooms(demoRoomsPerCategory);
  }, [rooms, getOneRoomPerCategory]);

  return (
    <RoomsContext.Provider
      value={{
        rooms: rooms,
        demoRooms: demoRooms,
        amenities: amenities,
        DAYTOUR: DAYTOUR,
        OVERNIGHT: OVERNIGHT,
      }}
    >
      {children}
    </RoomsContext.Provider>
  );
};

// Add PropTypes validation
DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataContextProvider;
