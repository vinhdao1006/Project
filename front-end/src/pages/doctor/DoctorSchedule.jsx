import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, X } from "lucide-react";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/themes/light.css";
import Draggable from "react-draggable";

// Dữ liệu ( thay bằng API sau)
const staticEvents = [
  {
    id: "1",
    title: "Dr. John Smith",
    start: "2025-05-13T07:00:00",
    end: "2025-05-13T07:10:00",
    extendedProps: {
      doctorId: "1",
      department: "Cardiology",
      room: "C4-501",
    },
  },
  {
    id: "2",
    title: "Dr. John Smith",
    start: "2025-05-13T08:00:00",
    end: "2025-05-13T09:30:00",
    extendedProps: {
      doctorId: "1",
      department: "Cardiology",
      room: "A5-502",
    },
  },
  {
    id: "3",
    title: "Dr. John Smith",
    start: "2025-05-13T10:00:00",
    end: "2025-05-13T11:30:00",
    extendedProps: {
      doctorId: "1",
      department: "Cardiology",
      room: "B1-203",
    },
  },
  {
    id: "4",
    title: "Dr. John Smith",
    start: "2025-05-14T07:00:00",
    end: "2025-05-14T10:00:00",
    extendedProps: {
      doctorId: "1",
      department: "Cardiology",
      room: "B4-503",
    },
  },
];

// Custom css for FullCalendar
const calendarStyles = `
  .fc {
    font-family: "Open Sans", sans-serif;
    --fc-border-color: #E5E7EB;
    --fc-today-bg-color: rgba(244, 255, 243, 0.5);
  }
  
  .fc .fc-toolbar {
    padding-bottom: 1rem;
  }
  
  .fc .fc-toolbar-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
  }
  
  .fc .fc-button {
    background-color: white !important;
    border: 1px solid #E5E7EB !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
    color: #4B5563 !important;
    font-weight: 500 !important;
    padding: 0.5rem 0.75rem !important;
    margin-right: 0.25rem !important;
    transition: all 0.2s ease !important;
    font-size: 0.875rem !important;
  }

  .fc .fc-today-button {
    background-color: #F9FAFB !important;
    font-weight: 500 !important;
  }
  
  .fc .fc-button:hover {
    background-color: #F9FAFB !important;
    border-color: #D1D5DB !important;
  }
  
  .fc .fc-button-primary:not(:disabled).fc-button-active,
  .fc .fc-button-primary:not(:disabled):active {
    background-color: #F4FFF3 !important;
    border-color: #5f8d4d !important;
    color: #5f8d4d !important;
  }
  
  .fc-day-today {
    background: var(--fc-today-bg-color) !important;
  }
  
  .fc-event {
    background-color: #5f8d4d !important;
    border-color: #5f8d4d !important;
    border-radius: 0.25rem !important;
    padding: 0.125rem 0.375rem !important;
    font-size: 0.75rem !important;
    cursor: pointer !important;
    transition: all 0.2s ease !important;
    color: white !important;
  }
  
  .fc-event:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    filter: brightness(105%) !important;
  }
  
  .fc-daygrid-event {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    color: white !important;
    padding: 2px 4px !important;
  }
  
  .fc th {
    padding: 0.75rem 0 !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    font-size: 0.75rem !important;
    color: #6B7280 !important;
  }
  
  .fc-timegrid-slot {
    height: 4.5rem !important;
  }
  
  .fc-timegrid-slot-label {
    font-size: 0.75rem !important;
    color: #9CA3AF !important;
  }
  
  /* Tippy Customization */
  .tippy-box[data-theme~='calendar'] {
    background-color: white;
    color: #111827;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 0;
    border: 1px solid #E5E7EB;
  }
  
  .tippy-box[data-theme~='calendar'] .tippy-content {
    padding: 0;
  }
`;

