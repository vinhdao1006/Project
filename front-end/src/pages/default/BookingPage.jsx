import react, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import slider_booking from "../../assets/image/slider_booking.png";
import icon_phone from "../../assets/icon/icon_phone.png";
import Contact from "../../components/utils/Contact";
import BimecFooter from "../../components/Footer/BimecFooter";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  ClockIcon,
  CalendarIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

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

function DateOfBirthPicker({ selectedDate, onChange, dateError }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [yearSelectOpen, setYearSelectOpen] = useState(false);
  const [monthSelectOpen, setMonthSelectOpen] = useState(false);
  const calendarRef = useRef(null);

  // Generate year options (100 years back)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

  useEffect(() => {
    // Close calendar when clicking outside
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
        setYearSelectOpen(false);
        setMonthSelectOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Calendar helper functions (similar to your Calendar component)
  const buildCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // First day of month and how many days to show from previous month
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Last day of month
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
      });
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const calendarDays = buildCalendar();

  // Format date for display
  const formatDisplayDate = () => {
    if (!selectedDate) return "Select date of birth";

    const date = new Date(selectedDate);
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  // Check if a day is selected
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
    // Format date as YYYY-MM-DD for input value
    const date = day.date;
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    onChange(dateString);
    setCalendarOpen(false);
  };

  // Handle year selection
  const handleYearChange = (year) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setYearSelectOpen(false);
  };

  // Handle month selection
  const handleMonthChange = (monthIndex) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), monthIndex, 1));
    setMonthSelectOpen(false);
  };

  return (
    <div className="relative" ref={calendarRef}>
      <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
        Date of Birth*
      </label>

      {/* Date display button */}
      <button
        type="button"
        onClick={() => setCalendarOpen(!calendarOpen)}
        className={`w-full px-4 py-2.5 pl-10 text-sm border rounded-md bg-white flex items-center justify-between
                   focus:outline-none transition-all duration-200
                   ${
                     dateError
                       ? "border-red-400"
                       : "border-gray-400 hover:border-bimec-green"
                   }`}
      >
        <span
          className={`text-left ${
            !selectedDate ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {formatDisplayDate()}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            calendarOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Calendar dropdown */}
      {calendarOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
          {/* Year and Month Selection */}
          <div className="flex justify-between items-center mb-3">
            {/* Year Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setYearSelectOpen(!yearSelectOpen);
                  setMonthSelectOpen(false);
                }}
                className="px-2 py-1 text-sm border rounded flex items-center gap-1 hover:bg-gray-100"
              >
                <span>{currentMonth.getFullYear()}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {yearSelectOpen && (
                <div className="absolute top-full left-0 mt-1 max-h-60 w-24 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg z-30">
                  <div className="py-1">
                    {yearOptions.map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => handleYearChange(year)}
                        className={`w-full text-left px-4 py-1 text-sm hover:bg-bimec-light-green
                                   ${
                                     currentMonth.getFullYear() === year
                                       ? "bg-bimec-light-green text-bimec-heavy-green font-medium"
                                       : ""
                                   }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Month Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setMonthSelectOpen(!monthSelectOpen);
                  setYearSelectOpen(false);
                }}
                className="px-2 py-1 text-sm border rounded flex items-center gap-1 hover:bg-gray-100"
              >
                <span>{MONTHS[currentMonth.getMonth()]}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>

              {monthSelectOpen && (
                <div className="absolute top-full right-0 mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-30">
                  <div className="py-1">
                    {MONTHS.map((month, index) => (
                      <button
                        key={month}
                        type="button"
                        onClick={() => handleMonthChange(index)}
                        className={`w-full text-left px-4 py-1 text-sm hover:bg-bimec-light-green
                                   ${
                                     currentMonth.getMonth() === index
                                       ? "bg-bimec-light-green text-bimec-heavy-green font-medium"
                                       : ""
                                   }`}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
                onClick={() => handleSelectDay(day)}
                className={`
                  p-1 text-xs rounded-md flex items-center justify-center h-8
                  ${!day.isCurrentMonth ? "text-gray-400" : "text-gray-700"}
                  hover:bg-bimec-light-green
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

      {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
    </div>
  );
}

function Calendar({ selectedDate, onChange, dateError }) {
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
  }, []);

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

    // Format date as YYYY-MM-DD for input value
    const date = day.date;
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    onChange(dateString);
    setCalendarOpen(false);
  };

  return (
    <div className="relative" ref={calendarRef}>
      <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
        Appointment Date*
      </label>

      {/* Date display button */}
      <button
        type="button"
        onClick={() => setCalendarOpen(!calendarOpen)}
        className={`w-full px-4 py-2.5 pl-10 text-sm border rounded-md bg-white flex items-center justify-between
                   focus:outline-none transition-all duration-200
                   ${
                     dateError
                       ? "border-red-400"
                       : "border-gray-400 hover:border-bimec-green"
                   }`}
      >
        <span
          className={`text-left ${
            !selectedDate ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {formatDisplayDate()}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            calendarOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Calendar dropdown */}
      {calendarOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-2">
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

      {dateError && <p className="text-red-500 text-xs mt-1">{dateError}</p>}
    </div>
  );
}

// TimeSlot component definition
function TimeSlot({ selectedTime, onChange, timeError }) {
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

      const startTimeStr = `${hourInt
        .toString()
        .padStart(2, "0")}:${minuteStr}`;

      // Calculate end time
      const endHour = isHalfHour ? hourInt + 1 : hourInt + 0.5;
      const endHourInt = Math.floor(endHour);
      const endMinuteStr = endHour % 1 !== 0 ? "30" : "00";

      const endTimeStr = `${endHourInt
        .toString()
        .padStart(2, "0")}:${endMinuteStr}`;

      slots.push({
        value: startTimeStr,
        label: `${startTimeStr} - ${endTimeStr}`,
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();
  // PART 2: Time Selector Component and BookingPage Integration (Start)

  // Continuing from the TimeSlot component from Part 1...

  // Format display time
  const formatDisplayTime = () => {
    if (!selectedTime) return "Select time";

    // Find the corresponding time slot
    const timeSlot = timeSlots.find((slot) => slot.value === selectedTime);
    return timeSlot ? timeSlot.label : selectedTime;
  };

  return (
    <div className="relative" ref={timeSlotRef}>
      <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
        Appointment Time*
      </label>

      {/* Time selector button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`w-full px-4 py-2.5 pl-10 text-sm border rounded-md bg-white flex items-center justify-between
                   focus:outline-none transition-all duration-200
                   ${
                     timeError
                       ? "border-red-400"
                       : "border-gray-400 hover:border-bimec-green"
                   }`}
      >
        <span
          className={`text-left ${
            !selectedTime ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {formatDisplayTime()}
        </span>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            dropdownOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <ClockIcon className="h-5 w-5 text-gray-400" />
      </div>

      {/* Time slots dropdown */}
      {dropdownOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
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

      {timeError && <p className="text-red-500 text-xs mt-1">{timeError}</p>}
    </div>
  );
}

// Starting to integrate with the main BookingPage component
function BookingPage() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState({
    specialty: false,
    doctor: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    reason: "",
    appointmentTime: "",
  });

  // Refs for dropdown containers
  const specialtyRef = useRef(null);
  const doctorRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchSpecialties = async () => {
      try {
        console.log("Fetching specialties...");
        const response = await axios.get(
          "http://localhost:3001/api/specialties"
        );
        console.log("Received specialties:", response.data);
        setSpecialties(response.data);
      } catch (error) {
        console.error("Error fetching specialties:", error);
      }
    };

    fetchSpecialties();
  }, [navigate]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedSpecialty) {
        try {
          console.log("Fetching doctors for specialty:", selectedSpecialty);
          const response = await axios.get(
            `http://localhost:3001/api/doctors/${selectedSpecialty}`
          );
          console.log("Received doctors:", response.data);
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
          setDoctors([]);
        }
      } else {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        specialtyRef.current &&
        !specialtyRef.current.contains(event.target)
      ) {
        setDropdownOpen((prev) => ({ ...prev, specialty: false }));
      }
      if (doctorRef.current && !doctorRef.current.contains(event.target)) {
        setDropdownOpen((prev) => ({ ...prev, doctor: false }));
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSpecialtyChange = (value) => {
    console.log("Selected specialty:", value);
    setSelectedSpecialty(value);
    setSelectedDoctor("");
    setDropdownOpen((prev) => ({ ...prev, specialty: false }));
  };

  const handleDoctorChange = (value) => {
    setSelectedDoctor(value);
    setDropdownOpen((prev) => ({ ...prev, doctor: false }));
  };

  const handleDateChange = (date) => {
    const selectedDateObj = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    if (selectedDateObj < today) {
      setErrors((prev) => ({
        ...prev,
        date: "Please select a future date",
      }));
      setSelectedDate("");
    } else {
      setSelectedDate(date);
      setErrors((prev) => ({
        ...prev,
        date: "",
      }));
    }
  };

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      appointmentTime: time,
    }));

    if (errors.time) {
      setErrors((prev) => ({
        ...prev,
        time: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedSpecialty) newErrors.specialty = "Please select a specialty";
    if (!selectedDoctor) newErrors.doctor = "Please select a doctor";
    if (!selectedDate) newErrors.date = "Please select an appointment date";
    if (!formData.appointmentTime)
      newErrors.time = "Please select an appointment time";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.dateOfBirth) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Please select gender";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.reason)
      newErrors.reason = "Please provide a reason for visit";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User information not found. Please login again.");
        navigate("/login");
        return;
      }

      const appointmentData = {
        patientId: userId,
        fullname: formData.name,
        gender: formData.gender,
        dayOfBirth: formData.dateOfBirth,
        doctorId: selectedDoctor,
        specialtyId: selectedSpecialty,
        appointmentDate: selectedDate,
        appointmentTime: formData.appointmentTime,
        reason: formData.reason,
        email: formData.email,
        ...formData,
      };

      const response = await axios.post(
        "http://localhost:3001/api/appointments",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Appointment booked successfully!");
        navigate("/default/appointments");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else if (error.response && error.response.status == 400) {
        alert(
          "This time slot is already booked. Please book a different time range."
        );
      } else {
        console.error("Error booking appointment:", error);
        alert("Failed to book appointment. Please try again.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 md:p-8">
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-bimec-heavy-green mb-2">
                Make an Appointment
              </h1>
              <p className="text-gray-500 text-sm">
                Please fill out the form below to book your appointment. All
                fields marked with * are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-bimec-green" />
                  Appointment Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Custom Specialty Dropdown */}
                  <div className="relative" ref={specialtyRef}>
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Specialty*
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          setDropdownOpen((prev) => ({
                            ...prev,
                            specialty: !prev.specialty,
                          }))
                        }
                        className={`w-full px-4 py-2.5 text-sm border rounded-md bg-white flex items-center justify-between
                                  transition-all duration-200 focus:outline-none
                                  ${
                                    errors.specialty
                                      ? "border-red-400"
                                      : "border-gray-400 hover:border-bimec-green"
                                  }`}
                      >
                        <span
                          className={`text-left ${
                            !selectedSpecialty && "text-gray-500"
                          }`}
                        >
                          {selectedSpecialty || "Select Specialty"}
                        </span>
                        <ChevronDownIcon
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            dropdownOpen.specialty ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      {dropdownOpen.specialty && (
                        <div className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                          <div className="py-1">
                            {specialties && specialties.length > 0 ? (
                              specialties.map((specialty) => (
                                <button
                                  key={specialty._id}
                                  type="button"
                                  onClick={() =>
                                    handleSpecialtyChange(specialty.name)
                                  }
                                  className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-bimec-light-green transition-colors
                                          ${
                                            selectedSpecialty === specialty.name
                                              ? "bg-bimec-light-green text-bimec-heavy-green font-medium"
                                              : "text-gray-700"
                                          }`}
                                >
                                  {specialty.name}
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-2 text-sm text-gray-500">
                                Loading specialties...
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.specialty && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.specialty}
                      </p>
                    )}
                  </div>

                  {/* Custom Doctor Dropdown */}
                  <div className="relative" ref={doctorRef}>
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Doctor*
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() =>
                          selectedSpecialty &&
                          setDropdownOpen((prev) => ({
                            ...prev,
                            doctor: !prev.doctor,
                          }))
                        }
                        disabled={!selectedSpecialty}
                        className={`w-full px-4 py-2.5 text-sm border rounded-md bg-white flex items-center justify-between
                                  transition-all duration-200 focus:outline-none
                                  ${
                                    errors.doctor
                                      ? "border-red-400"
                                      : "border-gray-400 hover:border-bimec-green"
                                  }
                                  ${
                                    !selectedSpecialty &&
                                    "opacity-75 cursor-not-allowed"
                                  }`}
                      >
                        <span
                          className={`text-left ${
                            !selectedDoctor && "text-gray-500"
                          }`}
                        >
                          {!selectedSpecialty
                            ? "Please select a specialty first"
                            : doctors.length === 0
                            ? "No doctors available for this specialty"
                            : selectedDoctor
                            ? doctors.find((d) => d.doctorId === selectedDoctor)
                              ? `Dr. ${
                                  doctors.find(
                                    (d) => d.doctorId === selectedDoctor
                                  ).firstname
                                } ${
                                  doctors.find(
                                    (d) => d.doctorId === selectedDoctor
                                  ).lastname
                                }`
                              : "Select Doctor"
                            : "Select Doctor"}
                        </span>
                        <ChevronDownIcon
                          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                            dropdownOpen.doctor ? "transform rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown menu */}
                      {dropdownOpen.doctor && doctors.length > 0 && (
                        <div className="absolute z-20 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-y-auto border border-gray-200">
                          <div className="py-1">
                            {doctors.map((doctor) => (
                              <button
                                key={doctor.doctorId}
                                type="button"
                                onClick={() =>
                                  handleDoctorChange(doctor.doctorId)
                                }
                                className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-bimec-light-green transition-colors
                                        ${
                                          selectedDoctor === doctor.doctorId
                                            ? "bg-bimec-light-green text-bimec-heavy-green font-medium"
                                            : "text-gray-700"
                                        }`}
                              >
                                Dr. {doctor.firstname} {doctor.lastname}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {errors.doctor && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.doctor}
                      </p>
                    )}
                  </div>

                  {/* Custom Calendar Component */}
                  <Calendar
                    selectedDate={selectedDate}
                    onChange={handleDateChange}
                    dateError={errors.date}
                  />

                  {/* Custom Time Slot Component */}
                  <TimeSlot
                    selectedTime={formData.appointmentTime}
                    onChange={handleTimeChange}
                    timeError={errors.time}
                  />
                </div>
              </div>

              {/* Patient Information Section - Keep as is from original */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Patient Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Name*
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-md bg-white 
                                                         focus:outline-none transition-colors duration-200
                                                         ${
                                                           errors.name
                                                             ? "border-red-400 focus:border-red-500"
                                                             : "border-gray-400 focus:border-gray-500"
                                                         }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  {/* Date of Birth Picker */}
                  <DateOfBirthPicker
                    selectedDate={formData.dateOfBirth}
                    onChange={(date) => {
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: date,
                      }));
                      if (errors.dob) {
                        setErrors((prev) => ({
                          ...prev,
                          dob: "",
                        }));
                      }
                    }}
                    dateError={errors.dob}
                  />
                  {/* Gender Selection */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Gender*
                    </label>
                    <div className="flex items-center gap-6 px-4 py-2.5 border-[1px] border-gray-400 rounded-md bg-white">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={formData.gender === "Male"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Male</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={formData.gender === "Female"}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">Female</span>
                      </label>
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>
                  {/* Phone Number */}
                  <div className="relative">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Phone Number*
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-md bg-white 
                                 focus:outline-none transition-colors duration-200
                                 ${
                                   errors.phone
                                     ? "border-red-400 focus:border-red-500"
                                     : "border-gray-400 focus:border-gray-500"
                                 }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="relative md:col-span-2">
                    <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                      Email*
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter email"
                        className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-md bg-white 
                                 focus:outline-none transition-colors duration-200
                                 ${
                                   errors.email
                                     ? "border-red-400 focus:border-red-500"
                                     : "border-gray-400 focus:border-gray-500"
                                 }`}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Reason for Visit */}
                <div className="relative">
                  <label className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-500 bg-white z-10">
                    Reason for Visit*
                  </label>
                  <div className="relative">
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      placeholder="Please describe the reason for your visit"
                      rows="4"
                      className={`w-full px-4 py-2.5 pl-10 text-sm border-[1px] rounded-md bg-white 
                               focus:outline-none transition-colors duration-200 resize-none
                               ${
                                 errors.reason
                                   ? "border-red-400 focus:border-red-500"
                                   : "border-gray-400 focus:border-gray-500"
                               }`}
                    ></textarea>
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#285430] text-white py-3 rounded-lg font-medium 
                       hover:bg-bimec-green focus:outline-none focus:ring-4 focus:ring-green-300 
                       transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CalendarIcon className="h-5 w-5" />
                Confirm Appointment
              </button>
            </form>
          </div>

          {/* Sidebar Section */}
          <div className="lg:w-80 bg-[#285430] text-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Schedule Hours</h2>

            <div className="space-y-3 mb-6">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-green-700/30"
                >
                  <span className="text-sm font-medium">{day}</span>
                  <span className="text-sm">
                    {day === "Sunday"
                      ? "Emergency Only"
                      : "07:00 AM - 04:00 PM"}
                  </span>
                </div>
              ))}
            </div>

            {/* Emergency Line */}
            <div className="bg-white/10 rounded-lg p-4 text-center mt-6">
              <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Emergency Line
              </h3>
              <div className="flex items-center justify-center gap-2">
                <img src={icon_phone} alt="Phone" className="w-5 h-5" />
                <p className="text-xl font-semibold">(028) 3864-7256</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">Same day appointments available</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-green-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-sm">24/7 Emergency care</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Contact />
      </div>

      <BimecFooter />
    </div>
  );
}

export default BookingPage;
