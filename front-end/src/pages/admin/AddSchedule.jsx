import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  CalendarDays,
  Clock,
  User,
  FileText,
  ChevronDown as ChevronDownIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";

// Calendar helper functions
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Calendar Component
function Calendar({ selectedDate, onChange, label, dateError }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  // Get today's date to disable past dates
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    // Set initial month to current month or selected date's month
    if (selectedDate) {
      const date = new Date(selectedDate);
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    } else {
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [selectedDate]);

  useEffect(() => {
    // Close calendar when clicking outside
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Functions to navigate between months
  const prevMonth = () => {
    setCurrentMonth((prev) => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };

  const nextMonth = () => {
    setCurrentMonth((prev) => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };

  // Build calendar dates
  const buildCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month and how many days to show from previous month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Last day of month (0th day of next month = last day of current month)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Previous month days to display
    const daysFromPrevMonth = firstDayOfMonth;

    // Calculate previous month's days
    const prevMonthDays = [];
    if (daysFromPrevMonth > 0) {
      const daysInPrevMonth = new Date(year, month, 0).getDate();
      for (
        let i = daysInPrevMonth - daysFromPrevMonth + 1;
        i <= daysInPrevMonth;
        i++
      ) {
        const date = new Date(year, month - 1, i);
        prevMonthDays.push({
          date,
          day: i,
          isCurrentMonth: false,
          isDisabled: date < today,
        });
      }
    }

    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      currentMonthDays.push({
        date,
        day: i,
        isCurrentMonth: true,
        isDisabled: date < today,
      });
    }

    // Next month days to fill out the calendar
    const nextMonthDays = [];
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length;
    const daysNeeded = 42 - totalDaysDisplayed; // Show 6 rows of 7 days

    for (let i = 1; i <= daysNeeded; i++) {
      const date = new Date(year, month + 1, i);
      nextMonthDays.push({
        date,
        day: i,
        isCurrentMonth: false,
        isDisabled: false, // Future dates are always enabled
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const calendarDays = buildCalendar();

  // Format date for display
  const formatDisplayDate = () => {
    if (!selectedDate) return "Select date";

    const date = new Date(selectedDate);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  // Determine if a day is selected
  const isSelected = (date) => {
    if (!selectedDate) return false;

    const selected = new Date(selectedDate);
    return (
      date.getFullYear() === selected.getFullYear() &&
      date.getMonth() === selected.getMonth() &&
      date.getDate() === selected.getDate()
    );
  };

  // Handle day selection
  const handleSelectDay = (day) => {
    if (day.isDisabled) return;

    // Format date as YYYY-MM-DD for input value - FIXED VERSION to prevent timezone issues
    const date = day.date;
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    onChange(dateString);
    setCalendarOpen(false);
  };

  return (
    <div className="coolinput">
      <label className="text" htmlFor="calendarDate">
        <CalendarDays size={14} className="mr-1 inline-block" />
        {label || "Date"}
      </label>

      <div className="relative" ref={calendarRef}>
        {/* Date display button */}
        <button
          type="button"
          onClick={() => setCalendarOpen(!calendarOpen)}
          className={`w-full px-4 py-2.5 text-sm flex items-center justify-between
                   input bg-white transition-all duration-200
                   ${dateError ? "border-red-400" : ""}`}
        >
          <span className={!selectedDate ? "text-gray-500" : "text-gray-700"}>
            {formatDisplayDate()}
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              calendarOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {/* Calendar dropdown */}
        {calendarOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
            {/* Month navigation */}
            <div className="flex justify-between items-center mb-2">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
              </button>

              <h3 className="text-sm font-medium text-gray-700">
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>

              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  disabled={day.isDisabled}
                  onClick={() => handleSelectDay(day)}
                  className={`
                    p-1 text-xs rounded-md flex items-center justify-center h-8
                    ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-700"}
                    ${
                      day.isDisabled
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-bimec-light-green"
                    }
                    ${
                      isSelected(day.date)
                        ? "bg-bimec-green text-white font-medium"
                        : ""
                    }
                  `}
                >
                  {day.day}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
    </div>
  );
}

// TimeSlot component
function TimeSlot({ selectedTime, onChange, label, timeError }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeSlotRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (timeSlotRef.current && !timeSlotRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate time slots from 7:00 to 16:00 with 30-minute intervals
  // Excluding 11:30-13:00 break time
  const generateTimeSlots = () => {
    const slots = [];
    const workStart = 7; // 7 AM
    const workEnd = 16; // 4 PM
    const breakStart = 11.5; // 11:30 AM
    const breakEnd = 13; // 1 PM

    for (let hour = workStart; hour < workEnd; hour += 0.5) {
      // Skip break time
      if (hour >= breakStart && hour < breakEnd) continue;

      const isHalfHour = hour % 1 !== 0;
      const hourInt = Math.floor(hour);
      const minuteStr = isHalfHour ? "30" : "00";

      const timeStr = `${hourInt.toString().padStart(2, "0")}:${minuteStr}`;

      slots.push({
        value: timeStr,
        label: timeStr,
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Format display time
  const formatDisplayTime = () => {
    if (!selectedTime) return "Select time";

    // Find the corresponding time slot
    const timeSlot = timeSlots.find((slot) => slot.value === selectedTime);
    return timeSlot ? timeSlot.label : selectedTime;
  };

  return (
    <div className="coolinput">
      <label className="text" htmlFor="timeSlot">
        <Clock size={14} className="mr-1 inline-block" />
        {label || "Time"}
      </label>

      <div className="relative" ref={timeSlotRef}>
        {/* Time selector button */}
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full px-4 py-2.5 text-sm flex items-center justify-between
                   input bg-white transition-all duration-200
                   ${timeError ? "border-red-400" : ""}`}
        >
          <span className={!selectedTime ? "text-gray-500" : "text-gray-700"}>
            {formatDisplayTime()}
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
              dropdownOpen ? "transform rotate-180" : ""
            }`}
          />
        </button>

        {/* Time slots dropdown */}
        {dropdownOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
            <div className="py-1">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(slot.value);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-bimec-light-green transition-colors
                             ${
                               selectedTime === slot.value
                                 ? "bg-bimec-light-green text-bimec-heavy-green font-medium"
                                 : "text-gray-700"
                             }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {timeError && <p className="text-red-500 text-xs mt-1">{timeError}</p>}
    </div>
  );
}

const AddScheduleForm = ({ onEventCreated, submitRef }) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateErrors, setDateErrors] = useState({});

  // Combine date and time when they change
  useEffect(() => {
    if (startDate && startTime) {
      const startDateTime = `${startDate}T${startTime}`;
      setStart(startDateTime);
    }

    if (endDate && endTime) {
      const endDateTime = `${endDate}T${endTime}`;
      setEnd(endDateTime);
    }
  }, [startDate, startTime, endDate, endTime]);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate dates and times
    const errors = {};
    if (!startDate) errors.startDate = "Start date is required";
    if (!startTime) errors.startTime = "Start time is required";
    if (!endDate) errors.endDate = "End date is required";
    if (!endTime) errors.endTime = "End time is required";

    if (Object.keys(errors).length > 0) {
      setDateErrors(errors);
      return;
    }

    // Compare dates
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (endDateTime <= startDateTime) {
      setDateErrors({
        endDate: "End date/time must be after start date/time",
      });
      return;
    }

    setLoading(true);

    try {
      const eventData = { summary, description, start, end };
      const response = await axios.post(
        "http://localhost:3001/api/calendar/events",
        eventData
      );

      if (onEventCreated) onEventCreated(response.data);

      // Reset form
      setSummary("");
      setDescription("");
      setStartDate("");
      setStartTime("");
      setEndDate("");
      setEndTime("");
      setStart("");
      setEnd("");
      setDateErrors({});
    } catch (err) {
      console.error("Failed to create event:", err);
      setError("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 flex items-start">
          <span className="bg-red-100 p-1 rounded-full mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="coolinput">
          <label className="text" htmlFor="summary">
            <User size={14} className="mr-1 inline-block" />
            Doctor's Name
          </label>
          <input
            id="summary"
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="e.g., Dr. Smith"
            required
            className="input bg-white"
          />
        </div>

        <div className="coolinput">
          <label className="text" htmlFor="description">
            <FileText size={14} className="mr-1 inline-block" />
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Room ... Department ..."
            className="input bg-white"
          />
        </div>

        {/* Date and Time pickers for start */}
        <Calendar
          selectedDate={startDate}
          onChange={setStartDate}
          label="Start Date"
          dateError={dateErrors.startDate}
        />

        <TimeSlot
          selectedTime={startTime}
          onChange={setStartTime}
          label="Start Time"
          timeError={dateErrors.startTime}
        />

        {/* Date and Time pickers for end */}
        <Calendar
          selectedDate={endDate}
          onChange={setEndDate}
          label="End Date"
          dateError={dateErrors.endDate}
        />

        <TimeSlot
          selectedTime={endTime}
          onChange={setEndTime}
          label="End Time"
          timeError={dateErrors.endTime}
        />

        <button type="submit" className="hidden" ref={submitRef} />
      </div>

      <style jsx>{`
        .coolinput {
          display: flex;
          flex-direction: column;
          width: 100%;
          position: relative;
        }

        .coolinput label.text {
          font-size: 0.75rem;
          color: #285430;
          font-weight: 700;
          position: relative;
          top: 0.5rem;
          margin: 0 0 0 7px;
          padding: 0 3px;
          background: #ffffff;
          width: fit-content;
          z-index: 1;
          display: flex;
          align-items: center;
        }

        .coolinput .input {
          padding: 11px 10px;
          font-size: 0.875rem;
          border: 1px #5f8d4d solid;
          border-radius: 8px;
          background: #ffffff;
          transition: all 0.3s ease;
          color: #111827;
        }

        .coolinput .input:focus {
          outline: none;
          border-color: #285430;
          box-shadow: 0 0 0 3px rgba(95, 141, 77, 0.1);
        }

        .coolinput .input:hover {
          border-color: #285430;
        }
      `}</style>
    </form>
  );
};

export default AddScheduleForm;