function DoctorSchedule() {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const calendarRef = useRef(null);

  const fetchEvents = async () => {
    setIsRefreshing(true);
    try {
      // Thay thế bằng API thực tế khi có
      // const response = await fetch('http://localhost:3001/schedule');
      // const apiData = await response.json();
      const apiData = staticEvents; // Dùng dữ liệu tĩnh để kiểm tra

      // Format events for the calendar
      const formattedEvents = apiData.map((event) => ({
        ...event,
        backgroundColor: "#5f8d4d",
        borderColor: "#5f8d4d",
        textColor: "white",
      }));

      setCalendarEvents(formattedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      // Fallback to static data in case of error
      const formattedEvents = staticEvents.map((event) => ({
        ...event,
        backgroundColor: "#5f8d4d",
        borderColor: "#5f8d4d",
        textColor: "white",
      }));
      setCalendarEvents(formattedEvents);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchEvents();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleAddClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  return (
    <div className="flex flex-1 min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col">
        <Header />

        <div className="p-5 flex-1 overflow-auto">
          {/* Control Bar */}
          <div className="flex items-center justify-end mb-4">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleAddClick}
                className="bg-bimec-green hover:bg-bimec-heavy-green text-white flex items-center gap-1.5 rounded-lg h-9 px-3"
                size="sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Schedule
              </Button>

              <Button
                variant="outline"
                onClick={fetchEvents}
                disabled={isRefreshing}
                size="sm"
                className="flex items-center gap-1.5 rounded-lg border-gray-200 text-gray-700 hover:bg-gray-50 h-9 px-3"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                <span className="sr-only md:not-sr-only">Refresh</span>
              </Button>
            </div>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl shadow-sm px-4 pt-4 pb-2 border border-gray-100">
            <style>{calendarStyles}</style>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              views={{
                timeGrid: {
                  dayHeaderFormat: {
                    weekday: "short",
                    month: "numeric",
                    day: "numeric",
                    omitCommas: true,
                  },
                },
              }}
              events={calendarEvents}
              slotMinTime="07:00:00"
              slotMaxTime="16:00:00"
              allDaySlot={false}
              slotDuration="01:00:00"
              snapDuration="00:15:00"
              height={720}
              businessHours={{
                daysOfWeek: [1, 2, 3, 4, 5, 6], // Monday - Saturday
                startTime: "7:00",
                endTime: "16:00",
              }}
              eventDidMount={(info) => {
                tippy(info.el, {
                  content: `
                    <div class="p-3">
                      <div class="font-semibold text-gray-900 mb-2">${
                        info.event.title
                      }</div>
                      <div class="text-sm text-gray-600 mb-1">
                        Room: ${info.event.extendedProps.room}
                      </div>
                      <div class="text-sm text-gray-600 mb-2">
                        Department: ${info.event.extendedProps.department}
                      </div>
                      <div class="flex items-center text-xs text-gray-500">
                        ${new Date(info.event.start).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })} - 
                        ${new Date(info.event.end).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  `,
                  allowHTML: true,
                  animation: "shift-away",
                  theme: "calendar",
                  interactive: true,
                  delay: [100, 0],
                  placement: "top",
                  appendTo: document.body,
                  maxWidth: 300,
                });
              }}
            />
          </div>
        </div>
      </main>

      {/* Add Schedule Form (Placeholder) */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 transition-all duration-300 backdrop-blur-sm">
          <Draggable handle=".handle">
            <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full relative transform transition-all duration-300 animate-in fade-in zoom-in-95 border border-gray-200">
              <div className="handle p-5 border-b border-gray-100 flex justify-between items-center cursor-move bg-gradient-to-r from-white to-gray-50">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 ml-2">
                    Add New Schedule
                  </h3>
                </div>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors hover:bg-gray-100 p-1 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                {/* Form placeholder - would be replaced with actual form component */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Doctor
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-bimec-green focus:border-bimec-green">
                      <option value="">Select Doctor</option>
                      <option value="1">Dr. John Smith</option>
                      <option value="2">Dr. Jane Doe</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Room
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. C4-501"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-bimec-green focus:border-bimec-green"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-bimec-green focus:border-bimec-green"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-bimec-green focus:border-bimec-green"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
                <button
                  onClick={handleCloseForm}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors mr-2"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-bimec-green hover:bg-bimec-heavy-green text-white text-sm font-medium rounded-lg transition-colors">
                  Save Schedule
                </button>
              </div>
            </div>
          </Draggable>
        </div>
      )}
    </div>
  );
}

export default DoctorSchedule;
