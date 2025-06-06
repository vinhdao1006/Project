const express = require("express");
const router = express.Router();
const { createEvent, listEvents } = require("../utils/calendarServices");
const axios = require("axios");

router.post("/events", async (req, res) => {
  try {
    const event = await createEvent(req.body);

    // Create notification
    await axios.post("http://localhost:3001/api/notifications/create-notifications", {
      message: `New appointment: ${req.body.summary}`,
    });

    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create event" });
  }
});


router.get("/events", async (req, res) => {
  try {
    // console.log("📥 [GET] /api/calendar/events", req.query);
    const { start, end } = req.query;
    const events = await listEvents(start, end); 
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

module.exports = router;
