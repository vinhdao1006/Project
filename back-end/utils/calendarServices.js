const { google } = require("googleapis");
const key = require("../credentials/google-service-account.json");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const calendarId = "610f89de9c7dec26bf6c9d9b2f0a1b2261fab4d695d3fc39616cfe7756498315@group.calendar.google.com"; 

const auth = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  SCOPES
);

const calendar = google.calendar({ version: "v3", auth });

async function createEvent({ summary, description, start, end }) {
  // Convert to RFC3339 with timezone if needed
  function toRFC3339(dateStr) {
    // If already has timezone, return as is
    if (dateStr.endsWith("Z") || dateStr.match(/[+-]\d{2}:\d{2}$/)) return dateStr;
    // Assume Asia/Ho_Chi_Minh (UTC+7)
    return dateStr.length === 16
      ? `${dateStr}:00+07:00` // "YYYY-MM-DDTHH:mm" -> "YYYY-MM-DDTHH:mm:00+07:00"
      : `${dateStr}+07:00`;
  }

  const event = {
    summary,
    description,
    start: { dateTime: toRFC3339(start), timeZone: "Asia/Ho_Chi_Minh" },
    end: { dateTime: toRFC3339(end), timeZone: "Asia/Ho_Chi_Minh" },
  };

  return await calendar.events.insert({
    calendarId,
    resource: event,
  });
}

async function listEvents(startTime, endTime) {
  const now = new Date();

  const timeMin = startTime
    ? new Date(startTime).toISOString()
    : new Date(now.setFullYear(now.getFullYear() - 1)).toISOString(); 

  const timeMax = endTime
    ? new Date(endTime).toISOString()
    : new Date(now.setFullYear(now.getFullYear() + 2)).toISOString(); 

  // console.log("Fetching Google Calendar events from:", timeMin, "to:", timeMax);s

  const res = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    singleEvents: true,
    orderBy: "startTime",
    maxResults: 2500, 
  });

  // console.log(`✅ Google returned ${res.data.items.length} events`);

  return res.data.items;
}

module.exports = { createEvent, listEvents };
