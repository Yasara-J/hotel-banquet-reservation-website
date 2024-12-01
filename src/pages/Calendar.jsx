import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}reservationController.php?all_data=true`
        );

        const filteredEvents = response.data
          .filter(item => item.status === 'Confirmed') // Filter by status
          .map(item => ({
            title: `Reserved Hall Name: ${item.banquet_name} `,
            start: new Date(item.check_in_date),
            end: new Date(item.duration),
          }));

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);


  return (
    <main>
      <section className="container h-full my-5">
        <h3 className="fw-bold mb-5 text-center">Upcoming Events</h3>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
        />
      </section>
    </main>
  );
}

export default Calendar
