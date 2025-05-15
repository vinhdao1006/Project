import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

const pastelColors = [
  { background: '#D1E7DD', text: '#2F4F2F' }, // Xanh lá nhạt, chữ xanh lá đậm
  { background: '#FEE2E2', text: '#DC2626' }, // Đỏ nhạt, chữ đỏ đậm
];

// Hàm gán màu dựa trên id
const assignColor = (id) => {
  const index = parseInt(id) % 2; // 0 (xanh lá), 1 (đỏ )
  return pastelColors[index];
};

// Dữ liệu ( thay bằng API sau)
const staticEvents = [
  {
    id: '1',
    title: 'Dr. John Smith',
    start: '2025-05-13T07:00:00',
    end: '2025-05-13T07:10:00',
    doctorId: '1',
    department: 'Cardiology',
    room: 'C4-501',
  },
  {
    id: '2',
    title: 'Dr. John Smith',
    start: '2025-05-13T08:00:00',
    end: '2025-05-13T09:30:00',
    doctorId: '1',
    department: 'Cardiology',
    room: 'A5-502',
  },
  {
    id: '3',
    title: 'Dr. John Smith',
    start: '2025-05-13T10:00:00',
    end: '2025-05-13T11:30:00',
    doctorId: '1',
    department: 'Cardiology',
    room: 'B1-203',
  },
  {
    id: '4',
    title: 'Dr. John Smith',
    start: '2025-05-14T07:00:00',
    end: '2025-05-14T10:00:00',
    doctorId: '1',
    department: 'Cardiology',
    room: 'B4-503',
  },
];

// CSS tùy chỉnh cho FullCalendar
const calendarStyles = `
  .fc {
    font-family: 'Inter', sans-serif;
  }
  .fc .fc-toolbar {
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .fc .fc-toolbar-title {
    font-size: 1.5rem;
    color: #111827;
  }
  .fc .fc-button {
    background-color: #FFFFFF !important;
    border: 1px solid #E5E7EB !important;
    border-radius: 6px !important;
    padding: 6px 12px !important;
    color: #6B7280 !important;
    margin: 10px;
  }
  .fc .fc-button:hover {
    background-color: #F9FAFB !important;
  }
  .fc .fc-button:focus {
    box-shadow: 0 0 0 3px rgba(209, 231, 221, 0.3) !important;
  }
  .fc .fc-daygrid-day {
    background: #FFFFFF;
    border: none !important;
  }
  .fc .fc-day-today {
    background: #FFFFFF !important; /* Bỏ lớp phủ màu vàng cho ngày hôm nay */
  }
  .fc .fc-daygrid-day-number {
    color: #6B7280;
    font-weight: 500;
    font-size: 0.875rem;
  }
  .fc .fc-daygrid-day:hover {
    background: #F9FAFB;
  }
  .fc .fc-timegrid-slot-label {
    color: #9CA3AF;
    font-weight: 400;
    font-size: 0.75rem;
    border: none !important;
  }
  .fc .fc-timegrid-slot {
    border: none !important;
    border-top: 1px dashed #E5E7EB !important;
    height: 80px !important;
  }
  .fc .fc-timegrid-col {
    border-right: 1px dashed #E5E7EB !important;
  }
  .fc .fc-event {
    border: none !important;
    border-radius: 10px !important;
    padding: 4px 6px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
    transition: background-color 0.2s ease !important;
  }
  .fc .fc-event:hover {
    filter: brightness(95%) !important;
  }
  .fc .fc-daygrid-day-top {
    justify-content: center;
  }
  .fc .fc-col-header-cell {
    background: #FFFFFF;
    color: #6B7280;
    font-weight: 500;
    font-size: 0.875rem;
    border: none !important;
    border-bottom: 1px solid #E5E7EB !important;
  }
  .fc .fc-event-main {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .fc .fc-event-title {
    font-weight: 700;
    font-size: 0.85rem;
  }
  .fc .fc-event-room,
  .fc .fc-event-time {
    font-size: 0.7rem;
    opacity: 0.8;
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .fc .fc-event-room i,
  .fc .fc-event-time i {
    font-size: 0.7rem;
  }
`;

function DoctorSchedule() {
  const [calendarEvents, setCalendarEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Thay thế bằng API thực tế khi có
        // const response = await fetch('http://localhost:3001/schedule');
        // const apiData = await response.json();
        const apiData = staticEvents; // Dùng dữ liệu tĩnh để kiểm tra

        // Gán màu dựa trên id
        const eventsWithColors = apiData.map(event => {
          const color = assignColor(event.id);
          console.log(`Event ID: ${event.id}, Assigned Background Color: ${color.background}, Text Color: ${color.text}`);
          return {
            ...event,
            backgroundColor: color.background,
            borderColor: color.background,
            textColor: color.text,
          };
        });

        setCalendarEvents(eventsWithColors);
      } catch (error) {
        console.error('Error fetching events:', error);
        const eventsWithColors = staticEvents.map(event => {
          const color = assignColor(event.id);
          return {
            ...event,
            backgroundColor: color.background,
            borderColor: color.background,
            textColor: color.text,
          };
        });
        setCalendarEvents(eventsWithColors);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="flex min-h-screen max-w-screen mx-auto">
      <style>{calendarStyles}</style>
      <Sidebar />
      <main className="flex-1 flex flex-col bg-white">
        <Header />
        <section className="flex-1 overflow-auto p-3 bg-[#F9FAFB]">
          <div className="bg-white rounded-xl shadow-sm p-3">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin]}
              initialView="timeGridWeek"
              events={calendarEvents}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              businessHours={{
                startTime: '07:00',
                endTime: '16:00',
                daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              }}
              slotMinTime="07:00:00"
              slotMaxTime="16:00:00"
              slotDuration="01:00:00"
              allDaySlot={false}
              eventMinHeight={60}
              height="auto"
              eventContent={(eventInfo) => {
                const event = eventInfo.event;
                const startTime = event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const endTime = event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const textColor = event.textColor || '#4B7A3F'; // Mặc định nếu không có textColor
                return (
                  <div style={{ color: textColor }}>
                    <div className="fc-event-title">{event.title}</div>
                    <div className="fc-event-room">
                      <i className="fas fa-map-marker-alt"></i>
                       {event.extendedProps.room}
                    </div>
                    <div className="fc-event-time">
                      <i className="far fa-clock"></i>
                      {startTime} - {endTime}
                    </div>
                  </div>
                );
              }}
              eventClick={(info) => {
                const event = info.event;
                alert(
                  `Doctor: ${event.title}\n` +
                  `Department: ${event.extendedProps.department}\n` +
                  `Room: ${event.extendedProps.room}\n` +
                  `Time: ${event.start.toLocaleString()} - ${event.end.toLocaleString()}\n`
                );
              }}
              dayHeaderClassNames="text-gray-600 font-semibold"
              slotLabelClassNames="text-gray-500"
              eventClassNames="rounded-lg shadow-sm border-none"
              dayCellClassNames="border-gray-200"
              slotLabelFormat={{
                hour: 'numeric',
                minute: '2-digit',
                meridiem: 'short',
              }}
              titleFormat={{
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default DoctorSchedule;