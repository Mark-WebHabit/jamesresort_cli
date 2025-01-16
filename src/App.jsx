import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DataContextProvider from "./context/DataContext";

import Home from "./views/Home";
import Rooms from "./views/Rooms";
import ChooseRoom from "./views/ChooseRoom";
import RoomInfo from "./views/RoomInfo";
import ReservationSummary from "./views/ReservationSummary";

function App() {
  return (
    <DataContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/category/:category" element={<ChooseRoom />} />
          <Route path="/room/:id" element={<RoomInfo />} />
          <Route
            path="/reservation/:id/:date"
            element={<ReservationSummary />}
          />
        </Routes>
      </Router>
    </DataContextProvider>
  );
}

export default App;
