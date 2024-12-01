import { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TitleBar from "./components/TitleBar";

const CalendarComponent = () => {

  const AuthToken = sessionStorage.getItem("adminToken");
  const Auth = AuthToken ? true : false;

  const apiUrl = import.meta.env.VITE_API_URL;

  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  if (!Auth) {
    alert("Please login first");
    window.location.href = "/admin";
    return null;
  }

  /*sending mail*/

  const handleSendEmails = async () => {
    if (!date || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}sendEmail.php`, {
        date: date,
        message: message,
      });

      if (response.data.success) {
        alert(response.data.success);
        setDate("")
        setMessage("")
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Failed to send emails", error);
      alert("Failed to send emails");
    }
  };

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}reservationController.php?all_data=true`
        );

        const newEvents = response.data.map((item) => ({
          title: `<h5><b>Hall Name: ${item.banquet_name}<b/><h5/>`,
          secondTitle: `Customer Name: ${item.first_name} ${item.last_name}`,
          status: `<b>${item.status}<b/>`,
          start: new Date(item.check_in_date),
          end: new Date(item.duration),
        }));

        setEvents(newEvents);
      } catch (error) {
        console.error("Error fetching reservation data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handleDateClick = (info) => {
    const clickedDate = info.dateStr;
    const clickedEvents = events.filter(
      (event) =>
        clickedDate >= event.start.toISOString().split("T")[0] &&
        clickedDate <= event.end.toISOString().split("T")[0]
    );

    if (clickedEvents.length > 0) {
      const titles = clickedEvents
        .map((event) => {
          // Strip HTML tags using a regex
          return event.title.replace(/<\/?[^>]+(>|$)/g, "");
        })
        .join(", ");

      alert(
        `Events on ${clickedDate} | ${titles} | Status: ${clickedEvents[0].status.replace(
          /<\/?[^>]+(>|$)/g,
          ""
        )}`
      );
      info.dayEl.style.backgroundColor = "#A0FF9A";
    } else {
      alert(`No events on ${clickedDate}`);
      info.dayEl.style.backgroundColor = "#FF8C76";
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: eventInfo.event.title }} />
        <div
          dangerouslySetInnerHTML={{
            __html: eventInfo.event.extendedProps.secondTitle,
          }}
        />
        <div
          dangerouslySetInnerHTML={{
            __html: eventInfo.event.extendedProps.status,
          }}
        />
      </div>
    );
  };

  if (!Auth) {
    alert("Please login first");
    window.location.href = "/admin";
    return null; // or any other appropriate return value
  }

  return (
    <main>
      <TitleBar title="Dashboard" />
      <section className="container mb-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              <div className="mb-3">
                <label htmlFor="date" className="form-label">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="btn btn-primary w-100" onClick={handleSendEmails}>
                Send Emails
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="container mb-5">
        <h3 className="fw-bold mb-5 text-center">Upcoming Events</h3>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          eventContent={renderEventContent} // Custom rendering
        />
      </section>
    </main>
  );
};

export default CalendarComponent;

