import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../components/DeleteModal';
import './View.css';

const View = () => {
  const [data, setData] = useState({ customer: null, reservations: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL_USER;

  useEffect(() => {
    const fetchData = async () => {
      const customerData = sessionStorage.getItem('customer');
      if (!customerData) {
        navigate('/login');
        return;
      }

      const customerId = JSON.parse(customerData).id;

      try {
        const response = await axios.get(`${apiUrl}view.php?customer_id=${customerId}`);
        if (response.data.success === false) {
          setError(response.data.message);
        } else {
          setData(response.data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, apiUrl]);

  const handleDeleteClick = (id) => {
    setSelectedReservationId(id);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedReservationId(null);
  };

  const handleUpdate = (id) => {
    navigate(`/reservationUpdate/${id}`);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}delete.php?id=${selectedReservationId}`);
      setShowModal(false);
      handleRefresh();
    } catch (error) {
      console.error('Failed to delete reservation', error);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('customer');
    navigate('/login');
  };


  if (loading) return <div className='container text-center fw-bold mt-5'>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="view">
      <div className="container my-5">
        {/* Customer Card */}
        {data.customer && (
          <div className="customer-card">
            <h2 className='fw-bold'>{data.customer.first_name} {data.customer.last_name}</h2>
            <p>Email: {data.customer.email}</p>
            <p>Phone: {data.customer.phone}</p>
            <p>Address: {data.customer.address}</p>
            <p>City: {data.customer.city}</p>
            <p>Country: {data.customer.country}</p>
          </div>
        )}

        {/* Reservations Table */}
        <h2 className="view-header-txt">Your Reservations</h2>
        <table className="view-table">
          <thead>
            <tr>
              <th className="thead-view-txt">Banquet Name</th>
              <th className="thead-view-txt">Reservation Date</th>
              <th className="thead-view-txt">Additional Reservation Time</th>
              <th className="thead-view-txt">Number of Guests</th>
              <th className="thead-view-txt">Total Price</th>
              <th className="thead-view-txt">Event Details</th>
              <th className="thead-view-txt">Approval</th>
              <th className="thead-view-txt">Update</th>
              <th className="thead-view-txt">Cancel Reservation</th>
            </tr>
          </thead>
          <tbody>
            {data.reservations.map((item) => (
              <tr key={item.id}>
                <td>{item.banquet_name}</td>
                <td>{item.check_in_date}</td>
                <td>{item.duration}</td>
                <td>{item.number_of_guests}</td>
                <td>{item.total_price}</td>
                <td>{item.event_details}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(item.id)}
                    className="update-btn"
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteClick(item.id)}
                    className="delete-btn"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className='btn btn-danger bg-danger mt-5' onClick={handleLogout}>LogOut</button>

        <DeleteModal
          showModal={showModal}
          handleClose={handleClose}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default View;
