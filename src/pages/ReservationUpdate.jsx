import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/ReservationForm.css';
import './ReservationUpdate.css';

const ReservationUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    banquet_name: '',
    check_in_date: '',
    duration: '',
    number_of_guests: '',
    event_details: '',
  });

  const apiUrlUser = import.meta.env.VITE_API_URL_USER;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrlUser}view.php?reservation_id=${id}`, {
        });
        const data = response.data;
        if (data) {
          setFormData(data);
        } else {
          console.error('No data found');
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, [id, apiUrlUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.post(`${apiUrlUser}update.php`, formData, {
          params: { id },
        });
        navigate('/reservationUpdateSuccess');
      } catch (error) {
        console.error('Update failed', error);
      }
    } else {
      setErrors(formErrors);
    }
  };

  const handleCancel = () => {
    navigate('/reservations');
  };

  const validateForm = () => {
    let formErrors = {};
    
    if (!formData.banquet_name || formData.banquet_name.length < 2 || formData.banquet_name.length > 100) {
      formErrors.banquet_name = 'Banquet name must be 2-100 characters long.';
    }
    if (!formData.check_in_date) {
      formErrors.check_in_date = 'Reservation date is required.';
    }
    if (!formData.duration) {
      formErrors.duration = 'Reservation Time is required.';
    }
    if (isNaN(formData.number_of_guests) || formData.number_of_guests <= 0) {
      formErrors.number_of_guests = 'Number of guests must be a positive number.';
    }
    if (formData.event_details.length > 5000) {
      formErrors.event_details = 'Event details must be 0-5000 characters long.';
    }
    
    return formErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="reservationupdate-form-container">
      <h2>Update Your Reservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="banquet_name">Banquet Name:</label>
          <input
            type="text"
            id="banquet_name"
            name="banquet_name"
            value={formData.banquet_name}
            onChange={handleChange}
            placeholder="Enter banquet name"
            required
          />
          {errors.banquet_name && <span className="error">{errors.banquet_name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="check_in_date">Check-in Date:</label>
          <input
            type="date"
            id="check_in_date"
            name="check_in_date"
            value={formData.check_in_date}
            onChange={handleChange}
            required
          />
          {errors.check_in_date && <span className="error">{errors.check_in_date}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Additional Reservation Time:</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          {errors.duration && <span className="error">{errors.duration}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="number_of_guests">Number of Guests:</label>
          <input
            type="number"
            id="number_of_guests"
            name="number_of_guests"
            value={formData.number_of_guests}
            onChange={handleChange}
            min="1"
            required
          />
          {errors.number_of_guests && <span className="error">{errors.number_of_guests}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="event_details">Event Details:</label>
          <textarea
            id="event_details"
            name="event_details"
            value={formData.event_details}
            onChange={handleChange}
            placeholder="Enter event details"
          ></textarea>
          {errors.event_details && <span className="error">{errors.event_details}</span>}
        </div>
        <div className="button-wrapper-update">
          <button type="submit" className="btn-banquet">Update</button>
          <button type="button" onClick={handleCancel} className="btn-banquet">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ReservationUpdate;
