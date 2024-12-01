import TitleBar from "./components/TitleBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ReservationEdit() {
  const { id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


  const [reservation, setReservation] = useState({
    R_ID: "",
    customer_id: "",
    banquet_name: "",
    check_in_date: "",
    duration: "",
    number_of_guests: "",
    total_price: "",
    status: "",
    reservation_created_at: "",
    event_details: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    customer_created_at: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}reservationController.php?reservation_id=${id}`
        );
        console.log(response.data);
        setReservation(response.data[0]);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchData();
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const response = await axios.put(
        `${apiUrl}reservationController.php?reservation_id=${id}`,
        reservation
      );
      if (response.status === 200) {
        alert(response.data.message);
        navigate("/admin/reservations");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();    
    alert("Do you want to delete this reservation?");

    try {
      const response = await axios.delete(
        `${apiUrl}reservationController.php?reservation_id=${id}`
      );
      if (response.status === 200) {
        alert(response.data.message);
        window.location.href = "/admin/reservations";
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };


  return (
    <main>
      <TitleBar title="Reservation Edit" />
      <section>
        <div className="container mb-5">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="R_ID" className="form-label">
                  Reservation ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="R_ID"
                  name="R_ID"
                  value={reservation.R_ID}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="customer_id" className="form-label">
                  Customer ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="customer_id"
                  name="customer_id"
                  value={reservation.customer_id}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="first_name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first_name"
                  name="first_name"
                  value={reservation.first_name}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="last_name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last_name"
                  name="last_name"
                  value={reservation.last_name}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={reservation.email}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={reservation.password}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={reservation.phone}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={reservation.address}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={reservation.city}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  name="country"
                  value={reservation.country}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="banquet_name" className="form-label">
                  Banquet Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="banquet_name"
                  name="banquet_name"
                  value={reservation.banquet_name}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="check_in_date" className="form-label">
                  Check-In Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="check_in_date"
                  name="check_in_date"
                  value={reservation.check_in_date}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="duration" className="form-label">
                  Reservation Time
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="duration"
                  name="duration"
                  value={reservation.duration}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="number_of_guests" className="form-label">
                  Number of Guests
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="number_of_guests"
                  name="number_of_guests"
                  value={reservation.number_of_guests}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="total_price" className="form-label">
                  Total Price
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="total_price"
                  name="total_price"
                  value={reservation.total_price}
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={reservation.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="event_details" className="form-label">
                  Event Details
                </label>
                <textarea
                  className="form-control"
                  id="event_details"
                  name="event_details"
                  rows="3"
                  value={reservation.event_details}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update Reservation
                </button>
                <button className="btn ms-3 btn-danger bg-danger" onClick={handleDelete}>Delete Reservation</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
