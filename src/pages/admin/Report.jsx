import TitleBar from "./components/TitleBar";
import axios from "axios";
import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Chart } from "chart.js/auto";
import './Report.css';

export default function Report() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const AuthToken = sessionStorage.getItem("adminToken");
  const Auth = AuthToken ? true : false;

  const [data, setData] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  const [peakDate, setPeakDate] = useState("");
  const [highDemandHall, setHighDemandHall] = useState("");
  const [commonPurpose, setCommonPurpose] = useState("");
  const [averageGuestCount, setAverageGuestCount] = useState(0);
  const [highestGuestCountReservation, setHighestGuestCountReservation] =
    useState({});
  const [mostCommonGuestCount, setMostCommonGuestCount] = useState({});

  console.log(data);
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
        const reservations = response.data;
        setData(reservations);

        const groupedData = groupByMonth(reservations);
        setMonthlyData(groupedData);

        const peak = calculatePeakDate(reservations);
        setPeakDate(peak);

        const highDemand = calculateHighDemandHall(reservations);
        setHighDemandHall(highDemand);

        const common = calculateCommonPurpose(reservations);
        setCommonPurpose(common);

        const averageGuestCount = calculateAverageGuestCount(reservations);
        setAverageGuestCount(averageGuestCount);

        const highestGuestCountReservation =
          findHighestGuestCount(reservations);
        setHighestGuestCountReservation(highestGuestCountReservation);

        const mostCommonGuestCount = findMostCommonGuestCount(reservations);
        setMostCommonGuestCount(mostCommonGuestCount);

        renderChart(groupedData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, [Auth, apiUrl]);

  const groupByMonth = (reservations) => {
    const result = {
      Jan: [],
      Feb: [],
      Mar: [],
      Apr: [],
      May: [],
      Jun: [],
      Jul: [],
      Aug: [],
      Sep: [],
      Oct: [],
      Nov: [],
      Dec: [],
    };
    reservations.forEach((reservation) => {
      const date = new Date(reservation.check_in_date);
      const month = date.toLocaleString("default", { month: "short" });
      if (result[month]) result[month].push(reservation);
    });
    return result;
  };

  const calculatePeakDate = (reservations) => {
    const dateCounts = reservations.reduce((acc, reservation) => {
      const date = reservation.check_in_date;
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const peakDate = Object.keys(dateCounts).reduce((a, b) =>
      dateCounts[a] > dateCounts[b] ? a : b
    );

    return peakDate;
  };

  const calculateHighDemandHall = (reservations) => {
    const hallCounts = reservations.reduce((acc, reservation) => {
      const hall = reservation.banquet_name;
      acc[hall] = (acc[hall] || 0) + 1;
      return acc;
    }, {});

    const highDemandHall = Object.keys(hallCounts).reduce((a, b) =>
      hallCounts[a] > hallCounts[b] ? a : b
    );

    return highDemandHall;
  };

  const calculateCommonPurpose = (reservations) => {
    const purposeCounts = reservations.reduce((acc, reservation) => {
      const purpose = reservation.event_type;
      acc[purpose] = (acc[purpose] || 0) + 1;
      return acc;
    }, {});

    const commonPurpose = Object.keys(purposeCounts).reduce((a, b) =>
      purposeCounts[a] > purposeCounts[b] ? a : b
    );

    return commonPurpose;
  };

  const calculateAverageGuestCount = (reservations) => {
    if (reservations.length === 0) return 0;

    const totalGuests = reservations.reduce(
      (acc, reservation) => acc + reservation.number_of_guests,
      0
    );
    return (totalGuests / reservations.length).toFixed(2); // Rounded to 2 decimal places
  };

  const findHighestGuestCount = (reservations) => {
    if (reservations.length === 0) return null;

    let highest = reservations[0];

    reservations.forEach((reservation) => {
      if (reservation.number_of_guests > highest.number_of_guests) {
        highest = reservation;
      }
    });

    return highest;
  };

  const findMostCommonGuestCount = (reservations) => {
    if (reservations.length === 0) return null;

    const guestCounts = reservations.map(
      (reservation) => reservation.number_of_guests
    );
    const countMap = {};

    guestCounts.forEach((count) => {
      if (countMap[count]) {
        countMap[count]++;
      } else {
        countMap[count] = 1;
      }
    });

    const mostCommon = Object.keys(countMap).reduce((a, b) =>
      countMap[a] > countMap[b] ? a : b
    );

    return {
      guestCount: parseInt(mostCommon),
      occurrences: countMap[mostCommon],
    };
  };

  const renderChart = (data) => {
    const ctx = document.getElementById("reservationsChart").getContext("2d");

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy(); // Destroy existing chart instance
    }

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "# of Reservations",
            data: Object.values(data).map((monthData) => monthData.length),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  const downloadCurrentMonthPDF = () => {
    const doc = new jsPDF();
    const currentMonth = new Date().toLocaleString("default", {
      month: "short",
    });
    const currentMonthData = monthlyData[currentMonth] || [];
    doc.text(`Reservations for ${currentMonth}`, 10, 10);
    autoTable(doc, {
      head: [
        [
          "R_ID",
          "Customer Name",
          "Customer Email",
          "Customer Mobile",
          "Banquet Name",
          "Reservation Date",
          "Reservation Time",
          "Status",
        ],
      ],
      body: currentMonthData.map((item) => [
        item.R_ID,
        `${item.first_name} ${item.last_name}`,
        item.email,
        item.phone,
        item.banquet_name,
        item.check_in_date,
        item.duration,
        item.status,
      ]),
    });
    const currentDate = new Date();
    const dateTimeString = currentDate
      .toISOString()
      .slice(0, 19)
      .replace(/[-:T]/g, "");
    const fileName = `CurrentMonth_Reservations_${dateTimeString}.pdf`;
    doc.save(fileName);
  };

  return (
    <main>
  <TitleBar title="Report And Analytics" />
  
  {/* First Section: Additional Insights */}
  <section>
    <div className="report-container my-5">
      <h4>Additional Insights</h4>
      <div className="row1 mt-4 gap-2">
        <div className="card col1 p-4">
          <h3>{peakDate}</h3>
          <strong>Peak Date</strong>
        </div>
        <div className="card col1 p-4">
          <h3>{highDemandHall}</h3>
          <strong>High-Demand Hall</strong>
        </div>
        <div className="card col1 p-4">
          <h3>{commonPurpose}</h3>
          <strong>Common Purpose of Reservation</strong>
        </div>
      </div>
    </div>
  </section>

  {/* Second Section: Additional Insights */}
  <section>
    <div className="report-container my-5">
      <h4>Additional Insights</h4>
      <div className="row1 mt-4 gap-2">
        <div className="card col1 p-4">
          <h3>{Math.floor(averageGuestCount)}</h3>
          <strong>Average Guest Count Per Reservation</strong>
        </div>
        <div className="card col1 p-4">
          <h3>{highestGuestCountReservation.number_of_guests}</h3>
          <strong>Highest Guest Count in a Reservation</strong>
        </div>
        <div className="card col1 p-4">
          <h3>{mostCommonGuestCount.guestCount}</h3>
          <p>{`(Occurred ${mostCommonGuestCount.occurrences} times)`}</p>
          <strong>Most Common Guest Count</strong>
        </div>
      </div>
    </div>
  </section>

  {/* Chart Section */}
  <section className="report-container my-5">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h3>Reservations Chart</h3>
      <div>
        <button className="btn btn-secondary" onClick={downloadCurrentMonthPDF}>
          Download Current Month Reservations
        </button>
      </div>
    </div>
    <canvas id="reservationsChart" width="400" height="200"></canvas>
  </section>
</main>

  );
}
