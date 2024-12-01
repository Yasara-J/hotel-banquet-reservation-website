import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Explore.css";
import "./Home.css";

import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [halls, setHalls] = useState([]);
  const [functionsFilter, setFunctionsFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}banquetController.php?action=all`
        );
        const banquets = response.data;
        setHalls(banquets);

        // Set max capacity and max price based on fetched data
        const maxCapacity = Math.max(
          ...banquets.map((hall) => parseInt(hall.capacity))
        );
        const maxPrice = Math.max(
          ...banquets.map((hall) => parseFloat(hall.price))
        );
        setMaxCapacity(maxCapacity);
        setMaxPrice(maxPrice);
        setCapacityFilter(maxCapacity); // Set default to max capacity
        setPriceFilter(maxPrice); // Set default to max price
      } catch (error) {
        console.error("Failed to fetch banquets", error);
      }
    };

    fetchBanquets();
  }, [apiUrl]);

  const filteredHalls = halls.filter((hall) => {
    return (
      hall.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (functionsFilter === "" || hall.functions === functionsFilter) &&
      parseInt(hall.capacity) <= capacityFilter &&
      parseFloat(hall.price) <= priceFilter
    );
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFunctionsChange = (event) => {
    setFunctionsFilter(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacityFilter(parseInt(event.target.value));
  };

  const handlePriceChange = (event) => {
    setPriceFilter(parseFloat(event.target.value));
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFunctionsFilter("");
    setCapacityFilter(maxCapacity);
    setPriceFilter(maxPrice);
  };

  const handleReserveClick = (banquetId) => {
    navigate(`/reservation?banquetId=${banquetId}`);
  };


  return (
    <div className="explore-container">
      <h1 className="explore-title">Our Banquet Halls</h1>
      <p className="explore-subtitle">
        Unlock the magic of your event with our enchanting <br />
        banquet hall experience.
      </p>
      <div className="container search-filter-home row mt-5 mb-4">
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Hall Name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="col-2">
          <label htmlFor="functions" className="form-label">
            Functions
          </label>
          <select
            className="form-select"
            id="functions"
            value={functionsFilter}
            onChange={handleFunctionsChange}
          >
            <option value="">All</option>
            <option value="Ac">AC</option>
            <option value="Non-Ac">Non-AC</option>
          </select>
        </div>
        <div className="col-3">
          <label htmlFor="capacityRange" className="form-label">
            Capacity
          </label>
          <input
            type="range"
            className="form-range"
            id="capacityRange"
            min="0"
            max={maxCapacity}
            value={capacityFilter}
            onChange={handleCapacityChange}
          />
          <span>{capacityFilter}</span>
        </div>
        <div className="col-2">
          <label htmlFor="priceRange" className="form-label">
            Price
          </label>
          <input
            type="range"
            className="form-range"
            id="priceRange"
            min="0"
            max={maxPrice}
            value={priceFilter}
            onChange={handlePriceChange}
          />
          <span>{priceFilter}</span>
        </div>
        <div className="col-2">
          <button className="btn btn-secondary" onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>
      </div>

      <section className="hotel-halls mb-5" data-aos="fade-up">
        <div className="container">
          <div className="row">
            {filteredHalls.map((hall) => (
              <div className="col-4 text-center" key={hall.id}>
                <div>
                  {hall.image_url.endsWith(".mp4") ||
                    hall.image_url.endsWith(".webm") ? (
                    <video
                      src={hall.image_url}
                      className="hall-img p-1"
                      alt={hall.name}
                      autoPlay={true}
                      loop
                      style={{
                        aspectRatio: "16/9",
                      }}
                    />
                  ) : (
                    <img
                      src={hall.image_url}
                      className="hall-img p-1"
                      alt={hall.name}
                      style={{
                        aspectRatio: "16/9",
                      }}
                    />
                  )}
                </div>
                <h1 className="hotel-description p-0">{hall.name}</h1>
                <p className="hotel-description">
                  {hall.description}
                  <br />
                  Starting Price: {hall.price}
                </p>
                <p>
                  Capacity: {hall.capacity} ({hall.functions})
                </p>
                <button className="btn-banquet" onClick={() => handleReserveClick(hall.id)}>
                  Reserve
                </button>

              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Explore;
