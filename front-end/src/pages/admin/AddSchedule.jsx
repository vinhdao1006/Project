import React, { useState } from "react";
import axios from "axios";
import { CalendarDays, Clock, User, FileText } from "lucide-react";

const AddScheduleForm = ({ onEventCreated, submitRef }) => {
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
      const response = await axios.post(
        "http://localhost:3001/api/calendar/events",
        eventData
      );

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

        <div className="coolinput">
          <label className="text" htmlFor="start">
            <CalendarDays size={14} className="mr-1 inline-block" />
            Start Time
          </label>
          <input
            id="start"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            className="input bg-white"
          />
        </div>

        <div className="coolinput">
          <label className="text" htmlFor="end">
            <Clock size={14} className="mr-1 inline-block" />
            End Time
          </label>
          <input
            id="end"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            className="input bg-white"
          />
        </div>
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
