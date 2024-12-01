import { useEffect, useState } from "react";
import "./ReservationForm.css";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ReservationForm = ({ banquetId = ""}) => {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    reservationDate: "",
    reservationTime: "",
    eventType: "",
    numberOfGuests: "",
    eventDetails: "",
    banquetName: "",
  });

  const [banquets, setBanquets] = useState([]);
  const [errors, setErrors] = useState({});

  const apiUrlUser = import.meta.env.VITE_API_URL_USER;
  const apiUrl = import.meta.env.VITE_API_URL;

  const hours = [0, 1, 2, 3, 4, 5];

  useEffect(() => {
    axios.get(`${apiUrl}banquetController.php?action=all`).then((response) => {
      setBanquets(response.data);
    });
  }, [apiUrl]);

  const validateForm = () => {
    let formErrors = {};
    const namePattern = /^[A-Za-z\s]{2,100}$/;
    const phonePattern = /^0[0-9]{9}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 letter, 1 number, 1 special character

    if (!namePattern.test(formData.firstName)) {
      formErrors.firstName = "First name must be 2-100 non-numeric characters.";
    }
    if (!namePattern.test(formData.lastName)) {
      formErrors.lastName = "Last name must be 2-100 non-numeric characters.";
    }
    if (!phonePattern.test(formData.phone)) {
      formErrors.phone =
        "Contact No must start with 0 and be exactly 10 digits.";
    }
    if (
      formData.email.length < 6 ||
      formData.email.length > 100 ||
      !emailPattern.test(formData.email)
    ) {
      formErrors.email =
        "Email must be 6-100 characters and a valid email address.";
    }
    if (formData.eventDetails.length > 5000) {
      formErrors.eventDetails = "Message must be 0-5000 characters.";
    }
    // Password validation
    if (!passwordPattern.test(formData.password)) {
      formErrors.password = "Password must be at least 8 characters long, include a letter, a number, and a special character.";
    }
    // Confirm password validation
    if (formData.password !== formData.confirm_password) {
      formErrors.confirm_password = "Passwords do not match.";
    }
    // validate numberOfGuests do not exceeds the capacity
    if (parseInt(formData.numberOfGuests) > formData.banquetCapacity) {
      formErrors.numberOfGuests = `Number of guests cannot exceed ${formData.banquetCapacity}.`;
    }

    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "banquetName") {
      // Find the selected banquet based on the selected name
      const selectedBanquet = banquets.find((banquet) => banquet.name === value);

      if (selectedBanquet) {
        // Update both the banquetName and numberOfGuests based on the selected banquet
        setFormData({
          ...formData,
          banquetName: value,
          numberOfGuests: selectedBanquet.capacity, // Keep within capacity
          banquetCapacity: selectedBanquet.capacity, // Store capacity for max value in input
        });
      }
    } else {
      // For other form fields, update them as usual
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          `${apiUrlUser}reservationController.php`,
          formData
        );
        if (
          response.status === 200 &&
          response.data.message === "Reservation successfully made"
        ) {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirm_password: "",
            phone: "",
            address: "",
            city: "",
            country: "",
            reservationDate: "",
            reservationTime: "",
            eventType: "",
            numberOfGuests: "",
            eventDetails: "",
            banquetName: "",
          }); // Reset all form fields
          navigate("/reservationSuccess");
        } else {
          console.error("Form submission failed", response.data.message);
        }
      } catch (error) {
        console.error("Form submission failed", error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="reservation-form-container" data-aos="fade-up">
      <h2>Book Your Banquet</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email (This will be used for login) :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password (This will be used for login) :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirm_password">Confirm Password:</label>
          <input
            type="password"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          {errors.confirm_password && <span className="error">{errors.confirm_password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Contact Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address Line 1:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Address Line 2:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventType">Event Type:</label>
          <input
            type="text"
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="banquetName">Banquet Name:</label>
          <select
            id="banquetName"
            className="form-select"
            name="banquetName"
            value={formData.banquetName || (banquetId ? banquets.find((b) => b.id === banquetId)?.name : "")}
            onChange={handleChange}
            required
          >
            <option value="">Select a Banquet</option>
            {banquets.map((banquet) => (
              <option key={banquet.id} value={banquet.name}>
                {banquet.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="reservationDate">Reservation Date:</label>
          <input
            type="date"
            id="reservationDate"
            name="reservationDate"
            value={formData.reservationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservationTime">Additonal Reservation Time:</label>
          <select
            id="reservationTime"
            className="form-select"
            name="reservationTime"
            value={formData.reservationTime}
            onChange={handleChange}
            required
          >
            <option value="">Select a duration</option>
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour} Hours - Rs.{(formData.banquetName ? banquets.find((b) => b.name === formData.banquetName)?.hourlyRate * hour : "") || (banquetId ? banquets.find((b) => b.id === banquetId)?.hourlyRate * hour : "")}/=
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="numberOfGuests">Number of Guests:</label>
          <input
            type="number"
            id="numberOfGuests"
            name="numberOfGuests"
            value={formData.numberOfGuests || (banquetId ? banquets.find((b) => b.id === banquetId)?.capacity : "")}
            onChange={handleChange}
            required
            max={formData.banquetCapacity || ''}
          />
          {errors.numberOfGuests && <span className="error">{errors.numberOfGuests}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="eventDetails">Message:</label>
          <textarea
            id="eventDetails"
            name="eventDetails"
            value={formData.eventDetails}
            onChange={handleChange}
            maxLength={5000}
          ></textarea>
          {errors.eventDetails && (
            <span className="error">{errors.eventDetails}</span>
          )}
        </div>
        <div className="button-wrapper">
          <button type="submit" className="btn-banquet">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
