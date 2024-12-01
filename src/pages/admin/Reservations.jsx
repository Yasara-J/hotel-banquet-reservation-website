import TitleBar from "./components/TitleBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Reservations() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const AuthToken = sessionStorage.getItem("adminToken");
  const Auth = AuthToken ? true : false;

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!Auth) {
      alert("Please login first");
      window.location.href = "/admin";
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}reservationController.php?all_data=true`
        );
        const data = response.data;
        console.log(data);
        setData(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [Auth, apiUrl]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, { html: '#reservations-table' });
    const currentDate = new Date();
    const dateTimeString = currentDate.toISOString().slice(0, 19).replace(/[-:T]/g, '');
    const fileName = `Reservations_${dateTimeString}.pdf`;
    doc.save(fileName);
  };

  if (!Array.isArray(data)) {
    return <div className='container text-center mt-5'>Loading...</div>;
  }

  return (
    <main>
      <TitleBar title="Reservations" />
      <section className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>All Reservations</h3>
          <button className="btn btn-primary" onClick={downloadPDF}>
            Download All Reservations
          </button>
        </div>
        <div className="table-responsive">
          <table
            className="table table-striped table-hover"
            id="reservations-table"
          >
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Email</th>
                <th scope="col">Customer Mobile</th>
                <th scope="col">Banquet Name</th>
                <th scope="col">Reservation Date</th>
                <th scope="col">Additional Reservation Time</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.R_ID}>
                  <td>{`${item.first_name} ${item.last_name}`}</td>
                  <td>
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </td>
                  <td>
                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </td>
                  <td>{item.banquet_name}</td>
                  <td>{item.check_in_date}</td>
                  <td>{item.duration}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/admin/reservation/${item.R_ID}`}>
                      <i className="bi bi-pencil-square"></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
