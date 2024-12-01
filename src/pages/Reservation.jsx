import { useNavigate,useLocation } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";
import "./Reservation.css";

const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const banquetId = queryParams.get("banquetId");

  const customerData = sessionStorage.getItem("customer");
  const isLogin = customerData ? true : false;
  if (isLogin) {
    navigate("/reservations");
    return;
  }

  return (
    <div className="reservation-page">
      <p className="Guest-details-txt">Guest Details</p>
      <ReservationForm banquetId={banquetId} />
    </div>
  );
};

export default Reservation;
