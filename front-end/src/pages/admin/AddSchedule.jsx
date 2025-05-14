import React, { useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, User, FileText } from "lucide-react";

const AddScheduleForm = ({ onEventCreated }) => {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const eventData = { summary, description, start, end };
      const response = await axios.post("http://localhost:3001/api/calendar/events", eventData);

      if (onEventCreated) onEventCreated(response.data);

      // Reset form
      setSummary("");
      setDescription("");
      setStart("");
      setEnd("");
    } catch (err) {
      console.error("Failed to create event:", err);
      setError("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 shadow-lg p-6 rounded-xl space-y-5">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Add Doctor Schedule</h2>

      {error && (
        <div className="text-red-500 text-sm bg-red-100 dark:bg-red-900 p-2 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <User size={16} /> Doctor's Name
          </label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="e.g., Dr. Smith"
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <FileText size={16} /> Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Room ... Department ..."
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <CalendarDays size={16} /> Start Time
          </label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1">
            <Clock size={16} /> End Time
          </label>
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            className="w-full mt-1 px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-bimec-green hover:bg-bimec-heavy-green text-white px-5 py-2 rounded transition disabled:opacity-60"
        >
          {loading ? "Saving..." : "Add Schedule"}
        </button>
      </div>
    </form>
  );
};

export default AddScheduleForm;
