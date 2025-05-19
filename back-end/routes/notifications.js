const NotificationModel = require('../models/notification');
const express = require('express');
const router = express.Router();

// Create notification
router.post('/create-notifications', async (req, res) => {
    try {
        const notification = new NotificationModel(req.body);
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get notifications (for display)
router.get('/get-notifications', async (req, res) => {
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 }).limit(20);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark a specific notification as read
router.put('/mark-as-read/:id', async (req, res) => {
    try {
        const notification = await NotificationModel.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Mark all notifications as read
router.put('/mark-all-as-read', async (req, res) => {
    try {
        await NotificationModel.updateMany({ read: false }, { $set: { read: true } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;