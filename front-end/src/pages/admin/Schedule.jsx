import React, { useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { ScrollArea } from "@/components/ui/scroll-area";
import SideBar from "./SideBar";
import AddScheduleForm from "./AddSchedule";
import Header from "./Header";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Draggable from "react-draggable";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';            
import 'tippy.js/animations/shift-away.css'; 
import 'tippy.js/themes/light.css';         


const DoctorSchedulePage = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchEvents = async () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

    try {
      const response = await axios.get("http://localhost:3001/api/calendar/events", {
        params: { start, end },
      });
      const formattedEvents = response.data.map(event => ({
        title: event.summary,
        start: event.start.dateTime || event.start.date,
        end: event.end.dateTime || event.end.date,
        extendedProps: {
          description: event.description,
        },
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch Google Calendar events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents(); 
  }, 10000); 

    return () => clearInterval(interval); 
  }, []);

  const handleAddClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="grid grid-cols-12 min-h-screen bg-gray-100">
      <aside className="col-span-2 bg-white shadow-lg p-4">
        <SideBar />
      </aside>

      <ScrollArea className="col-span-10 p-6 relative">
        <Header activeRouteName="Schedule" />

        <div className="flex justify-end mb-4">
          <Button onClick={handleAddClick}
                  className="bg-bimec-green hover:bg-bimec-heavy-green text-white">+ Add Schedule</Button>
        </div>

        <Button variant="outline" onClick={fetchEvents}>
          🔄 Refresh Calendar
        </Button>
        
        {/* Floating Add Schedule Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
            <Draggable>
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-xl w-full relative transform transition-all duration-300 scale-95 animate-fade-in-up">
                <button onClick={handleCloseForm} className="absolute top-2 right-2 text-gray-500 hover:text-black">
                  <X size={20} />
                </button>
                <AddScheduleForm
                  onEventCreated={() => {
                    fetchEvents();
                    setShowForm(false);
                  }}
                />
              </div>
            </Draggable>
          </div>
        )}

        {/* FullCalendar View with Hover Tooltip */}
        <div className="bg-white p-4 rounded shadow mt-6">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            events={events}
            height="auto"
            eventDidMount={(info) => {
              tippy(info.el, {
                content: `
                  <strong>${info.event.title}</strong><br/>
                  ${info.event.extendedProps.description || "No description"}<br/>
                  <span class='text-gray-500 text-xs'>
                    ${new Date(info.event.start).toLocaleString()}<br/>
                    to ${new Date(info.event.end).toLocaleString()}
                  </span>
                `,
                allowHTML: true,
                animation: 'shift-away',
                theme: 'light',
                interactive: true,
                delay: [100, 0],
                placement: 'top',
              });
            }}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DoctorSchedulePage;
