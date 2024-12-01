import { useState } from "react";
import TitleBar from "./components/TitleBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBanquet() {
  const [banquet, setBanquet] = useState({
    name: "",
    description: "",
    price: "",
    hourlyRate: "",
    capacity: "",
    functions: "",
  });
  const [image, setImage] = useState(null);
  const AuthToken = sessionStorage.getItem("adminToken");
  const Auth = AuthToken ? true : false;
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  if (!Auth) {
    alert("Please login first");
    window.location.href = "/admin";
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBanquet({ ...banquet, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", banquet.name);
    formData.append("description", banquet.description);
    formData.append("price", banquet.price);
    formData.append("hourlyRate", banquet.hourlyRate);
    formData.append("capacity", banquet.capacity);
    formData.append("functions", banquet.functions);

    try {
      await axios.post(`${apiUrl}banquetController.php?action=add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Banquet added successfully");
      navigate("/admin/roomsAndHalls");
    } catch (error) {
      console.error("Failed to add Banquet", error);
      alert("Failed to add Banquet");
    }
  };

  return (
    <main>
      <TitleBar title="Add Banquet" />
      <section className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={banquet.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={banquet.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Hall Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={banquet.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hourlyRate" className="form-label">
              Hourly Rate
            </label>
            <input
              type="number"
              className="form-control"
              id="hourlyRate"
              name="hourlyRate"
              value={banquet.hourlyRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="capacity" className="form-label">
              Capacity
            </label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={banquet.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="functions" className="form-label">
              Functions
            </label>
            <select
              className="form-control"
              id="functions"
              name="functions"
              value={banquet.functions}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden selected>Select</option>
              <option value="AC">AC</option>
              <option value="Non-AC">Non-AC</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              name="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Banquet
          </button>
        </form>
      </section>
    </main>
  );
}
