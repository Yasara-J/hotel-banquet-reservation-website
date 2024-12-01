import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TitleBar from "./components/TitleBar";
import axios from "axios";
import "./RoomsAndHalls.css";

export default function RoomsAndHalls() {
  const [banquets, setBanquets] = useState([]);

  const AuthToken = sessionStorage.getItem("adminToken");
  const Auth = AuthToken ? true : false;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!Auth) {
      alert("Please login first");
      window.location.href = "/admin";
      return;
    }

    const fetchBanquets = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}banquetController.php?action=all`
        );
        setBanquets(response.data);
      } catch (error) {
        console.error("Failed to fetch banquets", error);
      }
    };

    fetchBanquets();
  }, [Auth, apiUrl]);

  const handleDeleteBanquet = async (id) => {
    try {
      await axios.delete(
        `${apiUrl}banquetController.php?action=delete&id=${id}`
      );
      setBanquets(banquets.filter((banquet) => banquet.id !== id));
      alert("Banquet deleted successfully");
    } catch (error) {
      console.error("Failed to delete Banquet", error);
      alert("Failed to delete Banquet");
    }
  };

  if (!Array.isArray(banquets)) {
    return <div className="container text-center mt-5">Loading...</div>;
  }

  return (
    <main>
      <TitleBar title="Rooms And Halls" />
      <section className="container">
        <div>
          <Link className="btn btn-primary" to="/admin/addBanquet">
            Add Banquet
          </Link>
          <a
            className="btn btn-primary ms-3"
            href="https://www.immersity.ai/"
            target="_blank"
          >
            Convert Image to 3D
          </a>
        </div>
        <div className="table-responsive mt-4">
          <table className="table table-striped table-hover" id="banquets-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Hall Price</th>
                <th scope="col">Hourly Rate</th>
                <th scope="col">Capacity</th>
                <th scope="col">Functions</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banquets.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.hourlyRate}</td>
                  <td>{item.capacity}</td>
                  <td>{item.functions}</td>
                  <td>
                    <div className="d-flex">
                      <Link
                        className="p-2"
                        to={`/admin/editBanquet/${item.id}`}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        title="Double click to delete"
                        className="btn p-2 m-0 ms-3 btn-danger bg-danger"
                        onDoubleClick={() => handleDeleteBanquet(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Steps to Convert Image to 3D */}
        <div className="conversion-steps mt-5">
          <h2>Steps to Convert Image to 3D Using Immersity.ai</h2>
          <ol>
            <li>Click the <strong>"Convert Image to 3D"</strong> button above, which will redirect you to the <a href="https://www.immersity.ai/" target="_blank">Immersity.ai</a> website.</li>
            <li>Once on the website, sign up or log in to your Immersity.ai account if you haven’t already.</li>
            <li>After logging in, navigate to the section that allows you to upload an image for 3D conversion.</li>
            <li>Click on the <strong>"Upload"</strong> button to choose the image from your device that you want to convert to 3D.</li>
            <li>Once uploaded, Immersity.ai will automatically process the image and generate a 3D model for you.</li>
            <li>You can preview the 3D model and make any necessary adjustments using the tools provided on the platform.</li>
            <li>Once you are satisfied with the 3D model, you can save it to your account or download it to your device.</li>
          </ol>
        </div>
      </section>
    </main>
  );
}