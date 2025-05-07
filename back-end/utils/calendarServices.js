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
  const event = {
    summary,
    description,
    start: { dateTime: start, timeZone: "Asia/Ho_Chi_Minh" },
    end: { dateTime: end, timeZone: "Asia/Ho_Chi_Minh" },
  };

  return await calendar.events.insert({
    calendarId,
    resource: event,
  });
}

async function listEvents(startTime, endTime) {
  const res = await calendar.events.list({
    calendarId,
    timeMin: new Date(startTime).toISOString(),
    timeMax: new Date(endTime).toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return res.data.items;
}

module.exports = { createEvent, listEvents };
