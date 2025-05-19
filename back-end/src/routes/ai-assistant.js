const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Initialize OpenAI configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Chat endpoint
router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Create chat completion
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI assistant for Bimec Hospital. You can help patients with general health information, appointment scheduling, and hospital services. Please be professional, empathetic, and accurate in your responses. If you're unsure about medical advice, always recommend consulting with a healthcare professional."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        const response = completion.choices[0].message.content;
        res.json({ response });
    } catch (error) {
        console.error('Error in AI Assistant:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
});

module.exports = router; 