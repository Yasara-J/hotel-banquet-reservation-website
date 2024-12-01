import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Explore from "./pages/Explore";
import Reservation from "./pages/Reservation";
import Services from "./pages/Services";
import BanquetDetails from "./pages/BanquetDetails";
import ReservationSuccess from "./pages/ReservationSuccess";
import BanquetDetails2 from "./pages/BanquetDetails2";
import BanquetDetails3 from "./pages/BanquetDetails3";
import BanquetDetails4 from "./pages/BanquetDetails4";
import View from "./pages/View";
import ReservationUpdate from "./pages/ReservationUpdate";
import ReservationUpdateSuccess from "./pages/ReservationUpdateSuccess";
import Halls from "./components/Halls";
import LoginForm from "./components/LoginForm";
import Calendar from "./pages/Calendar";


// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminReservation from "./pages/admin/Reservations";
import ReservationEdit from "./pages/admin/ReservationEdit";

import RoomsAndHalls from "./pages/admin/RoomsAndHalls";
import AddBanquet from "./pages/admin/AddBanquet";
import EditBanquet from "./pages/admin/EditBanquet";

import Report from "./pages/admin/Report";
import Settings from "./pages/admin/Settings"

// Admin Components
import AdminNav from "./pages/admin/components/AdminNav";

function App() {

  const AuthToken = sessionStorage.getItem("adminToken");
  const Auth = AuthToken ? true : false


  return (
    <div className="App">
      <BrowserRouter>
        {Auth ? < AdminNav/> : <Navbar />}
        
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/reservations" element={<View />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/BanquetDetails" element={<BanquetDetails />} />
          <Route path="/BanquetDetails2" element={<BanquetDetails2 />} />
          <Route path="/BanquetDetails3" element={<BanquetDetails3 />} />
          <Route path="/BanquetDetails4" element={<BanquetDetails4 />} />
          <Route path="/reservationSuccess" element={<ReservationSuccess />} />
          <Route
            path="/reservationUpdateSuccess"
            element={<ReservationUpdateSuccess />}
          />
          <Route
            path="/reservationUpdate/:id"
            element={<ReservationUpdate />}
          />

          <Route path="/calendar" element={<Calendar />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/login" element={<LoginForm />} />
          
          {/* Add Admin Routes here */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* Reservations */}
          <Route path="/admin/reservations" element={<AdminReservation />} />
          <Route path="/admin/reservation/:id" element={<ReservationEdit />} />

          <Route path="/admin/roomsAndHalls" element={<RoomsAndHalls />} />
          <Route path="/admin/addBanquet" element={<AddBanquet />} />
          <Route path="/admin/editBanquet/:id" element={<EditBanquet />} />

          <Route path="/admin/report" element={<Report />} />
          <Route path="/admin/settings" element={<Settings />} />


        </Routes>
        {Auth ? <></> : <Footer />}
      </BrowserRouter>
      {/* Add Footer here to display it on all pages */}
    </div>
  );
}

export default App;
