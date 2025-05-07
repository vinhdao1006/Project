import React, { useState } from "react";
import axios from "axios";

const AddScheduleForm = ({ onEventCreated }) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventData = {
        summary,
        description,
        start,
        end,
      };

      const response = await axios.post("http://localhost:3001/api/calendar/events", eventData);
      alert("Event created!");
      if (onEventCreated) onEventCreated(response.data);
      // Clear form
      setSummary("");
      setDescription("");
      setStart("");
      setEnd("");
    } catch (err) {
      console.error("Failed to create event:", err);
      alert("Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded mb-6 space-y-4">
      <h3 className="text-lg font-bold">Add Doctor Schedule</h3>

      <input
        type="text"
        placeholder="Doctor's Name (Summary)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="text"
        placeholder="Description (e.g., Follow-up)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        type="datetime-local"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <input
        type="datetime-local"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Event
      </button>
    </form>
  );
};

export default AddScheduleForm;
