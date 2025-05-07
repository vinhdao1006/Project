import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "./SideBar";
import AddScheduleForm from "./AddSchedule";

const DoctorSchedulePage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    try {
      const response = await axios.get("http://localhost:3001/api/calendar/events", {
        params: { start, end },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Failed to fetch Google Calendar events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      <aside className="col-span-2 bg-white shadow-lg p-4">
        <SideBar />
      </aside>

      <ScrollArea className="col-span-10 p-6">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Doctors' Schedule (Google Calendar)</h2>
          <AddScheduleForm onEventCreated={fetchEvents} /> {/* Refresh events on add */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.length === 0 ? (
              <p>No events scheduled for this month.</p>
            ) : (
              events.map((event, index) => (
                <div
                  key={index}
                  className="bg-white border rounded-lg shadow-md p-4 space-y-2"
                >
                  <h3 className="text-lg font-semibold">{event.summary}</h3>
                  {event.description && (
                    <p className="text-sm text-gray-600">{event.description}</p>
                  )}
                  <div className="text-sm text-gray-500">
                    Start: {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                    <br />
                    End: {new Date(event.end.dateTime || event.end.date).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DoctorSchedulePage;