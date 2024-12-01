import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TitleBar from "./components/TitleBar";

export default function EditBanquet() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [functions, setFunctions] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL;
  // console.log(banquet);
  useEffect(() => {
    const fetchBanquet = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}banquetController.php?action=all&id=${id}`
        );
        const data = response.data;
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setHourlyRate(data.hourlyRate);
        setMediaUrl(data.image_url);
        setCapacity(data.capacity);
        setFunctions(data.functions);
      } catch (error) {
        console.error("Failed to fetch banquet", error);
      }
    };

    fetchBanquet();
  }, [id, apiUrl]);

  const handleMediaChange = (e) => {
    setMedia(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("file", media);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("hourlyRate", hourlyRate);
    formData.append("image_url", mediaUrl);
    formData.append("capacity", capacity);
    formData.append("functions", functions);

    console.log("id", id);
    console.log("name", name);
    console.log("description", description);
    console.log("price", price);
    console.log("hourlyRate", hourlyRate);
    console.log("image_url", mediaUrl);
    console.log("capacity", capacity);
    console.log("functions", functions);

    try {
      await axios
        .post(
          `${apiUrl}banquetController.php?action=update&id=${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          alert(res.data.message);
        });
      // alert("Banquet updated successfully");
      navigate("/admin/roomsAndHalls");
    } catch (error) {
      console.error("Failed to update banquet", error);
      alert("Failed to update banquet");
    }
  };

  const renderPreview = () => {
    if (mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".webm")) {
      return <video src={mediaUrl} controls width="500" className="mb-4" />;
    } else {
      return <img src={mediaUrl} alt="Current" width="500" className="mb-4" />;
    }
  };

  return (
    <main>
      <TitleBar title="Edit Banquet" />
      <section className="container my-4">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
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
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
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
              value={functions} // Set the value prop to the current state
              onChange={(e) => setFunctions(e.target.value)} // Update the state when the selection changes
              required
            > 
              <option value="" hidden>Select</option>
              <option value="Ac">AC</option>
              <option value="Non-Ac">Non-AC</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="media" className="form-label">
              Media
            </label>
            {mediaUrl && <div className="mb-2">{renderPreview()}</div>}
            <input
              type="file"
              className="form-control"
              id="media"
              onChange={handleMediaChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Banquet
          </button>
        </form>
      </section>
    </main>
  );
}
